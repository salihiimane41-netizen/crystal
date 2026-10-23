"use client";

import { useState } from "react";
import Image from "@/components/site-image";
import Link from "next/link";
import { ArrowUpRight, Headphones } from "lucide-react";
import { moods } from "@/data/content";
import { imaginedVisits, type ImaginedVisit } from "@/data/imagined-visits";
import { Star } from "./graphics";
import { Dialog, Reveal } from "./ui";

function VisitImage({ visit }: { visit: ImaginedVisit }) {
  const editorial = visit.treatment === "editorial";
  return (
    <>
      <Image
        src={visit.image}
        alt={
          editorial
            ? `Original fictional restaurant background for a Justin Bieber name-led editorial poster. No person or likeness is depicted.`
            : `AI-generated imagined restaurant scene featuring ${visit.name}. Not a real visit or endorsement.`
        }
        fill
        sizes="(max-width: 760px) 90vw, 640px"
        style={{ objectPosition: visit.position }}
      />
      {editorial && (
        <div className="celebrity-editorial" aria-hidden="true">
          <span>THE IMAGINED GUEST LIST</span>
          <Star size={55} />
          <strong>
            JUSTIN
            <br />
            BIEBER.
          </strong>
          <small>
            NAME-LED EDITORIAL CONCEPT
            <br />
            NO LIKENESS DEPICTED
          </small>
        </div>
      )}
    </>
  );
}

export function ArtistWall() {
  const [selected, setSelected] = useState<ImaginedVisit | null>(null);
  return (
    <>
      <div className="artist-wall celebrity-wall">
        {imaginedVisits.map((visit, i) => (
          <Reveal
            key={visit.id}
            className={`celebrity-slot celebrity-slot-${i}`}
            delay={i * 0.06}
          >
            <button
              className={`artist-card artist-card-${i} celebrity-card`}
              onClick={() => setSelected(visit)}
            >
              <div className="artist-card-top">
                <span>CONCEPT ARCHIVE / {visit.archive}</span>
                <ArrowUpRight size={20} />
              </div>
              <div
                className={`artist-portrait celebrity-portrait bg-${visit.color}`}
              >
                <VisitImage visit={visit} />
                <span className="celebrity-photo-label">
                  {visit.treatment === "editorial"
                    ? "EDITORIAL CONCEPT · NO LIKENESS"
                    : "AI-GENERATED · IMAGINED VISIT"}
                </span>
                <span className="artist-reveal">
                  OPEN THE IMAGINED MOMENT
                  <ArrowUpRight size={17} />
                </span>
              </div>
              <div className="artist-card-bottom">
                <span className="celebrity-category">{visit.category}</span>
                <h2>{visit.name}</h2>
                <p className="celebrity-caption">{visit.caption}</p>
                <span className="fictional-tag">FICTIONAL BRAND CONCEPT</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <p className="celebrity-context">
        Five imagined moments. One fictional restaurant. Photographic scenes are
        AI-generated; the Justin Bieber card is a name-led editorial concept
        with no likeness. None records a real appearance, partnership, or
        endorsement.
      </p>
      {selected && (
        <Dialog
          title={`${selected.name} — imagined visit`}
          onClose={() => setSelected(null)}
          className="artist-dialog celebrity-dialog"
        >
          <div
            className={`artist-dialog-portrait celebrity-dialog-photo bg-${selected.color}`}
          >
            <VisitImage visit={selected} />
            <span className="fictional-tag">IMAGINED VISIT / AI CONCEPT</span>
          </div>
          <div className="dialog-copy">
            <p className="eyebrow">
              CONCEPT ARCHIVE {selected.archive} / {selected.category}
            </p>
            <h2>{selected.name}</h2>
            <p className="celebrity-detail-disclosure">
              IMAGINED STAR VISIT · FICTIONAL BRAND CONCEPT
            </p>
            <p>{selected.scene}</p>
            <p className="eyebrow imagined-order-label">THE IMAGINED ORDER</p>
            <h3 className="artist-favorite">{selected.favorite}</h3>
            <Link
              className="button button-red"
              href={`/menu?dish=${selected.dish}`}
            >
              EXPLORE THE FICTIONAL COMBO
              <ArrowUpRight size={18} />
            </Link>
            <Link
              className="text-link artist-mood"
              href={`/aux?mood=${selected.mood}`}
            >
              <Headphones size={17} />
              {moods.find((m) => m.id === selected.mood)?.name}
              <ArrowUpRight size={16} />
            </Link>
            <p className="small-note">
              The scene and food preference were invented for a school project.
              No quote, actual restaurant visit, collaboration, or endorsement
              is attributed to this person.
            </p>
          </div>
        </Dialog>
      )}
    </>
  );
}
