export const brand = {
  name: "CHAWARMA L7ILWIN",
  arabicName: "شاورما الحلوين",
  tagline: "GOOD FOOD. LOUD MUSIC.",
  city: "Agadir, Morocco",
  description:
    "Syrian soul. Agadir energy. A fictional street-food spot for very good food and very loud ideas.",
  contact: "hello@l7ilwin.example",
  location:
    "Somewhere between your next favorite song and the Atlantic. Agadir, Morocco.",
  hours: [
    { days: "MON — THU", time: "12:00 — 23:00" },
    { days: "FRI — SAT", time: "12:00 — 01:00" },
    { days: "SUNDAY", time: "13:00 — 22:00" },
  ],
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "The Tracklist" },
  { href: "/aux", label: "The Aux" },
  { href: "/artists", label: "Wall of Fame" },
  { href: "/backstage", label: "Backstage" },
  { href: "/visit", label: "Visit" },
];

export const categories = [
  { id: "all", label: "All the hits", note: "The full collection" },
  { id: "shawarma", label: "Street Heroes", note: "Shawarma" },
  { id: "manakish", label: "Oven Fresh", note: "Manakish" },
  { id: "sides", label: "The Side Tracks", note: "Mezze & sides" },
  { id: "desserts", label: "Sweet Remixes", note: "Desserts" },
  { id: "drinks", label: "The Refreshers", note: "Drinks" },
  { id: "combos", label: "Signature Combos", note: "Better together" },
  { id: "artist", label: "Artist Editions", note: "Fictional collaborations" },
];

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients: string[];
  mood: string;
  art:
    | "wrap"
    | "manakish"
    | "zaatar"
    | "hummus"
    | "kibbeh"
    | "fries"
    | "dessert"
    | "drink"
    | "feast";
  color: string;
  tag?: string;
};

