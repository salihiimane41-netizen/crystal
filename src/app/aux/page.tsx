import type { Metadata } from "next";
import { Suspense } from "react";
import { Headphones } from "lucide-react";
import { MoodMachine } from "@/components/mood-machine";

export const metadata: Metadata = { title: "The Aux — Find your soundtrack" };
export default function AuxPage() {
  return (
    <section className="section-width page-section aux-page">
      <div className="page-title aux-title">
        <p className="eyebrow">
          <Headphones size={17} />
          THE SHAWARMA SOUNDTRACK MACHINE
        </p>
        <h1>
          WHAT DOES YOUR
          <br />
          HUNGER <span>SOUND LIKE?</span>
        </h1>
        <p>
          Tell us your mood. We’ll match your shawarma with your soundtrack.
        </p>
      </div>
      <Suspense
        fallback={<p className="loading-note">Finding your frequency…</p>}
      >
        <MoodMachine />
      </Suspense>
      <p className="disclaimer">
        An independent food-and-music concept. Connected playlists use Spotify’s
        official player and links; unconfigured moods are labeled. Spotify needs
        an Internet connection, and sign-in or playback limits may apply. No
        autoplay or artist endorsements.
      </p>
    </section>
  );
}
