import type { Metadata } from "next";
import { Suspense } from "react";
import { Disc3 } from "lucide-react";
import { MenuExperience } from "@/components/menu-experience";
import { Star } from "@/components/graphics";

export const metadata: Metadata = { title: "The Tracklist" };
export default function MenuPage() {
  return (
    <section className="section-width page-section">
      <div className="page-title menu-title">
        <div>
          <p className="eyebrow">
            <span />
            FRESHLY PRESSED. FRESHLY WRAPPED.
          </p>
          <h1>
            THE <span>TRACKLIST.</span>
          </h1>
          <p>
            Street heroes, sweet remixes, and the side tracks you came back for.
            <br />
            Find your flavor. Put it on repeat.
          </p>
        </div>
        <div className="menu-title-stamp">
          <Disc3 size={44} />
          <span>
            ALL HITS.
            <br />
            NO FILLER.
          </span>
          <Star size={22} />
        </div>
      </div>
      <Suspense
        fallback={<p className="loading-note">Cueing up the tracklist…</p>}
      >
        <MenuExperience />
      </Suspense>
    </section>
  );
}
