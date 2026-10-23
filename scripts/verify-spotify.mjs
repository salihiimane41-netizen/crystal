import { readFile, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(
  await readFile(path.join(root, "src/data/playlists.json"), "utf8"),
);
const records = {};
let incomplete = false;
for (const mood of ["main", "heart", "chaotic", "chill"]) {
  const value = config[mood]?.url;
  if (!value) {
    console.log(
      `${mood}: UNCONFIGURED — paste a public Spotify playlist URL into src/data/playlists.json`,
    );
    incomplete = true;
    continue;
  }
  try {
    const url = new URL(value);
    const match = url.pathname.match(
      /^\/(?:intl-[a-z]{2}\/)?playlist\/([A-Za-z0-9]{22})\/?$/,
    );
    if (
      url.protocol !== "https:" ||
      url.hostname !== "open.spotify.com" ||
      url.port ||
      url.username ||
      url.password ||
      !match
    )
      throw new Error("Expected an official HTTPS Spotify playlist URL.");
    const canonical = `https://open.spotify.com/playlist/${match[1]}`;
    // curl preserves the cloud's configured HTTPS proxy and CA trust.
    const { stdout } = await run(
      "curl",
      [
        "--fail-with-body",
        "--silent",
        "--show-error",
        "--connect-timeout",
        "15",
        "--max-time",
        "30",
        `https://open.spotify.com/oembed?url=${encodeURIComponent(canonical)}`,
      ],
      { maxBuffer: 1024 * 1024 },
    );
    const data = JSON.parse(stdout);
    if (
      data.provider_name !== "Spotify" ||
      typeof data.title !== "string" ||
      !data.title.trim() ||
      !String(data.html).includes(`/embed/playlist/${match[1]}`)
    )
      throw new Error(
        "Spotify did not confirm this public playlist and embed.",
      );
    records[mood] = {
      url: canonical,
      title: data.title,
      provider: "Spotify",
      checkedAt: new Date().toISOString(),
    };
    console.log(`${mood}: VERIFIED — ${data.title}`);
  } catch (error) {
    incomplete = true;
    console.error(`${mood}: NOT VERIFIED — ${error.message}`);
  }
}
// Remove stale successes when the configured URL fails verification or changes.
await writeFile(
  path.join(root, "src/data/playlist-verification.json"),
  JSON.stringify(records, null, 2) + "\n",
);
if (incomplete) process.exitCode = 1;
