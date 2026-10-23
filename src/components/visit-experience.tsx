"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";

export function VisitForm() {
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const today = new Date().toLocaleDateString("en-CA");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name")).trim();
    if (!name) {
      setError("Add a nickname so we can put you on the imaginary list.");
      return;
    }
    if (date < today) {
      setError("Pick today or a future date for your demo visit.");
      return;
    }
    setError("");
    const displayDate = new Date(`${date}T12:00:00`).toLocaleDateString(
      "en-GB",
      { day: "numeric", month: "long", year: "numeric" },
    );
    setConfirmation(
      `${name}, your imaginary table for ${data.get("guests")} on ${displayDate} at ${data.get("time")} is pictured. Nothing was booked or sent.`,
    );
  }
  return (
    <div className="visit-form-panel">
      <p className="eyebrow">THE IMAGINARY GUEST LIST</p>
      <h2>
        SAVE YOU
        <br />
        <span>A SEAT?</span>
      </h2>
      <p>
        Rehearse your next great night out. This is a local demo, not a real
        reservation.
      </p>
      {confirmation ? (
        <div className="demo-confirmation" role="status">
          <span className="confirmation-icon">
            <Check size={30} />
          </span>
          <h3>GOOD VIBES, IMAGINED.</h3>
          <p>{confirmation}</p>
          <button
            className="text-link"
            onClick={() => {
              setConfirmation("");
              setDate("");
            }}
          >
            <RotateCcw size={16} />
            TRY ANOTHER DEMO VISIT
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div className="form-row">
            <label>
              Your nickname
              <input
                name="name"
                required
                maxLength={40}
                placeholder="The name on the list"
                autoComplete="off"
              />
            </label>
            <label>
              Your crew
              <select name="guests" defaultValue="2">
                <option value="1">Just me</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
                <option value="6">6 people</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Your imaginary date
              <input
                type="date"
                name="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label>
              The time
              <select name="time" defaultValue="19:00">
                <option>14:00</option>
                <option>16:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
              </select>
            </label>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button button-red" type="submit">
            SIMULATE MY VISIT
            <ArrowUpRight size={18} />
          </button>
          <p className="small-note">
            Demo only. No reservation is submitted. Nothing leaves your browser.
          </p>
        </form>
      )}
    </div>
  );
}

export function ConceptMap() {
  return (
    <svg
      className="concept-map"
      viewBox="0 0 600 400"
      role="img"
      aria-label="Illustrated concept map of a fictional Agadir venue. This is not a real address or navigable map."
    >
      <rect width="600" height="400" fill="#E7DFC6" />
      <path d="M0 0h180q110 120 8 220T40 400H0" fill="#82AFC0" />
      <path
        d="M182 0q110 120 8 220T40 400"
        fill="none"
        stroke="#FFF2D9"
        strokeWidth="30"
      />
      <path
        d="m233 0 23 400M600 60 199 186m401 74-420 76M379 0l-58 400M514 0l-8 400"
        stroke="#FFF2D9"
        strokeWidth="19"
      />
      <path
        d="m264 107 65-22-9 74-52 18ZM382 68l101-30-2 99-112 36Zm-113 103 50-16-11 110-33 11Zm98 17 114-36-3 105-120 21Zm-6 105 117-22-3 80-130 18Z"
        fill="#A8DB9B"
      />
      <path
        d="M365 130a35 35 0 0 1 70 0c0 28-35 63-35 63s-35-35-35-63"
        fill="#F34E37"
        stroke="#211D29"
        strokeWidth="3"
      />
      <circle cx="400" cy="128" r="11" fill="#FFF2D9" />
      <text
        x="370"
        y="225"
        fill="#211D29"
        fontSize="20"
        fontFamily="var(--font-display)"
      >
        SOMEWHERE IN AGADIR
      </text>
      <text
        x="28"
        y="209"
        fill="#FFF2D9"
        fontSize="14"
        fontFamily="var(--font-body)"
        transform="rotate(-65 28 209)"
      >
        ATLANTIC ENERGY
      </text>
      <rect x="19" y="352" width="291" height="30" rx="15" fill="#211D29" />
      <text
        x="34"
        y="372"
        fill="#FFF2D9"
        fontSize="11"
        fontFamily="var(--font-body)"
      >
        FICTIONAL LOCATION · ILLUSTRATION ONLY
      </text>
    </svg>
  );
}
