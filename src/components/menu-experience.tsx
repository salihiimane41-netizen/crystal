"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Headphones, Search, X } from "lucide-react";
import { categories, menu, moods, type MenuItem } from "@/data/content";
import { Dialog } from "./ui";
import { MenuCard } from "./menu-card";
import { FoodArt, Star } from "./graphics";

export function MenuExperience() {
  const params = useSearchParams();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  useEffect(() => {
    const item = menu.find((i) => i.id === params.get("dish"));
    if (item) setSelected(item);
  }, [params]);
  const visible = menu.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      `${item.name} ${item.description}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const mood = moods.find((m) => m.id === selected?.mood);
  return (
    <>
      <div className="menu-controls">
        <div
          className="filter-scroll"
          role="group"
          aria-label="Filter menu by category"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              className={`filter-chip ${category === c.id ? "is-active" : ""}`}
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
              <span>
                {c.id === "all"
                  ? menu.length
                  : menu.filter((i) => i.category === c.id).length}
              </span>
            </button>
          ))}
        </div>
        <div className="menu-results-bar">
          <p role="status">
            {String(visible.length).padStart(2, "0")} TRACKS{" "}
            {category !== "all"
              ? ` / ${categories.find((c) => c.id === category)?.note.toUpperCase()}`
              : "/ ZERO SKIPS"}
          </p>
          <label className="search-field">
            <Search size={17} />
            <input
              aria-label="Search the menu"
              placeholder="Find your flavor…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="search-clear"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </div>
      <div className="menu-grid">
        {visible.map((item, i) => (
          <MenuCard
            key={item.id}
            item={item}
            index={i}
            onSelect={setSelected}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <Star size={60} />
          <h2>NO TRACKS FOUND.</h2>
          <p>Try another flavor. Your next favorite is in here somewhere.</p>
          <button
            className="button button-ink"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
          >
            RESET THE TRACKLIST
          </button>
        </div>
      )}
      <p className="disclaimer menu-disclaimer">
        All menu items and prices are fictional and editable. Illustrations and
        AI-generated photography show concept presentations, not actual dishes.
        Ingredients are demo recipes; allergen and dietary suitability have not
        been verified.
      </p>
      {selected && (
        <Dialog
          title={selected.name}
          onClose={() => setSelected(null)}
          className="food-dialog"
        >
          <div className={`dialog-food-art bg-${selected.color}`}>
            <span className="eyebrow">
              THE TRACKLIST /{" "}
              {categories.find((c) => c.id === selected.category)?.label}
            </span>
            <FoodArt art={selected.art} name={selected.name} />
          </div>
          <div className="dialog-copy">
            <p className="eyebrow">YOUR NEXT FAVORITE TRACK</p>
            <h2>{selected.name}</h2>
            <span className="detail-price">
              {selected.price}
              <small> DH</small>
            </span>
            <p>{selected.description}</p>
            <h3>IN THE MIX</h3>
            <div className="ingredient-list">
              {selected.ingredients.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="allergen-note">
              Concept recipe. Ingredients, cross-contact risks, and allergen
              suitability are unverified. This is not a dietary assurance.
            </p>
            <Link
              className="button button-blue"
              href={`/aux?mood=${selected.mood}`}
            >
              <Headphones size={18} />
              {mood?.name.toUpperCase()}
              <ArrowUpRight size={18} />
            </Link>
            <p className="small-note">
              Fictional menu · No orders or payments are taken.
            </p>
          </div>
        </Dialog>
      )}
    </>
  );
}
