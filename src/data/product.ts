//  product catalog
//
// Each product follows the shared `Product` shape below. Items that don't
// have a photographed asset yet (`image` omitted) fall back to a themed
// `icon` emoji so every product still renders a consistent, clean tile —
// see <ProductImage /> for how the fallback is rendered.

export type ProductCategory =
  | "Guitars"
  | "Keyboards"
  | "Drums"
  | "String Instruments"
  | "Wind Instruments"
  | "Microphones"
  | "Accessories";

export const CATEGORIES: ProductCategory[] = [
  "Guitars",
  "Keyboards",
  "Drums",
  "String Instruments",
  "Wind Instruments",
  "Microphones",
  "Accessories",
];

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  /** require()'d local image asset. Omit to use the `icon` fallback. */
  image?: any;
  /** Emoji fallback shown when no photographed asset is available yet. */
  icon?: string;
  description: string;
  /** Units currently available to purchase. */
  stock: number;
};

export const products: Product[] = [
  // ---------------- Guitars ----------------
  {
    id: "1",
    name: " Acoustic Pro Guitar",
    category: "Guitars",
    price: 8500,
    image: require("../../assets/images/guitar/Acoustic.png"),
    description:
      "Solid spruce-top acoustic guitar with a mahogany back and sides, delivering warm, resonant tone for players of every level. Comes with a padded gig bag and a set of spare strings.",
    stock: 14,
  },
  {
    id: "2",
    name: " Custom Electric Guitar",
    category: "Guitars",
    price: 15500,
    image: require("../../assets/images/guitar/electric.png"),
    description:
      "Versatile solid-body electric guitar with dual humbucker pickups for clean, crunch, and overdrive tones. Fast maple neck with a rosewood fretboard for effortless playability.",
    stock: 9,
  },
  {
    id: "3",
    name: " Studio Bass Guitar",
    category: "Guitars",
    price: 17800,
    icon: "🎸",
    description:
      "4-string precision-style bass guitar with an alder body and active EQ, built for punchy low end in the studio or on stage.",
    stock: 6,
  },

  // ---------------- Keyboards ----------------
  {
    id: "4",
    name: " Digital Studio Piano",
    category: "Keyboards",
    price: 32500,
    image: require("../../assets/images/piano/digital.png"),
    description:
      "Full-size, 88-key weighted digital piano with realistic hammer-action touch and rich stereo grand-piano sound, perfect for practice and performance.",
    stock: 5,
  },
  {
    id: "5",
    name: " Portable MIDI Keyboard",
    category: "Keyboards",
    price: 6200,
    image: require("../../assets/images/piano/mini.png"),
    description:
      "Compact 25-key USB MIDI controller keyboard built for modern music production, songwriting, and connecting straight to your favorite DAW.",
    stock: 20,
  },
  {
    id: "6",
    name: " Performance Synthesizer",
    category: "Keyboards",
    price: 28900,
    image: require("../../assets/images/piano/synth keyboard.png"),
    description:
      "Advanced performance synthesizer keyboard with pitch bend and modulation wheels, layered voices, and onboard effects for live sets.",
    stock: 4,
  },

  // ---------------- Drums ----------------
  {
    id: "7",
    name: " Electronic Drum Kit",
    category: "Drums",
    price: 24500,
    image: require("../../assets/images/drum/Full drum set.png"),
    description:
      "Full-size electronic drum kit with mesh-head pads, dual-zone cymbals, and a built-in sound module loaded with studio-quality kits.",
    stock: 5,
  },
  {
    id: "8",
    name: " Bongo Drum Set",
    category: "Drums",
    price: 3200,
    image: require("../../assets/images/drum/bongos.png"),
    description:
      "Hand-crafted wooden bongo drums with natural rawhide heads, tuned for bright, punchy tones — great for practice or acoustic sessions.",
    stock: 18,
  },
  {
    id: "9",
    name: " Acoustic Cajon Drum",
    category: "Drums",
    price: 6800,
    image: require("../../assets/images/drum/cajon.png"),
    description:
      "Handcrafted wooden cajon with internal snare wires for a crisp backbeat, plus a front sound port for deep, resonant bass tones.",
    stock: 11,
  },

  // ---------------- String Instruments ----------------
  {
    id: "10",
    name: " Classic Ukulele",
    category: "String Instruments",
    price: 2400,
    image: require("../../assets/images/guitar/ukelele.png"),
    description:
      "Concert-size mahogany ukulele with a smooth satin finish and warm, bright tone — lightweight and easy to bring anywhere.",
    stock: 25,
  },
  {
    id: "11",
    name: " Student Violin",
    category: "String Instruments",
    price: 9500,
    icon: "🎻",
    description:
      "4/4 full-size violin outfit crafted from solid spruce and maple, complete with bow, rosin, and a protective hard case — ideal for students and recitals.",
    stock: 8,
  },

  // ---------------- Wind Instruments ----------------
  {
    id: "12",
    name: " Concert Flute",
    category: "Wind Instruments",
    price: 11200,
    icon: "🪈",
    description:
      "Silver-plated concert flute with a closed-hole design and offset G key, tuned for a clear, singing tone from beginner to intermediate players.",
    stock: 7,
  },
  {
    id: "13",
    name: " Alto Saxophone",
    category: "Wind Instruments",
    price: 26800,
    icon: "🎷",
    description:
      "Gold-lacquered alto saxophone with a rich, warm tone across all registers, complete with mouthpiece, reeds, and a hard-shell case.",
    stock: 4,
  },

  // ---------------- Microphones ----------------
  {
    id: "14",
    name: " Condenser Microphone",
    category: "Microphones",
    price: 5400,
    icon: "🎤",
    description:
      "Large-diaphragm condenser microphone with a cardioid pickup pattern, ideal for vocals, podcasting, and studio recording. Includes shock mount and pop filter.",
    stock: 16,
  },
  {
    id: "15",
    name: " Dynamic Vocal Microphone",
    category: "Microphones",
    price: 3100,
    icon: "🎙️",
    description:
      "Rugged handheld dynamic microphone built for live vocals, with a tight cardioid pattern that rejects background noise on stage.",
    stock: 22,
  },

  // ---------------- Accessories ----------------
  {
    id: "16",
    name: " Clip-On Chromatic Tuner",
    category: "Accessories",
    price: 650,
    image: require("../../assets/images/Accessories/Clip-on tuner.png"),
    description:
      "Compact clip-on tuner with a bright, rotating display — works with guitar, bass, ukulele, and most other instruments.",
    stock: 40,
  },
  {
    id: "17",
    name: " Guitar Pick Set",
    category: "Accessories",
    price: 250,
    image: require("../../assets/images/Accessories/Guitar pick set.png"),
    description:
      "Assorted 12-piece pick set in light, medium, and heavy gauges, so you can dial in the exact feel and tone you like.",
    stock: 60,
  },
  {
    id: "18",
    name: " Adjustable Music Stand",
    category: "Accessories",
    price: 1450,
    image: require("../../assets/images/Accessories/Music stand.png"),
    description:
      "Sturdy, foldable music stand with adjustable height and tilt, built to hold sheet music steady through long practice sessions.",
    stock: 17,
  },
];
