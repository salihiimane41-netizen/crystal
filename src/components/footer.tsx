import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand, navigation } from "@/data/content";
import { Logo } from "./navigation";
import { Star } from "./graphics";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Logo footer />
          <p>
            Syrian soul. Agadir energy.
            <br />
            Your next favorite fictional hangout.
          </p>
          <span className="arabic" lang="ar" dir="rtl">
            {brand.arabicName}
          </span>
        </div>
        <div className="footer-links">
          <p className="eyebrow">STAY IN THE LOOP</p>
          {navigation.slice(1).map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
        <div className="footer-note">
          <Star size={64} />
          <h3>
            ONLY L7ILWIN
            <br />
            EAT HERE.
          </h3>
          <p>
            Food for the soul.
            <br />
            Music for the rest.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} CHAWARMA L7ILWIN · An English-class
          creative project.
        </p>
        <p>
          Fictional restaurant & events. Imagined star visits, not endorsements.
        </p>
      </div>
    </footer>
  );
}
