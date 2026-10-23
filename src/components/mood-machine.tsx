"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  Disc3,
  Headphones,
  Heart,
  RefreshCw,
  Sparkles,
  Volume2,
  Waves,
  Zap,
} from "lucide-react";
import { moods } from "@/data/content";
import { MoodArt, Vinyl } from "./graphics";
import { playlistState } from "@/lib/spotify";
import { SpotifyPlaylist } from "./spotify-playlist";

const icons = [Sparkles, Heart, Zap, Waves];

export function MoodMachine() {
  const params = useSearchParams();
  const [selected, setSelected] = useState("main");
  const [hasChosen, setHasChosen] = useState(false);
  useEffect(() => {
    const m = moods.find((m) => m.id === params.get("mood"));
    if (m) {
      setSelected(m.id);
      setHasChosen(true);
    }
  }, [params]);
  const mood = moods.find((m) => m.id === selected)!;
  const playlist = playlistState(mood.id);
  return (
    <div className="mood-machine">
      <div className="mood-picker">
        <p className="eyebrow">01 / PICK YOUR CURRENT FREQUENCY</p>
        <div
          className="mood-options"
          role="group"
          aria-label="Choose your mood"
        >
          {moods.map((m, i) => {
            const Icon = icons[i];
            return (
              <button
                key={m.id}
                aria-pressed={selected === m.id}
                className={`mood-option ${selected === m.id ? `selected bg-${m.color}` : ""}`}
                onClick={() => {
                  setSelected(m.id);
                  setHasChosen(true);
                }}
              >
                <span className="mood-option-icon">
                  <Icon size={24} />
                </span>
                <span>
                  <strong>{m.name}</strong>
                  <small>{m.short}</small>
                </span>
                <ArrowUpRight size={20} />
              </button>
            );
          })}
        </div>
        <div className="mood-picker-note">
          <Headphones size={22} />
          <p>
            There’s no wrong mood.
            <br />
            Only not enough garlic sauce.
          </p>
        </div>
      </div>
      <div className={`mood-result bg-${mood.color}`}>
        <div className="result-topline">
          <span>
            <i className="live-dot" />
            L7ILWIN SELECTS
          </span>
          <span>VOL. 0{moods.indexOf(mood) + 1}</span>
        </div>
        <div className="result-art" key={mood.id}>
          <div className="album-cover">
            <MoodArt mood={mood.id} />
            <span>{mood.title}</span>
          </div>
          <Vinyl color={`var(--${mood.color})`} />
        </div>
        <div className="result-copy" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">
            {hasChosen
              ? "YOUR MOOD. YOUR MIX."
              : "START WITH A LITTLE MAIN-CHARACTER ENERGY."}
          </span>
          <h2>{mood.title}</h2>
          <p className="result-genre">
            <Volume2 size={15} />
            {mood.genre}
            <span>{mood.bpm} BPM VIBE</span>
          </p>
          <div className="playlist-visual" aria-hidden="true">
            {Array.from({ length: 38 }, (_, i) => (
              <i key={i} style={{ height: `${10 + ((i * 17) % 29)}px` }} />
            ))}
          </div>
          <span className="playlist-demo-label">
            {playlist.status === "ready"
              ? "YOUR MOOD. A REAL SOUNDTRACK."
              : "MOOD ARTWORK · PLAYLIST NOT CONNECTED"}
          </span>
          <div className="food-match">
            <Disc3 size={27} />
            <div>
              <small>PAIRS PERFECTLY WITH</small>
              <Link href={`/menu?dish=${mood.item}`}>
                {mood.meal}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <p className="mood-description">{mood.description}</p>
          <SpotifyPlaylist key={mood.id} playlist={playlist} mood={mood.id} />
          <button
            className="try-mood"
            onClick={() => {
              const next = moods[(moods.indexOf(mood) + 1) % moods.length];
              setSelected(next.id);
              setHasChosen(true);
            }}
          >
            <RefreshCw size={15} />
            TRY ANOTHER MOOD
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
