"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { brand, navigation } from "@/data/content";
import { Star } from "./graphics";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo ${footer ? "footer-logo" : ""}`}
      aria-label={`${brand.name} home`}
    >
      <Star size={44} />
      <span>
        <span className="logo-top">CHAWARMA</span>{" "}
        <span className="logo-bottom">
          L7ILWIN
          <span className="logo-dot" aria-hidden="true">
            ®
          </span>
        </span>
      </span>
    </Link>
  );
}

export function Navigation() {
  const currentPath = usePathname() || "/";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const withoutBase =
    basePath &&
    (currentPath === basePath || currentPath.startsWith(`${basePath}/`))
      ? currentPath.slice(basePath.length)
      : currentPath;
  const pathname = withoutBase.replace(/\/+$/, "") || "/";
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="button button-ink nav-cta" href="/aux">
            FIND YOUR VIBE <ArrowUpRight size={17} />
          </Link>
          <button
            ref={toggle}
            className="icon-button mobile-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {navigation.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span>0{i + 1}</span>
                {item.label}
                <ArrowUpRight size={24} />
              </Link>
            ))}
            <p>A little Syrian soul. A lot of Agadir.</p>
          </nav>
        )}
      </header>
    </>
  );
}
