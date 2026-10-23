import Link from "next/link";
import Image from "@/components/site-image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Disc3,
  Headphones,
  MapPin,
} from "lucide-react";
import { menu, brand } from "@/data/content";
import { ArrowDoodle, MoodArt, Star, Vinyl } from "@/components/graphics";
import { Reveal, SectionHeading } from "@/components/ui";
import { MenuCard } from "@/components/menu-card";

export default function Home() {
  return (
    <>
      <section className="hero section-width">
        <div className="hero-top">
          <p className="eyebrow">
            <span className="live-dot" />
            SYRIAN SOUL. AGADIR ENERGY.
          </p>
          <span className="concept-label">
            A FICTIONAL FOOD × MUSIC CONCEPT
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              GOOD FOOD.
              <br />
              <span>LOUD MUSIC.</span>
            </h1>
            <p className="hero-description">
              Your favorite artist’s <br />
              favorite shawarma spot.
            </p>
            <p className="hero-subtext">
              Straight from Damascus, made for Agadir.
              <br />
              Come hungry. Leave with a new favorite track.
            </p>
            <div className="hero-actions">
              <Link className="button button-red" href="/menu">
                EXPLORE THE MENU <ArrowUpRight size={20} />
              </Link>
              <Link className="text-link" href="/aux">
                <Headphones size={19} />
                FIND YOUR SOUNDTRACK
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-location">
              <MapPin size={14} />
              <span>AGADIR, MOROCCO</span>
              <i />
              <span>SYRIAN STREET FOOD. REIMAGINED.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-sun" />
            <div className="hero-orbit" />
            <div className="hero-arabic arabic" lang="ar" dir="rtl">
              {brand.arabicName}
            </div>
            <span className="hero-handwritten">wrap stars only.</span>
            <ArrowDoodle className="hero-doodle" />
            <Image
              className="hero-food"
              src="/images/shawarma.png"
              width={1199}
              height={1312}
              alt="Golden Syrian chicken shawarma with garlic toum and pickles; AI-generated concept photograph"
              priority
              sizes="(max-width: 760px) 90vw, 52vw"
            />
            <div className="hero-sticker">
              <span>
                100%
                <br />
                GOOD VIBES
              </span>
              <svg viewBox="0 0 60 32" fill="none" aria-hidden="true">
                <path
                  d="M10 3v7M50 3v7M10 18q20 23 40 0"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Star className="hero-star" size={52} />
            <span className="hero-vertical">EXTRA TOUM. EXTRA CONFIDENCE.</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>NOT YOUR AVERAGE SHAWARMA JOINT.</span>
          <a href="#greatest-hits" className="scroll-link">
            SCROLL FOR THE GOOD STUFF <ArrowDown size={16} />
          </a>
          <span className="hero-edition">VOL. 01 — THE AGADIR EDITION</span>
        </div>
      </section>
      <div
        className="marquee"
        role="img"
        aria-label="Good food. Loud music. Extra toum. No skips. Just bites."
      >
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              GOOD FOOD <Star size={25} /> LOUD MUSIC <Star size={25} /> EXTRA
              TOUM <Star size={25} /> NO SKIPS. JUST BITES. <Star size={25} />
            </span>
          ))}
        </div>
      </div>
      <section
        id="greatest-hits"
        className="section-width section-pad hits-section"
      >
        <Reveal>
          <SectionHeading eyebrow="THE GREATEST HITS" title="ALWAYS ON REPEAT.">
            <Link className="text-link" href="/menu">
              THE FULL TRACKLIST <ArrowUpRight size={20} />
            </Link>
          </SectionHeading>
        </Reveal>
        <div className="hits-grid">
          {[menu[0], menu[3], menu[5]].map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <MenuCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="menu-footnote">
          <Disc3 size={17} />
          <p>Made with Syrian soul. Served with a side of personality.</p>
          <span>FICTIONAL MENU · REAL GOOD TASTE</span>
        </div>
      </section>
      <section className="culture-section">
        <div className="section-width culture-grid">
          <Reveal className="culture-collage">
            <span className="tape tape-one" />
            <div className="polaroid polaroid-one">
              <div className="bg-yellow">
                <Image
                  src="/images/imagined-visits/nancy-ajram-imagined-visit.png"
                  width={1086}
                  height={1448}
                  alt="AI-generated imagined Nancy Ajram visit. No real appearance or endorsement."
                  sizes="250px"
                />
              </div>
              <span>Nancy / an imagined moment</span>
            </div>
            <div className="polaroid polaroid-two">
              <div className="bg-pink">
                <Image
                  src="/images/imagined-visits/charles-leclerc-imagined-visit.png"
                  width={1086}
                  height={1448}
                  alt="AI-generated imagined Charles Leclerc visit beside a fictional chef. No real appearance or endorsement."
                  sizes="250px"
                />
              </div>
              <span>Charles / an imagined pit stop</span>
            </div>
            <div className="collage-note">
              IMAGINED STAR VISITS.
              <br />
              FICTIONAL BRAND CONCEPT.
            </div>
            <Star className="collage-star" size={75} />
          </Reveal>
          <Reveal className="culture-copy">
            <p className="eyebrow">
              <span />
              MORE THAN A FOOD SPOT
            </p>
            <h2>
              WHERE THE
              <br />
              AFTERPARTY
              <br />
              <span>GETS HUNGRY.</span>
            </h2>
            <p>
              Some places have a guest list. We have a shawarma list. Meet the
              imagined star visits, original characters, and creative moments
              that make up our fictional world.
            </p>
            <Link className="button button-cream" href="/artists">
              MEET THE WRAP STARS <ArrowUpRight size={20} />
            </Link>
            <span className="small-note">
              AI-generated concepts. No actual celebrity visits or endorsements.
            </span>
          </Reveal>
        </div>
      </section>
      <section className="aux-teaser section-width section-pad">
        <Reveal className="aux-teaser-copy">
          <p className="eyebrow">
            <span />
            YOU BRING THE MOOD. WE BRING THE MENU.
          </p>
          <h2>
            WHAT DOES YOUR
            <br />
            HUNGER <span>SOUND LIKE?</span>
          </h2>
          <p>
            A little heartbroken? Main-character energy?
            <br />
            There’s a wrap for that. And a whole soundtrack.
          </p>
          <Link href="/aux" className="button button-blue">
            FIND MY SOUNDTRACK <Headphones size={20} />
          </Link>
        </Reveal>
        <Reveal className="aux-teaser-art">
          <div className="mini-album">
            <span>L7ILWIN SELECTS / VOL. 01</span>
            <MoodArt mood="main" />
            <strong>MAIN CHARACTER MIX</strong>
            <span>CONFIDENT POP / HIP-HOP</span>
          </div>
          <Vinyl />
          <div className="aux-teaser-sticker">
            <Headphones size={25} />
            <span>
              YOUR MOOD.
              <br />
              YOUR MIX.
            </span>
          </div>
        </Reveal>
      </section>
      <section className="home-final">
        <div className="section-width">
          <p className="eyebrow">THE GROUP CHAT HAS A NEW PLAN.</p>
          <h2>
            GOOD COMPANY.
            <br />
            EVEN BETTER <span>SHAWARMA.</span>
          </h2>
          <Link href="/visit" className="button button-ink">
            DISCOVER THE SPOT <ArrowUpRight size={20} />
          </Link>
          <span className="arabic" lang="ar" dir="rtl">
            أهلاً بالحلوين
          </span>
        </div>
      </section>
    </>
  );
}
