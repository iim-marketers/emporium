import type { StaticImageData } from "next/image";

import auditorium from "../../public/backgrounds/auditorium.jpg";
import gateWindow from "../../public/backgrounds/gate-window.jpg";
import goldenRunway from "../../public/backgrounds/golden-runway.jpg";
import planesNight from "../../public/backgrounds/planes-night.jpg";
import runwayDusk from "../../public/backgrounds/runway-dusk.jpg";
import terminalWalk from "../../public/backgrounds/terminal-walk.jpg";
import airportLounge from "../../public/pages/airport-lounge.jpg";
import cabinAisle from "../../public/pages/cabin-aisle.jpg";
import counselling from "../../public/pages/counselling.jpg";
import crewCabin from "../../public/pages/crew-cabin.jpg";
import handshake from "../../public/pages/handshake.jpg";
import helpDesk from "../../public/pages/help-desk.jpg";
import jetBridge from "../../public/pages/jet-bridge.jpg";
import lectureHall from "../../public/pages/lecture-hall.jpg";
import windowClouds from "../../public/pages/window-clouds.jpg";
import wingSunset from "../../public/pages/wing-sunset.jpg";

type PageImages = {
  hero: StaticImageData;
  heroFocus?: string;
  stage: StaticImageData;
  stageFocus?: string;
};

const images = {
  about: { hero: cabinAisle, stage: lectureHall },
  programs: {
    hero: windowClouds,
    heroFocus: "50% 40%",
    stage: runwayDusk,
  },
  placements: {
    hero: crewCabin,
    heroFocus: "50% 35%",
    stage: gateWindow,
  },
  achievements: { hero: wingSunset, stage: auditorium },
  contact: {
    hero: helpDesk,
    heroFocus: "70% 40%",
    stage: airportLounge,
  },
  enquire: {
    hero: jetBridge,
    heroFocus: "50% 55%",
    stage: planesNight,
  },
  jobs: {
    hero: counselling,
    heroFocus: "70% 40%",
    stage: terminalWalk,
  },
  franchise: { hero: handshake, stage: goldenRunway },
} satisfies Record<string, PageImages>;

export const pageImages: Record<keyof typeof images, PageImages> = images;