export const menu: MenuItem[] = [
  {
    id: "chicken",
    name: "Chicken Shawarma",
    category: "shawarma",
    price: 42,
    description:
      "The one that started it all. Golden chicken, a generous hit of toum, pickles, and fries, wrapped in toasted Syrian flatbread.",
    ingredients: [
      "Marinated chicken",
      "Syrian flatbread",
      "Garlic toum",
      "Pickles",
      "Fries",
    ],
    mood: "main",
    art: "wrap",
    color: "yellow",
    tag: "THE NO. 1 SINGLE",
  },
  {
    id: "beef",
    name: "Beef Shawarma",
    category: "shawarma",
    price: 55,
    description:
      "Slow-roasted beef, bright parsley, and a silky tahini finish. A proper heavyweight.",
    ingredients: [
      "Spiced beef",
      "Flatbread",
      "Tahini",
      "Parsley",
      "Tomato",
      "Pickles",
    ],
    mood: "main",
    art: "wrap",
    color: "pink",
  },
  {
    id: "spicy",
    name: "Spicy Chicken Shawarma",
    category: "shawarma",
    price: 48,
    description:
      "Our chicken classic turned all the way up. Chili, toum, crunch, repeat.",
    ingredients: [
      "Chicken",
      "Flatbread",
      "Chili sauce",
      "Toum",
      "Pickles",
      "Fries",
    ],
    mood: "chaotic",
    art: "wrap",
    color: "red",
    tag: "TURN UP THE HEAT",
  },
  {
    id: "cheese",
    name: "Cheese Manakish",
    category: "manakish",
    price: 30,
    description:
      "A warm, pillowy flatbread with a golden cheese top. Best shared. Usually isn't.",
    ingredients: ["Flatbread dough", "Cheese", "Olive oil"],
    mood: "heart",
    art: "manakish",
    color: "pink",
    tag: "OVEN-FRESH ENERGY",
  },
  {
    id: "zaatar",
    name: "Za’atar Manakish",
    category: "manakish",
    price: 25,
    description:
      "Fragrant za’atar, olive oil, and fresh-baked bread. Sometimes the simplest track hits hardest.",
    ingredients: ["Flatbread dough", "Za’atar blend", "Olive oil", "Sesame"],
    mood: "chill",
    art: "zaatar",
    color: "green",
  },
  {
    id: "hummus",
    name: "Hummus & Bread",
    category: "sides",
    price: 28,
    description:
      "Silky chickpea hummus, a pool of olive oil, and warm bread for the scoop. Your chill-mode essential.",
    ingredients: [
      "Chickpeas",
      "Tahini",
      "Lemon",
      "Garlic",
      "Olive oil",
      "Bread",
    ],
    mood: "chill",
    art: "hummus",
    color: "green",
    tag: "SMOOTH OPERATOR",
  },
  {
    id: "kibbeh",
    name: "Crispy Kibbeh",
    category: "sides",
    price: 45,
    description:
      "Three crisp little Syrian classics, filled with spiced meat and plenty of personality.",
    ingredients: ["Bulgur", "Minced beef", "Onion", "Spices"],
    mood: "chaotic",
    art: "kibbeh",
    color: "yellow",
  },
  {
    id: "fries",
    name: "Fries with Garlic Sauce",
    category: "sides",
    price: 25,
    description:
      "Crisp, golden fries and the garlic sauce you will absolutely ask for more of.",
    ingredients: ["Potato", "Vegetable oil", "Salt", "Garlic toum"],
    mood: "heart",
    art: "fries",
    color: "pink",
  },
  {
    id: "kunafa",
    name: "Pistachio Kunafa",
    category: "desserts",
    price: 40,
    description:
      "Golden strands, a soft cheese middle, and a pistachio encore. Leave room for this one.",
    ingredients: [
      "Kataifi pastry",
      "Cheese",
      "Butter",
      "Sugar syrup",
      "Pistachios",
    ],
    mood: "heart",
    art: "dessert",
    color: "green",
  },
  {
    id: "baklava",
    name: "Baklava",
    category: "desserts",
    price: 35,
    description:
      "Crisp pastry layers, nuts, and just enough syrup to make your evening sweeter.",
    ingredients: ["Filo pastry", "Mixed nuts", "Butter", "Sugar syrup"],
    mood: "chill",
    art: "dessert",
    color: "yellow",
  },
  {
    id: "lemon",
    name: "Lemon Mint Cooler",
    category: "drinks",
    price: 22,
    description:
      "Fresh lemon, garden mint, and ice. The refresh button for your day.",
    ingredients: ["Lemon", "Mint", "Water", "Sugar", "Ice"],
    mood: "chill",
    art: "drink",
    color: "green",
  },
  {
    id: "pomegranate",
    name: "Pomegranate Fizz",
    category: "drinks",
    price: 26,
    description:
      "Bright pomegranate with bubbles and a citrus finish. A little main-character sparkle.",
    ingredients: ["Pomegranate juice", "Sparkling water", "Lemon", "Ice"],
    mood: "main",
    art: "drink",
    color: "pink",
  },
  {
    id: "bro-combo",
    name: "The Bro Combo",
    category: "combos",
    price: 78,
    description:
      "Chicken shawarma, garlic fries, and a lemon mint cooler. Your whole evening, sorted.",
    ingredients: ["Chicken shawarma", "Garlic fries", "Lemon mint cooler"],
    mood: "main",
    art: "feast",
    color: "yellow",
  },
  {
    id: "double-trouble",
    name: "Double Trouble",
    category: "combos",
    price: 125,
    description:
      "Two chicken shawarmas, shared garlic fries, and two coolers. Bring your favorite bad influence.",
    ingredients: [
      "Two chicken shawarmas",
      "Garlic fries",
      "Two lemon mint coolers",
    ],
    mood: "chaotic",
    art: "feast",
    color: "red",
  },
  {
    id: "feast",
    name: "The L7ILWIN Feast",
    category: "combos",
    price: 220,
    description:
      "Four wraps, hummus, two manakish, and a table full of very good decisions. Made for the group chat.",
    ingredients: [
      "Four chicken shawarmas",
      "Hummus",
      "Cheese manakish",
      "Za’atar manakish",
    ],
    mood: "chaotic",
    art: "feast",
    color: "green",
  },
  {
    id: "atlas-wrap",
    name: "The Atlas Afterparty",
    category: "artist",
    price: 62,
    description:
      "Younes Atlas’s fictional signature: spicy chicken shawarma with extra fries and pomegranate fizz.",
    ingredients: ["Spicy chicken shawarma", "Extra fries", "Pomegranate fizz"],
    mood: "chaotic",
    art: "wrap",
    color: "red",
    tag: "FICTIONAL ARTIST EDITION",
  },
  {
    id: "nour-combo",
    name: "The Midnight Nour",
    category: "artist",
    price: 58,
    description:
      "Nour Sol’s fictional comfort pairing: extra-toum chicken shawarma and a little baklava encore.",
    ingredients: ["Chicken shawarma", "Extra toum", "Baklava"],
    mood: "heart",
    art: "wrap",
    color: "pink",
    tag: "FICTIONAL ARTIST EDITION",
  },
  {
    id: "mira-mix",
    name: "The Mira Mix",
    category: "artist",
    price: 65,
    description:
      "Mira MHz’s fictional drop: cheese manakish, garlic fries, and a lemon mint cooler.",
    ingredients: ["Cheese manakish", "Garlic fries", "Lemon mint cooler"],
    mood: "main",
    art: "manakish",
    color: "yellow",
    tag: "FICTIONAL ARTIST EDITION",
  },
  {
    id: "sami-side",
    name: "Sami’s B-Side",
    category: "artist",
    price: 50,
    description:
      "Sami Coast’s fictional slow Sunday: hummus, za’atar manakish, and plenty of time.",
    ingredients: ["Hummus", "Za’atar manakish"],
    mood: "chill",
    art: "hummus",
    color: "green",
    tag: "FICTIONAL ARTIST EDITION",
  },
];

