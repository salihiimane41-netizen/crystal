import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Star } from "@/components/graphics";

export default function NotFound() {
  return (
    <section className="not-found section-width">
      <Star size={80} />
      <p className="eyebrow">404 / THAT TRACK ISN’T ON THE ALBUM.</p>
      <h1>
        LOST IN
        <br />
        <span>THE SAUCE?</span>
      </h1>
      <p>The good stuff is still here. Let’s get you back to the main stage.</p>
      <Link className="button button-red" href="/">
        BACK TO THE GOOD VIBES
        <ArrowUpRight size={20} />
      </Link>
    </section>
  );
}
