import configuration from "@/data/playlists.json";
import verifiedPlaylists from "@/data/playlist-verification.json";

export type PlaylistVerification = {
  url: string;
  title: string;
  checkedAt: string;
  provider: "Spotify";
};
export type PlaylistState = {
  status: "unconfigured" | "unverified" | "ready";
  url: string | null;
  title: string;
  embedUrl: string | null;
  checkedAt: string | null;
};

export function normalizeSpotifyPlaylist(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      url.hostname !== "open.spotify.com" ||
      url.username ||
      url.password ||
      url.port
    )
      return null;
    const match = url.pathname.match(
      /^\/(?:intl-[a-z]{2}\/)?playlist\/([a-zA-Z0-9]{22})\/?$/,
    );
    return match ? `https://open.spotify.com/playlist/${match[1]}` : null;
  } catch {
    return null;
  }
}

export function playlistState(mood: string): PlaylistState {
  const record = (configuration as Record<string, { url: string | null }>)[
    mood
  ];
  const url = normalizeSpotifyPlaylist(record?.url);
  const verification = (
    verifiedPlaylists as Record<string, PlaylistVerification>
  )[mood];
  if (!url)
    return {
      status: "unconfigured",
      url: null,
      title: "Playlist not connected",
      embedUrl: null,
      checkedAt: null,
    };
  const ready =
    verification?.url === url &&
    verification.provider === "Spotify" &&
    !!verification.title?.trim() &&
    Number.isFinite(Date.parse(verification.checkedAt));
  return {
    status: ready ? "ready" : "unverified",
    url,
    title: ready ? verification.title : "Playlist awaiting verification",
    embedUrl: ready
      ? `https://open.spotify.com/embed/playlist/${url.split("/").pop()}?utm_source=generator&theme=0`
      : null,
    checkedAt: ready ? verification.checkedAt : null,
  };
}
