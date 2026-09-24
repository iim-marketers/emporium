import {
  Briefcase,
  Calculator,
  Compass,
  ConciergeBell,
  Headset,
  MessagesSquare,
  MonitorPlay,
  Plane,
  Shirt,
  Ship,
  Smile,
  Sparkles,
  SprayCan,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const role = (name: string) => `/courses/roles/${name}.jpg`;
const photo = (name: string) => `/home/photos/${name}.webp`;

/** One photo per job role, keyed by the role name in `programs.ts`. */
export const roleImages: Record<string, string> = {
  "Cabin Crew": photo("aircraft-door"),
  "Flight Steward": role("cabin-aisle"),
  "Air Hostess": photo("cabin-crew-portrait"),
  "Airport Ground services": role("ground-ops"),
  "Airport Customer care services": role("customer-care"),
  "Airport Security Services": role("baggage-screening"),
  "Airport Cargo Services": role("air-cargo"),
  "Flight Ticketing Services": role("boarding-pass"),

  "Front Office Executive": role("reception-marble"),
  "Guest Relations Executive": photo("restaurant-namaste"),
  "Food & Beverage (F&B) Associates": photo("bartender-2"),
  "Housekeeping Floor Supervisor": role("bed-making"),
  "Lobby Manager": role("grand-lobby"),

  "Front Office Associates": role("front-desk"),
  "Food & Beverage (F&B)": photo("bar-service"),
  "Services Crew": role("ship-deck"),
  "Housekeeping attendants": role("hotel-corridor"),
  "Kitchen Stewards": role("galley-chef"),
  "Casino Crew": role("casino-table"),
  "Pool Attendants": role("ship-pool"),
};

export const roleLabel = (name: string) =>
  name.replace(/\s*\(F&B\)/, "").replace(/ services$/i, "");

/** Full-bleed backdrop behind the course title; `focus` keeps the subject
 *  clear of the copy on the left. */
export const courseHeroes: Record<string, { image: string; focus: string }> = {
  aviation: { image: role("hero-aviation"), focus: "62% 60%" },
  hospitality: { image: role("hero-hospitality"), focus: "60% 45%" },
  cruise: { image: role("hero-cruise"), focus: "58% 55%" },
};

export type Workplace = { image: string; lead: string; line: string };

export const workplaces: Record<string, Workplace> = {
  aviation: {
    image: role("wing-sunset"),
    lead: "Your office:",
    line: "35,000 feet up.",
  },
  hospitality: {
    image: role("lobby-marble"),
    lead: "Your office:",
    line: "five-star lobbies.",
  },
  cruise: {
    image: role("ship-sunset"),
    lead: "Your office:",
    line: "the open sea.",
  },
};

const moduleIcons: [RegExp, LucideIcon][] = [
  [/english/i, MessagesSquare],
  [/aviation/i, Plane],
  [/cruise/i, Ship],
  [/hospitality/i, ConciergeBell],
  [/tourism/i, Compass],
  [/corporate/i, Briefcase],
  [/customer/i, Headset],
  [/personality|soft/i, Smile],
  [/grooming/i, Shirt],
  [/audio|visual/i, MonitorPlay],
  [/job training/i, Wrench],
  [/cost|material/i, Calculator],
  [/hygiene|sanitation/i, SprayCan],
];

export function moduleIcon(name: string): LucideIcon {
  return moduleIcons.find(([test]) => test.test(name))?.[1] ?? Sparkles;
}

export const journey = [
  { title: "Counselling", image: photo("seminar-hall") },
  { title: "Training", image: photo("auditorium-salute-2") },
  { title: "Industry visits", image: photo("recruiters-visit") },
  { title: "Placement", image: photo("jobs-board-team") },
];
