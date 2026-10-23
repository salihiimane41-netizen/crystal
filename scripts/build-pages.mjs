import { spawnSync } from "node:child_process";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const repository =
  process.env.GITHUB_REPOSITORY || "salihiimane41-netizen/crystal";
const [owner, name] = repository.split("/");
if (!owner || !name || repository.split("/").length !== 2) {
  throw new Error("GITHUB_REPOSITORY must have the form owner/repository.");
}
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${name}`);
if (basePath && !/^\/[A-Za-z0-9._-]+$/.test(basePath)) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or /repository-name.");
}
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${owner}.github.io${basePath}/`;

console.log(`Building the complete static site for ${siteUrl}`);
const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_BASE_PATH: basePath,
      NEXT_PUBLIC_SITE_URL: siteUrl,
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

// Keep the ready-to-publish files in /docs, GitHub Pages' supported subfolder.
const docs = path.join(root, "docs");
await rm(docs, { recursive: true, force: true });
await mkdir(docs, { recursive: true });
await cp(path.join(root, "out"), docs, { recursive: true });
await writeFile(path.join(docs, ".nojekyll"), "");
console.log(`Ready: docs/ contains HTML, CSS, JavaScript, fonts, and images.`);
console.log(`GitHub Pages: select branch github-pages and folder /docs.`);
