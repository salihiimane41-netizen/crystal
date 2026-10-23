"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowUpRight,
  Check,
  Download,
  Headphones,
  Play,
  X,
} from "lucide-react";
import type { PlaylistState } from "@/lib/spotify";

export function SpotifyPlaylist({
  playlist,
  mood,
}: {
  playlist: PlaylistState;
  mood: string;
}) {
  const [qr, setQr] = useState<{ url: string; src: string } | null>(null);
  const [qrError, setQrError] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setPlayerOpen(false);
    setQrError(false);
    if (playlist.status === "ready" && playlist.url) {
      QRCode.toDataURL(playlist.url, {
        width: 240,
        margin: 4,
        errorCorrectionLevel: "M",
        color: { dark: "#211D29", light: "#FFFFFF" },
      })
        .then((src) => {
          if (!cancelled) setQr({ url: playlist.url!, src });
        })
        .catch(() => {
          if (!cancelled) setQrError(true);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [playlist.status, playlist.url]);

  if (playlist.status !== "ready" || !playlist.url)
    return (
      <div className="spotify-unconfigured" role="status">
        <Headphones size={23} />
        <div>
          <strong>
            {playlist.status === "unverified"
              ? "Playlist awaiting verification"
              : "This mood needs a playlist"}
          </strong>
          <p>
            {playlist.status === "unverified"
              ? "A link has been added. Listening and scanning unlock after it has been checked."
              : "A public Spotify playlist hasn’t been connected to this mood yet."}
          </p>
          <span>NOT READY FOR LIVE PLAYBACK</span>
        </div>
      </div>
    );

  const currentQr = qr?.url === playlist.url ? qr.src : null;
  return (
    <section
      className="spotify-integration"
      aria-label={`Spotify playlist for ${mood}`}
    >
      <div className="spotify-live-label">
        <Check size={13} />
        <span>VERIFIED PUBLIC SPOTIFY PLAYLIST</span>
      </div>
      <h3 className="spotify-playlist-title">{playlist.title}</h3>
      <div className="spotify-listen-grid">
        <div className="spotify-qr-wrap">
          {currentQr ? (
            <img
              className="spotify-qr"
              src={currentQr}
              width={192}
              height={192}
              alt={`Scan to open ${playlist.title} on Spotify`}
            />
          ) : (
            <div className="spotify-qr-pending" role="status">
              {qrError
                ? "QR unavailable. Use the Spotify link."
                : "Preparing your code…"}
            </div>
          )}
          <span>SCAN TO LISTEN.</span>
        </div>
        <div className="spotify-listen-actions">
          <p>
            Point your phone’s camera at the code. Your soundtrack opens in
            Spotify.
          </p>
          <a
            className="button button-ink"
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            OPEN IN SPOTIFY
            <ArrowUpRight size={17} />
          </a>
          <button
            className="spotify-embed-toggle"
            aria-expanded={playerOpen}
            onClick={() => setPlayerOpen(!playerOpen)}
          >
            {playerOpen ? <X size={15} /> : <Play size={15} />}{" "}
            {playerOpen ? "CLOSE PLAYER" : "LOAD SPOTIFY PLAYER"}
          </button>
          {currentQr && (
            <a
              className="spotify-qr-download"
              href={currentQr}
              download={`l7ilwin-${mood}-spotify-qr.png`}
            >
              <Download size={13} />
              SAVE QR CODE
            </a>
          )}
        </div>
      </div>
      {playerOpen && playlist.embedUrl && (
        <div className="spotify-embed">
          <iframe
            key={playlist.embedUrl}
            src={playlist.embedUrl}
            title={`Spotify player: ${playlist.title}`}
            width="100%"
            height="352"
            allow="encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <p>Player not loading? Use “Open in Spotify” or scan the code.</p>
        </div>
      )}
      <p className="spotify-playback-note">
        An Internet connection is needed for Spotify. Sign-in and playback
        limits may apply; full-track playback isn’t guaranteed here. No
        autoplay.
      </p>
    </section>
  );
}
