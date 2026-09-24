const page = (name: string) => `/pages/${name}.jpg`;
const bg = (name: string) => `/backgrounds/${name}.jpg`;

type PageImages = {
  hero: string;
  heroFocus?: string;
  stage: string;
  stageFocus?: string;
};

/** Hero photo and the still photo the page's panels scroll over. */
const images = {
  about: { hero: page("cabin-aisle"), stage: page("lecture-hall") },
  programs: {
    hero: page("window-clouds"),
    heroFocus: "50% 40%",
    stage: bg("runway-dusk"),
  },
  placements: { hero: page("busy-terminal"), stage: bg("gate-window") },
  achievements: { hero: page("wing-sunset"), stage: bg("auditorium") },
  contact: {
    hero: page("help-desk"),
    heroFocus: "70% 40%",
    stage: page("airport-lounge"),
  },
  enquire: {
    hero: page("jet-bridge"),
    heroFocus: "50% 55%",
    stage: bg("planes-night"),
  },
  jobs: {
    hero: page("counselling"),
    heroFocus: "70% 40%",
    stage: bg("terminal-walk"),
  },
  franchise: { hero: page("handshake"), stage: bg("golden-runway") },
} satisfies Record<string, PageImages>;

export const pageImages: Record<keyof typeof images, PageImages> = images;
