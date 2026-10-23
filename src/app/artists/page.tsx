import type { Metadata } from "next";
import { ArtistWall } from "@/components/artist-wall";
import { Star } from "@/components/graphics";

export const metadata: Metadata = {
  title: "Wall of Fame — Meet the wrap stars",
};
export default function ArtistsPage() {
  return (
    <section className="section-width page-section artists-page">
      <div className="page-title artists-title">
        <div>
          <p className="eyebrow">
            <span />
            REAL STARS. IMAGINED MOMENTS.
          </p>
          <h1>
            THE L7ILWIN
            <br />
            <span>HALL OF FAME.</span>
          </h1>
          <p>A photo wall from our imagination. Same spot. Five star turns.</p>
        </div>
        <div className="artist-title-note">
          <Star size={70} />
          <span>
            Every legend
            <br />
            has a go-to order.
          </span>
        </div>
      </div>
      <div className="fiction-banner">
        <span>IMAGINED STAR VISITS · FICTIONAL BRAND CONCEPT</span>
        <p>
          AI-generated scenes and a name-led editorial concept. No real visits,
          celebrity quotes, collaborations, or endorsements.
        </p>
      </div>
      <ArtistWall />
    </section>
  );
}
