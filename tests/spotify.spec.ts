import { test, expect } from "@playwright/test";
import { build } from "esbuild";
import sharp from "sharp";
import {
  BinaryBitmap,
  HybridBinarizer,
  MultiFormatReader,
  RGBLuminanceSource,
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";
import { readFile } from "node:fs/promises";
import { normalizeSpotifyPlaylist, playlistState } from "../src/lib/spotify";

// Deliberately synthetic identifiers, confined to this isolated browser harness.
// They are never saved in the site's playlist configuration or described as live.
const fixtures = Object.fromEntries(
  ["main", "heart", "chaotic", "chill"].map((mood, i) => {
    const url = `https://open.spotify.com/playlist/${String.fromCharCode(65 + i).repeat(22)}`;
    return [
      mood,
      {
        url,
        title: `TEST FIXTURE ${mood}`,
        provider: "Spotify",
        checkedAt: "2026-10-22T00:00:00.000Z",
      },
    ];
  }),
);
let harness = "";
let stylesheet = "";
test.beforeAll(async () => {
  const result = await build({
    absWorkingDir: process.cwd(),
    stdin: {
      contents:
        'import {createRoot} from "react-dom/client"; import {MoodMachine} from "./src/components/mood-machine"; createRoot(document.getElementById("fixture")).render(<MoodMachine/>);',
      resolveDir: process.cwd(),
      sourcefile: "qr-test-fixture.tsx",
      loader: "tsx",
    },
    bundle: true,
    write: false,
    minify: true,
    jsx: "automatic",
    format: "iife",
    define: {
      "process.env.NEXT_PUBLIC_BASE_PATH": '""',
      "process.env.NODE_ENV": '"production"',
    },
    plugins: [
      {
        name: "isolated-spotify-fixtures",
        setup(b) {
          b.onResolve({ filter: /^@\/data\/playlists.json$/ }, () => ({
            path: "playlists",
            namespace: "fixture",
          }));
          b.onResolve(
            { filter: /^@\/data\/playlist-verification.json$/ },
            () => ({ path: "verified", namespace: "fixture" }),
          );
          b.onLoad({ filter: /.*/, namespace: "fixture" }, (args) => ({
            contents: JSON.stringify(
              args.path === "verified"
                ? fixtures
                : Object.fromEntries(
                    Object.entries(fixtures).map(([k, v]) => [
                      k,
                      { url: v.url },
                    ]),
                  ),
            ),
            loader: "json",
          }));
          b.onResolve({ filter: /^next\/navigation$/ }, () => ({
            path: "navigation",
            namespace: "adapter",
          }));
          b.onResolve({ filter: /^next\/link$/ }, () => ({
            path: "link",
            namespace: "adapter",
          }));
          b.onResolve({ filter: /^next\/image$/ }, () => ({
            path: "image",
            namespace: "adapter",
          }));
          b.onLoad({ filter: /.*/, namespace: "adapter" }, (args) => ({
            contents:
              args.path === "navigation"
                ? 'import {useMemo} from "react"; export function useSearchParams(){return useMemo(()=>new URLSearchParams(),[])}'
                : args.path === "link"
                  ? 'import React from "react"; export default function Link(p){return React.createElement("a",p)}'
                  : 'import React from "react"; export default function Image({fill,priority,...p}){return React.createElement("img",p)}',
            loader: "js",
            resolveDir: process.cwd(),
          }));
        },
      },
    ],
  });
  harness = result.outputFiles[0].text;
  stylesheet = (await readFile("src/app/globals.css", "utf8")).replace(
    '@import "tailwindcss";',
    "",
  );
});

async function decodeQr(buffer: Buffer) {
  const { data, info } = await sharp(buffer)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const bitmap = new BinaryBitmap(
    new HybridBinarizer(
      new RGBLuminanceSource(
        new Uint8ClampedArray(data),
        info.width,
        info.height,
      ),
    ),
  );
  return new MultiFormatReader()
    .decode(
      bitmap,
      new Map([[DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]]]),
    )
    .getText();
}

test("only official playlist URLs are accepted; unconfigured moods remain explicit", () => {
  const valid = fixtures.main.url;
  expect(normalizeSpotifyPlaylist(`${valid}?si=tracking`)).toBe(valid);
  expect(
    normalizeSpotifyPlaylist(valid.replace("/playlist/", "/intl-fr/playlist/")),
  ).toBe(valid);
  for (const value of [
    "https://open.spotify.com.evil.example/playlist/" + "A".repeat(22),
    "javascript:alert(1)",
    "http://open.spotify.com/playlist/" + "A".repeat(22),
    "https://user@open.spotify.com/playlist/" + "A".repeat(22),
    "https://open.spotify.com/track/" + "A".repeat(22),
    "https://open.spotify.com/playlist/invalid",
  ]) {
    expect(normalizeSpotifyPlaylist(value)).toBeNull();
  }
  for (const mood of ["main", "heart", "chaotic", "chill"]) {
    expect(playlistState(mood).status).toBe("unconfigured");
  }
});

test("each mood generates a decodable QR for its exact URL and an official click-to-load embed", async ({
  page,
}) => {
  // No live Spotify request is made or claimed by this test.
  await page.route("https://open.spotify.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<html><body>Isolated Spotify embed test fixture.</body></html>",
    }),
  );
  await page.setContent('<main id="fixture"></main>');
  await page.addStyleTag({ content: stylesheet });
  await page.addScriptTag({ content: harness });
  const moods = [
    ["main", "Main Character Energy"],
    ["heart", "Heartbroken but Hungry"],
    ["chaotic", "Chaotic Bestie"],
    ["chill", "Chill Mode"],
  ];
  for (const [id, name] of moods) {
    await page.getByRole("button", { name: new RegExp(name) }).click();
    const qr = page.getByRole("img", {
      name: `Scan to open TEST FIXTURE ${id} on Spotify`,
    });
    await expect(qr).toBeVisible();
    expect(await decodeQr(await qr.screenshot())).toBe(fixtures[id].url);
    await expect(
      page.getByRole("link", { name: "OPEN IN SPOTIFY" }),
    ).toHaveAttribute("href", fixtures[id].url);
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: "LOAD SPOTIFY PLAYER" }).click();
    await expect(page.locator("iframe")).toHaveAttribute(
      "src",
      `https://open.spotify.com/embed/playlist/${fixtures[id].url.split("/").pop()}?utm_source=generator&theme=0`,
    );
    expect(await page.locator("iframe").getAttribute("allow")).not.toContain(
      "autoplay",
    );
    await page.getByRole("button", { name: "CLOSE PLAYER" }).click();
    await expect(page.locator("iframe")).toHaveCount(0);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  const qr = page.locator(".spotify-qr");
  expect(await decodeQr(await qr.screenshot())).toBe(fixtures.chill.url);
  const downloaded = page.waitForEvent("download");
  await page.getByRole("link", { name: "SAVE QR CODE" }).click();
  const file = await downloaded;
  expect(await decodeQr(await readFile((await file.path())!))).toBe(
    fixtures.chill.url,
  );
});
