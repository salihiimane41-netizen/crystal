# Connect the four mood playlists

The interface supports official Spotify embeds, direct links, downloadable QR codes, and mood-based switching. **No live playlists are connected yet.** During implementation, the cloud HTTPS proxy denied access to `open.spotify.com` with CONNECT 403. No playlist IDs have been guessed or shipped as working content.

## Configure and verify

1. Find four public playlists in Spotify. Choose upbeat pop/hip-hop for `main`, Arabic heartbreak for `heart`, high-energy Moroccan rap/dance for `chaotic`, and relaxed Arabic indie/lo-fi for `chill`.
2. In `src/data/playlists.json`, replace each `url: null` with the playlist's official `https://open.spotify.com/playlist/...` share link. Query tracking parameters and Spotify locale prefixes are normalized away.
3. Ensure the machine can reach `open.spotify.com`. The cloud environment draft has an additive network change for that hostname. Review and save the change in environment settings, then publish the environment configuration. This step controls cloud access, rather than website publication.
4. Run `npm run verify:spotify`. This uses Spotify's public oEmbed endpoint, checks the returned provider, playlist title, and matching official embed ID, then saves successful results to `src/data/playlist-verification.json`. HTTPS verification remains enabled, and curl uses the configured proxy and certificate trust. No Spotify API key is needed.
5. A complete successful check exits 0. Unconfigured or failed playlists produce exit 1 and remain visibly unavailable. Successful entries from a partial run can be used; failed or changed entries do not retain stale verification records.
6. Rebuild with `npm run build`, then restart the site with `npm start`. For the standalone edition, also run `npm run build:offline` after verification. QR destinations and iframe sources derive from the same normalized URL that was verified.

Treat `playlist-verification.json` as output from the verification command. Do not hand-author verification successes. Changing a playlist URL makes the old verification invalid until the new URL has passed the check.

## Professor presentation checklist

- Confirm all four mood entries say “VERIFIED PUBLIC SPOTIFY PLAYLIST.”
- Select each mood and scan its code with your phone's camera. A standard QR scanner is sufficient; the Spotify app is optional for opening the link.
- Confirm the playlist name in Spotify matches the page.
- Use “Open in Spotify” as an alternative to scanning.
- Use “Load Spotify player” for the optional official embed. The iframe loads only after that click. Audio never autoplays.
- Bring an Internet connection. Spotify may require sign-in, may limit previews, and may restrict playback by region, device, or account. Full tracks are not guaranteed inside an embed.
- Test on the laptop and phone you plan to use, with the intended Spotify account. The cloud proxy's verification is not a substitute for this live playback check.

## What was tested

The automated integration test injects explicitly synthetic playlist fixtures into an isolated browser bundle; it does not alter production configuration. It switches all four real mood controls, checks direct links and official embed URL construction, verifies click-to-load behavior and no autoplay permission, and independently decodes rendered and downloaded QR images using ZXing. It also decodes the QR at mobile size. These checks establish local integration behavior, not live Spotify availability.

The production configuration intentionally contains no QR code, player, or listening button for an unconfigured/unverified playlist. Menu recommendations and all other mood interactions still work.
