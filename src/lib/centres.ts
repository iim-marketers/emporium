/**
 * Emporium's training centres and admission offices, as listed on the
 * institute's contact page.
 */

export type Centre = {
  slug: string;
  name: string;
  /** Institution or building the centre sits inside, when the listing names one. */
  venue?: string;
  address: string[];
  phones: { label: string; href: string }[];
  instagram?: string;
  image: string;
};

/** Turns "(+91) 98366 08888" into a dialable href. */
function tel(display: string) {
  return { label: display, href: `tel:+91${display.replace(/\D/g, "")}` };
}

export const centres: Centre[] = [
  {
    slug: "kolkata",
    name: "Kolkata Centre",
    venue: "Emporium Training and Consultancy Pvt. Ltd.",
    address: ["230/B AJC Bose Road, 3rd Floor", "Minto Park, Kolkata, 700020", "West Bengal, INDIA"],
    phones: [tel("98366 08888"), tel("9830 564000")],
    instagram: "emporium_institute",
    image: "/centres/kolkata.jpg",
  },
  {
    slug: "imphal",
    name: "Imphal Centre",
    venue: "Emporium Skills Training Institute",
    address: [
      "Mantripukhri Bazaar, Imphal East, Opposite",
      "Pukhri or above Kadak Chai Restaurant,",
      "Imphal, Manipur, 795 001",
    ],
    phones: [tel("9572815957")],
    instagram: "emporium.manipur",
    image: "/centres/imphal.webp",
  },
  {
    slug: "senapati",
    name: "Senapati Centre",
    venue: "Mount Everest College",
    address: ["Senapati, Manipur, 795106"],
    phones: [tel("7629916575")],
    instagram: "emporium.senapati",
    image: "/centres/senapati.jpg",
  },
  {
    slug: "maram",
    name: "Maram Centre",
    venue: "Emporium Skills Training Institute",
    address: [
      "Don Bosco College Autonomous,",
      "Maram Bazar P.O, Senapati District,",
      "Manipur, India - 795015",
    ],
    phones: [tel("98625 51797")],
    instagram: "emporium.dbc_maram",
    image: "/centres/maram.jpg",
  },
  {
    slug: "siliguri",
    name: "Siliguri Centre",
    venue: "Salesian College",
    address: ["Don Bosco Colony, Siliguri, 734010", "West Bengal, INDIA"],
    phones: [tel("7811993646"), tel("74070 07517")],
    instagram: "emporiumsiliguri",
    image: "/centres/siliguri.webp",
  },
  {
    slug: "guwahati",
    name: "Guwahati Centre",
    venue: "Sardar Ji Building",
    address: [
      "Near Sarusajai Stadium,",
      "Opp Central Jail, NH 37, Lokhra, Guwahati",
      "Assam, INDIA",
    ],
    phones: [tel("8787632386")],
    instagram: "emp0rium.guwahati",
    image: "/centres/guwahati.jpg",
  },
  {
    slug: "gangtok",
    name: "Gangtok Centre",
    venue: "Emporium Skills Training Institute",
    address: [
      "Nar Bahadur Bhandari Government College,",
      "Tadong, East Sikkim",
      "Gangtok, 737102, INDIA",
    ],
    phones: [tel("9073983000")],
    instagram: "emporiumsikkim",
    image: "/centres/gangtok.jpg",
  },
  {
    slug: "shillong",
    name: "Shillong Centre",
    venue: "Emporium Skills Training Institute",
    address: [
      "Don Bosco Youth Centre, Don Bosco Square,",
      "Laitumkhrah, Shillong,",
      "Meghalaya 793003, India",
    ],
    phones: [tel("84158 39125"), tel("90739 33000")],
    instagram: "emporium_shillong",
    image: "/centres/shillong.jpg",
  },
  {
    slug: "itanagar",
    name: "Itanagar Centre",
    venue: "Don Bosco Youth Centre",
    address: [
      "Vivek Vihar, Itanagar,",
      "Arunachal Pradesh, 791111",
      "Landmark — Bharatiya Janata Party State office",
    ],
    phones: [tel("91812 22551")],
    instagram: "emporium.dbyc.itanagar",
    image: "/centres/itanagar.jpeg",
  },
];

export const admissionOffices: Centre[] = [
  {
    slug: "jamshedpur",
    name: "Jamshedpur Office",
    venue: "Gaurav Tower",
    address: ["above Bank of Baroda, Mango Chowk,", "Jamshedpur, 831012, INDIA"],
    phones: [tel("8986618062")],
    image: "/centres/jamshedpur.jpg",
  },
];

export const instagramUrl = (handle: string) =>
  `https://instagram.com/${handle}`;
