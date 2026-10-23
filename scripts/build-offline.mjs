import { build } from "esbuild";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "offline");
await mkdir(output, { recursive: true });

const fontPackages = [
  "@fontsource/bebas-neue/latin-400.css",
  "@fontsource-variable/dm-sans/index.css",
  "@fontsource-variable/noto-sans-arabic/index.css",
];
let fonts = "";
for (const name of fontPackages) {
  const file = path.join(root, "node_modules", name);
  let css = await readFile(file, "utf8");
  for (const match of [...css.matchAll(/url\(([^)]+)\)/g)]) {
    const font = await readFile(
      path.resolve(path.dirname(file), match[1].replace(/["']/g, "")),
    );
    css = css.replace(
      match[0],
      `url(data:font/woff2;base64,${font.toString("base64")})`,
    );
  }
  fonts += css;
}

// Reuse Next.js's image optimizer. Only the output format/size changes; originals remain intact.
const assets = {};
async function imageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await imageFiles(file)));
    else if (/\.(?:png|jpe?g|webp)$/.test(entry.name)) files.push(file);
  }
  return files;
}
for (const file of await imageFiles(path.join(root, "public/images"))) {
  const source =
    "/" +
    path.relative(path.join(root, "public"), file).split(path.sep).join("/");
  const url = new URL(
    "/_next/image",
    process.env.OFFLINE_IMAGE_ORIGIN || "http://127.0.0.1:3000",
  );
  url.search = new URLSearchParams({
    url: source,
    w: "1200",
    q: "75",
  }).toString();
  let buffer;
  let mime = "image/png";
  try {
    const response = await fetch(url, {
      headers: { Accept: "image/webp" },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      throw new Error(`Image optimizer returned ${response.status}`);
    buffer = Buffer.from(await response.arrayBuffer());
    mime = response.headers.get("content-type");
  } catch {
    buffer = await readFile(file);
    console.log(
      `Using original ${source} image; start the Next.js server for a smaller export.`,
    );
  }
  assets[source] = `data:${mime};base64,${buffer.toString("base64")}`;
}

const bundle = await build({
  absWorkingDir: root,
  entryPoints: ["scripts/offline-entry.jsx"],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  write: false,
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.NEXT_PUBLIC_BASE_PATH": '""',
  },
  plugins: [
    {
      name: "offline-next-adapters",
      setup(b) {
        const aliases = {
          "next/link": "offline-link.jsx",
          "next/image": "offline-image.jsx",
          "next/navigation": "offline-router.jsx",
        };
        b.onResolve({ filter: /^next\/(link|image|navigation)$/ }, (args) => ({
          path: path.join(root, "scripts", aliases[args.path]),
        }));
      },
    },
  ],
});
const css = (
  await readFile(path.join(root, "src/app/globals.css"), "utf8")
).replace('@import "tailwindcss";', "");
const js = bundle.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const icon = await readFile(path.join(root, "src/app/icon.svg"), "utf8");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="CHAWARMA L7ILWIN: a fictional food and music concept. Complete offline edition."><title>CHAWARMA L7ILWIN — Good food. Loud music.</title><link rel="icon" href="data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}"><style>${fonts}\n${css}</style></head><body><div id="app"></div><noscript>Please enable JavaScript to explore the interactive site.</noscript><script>window.__L7_ASSETS__=${JSON.stringify(assets)};</script><script>${js}</script></body></html>`;
await writeFile(path.join(output, "CHAWARMA-L7ILWIN.html"), html);
console.log(
  `Built a self-contained site: ${path.join(output, "CHAWARMA-L7ILWIN.html")} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MiB). Local content works offline; Spotify listening and embeds need Internet access.`,
);
