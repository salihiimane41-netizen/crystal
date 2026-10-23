import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { usePathname } from "./offline-router";
import { Navigation } from "../src/components/navigation";
import { Footer } from "../src/components/footer";
import Home from "../src/app/page";
import Menu from "../src/app/menu/page";
import Aux from "../src/app/aux/page";
import Artists from "../src/app/artists/page";
import Backstage from "../src/app/backstage/page";
import Visit from "../src/app/visit/page";
import NotFound from "../src/app/not-found";

const pages = {
  "/": Home,
  "/menu": Menu,
  "/aux": Aux,
  "/artists": Artists,
  "/backstage": Backstage,
  "/visit": Visit,
};
const titles = {
  "/": "Good food. Loud music.",
  "/menu": "The Tracklist",
  "/aux": "The Aux",
  "/artists": "Wall of Fame",
  "/backstage": "Backstage",
  "/visit": "Visit",
};

function App() {
  const path = usePathname();
  const Page = pages[path] || NotFound;
  useEffect(() => {
    document.title = `${titles[path] || "Lost in the sauce?"} — CHAWARMA L7ILWIN`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Page key={path} />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("app")).render(<App />);
