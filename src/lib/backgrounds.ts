const photo = (name: string) => `/backgrounds/${name}.jpg`;

/** Fixed section backdrops, one per band, so each reads as its own scene. */
export const backgrounds = {
  boarding: photo("gate-window"),
  airline: photo("golden-runway"),
  testimonials: photo("auditorium"),
  life: photo("terminal-walk"),
  courses: photo("runway-dusk"),
  contact: photo("howrah"),
  enquire: photo("planes-night"),
};
