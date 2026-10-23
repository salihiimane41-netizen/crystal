import type { Metadata } from "next";
import "@fontsource/bebas-neue/latin-400.css";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/noto-sans-arabic";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://l7ilwin.example")
      .origin,
  ),
  title: {
    default: "CHAWARMA L7ILWIN — Good food. Loud music.",
    template: "%s — CHAWARMA L7ILWIN",
  },
  description:
    "Syrian soul. Agadir energy. Explore a fictional street-food and music culture brand, discover your flavor, and find your soundtrack.",
  openGraph: {
    title: "CHAWARMA L7ILWIN",
    description: "GOOD FOOD. LOUD MUSIC. A fictional food × music concept.",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/shawarma.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
