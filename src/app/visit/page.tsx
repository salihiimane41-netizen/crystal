import type { Metadata } from "next";
import Image from "@/components/site-image";
import { Clock3, Mail, MapPin } from "lucide-react";
import { brand } from "@/data/content";
import { VisitForm, ConceptMap } from "@/components/visit-experience";
import { Star } from "@/components/graphics";

export const metadata: Metadata = {
  title: "Visit — The imaginary Agadir spot",
};
export default function VisitPage() {
  return (
    <section className="section-width page-section visit-page">
      <div className="page-title">
        <p className="eyebrow">
          <MapPin size={16} />
          AGADIR, MOROCCO / IN OUR IMAGINATION
        </p>
        <h1>
          YOUR PEOPLE.
          <br />
          <span>YOUR SPOT.</span>
        </h1>
        <p>
          Follow the music. Stay for the last bite.
          <br />
          Our fictional corner of Agadir is always happy to see you.
        </p>
      </div>
      <div className="venue-hero">
        <Image
          src="/images/venue.png"
          alt="AI-generated concept interior: red tiles, yellow tables, and a vinyl corner in an imaginary Syrian street-food café"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 1200px"
        />
        <span className="venue-photo-label">
          AI-GENERATED CONCEPT INTERIOR · NOT AN OPERATING VENUE
        </span>
        <div className="venue-sticker">
          <Star size={37} />
          <span>
            COME AS
            <br />
            YOU ARE.
          </span>
        </div>
      </div>
      <div className="visit-grid">
        <div className="visit-info">
          <p className="eyebrow">STRAIGHT FROM DAMASCUS. MADE FOR AGADIR.</p>
          <h2>
            A LITTLE CORNER.
            <br />A WHOLE <span>VIBE.</span>
          </h2>
          <p>
            Imagine red tiles, warm flatbread, a record spinning in the corner,
            and friends who order “one more side” three times. That’s our kind
            of place.
          </p>
          <div className="info-block">
            <MapPin size={23} />
            <div>
              <h3>THE LOCATION / FICTIONAL</h3>
              <p>{brand.location}</p>
              <small>No real street address or map pin is provided.</small>
            </div>
          </div>
          <div className="info-block">
            <Clock3 size={23} />
            <div>
              <h3>SAMPLE OPENING HOURS</h3>
              <dl className="hours-list">
                {brand.hours.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
              <small>
                Illustrative hours only. The restaurant does not operate.
              </small>
            </div>
          </div>
          <div className="info-block">
            <Mail size={23} />
            <div>
              <h3>DEMO CONTACT</h3>
              <p>{brand.contact}</p>
              <small>Reserved example address. Not a working inbox.</small>
            </div>
          </div>
          <ConceptMap />
        </div>
        <VisitForm />
      </div>
      <div className="venue-gallery">
        <figure>
          <Image
            src="/images/venue.png"
            width={1536}
            height={1024}
            alt="Concept interior: a warm, colorful listening café"
            sizes="(max-width: 600px) 100vw, 50vw"
          />
          <figcaption>01 / A SEAT FOR THE WHOLE GROUP CHAT</figcaption>
        </figure>
        <figure>
          <Image
            src="/images/feast.png"
            width={1536}
            height={1024}
            alt="AI-generated concept food spread with mezze and fresh manakish"
            sizes="(max-width: 600px) 100vw, 50vw"
          />
          <figcaption>02 / A TABLE THAT HITS ALL THE RIGHT NOTES</figcaption>
        </figure>
      </div>
      <p className="disclaimer">
        A fictional venue created for an English class. All photography is
        AI-generated concept imagery. No real business, address, restaurant
        service, or booking is represented.
      </p>
    </section>
  );
}
