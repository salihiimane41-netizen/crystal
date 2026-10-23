import Image from "@/components/site-image";

export function Star({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m50 0 9 30L85 8l-8 33 23 9-30 9 22 26-33-8L50 100l-9-30L15 92l8-33L0 50l30-9L8 15l33 8Z" />
    </svg>
  );
}

export function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="105"
      height="70"
      viewBox="0 0 105 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 9c57-18 88 17 77 42M65 39l15 18 18-13"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Vinyl({
  className = "",
  label = "L7",
  color = "var(--red)",
}: {
  className?: string;
  label?: string;
  color?: string;
}) {
  return (
    <div className={`vinyl ${className}`} aria-hidden="true">
      <div className="vinyl-label" style={{ background: color }}>
        <span>{label}</span>
        <i />
      </div>
    </div>
  );
}

export function MoodArt({
  mood = "main",
  className = "",
}: {
  mood?: string;
  className?: string;
}) {
  return (
    <svg
      className={`mood-art ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      {mood === "main" && (
        <>
          <circle cx="200" cy="200" r="155" fill="#F34E37" />
          <path
            d="m200 34 30 100 98-38-53 88 91 48-109 6 7 109-64-88-64 88 7-109-109-6 91-48-53-88 98 38Z"
            fill="#FFD952"
          />
          <path
            d="M157 180v30m85-30v30m-77 27q35 34 70-2"
            stroke="#211D29"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </>
      )}
      {mood === "heart" && (
        <>
          <path
            d="M200 332C-24 193 79 31 200 129 324 23 424 195 200 332"
            fill="#F34E37"
          />
          <path
            d="m213 118-38 71 43 36-28 94"
            stroke="#F5B9CD"
            strokeWidth="13"
          />
          <path
            d="M126 181h36m79 0h36"
            stroke="#211D29"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M153 218v34m104-32v35"
            stroke="#2854E8"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </>
      )}
      {mood === "chaotic" && (
        <>
          <path
            d="m220 34-13 133h97L144 365l35-148H96Z"
            fill="#FFD952"
            stroke="#211D29"
            strokeWidth="6"
          />
          <circle cx="78" cy="92" r="15" fill="#FFF2D9" />
          <path
            d="m315 282 8 22 23 1-19 14 6 23-18-15-20 13 7-22-17-16 23 1Z"
            fill="#FFF2D9"
          />
          <path
            d="m286 72 24 16m-5 49 25-7M65 275l20 6m-8 39 12-17"
            stroke="#211D29"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
      {mood === "chill" && (
        <>
          <circle cx="200" cy="205" r="136" fill="#2854E8" />
          <path
            d="M124 218q24-31 48 0m55 0q24-31 48 0m-109 45q36 22 70-1"
            stroke="#FFF2D9"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M206 73c-53-34-48-74-28-63 18 10 17 44 28 63 26-51 58-60 61-39 2 21-32 37-61 39"
            fill="#211D29"
          />
          <path d="m63 67 6 18 18 6-18 6-6 18-6-18-18-6 18-6Z" fill="#F34E37" />
        </>
      )}
    </svg>
  );
}

export function ArtistArt({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const skin =
    id === "nour"
      ? "#BC6E49"
      : id === "mira"
        ? "#D99A6C"
        : id === "sami"
          ? "#C48051"
          : "#B56C46";
  return (
    <svg
      className={`artist-art ${className}`}
      viewBox="0 0 360 400"
      aria-hidden="true"
    >
      <path
        d="M-5 365q91-55 185-120 103 59 185 120v60H-5"
        fill={
          id === "mira"
            ? "#FFD952"
            : id === "nour"
              ? "#2854E8"
              : id === "sami"
                ? "#F34E37"
                : "#211D29"
        }
      />
      <path d="M149 222h62v75q-32 33-62 0Z" fill={skin} />
      {(id === "nour" || id === "mira") && (
        <path
          d="M91 278V155C77 26 280 10 272 166l6 138-73-33-55 11Z"
          fill="#211D29"
        />
      )}
      <ellipse cx="180" cy="176" rx="71" ry="91" fill={skin} />
      {id === "atlas" && (
        <>
          <path
            d="M101 157c-14-94 162-112 159-10l-68-15-91 33Z"
            fill="#2854E8"
          />
          <path d="m103 147-45 21q85 38 168-5l-35-27Z" fill="#2854E8" />
        </>
      )}
      {id === "sami" && (
        <path
          d="M106 171c-20-65 10-122 79-109 85-7 78 93 62 110-19-29-23-36-30-61-38 42-63 20-111 60Z"
          fill="#211D29"
        />
      )}
      {id === "nour" && (
        <path
          d="M107 175c-13-62 6-106 69-104q94 4 78 115-47-37-65-70-24 40-82 59Z"
          fill="#211D29"
        />
      )}
      {id === "mira" && (
        <>
          <path d="M103 157c3-99 154-106 158 0l-68-34-90 43Z" fill="#211D29" />
          <path
            d="M89 196v-39c0-115 182-115 182 0v39"
            fill="none"
            stroke="#FFF2D9"
            strokeWidth="13"
          />
          <rect x="83" y="164" width="25" height="57" rx="12" fill="#FFF2D9" />
          <rect x="253" y="164" width="25" height="57" rx="12" fill="#FFF2D9" />
        </>
      )}
      {id === "atlas" ? (
        <>
          <path d="M118 176h50l-5 31h-37Zm69 0h52l-8 31h-39Z" fill="#211D29" />
          <path d="M166 185h25" stroke="#211D29" strokeWidth="7" />
        </>
      ) : (
        <>
          <path
            d="M139 184h17m48 0h17"
            stroke="#211D29"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
      <path
        d="m181 187-8 25h16m-26 18q20 13 36-3"
        fill="none"
        stroke="#743C2C"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {id === "nour" && (
        <>
          <circle
            cx="111"
            cy="217"
            r="14"
            stroke="#FFD952"
            fill="none"
            strokeWidth="5"
          />
          <circle
            cx="249"
            cy="217"
            r="14"
            stroke="#FFD952"
            fill="none"
            strokeWidth="5"
          />
        </>
      )}
      <path
        d="M-10 350q87-85 118-22m158-15q45-10 106 35"
        fill="none"
        stroke="currentColor"
        opacity=".18"
        strokeWidth="3"
      />
    </svg>
  );
}

export function FoodArt({
  art,
  name,
  priority = false,
}: {
  art: string;
  name: string;
  priority?: boolean;
}) {
  if (art === "wrap")
    return (
      <Image
        className="food-cutout"
        src="/images/shawarma.png"
        width={1199}
        height={1312}
        alt={`${name} — AI-generated concept food photography`}
        priority={priority}
        sizes="(max-width: 600px) 80vw, 400px"
      />
    );
  if (art === "feast")
    return (
      <Image
        className="food-feast"
        src="/images/feast.png"
        width={1536}
        height={1024}
        alt="A Syrian mezze spread — AI-generated concept food photography"
        sizes="(max-width: 600px) 90vw, 500px"
      />
    );
  if (art === "hummus" || art === "manakish")
    return (
      <Image
        className="food-flat-photo"
        src={`/images/${art}.png`}
        width={1536}
        height={1024}
        alt={`${name} — AI-generated concept food photography`}
        sizes="(max-width: 600px) 80vw, 440px"
      />
    );
  return (
    <svg
      className="food-illustration"
      viewBox="0 0 400 300"
      role="img"
      aria-label={`${name}, original concept illustration`}
    >
      <ellipse
        cx="200"
        cy="260"
        rx="129"
        ry="17"
        fill="#211D29"
        opacity=".12"
      />
      {art === "zaatar" && (
        <>
          <ellipse
            cx="200"
            cy="165"
            rx="155"
            ry="99"
            fill="#D89C46"
            stroke="#A66A2B"
            strokeWidth="3"
          />
          <ellipse cx="200" cy="157" rx="141" ry="87" fill="#F5CD71" />
          <path d="M88 157q110-129 224 0-101 121-224 0" fill="#F3B94E" />
          <path
            d="m120 120 32 18m37-38 27 19m28 4 32 16m-157 35 31 13m29-40 34 20m43 2 28 11m-108 29 31 7"
            stroke="#A66A2B"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="m154 84 22 158m76-152-76 152"
            stroke="#EED68E"
            strokeWidth="5"
          />
          <path
            d="m121 143 6-8m94 47 6-8m38-33 6-8m-87 77 6-8"
            stroke="#547E3E"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
      {art === "hummus" && (
        <>
          <ellipse
            cx="200"
            cy="174"
            rx="146"
            ry="96"
            fill="#FFF2D9"
            stroke="#211D29"
            strokeWidth="4"
          />
          <ellipse cx="200" cy="169" rx="126" ry="77" fill="#DEC18C" />
          <ellipse cx="200" cy="165" rx="94" ry="53" fill="#EED6A6" />
          <ellipse cx="200" cy="165" rx="60" ry="30" fill="#B7A145" />
          <path
            d="M113 170q81-105 171 0-43 71-134 22"
            stroke="#F8E6BA"
            fill="none"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="m225 138 5-20m-11 14-12-9m22 1 11-7"
            stroke="#4E7A3F"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="m121 198 16 7m132-44 10 4"
            stroke="#C65B34"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}
      {art === "kibbeh" && (
        <>
          <ellipse
            cx="200"
            cy="204"
            rx="151"
            ry="66"
            fill="#FFF2D9"
            stroke="#211D29"
            strokeWidth="3"
          />
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              transform={`translate(${74 + i * 92} ${105 + (i % 2) * 17}) rotate(${i * 20 - 20} 35 55)`}
            >
              <path
                d="M38 0q80 62 0 119Q-36 61 38 0Z"
                fill="#A85B2C"
                stroke="#794320"
                strokeWidth="3"
              />
              <path
                d="m27 29 14 5m-27 26 14 4m12 27 12-6m-12-35 14 3"
                stroke="#DC9654"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          ))}
        </>
      )}
      {art === "fries" && (
        <>
          <path
            d="m112 145 22 122h140l23-122Z"
            fill="#F34E37"
            stroke="#211D29"
            strokeWidth="3"
          />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={121 + i * 21}
              y={58 + (i % 3) * 15}
              width="19"
              height="134"
              rx="4"
              fill={i % 2 ? "#FFD952" : "#E9B33C"}
              stroke="#B8782A"
              strokeWidth="2"
              transform={`rotate(${i * 3 - 9} ${130 + i * 21} 170)`}
            />
          ))}
          <path
            d="m112 145 22 122h140l23-122q-90 63-185 0"
            fill="#F34E37"
            stroke="#211D29"
            strokeWidth="3"
          />
          <text
            x="203"
            y="239"
            fontSize="44"
            fill="#FFF2D9"
            textAnchor="middle"
            fontFamily="var(--font-display)"
          >
            EXTRA TOUM
          </text>
        </>
      )}
      {art === "dessert" && (
        <>
          <ellipse
            cx="200"
            cy="219"
            rx="147"
            ry="47"
            fill="#FFF2D9"
            stroke="#211D29"
            strokeWidth="3"
          />
          <path d="m76 169 139-72 117 74-137 71Z" fill="#C77A28" />
          <path
            d="m76 145 139-73 117 75-137 71Z"
            fill="#EAA94E"
            stroke="#BE792D"
            strokeWidth="3"
          />
          <path
            d="m76 160 119 73 137-72m-255-5 119 73 137-72"
            fill="none"
            stroke="#F6CF83"
            strokeWidth="7"
          />
          <path
            d="m130 130 32 17m22-34 31 17m14 25 23 10m-73 17 23 10m37-85 20 13"
            stroke="#688746"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="m150 117 53 33m-67 9 33 20m54-47 29 18"
            stroke="#95B455"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
      {art === "drink" && (
        <>
          <path
            d="m133 68 18 189q50 19 100 0l18-189Z"
            fill="#FFF2D9"
            stroke="#211D29"
            strokeWidth="4"
          />
          <path
            d="m140 122 14 128q45 19 93 0l13-128Z"
            fill={name.includes("Pomegranate") ? "#CB4B69" : "#C7D97C"}
          />
          <ellipse
            cx="201"
            cy="123"
            rx="58"
            ry="15"
            fill={name.includes("Pomegranate") ? "#E789A0" : "#E3EAA8"}
          />
          <path
            d="m213 135 28-105h31"
            stroke="#2854E8"
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="m165 127 25 6-6 25-25-6Zm43 62 25 6-6 25-25-6Z"
            fill="#FFF2D9"
            opacity=".7"
          />
          <circle
            cx="138"
            cy="102"
            r="34"
            fill="#FFD952"
            stroke="#6E8C45"
            strokeWidth="6"
          />
          <path
            d="m138 76 0 52m-25-26h51m-44-18 37 36m-38 0 38-36"
            stroke="#FFF2D9"
            strokeWidth="3"
          />
          <path
            d="M173 99q-36-28-20-44 30 1 20 44m0 0q34-31 38-11-7 18-38 11"
            fill="#557F48"
          />
        </>
      )}
    </svg>
  );
}