export type Mood = {
  id: string;
  name: string;
  short: string;
  color: string;
  genre: string;
  meal: string;
  item: string;
  title: string;
  description: string;
  bpm: string;
};

// Public playlist links live separately in playlists.json and are verified by
// scripts/verify-spotify.mjs before QR codes and the official player are enabled.
export const moods: Mood[] = [
  {
    id: "main",
    name: "Main Character Energy",
    short: "THE WORLD IS YOUR MUSIC VIDEO.",
    color: "yellow",
    genre: "CONFIDENT POP / HIP-HOP",
    meal: "The Bro Combo",
    item: "bro-combo",
    title: "MAIN CHARACTER MIX",
    description:
      "Big chorus energy meets our all-star combo. Chicken shawarma, garlic fries, and a cooler: your entrance deserves a soundtrack.",
    bpm: "105—125",
  },
  {
    id: "heart",
    name: "Heartbroken but Hungry",
    short: "FEELINGS? ADD EXTRA TOUM.",
    color: "pink",
    genre: "ARABIC LATE-NIGHT / R&B",
    meal: "The Midnight Nour",
    item: "nour-combo",
    title: "TOUM & TENDER FEELINGS",
    description:
      "A little Arabic late-night soul, an extra-garlic wrap, and a sweet finish. Comfort food for your dramatic window-staring era.",
    bpm: "65—85",
  },
  {
    id: "chaotic",
    name: "Chaotic Bestie",
    short: "ONE MORE SONG. ONE MORE BITE.",
    color: "red",
    genre: "ENERGETIC RAP / DANCE",
    meal: "Double Trouble",
    item: "double-trouble",
    title: "NO SKIPS. JUST CHAOS.",
    description:
      "High-energy rap and dance deserve a plus-one. Two wraps, two drinks, and fries you can argue over. Text the group chat.",
    bpm: "120—140",
  },
  {
    id: "chill",
    name: "Chill Mode",
    short: "LOW TEMPO. HIGH STANDARDS.",
    color: "green",
    genre: "ARABIC CHILL / MELLOW INDIE",
    meal: "Sami’s B-Side",
    item: "sami-side",
    title: "SLOW SUNDAY SELECTS",
    description:
      "Soft indie, warm bread, and hummus made for lingering. An easy mezze pairing for the days you want the world to slow down.",
    bpm: "70—95",
  },
];

