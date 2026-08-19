/**
 * Single source of truth for institute-wide details.
 * Swap these values (or hydrate them from the Node API later) without touching pages.
 */

export const site = {
  name: "Emporium",
  legalName: "Emporium Institute of Aviation & Hospitality",
  tagline: "Building a New Nation",
  description:
    "Emporium prepares India's next generation of cabin crew, airport ground staff and hospitality professionals with industry-current training, grooming and dedicated placement support.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emporium.example",
  locale: "en_IN",
  phone: "1800-000-000",
  phoneHref: "tel:1800000000",
  email: "admissions@emporium.example",
  address: {
    line1: "Campus address line 1",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  disclaimer:
    "Emporium is a skills-training institute. It provides dedicated placement support; final selection and outcomes depend on individual performance and recruiter criteria, and no job is guaranteed.",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Programs", href: "/programs" },
  { label: "Why Emporium", href: "/why-emporium" },
  { label: "Training", href: "/training" },
  { label: "Placements", href: "/placements" },
  { label: "Admissions", href: "/admissions" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Programs",
    items: [
      { label: "Cabin Crew Training", href: "/programs/air-hostess-cabin-crew-training" },
      { label: "Airport Ground Staff", href: "/programs/airport-ground-staff-customer-service" },
      {
        label: "Hospitality Management",
        href: "/programs/hospitality-guest-experience-management",
      },
      { label: "Travel & Tourism", href: "/programs/travel-tourism-management" },
      { label: "Aviation Management", href: "/programs/advanced-airport-aviation-management" },
    ],
  },
  {
    heading: "Institute",
    items: [
      { label: "Why Emporium", href: "/why-emporium" },
      { label: "Training & facilities", href: "/training" },
      { label: "Placements", href: "/placements" },
      { label: "Admissions", href: "/admissions" },
      { label: "Enquire", href: "/enquire" },
    ],
  },
];
