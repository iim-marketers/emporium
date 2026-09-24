export type Clip = { src: string; poster: string; caption: string };

const clip = (name: string, caption: string): Clip => ({
  src: `/home/video/${name}.mp4`,
  poster: `/home/video/${name}.webp`,
  caption,
});

const photo = (name: string) => `/home/photos/${name}.webp`;

export const heroStill = {
  wide: "/home/welcome-guest-new.webp",
  tall: "/home/welcome-guest-tall.webp",
};

export const ctaFilm = clip("banquet-wide", "");

export type Face = { src: string; track: "Aviation" | "Hospitality" };

const face = (name: string, track: Face["track"]): Face => ({
  src: `/home/faces/${name}.webp`,
  track,
});

export const faces: Face[] = [
  face("aviation-1", "Aviation"),
  face("hospitality-1", "Hospitality"),
  face("aviation-4", "Aviation"),
  face("hospitality-2", "Hospitality"),
  face("aviation-3", "Aviation"),
  face("hospitality-3", "Hospitality"),
  face("aviation-2", "Aviation"),
  face("hospitality-6", "Hospitality"),
  face("hospitality-4", "Hospitality"),
  face("hospitality-5", "Hospitality"),
];

export const lifeClips: Clip[] = [
  // clip("welcome-dance", "A traditional welcome"),
  clip("saree-welcome", "Guest welcome, the Indian way"),
  clip("hotel-arrival", "Arriving for an industry visit"),
  clip("hotel-lobby", "Five-star lobby walkthrough"),
  clip("suite-tour", "Inside a luxury suite"),
  clip("spa-visit", "Spa and wellness walkthrough"),
  clip("auditorium", "Orientation day"),
  clip("students-wave", "Hello from the batch"),
  clip("seminar", "Industry seminar"),
  clip("classroom", "In the classroom"),
  clip("batch-photo", "Batch photo day"),
  clip("school-outreach", "School outreach"),
  clip("orientation", "A full house"),
];

export const editorialPhoto = photo("ballroom-batch");

export const backdrops = {
  recruiters: photo("aircraft-apron"),
  testimonials: photo("auditorium-seated"),
  blog: photo("lakeside-uniform"),
};

export const courseArt: Record<string, { card: string; scene: string }> = {
  aviation: {
    card: photo("aircraft-door"),
    scene: "/courses/aviation-hero-new.png",
  },
  hospitality: {
    card: photo("restaurant-namaste"),
    scene: "/courses/hospitality-hero-new.png",
  },
  cruise: {
    card: "/courses/cruise-card-new.png",
    scene: "/courses/cruise-hero-new.png",
  },
};

export const pillarPhotos = [
  {
    src: photo("cabin-crew-batch"),
    alt: "A cabin crew batch in uniform during grooming training",
  },
  {
    src: photo("bartender"),
    alt: "A student at the Emporium training bar",
  },
  {
    src: photo("jobs-board-team"),
    alt: "Students in hotel uniform at an on-campus placement drive",
  },
  {
    src: photo("recruiters-visit"),
    alt: "Industry professionals with students at an Emporium centre",
  },
];

export type Moment = { src: string; alt: string; area: string };

export const moments: Moment[] = [
  {
    src: photo("saree-namaste"),
    alt: "Students in red-bordered sarees greeting with a namaste",
    area: "a",
  },
  {
    src: photo("recruiters-visit-2"),
    alt: "A recruiter visit at an Emporium centre",
    area: "b",
  },
  {
    src: photo("auditorium-salute"),
    alt: "A batch saluting in the auditorium",
    area: "c",
  },
  {
    src: photo("aircraft-apron"),
    alt: "A cabin crew trainee with her trolley bag on the apron",
    area: "d",
  },
  {
    src: photo("palace-steps-her"),
    alt: "A graduate on palace steps",
    area: "e",
  },
  {
    src: photo("campus-group"),
    alt: "Students and trainers gathered on campus",
    area: "f",
  },
  {
    src: photo("lakeside-uniform"),
    alt: "A graduate in uniform by a lake",
    area: "g",
  },
];