export const artists = [
  {
    id: "atlas",
    name: "Younes Atlas",
    genre: "MOROCCAN RAP",
    color: "yellow",
    role: "THE AFTERPARTY REGULAR",
    bio: "In our imaginary Agadir scene, Younes turns everyday city stories into quick-fire verses. You’ll find him scribbling lyrics on napkins after the last set.",
    favorite: "Spicy Chicken Shawarma",
    edition: "atlas-wrap",
    quote: "My flow is hot. My shawarma is hotter.",
    mood: "chaotic",
    number: "01",
  },
  {
    id: "nour",
    name: "Nour Sol",
    genre: "ALTERNATIVE R&B",
    color: "pink",
    role: "THE MIDNIGHT VOICE",
    bio: "A fictional singer with honey-soft vocals and a weakness for late-night harmonies. Her dream EP was recorded between soundchecks and garlic-sauce breaks.",
    favorite: "Extra-toum Chicken Shawarma",
    edition: "nour-combo",
    quote: "I came to write a love song. I wrote one about toum.",
    mood: "heart",
    number: "02",
  },
  {
    id: "mira",
    name: "Mira MHz",
    genre: "ELECTRONIC / HOUSE",
    color: "blue",
    role: "THE SELECTOR",
    bio: "This imaginary DJ blends sunny house with the sounds of the coast. Her fictional rule: no bad transitions, no cold manakish.",
    favorite: "Cheese Manakish",
    edition: "mira-mix",
    quote: "The only thing I drop harder than a beat? My diet plans.",
    mood: "main",
    number: "03",
  },
  {
    id: "sami",
    name: "Sami Coast",
    genre: "COASTAL INDIE",
    color: "green",
    role: "THE SUNDAY SOUL",
    bio: "Our fictional indie daydreamer makes guitar-led songs for the bus ride to the beach. He insists that every good rehearsal ends with mezze.",
    favorite: "Hummus & Za’atar Manakish",
    edition: "sami-side",
    quote: "Less rush. More hummus. That’s the whole album.",
    mood: "chill",
    number: "04",
  },
];

export const events = [
  {
    id: "open-mic",
    title: "PASS THE MIC.",
    genre: "OPEN MIC / NEW VOICES",
    day: "13",
    month: "NOV",
    date: "13 NOVEMBER 2026",
    time: "20:00",
    artist: "Hosted by Younes Atlas",
    color: "red",
    copy: "Fresh verses. Warm wraps. A concept open-mic night for the city’s next big voices.",
  },
  {
    id: "midnight",
    title: "MIDNIGHT, EXTRA TOUM.",
    genre: "R&B / ACOUSTIC SESSION",
    day: "20",
    month: "NOV",
    date: "20 NOVEMBER 2026",
    time: "21:00",
    artist: "Nour Sol + Sami Coast",
    color: "blue",
    copy: "Soft vocals and late-night cravings. An intimate fictional session after dark.",
  },
  {
    id: "spin",
    title: "SPIN. EAT. REPEAT.",
    genre: "HOUSE / DJ SESSION",
    day: "27",
    month: "NOV",
    date: "27 NOVEMBER 2026",
    time: "20:30",
    artist: "On the decks: Mira MHz",
    color: "yellow",
    copy: "Coastal house, fresh manakish, zero skips. A fictional Friday with the volume up.",
  },
];
