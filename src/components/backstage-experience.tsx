"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Download, Ticket } from "lucide-react";
import { events } from "@/data/content";
import { Star } from "./graphics";
import { Dialog } from "./ui";

export function EventPosters() {
  const [selected, setSelected] = useState<(typeof events)[number] | null>(
    null,
  );
  return (
    <>
      <div className="event-grid">
        {events.map((event, i) => (
          <button
            className={`event-poster bg-${event.color}`}
            key={event.id}
            onClick={() => setSelected(event)}
          >
            <div className="event-top">
              <span>L7ILWIN SESSIONS</span>
              <span>VOL. 0{i + 1}</span>
            </div>
            <span className="event-genre">{event.genre}</span>
            <h3 id={`event-title-${event.id}`}>{event.title}</h3>
            <div className="event-graphic" aria-hidden="true">
              {i === 0 ? (
                <svg viewBox="0 0 200 160">
                  <rect
                    x="80"
                    y="13"
                    width="43"
                    height="87"
                    rx="22"
                    fill="currentColor"
                  />
                  <path
                    d="M63 66v12a39 39 0 0 0 78 0V66m-39 51v33m-25 0h50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : i === 1 ? (
                <Star size={130} />
              ) : (
                <div className="poster-record" />
              )}
            </div>
            <div className="event-bottom">
              <div>
                <strong>
                  {event.day}
                  <small>{event.month}</small>
                </strong>
                <span>
                  {event.artist}
                  <br />
                  {event.time} / AGADIR CONCEPT VENUE
                </span>
              </div>
              <ArrowUpRight size={24} />
            </div>
            <span id={`event-concept-${event.id}`} className="event-concept">
              FICTIONAL CONCEPT EVENT · 2026
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <Dialog
          title={selected.title}
          onClose={() => setSelected(null)}
          className="event-dialog"
        >
          <div className={`event-dialog-content bg-${selected.color}`}>
            <p className="eyebrow">L7ILWIN SESSIONS / FICTIONAL EVENT</p>
            <h2>{selected.title}</h2>
            <p>{selected.copy}</p>
            <div className="event-details">
              <p>
                <strong>THE DATE</strong>
                {selected.date} · {selected.time}
              </p>
              <p>
                <strong>THE LINEUP</strong>
                {selected.artist}
              </p>
              <p>
                <strong>THE VENUE</strong>Our imaginary Agadir spot
              </p>
            </div>
            <p className="disclaimer">
              Concept demonstration only. No real event, ticket sales, booking,
              or admission is offered.
            </p>
            <button
              className="button button-ink"
              onClick={() => {
                setSelected(null);
                document.getElementById("backstage-pass")?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                });
              }}
            >
              MAKE A DEMO BACKSTAGE PASS <Ticket size={18} />
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}

export function PassGenerator() {
  const [nickname, setNickname] = useState("");
  const [passName, setPassName] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [downloading, setDownloading] = useState(false);
  function generate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clean = nickname.trim().replace(/\s+/g, " ");
    if (!clean) {
      setError("Give your backstage alter ego a nickname first.");
      return;
    }
    setPassName(clean);
    setError("");
    setStatus(
      `Your demo pass for ${clean} is ready. It grants imaginary access only.`,
    );
  }
  async function download() {
    setDownloading(true);
    try {
      await document.fonts.ready;
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 660;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is unavailable");
      ctx.fillStyle = "#FFD952";
      ctx.fillRect(0, 0, 1200, 660);
      ctx.strokeStyle = "#211D29";
      ctx.lineWidth = 3;
      ctx.strokeRect(22, 22, 1156, 616);
      ctx.fillStyle = "#211D29";
      ctx.fillRect(0, 0, 1200, 105);
      ctx.fillStyle = "#FFF2D9";
      ctx.font = '700 22px "DM Sans Variable", sans-serif';
      ctx.fillText("CHAWARMA L7ILWIN  /  THE GOOD VIBES CLUB", 48, 63);
      ctx.fillStyle = "#211D29";
      ctx.font = '110px "Bebas Neue", sans-serif';
      ctx.fillText("BACKSTAGE PASS.", 48, 235);
      ctx.font = '700 18px "DM Sans Variable", sans-serif';
      ctx.fillText("THE NAME ON THE LIST", 51, 302);
      let fontSize = 54;
      ctx.font = `700 ${fontSize}px "DM Sans Variable", "Noto Sans Arabic Variable", sans-serif`;
      const name = passName;
      while (fontSize > 24 && ctx.measureText(name).width > 870) {
        fontSize -= 1;
        ctx.font = `700 ${fontSize}px "DM Sans Variable", "Noto Sans Arabic Variable", sans-serif`;
      }
      ctx.fillText(name, 48, 375);
      ctx.font = '700 20px "DM Sans Variable", sans-serif';
      ctx.fillText(
        "GOOD FOOD. LOUD MUSIC. ALL ACCESS TO THE IMAGINATION.",
        51,
        452,
      );
      ctx.setLineDash([10, 9]);
      ctx.beginPath();
      ctx.moveTo(0, 507);
      ctx.lineTo(1200, 507);
      ctx.stroke();
      ctx.setLineDash([]);
      for (let i = 0; i < 75; i++) {
        ctx.fillStyle = "#211D29";
        ctx.fillRect(51 + i * 7, 542, (i % 3) + 1, 49);
      }
      ctx.font = '700 17px "DM Sans Variable", sans-serif';
      ctx.fillText("DEMO ONLY · NO REAL ACCESS OR BENEFITS", 660, 562);
      ctx.fillText("AGADIR CONCEPT VENUE / VOL. 01", 660, 590);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Could not create image"))),
          "image/png",
        ),
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "l7ilwin-backstage-pass.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(
        "Your PNG download is ready. This is a souvenir demo pass only.",
      );
    } catch {
      setStatus(
        "The image could not be downloaded in this browser. Your demo pass is still shown here.",
      );
    } finally {
      setDownloading(false);
    }
  }
  return (
    <div className="pass-generator" id="backstage-pass">
      <div className="pass-generator-copy">
        <p className="eyebrow">
          <Ticket size={18} />
          YOUR NAME. OUR IMAGINARY GUEST LIST.
        </p>
        <h2>
          YOU’RE
          <br />
          <span>WITH THE BAND.</span>
        </h2>
        <p>
          Pick an alter ego. Make your pass. Officially unofficial, absolutely
          personal.
        </p>
        <form onSubmit={generate}>
          <label htmlFor="nickname">YOUR BACKSTAGE NICKNAME</label>
          <div className="nickname-field">
            <input
              id="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError("");
              }}
              placeholder="e.g. DJ Extra Toum"
              maxLength={22}
              required
              aria-invalid={!!error}
              aria-describedby={error ? "nickname-error" : "nickname-hint"}
            />
            <span>{nickname.length}/22</span>
          </div>
          {error && (
            <p id="nickname-error" className="form-error">
              {error}
            </p>
          )}
          <p className="small-note" id="nickname-hint">
            Stays in your browser. No account, no data sent.
          </p>
          <button className="button button-ink" type="submit">
            {passName ? "REMIX MY PASS" : "MAKE MY DEMO PASS"}
            <ArrowUpRight size={18} />
          </button>
        </form>
      </div>
      <div className="pass-preview-wrap">
        <div className={`pass-preview ${passName ? "pass-generated" : ""}`}>
          <div className="pass-topline">
            L7ILWIN / THE GOOD VIBES CLUB
            <Star size={24} />
          </div>
          <div className="pass-body">
            <span className="eyebrow">AGADIR · CONCEPT VENUE</span>
            <h3>
              BACKSTAGE
              <br />
              PASS.
            </h3>
            <p>THE NAME ON THE LIST</p>
            <strong className="pass-name" dir="auto">
              {passName || "YOUR NAME HERE"}
            </strong>
            <div className="pass-bottomline">
              <span>
                GOOD FOOD.
                <br />
                LOUD MUSIC.
              </span>
              <span>
                VOL. 01
                <br />
                IMAGINARY ACCESS
              </span>
            </div>
          </div>
          <div className="pass-stub">
            <div className="barcode" aria-hidden="true" />
            <span>DEMO ONLY · NO REAL ACCESS</span>
          </div>
        </div>
        {passName && (
          <button
            className="download-pass"
            type="button"
            onClick={download}
            disabled={downloading}
          >
            <Download size={18} />
            {downloading ? "MAKING YOUR PNG…" : "DOWNLOAD YOUR PASS / PNG"}
          </button>
        )}
        <p className="pass-status" role="status">
          {status ||
            "A souvenir for your imagination. No real benefits or entry."}
        </p>
      </div>
    </div>
  );
}
