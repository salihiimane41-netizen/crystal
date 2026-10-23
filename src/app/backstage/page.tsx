import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EventPosters, PassGenerator } from "@/components/backstage-experience";
import { SectionHeading } from "@/components/ui";
import { Star } from "@/components/graphics";

export const metadata: Metadata = {
  title: "Backstage — Sessions & good vibes",
};
export default function BackstagePage() {
  return (
    <section className="section-width page-section backstage-page">
      <div className="page-title">
        <p className="eyebrow">
          <span />
          THE NIGHT DOESN’T END AT THE LAST SONG.
        </p>
        <h1>
          THE <span>BACKSTAGE.</span>
        </h1>
        <p>
          Small stage. Big energy. A whole world of fictional nights worth
          staying up for.
        </p>
      </div>
      <SectionHeading
        eyebrow="OUR IMAGINARY LIVE SERIES"
        title="L7ILWIN SESSIONS."
      >
        <span className="concept-label">
          ALL EVENTS ARE CONCEPT DEMONSTRATIONS
        </span>
      </SectionHeading>
      <EventPosters />
      <PassGenerator />
      <div className="secret-drop">
        <div>
          <p className="eyebrow">THE SECRET DROP / CONCEPT EDITION 001</p>
          <h2>
            THE AFTERPARTY
            <br />
            <span>HAS A FLAVOR.</span>
          </h2>
          <p>
            Meet the Atlas Afterparty: a fictional artist-edition wrap, made for
            the encore. Limited in the story. Always on our demo menu.
          </p>
          <Link className="button button-cream" href="/menu?dish=atlas-wrap">
            EXPLORE THE SECRET DROP
            <ArrowUpRight size={19} />
          </Link>
        </div>
        <Star size={200} />
        <span className="drop-sticker">
          FICTIONAL
          <br />
          COLLAB.
          <br />
          REAL FLAVOR
          <br />
          ENERGY.
        </span>
      </div>
    </section>
  );
}
