"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import type { MenuItem } from "@/data/content";
import { FoodArt } from "./graphics";

export function MenuCard({
  item,
  index = 0,
  onSelect,
}: {
  item: MenuItem;
  index?: number;
  onSelect?: (item: MenuItem) => void;
}) {
  const content = (
    <>
      <div className={`menu-card-art bg-${item.color}`}>
        <span className="track-number">
          SIDE A / TRACK {String(index + 1).padStart(2, "0")}
        </span>
        {item.tag && <span className="food-tag">{item.tag}</span>}
        <FoodArt art={item.art} name={item.name} />
        <span className="card-round-arrow">
          <ArrowUpRight size={25} />
        </span>
      </div>
      <div className="menu-card-copy">
        <div>
          <h3 id={`dish-title-${item.id}`}>{item.name}</h3>
          <span id={`dish-price-${item.id}`} className="price">
            {item.price} <small>DH</small>
          </span>
        </div>
        <p id={`dish-description-${item.id}`}>
          {item.description.split(".")[0]}.
        </p>
        <span className="card-detail-label">
          MEET YOUR NEXT FAVORITE <Plus size={14} />
        </span>
      </div>
    </>
  );
  return onSelect ? (
    <button className="menu-card" onClick={() => onSelect(item)}>
      {content}
    </button>
  ) : (
    <Link className="menu-card" href={`/menu?dish=${item.id}`}>
      {content}
    </Link>
  );
}
