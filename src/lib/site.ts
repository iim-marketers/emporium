export const site = {
  name: "Emporium",
  legalName: "Emporium Training & Consultancy Pvt. Ltd.",
  tagline: "Certificate course in Aviation, Hospitality & Cruise line",
  heroLine: "With a fantastic career, you may live your passion every day",
  description:
    "Emporium is a leading Vocational Training Provider (VTP) under the Directorate General of Employment & Craftsmen Training, Ministry of Labour & Employment, Government of India — training India's next generation for aviation, hospitality, cruise line, travel & tourism and customer service careers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.emporiumsolutions.com",
  locale: "en_IN",

  phone: "+91 98366 08888",
  phoneHref: "tel:+919836608888",
  altPhone: "+91 98305 64000",
  altPhoneHref: "tel:+919830564000",
  /** wa.me wants the bare international number; the display keeps the spacing. */
  whatsapp: "+91 98366 08888",
  whatsappHref: "https://wa.me/919836608888",
  email: "info@emporiumsolutions.com",
  hours: "Monday to Sunday, 10am to 9:00pm",

  address: {
    org: "Emporium Training and Consultancy",
    line1: "230/B AJC Bose Road, 3rd Floor",
    line2: "Minto Park",
    city: "Kolkata",
    state: "West Bengal",
    pin: "700 020",
    country: "India",
    mapHref: "https://maps.app.goo.gl/sgAQeV6E7fdsyd6V6",
  },

  /** External destinations the old site's chrome pointed at. */
  studentLogin: "https://onlinelms.ebraindigit.com/dashboard",
  brochure: "/emporium-company-profile.pdf",

  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/emporium-training/?viewAsMember=true",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/EmporiumTrainingIndia",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/emporium_institute?igshid=ZGUzMzM3NWJiOQ==",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCeAjDr5sCJ0FGeS7O_9NMDw",
    },
  ],

  /** The institute's own qualifier on its placement claim. */
  disclaimer:
    "100% placements will be provided to students who will successfully complete the training and will pass in all the subjects in the final exam.",

  copyright: "Copyright © Emporium 2026. All rights reserved",
} as const;

/** `blurb` is nav-menu copy — the roles the course trains for, in one line. */
export type NavItem = { label: string; href: string; blurb?: string };
export type NavGroup = NavItem & { children?: NavItem[] };

/** Course slugs live here so the nav, footer and cards can't drift apart. */
export const courseNav: NavItem[] = [
  {
    label: "Aviation",
    href: "/programs/aviation",
    blurb: "Cabin crew, air hostess & ground services",
  },
  {
    label: "Hospitality",
    href: "/programs/hospitality",
    blurb: "Front office, guest relations & F&B",
  },
  {
    label: "Cruise",
    href: "/programs/cruise",
    blurb: "Onboard hospitality, F&B & housekeeping",
  },
];

export const primaryNav: NavGroup[] = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/programs", children: courseNav },
  { label: "Placements", href: "/placements" },
  { label: "Jobs", href: "/jobs" },
  { label: "Franchise", href: "/franchise" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Placements", href: "/placements" },
      { label: "Jobs", href: "/jobs" },
      { label: "Achievements", href: "/achievements" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Franchise", href: "/franchise" },
      { label: "Contact", href: "/contact" },
      { label: "Enquire", href: "/enquire" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
