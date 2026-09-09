export type Centre = {
  slug: string;
  name: string;
  venue?: string;
  state: string;
  address: string[];
  phones: { label: string; href: string }[];
  instagram?: string;
  image: string;
};

function tel(display: string) {
  return { label: display, href: `tel:+91${display.replace(/\D/g, "")}` };
}

export const centres: Centre[] = [
  {
    slug: "kolkata",
    name: "Kolkata Centre",
    venue: "Emporium Training and Consultancy Pvt. Ltd.",
    state: "West Bengal",
    address: [
      "230/B AJC Bose Road, 3rd Floor",
      "Minto Park, Kolkata, 700020",
      "West Bengal, India",
    ],
    phones: [tel("98366 08888"), tel("9830 564000")],
    instagram: "emporium_institute",
    image: "/centres/kolkata.jpg",
  },
  {
    slug: "imphal",
    name: "Imphal Centre",
    venue: "Emporium Skills Training Institute",
    state: "Manipur",
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
    venue: "Emporium Skills Training Institute",
    state: "Manipur",
    address: ["Mount Everest College,", "Senapati, Manipur, 795106"],
    phones: [tel("7629916575")],
    instagram: "emporium.senapati",
    image: "/centres/senapati.jpg",
  },
  {
    slug: "maram",
    name: "Maram Centre",
    venue: "Emporium Skills Training Institute",
    state: "Manipur",
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
    venue: "Emporium Skills Training Institute",
    state: "West Bengal",
    address: [
      "Salesian College, Don Bosco Colony, Siliguri, 734010",
      "West Bengal, India",
    ],
    phones: [tel("7811993646"), tel("74070 07517")],
    instagram: "emporiumsiliguri",
    image: "/centres/siliguri.webp",
  },
  {
    slug: "guwahati",
    name: "Guwahati Centre",
    venue: "Emporium Skills Training Institute",
    state: "Assam",
    address: [
      "Sardar Ji Building,",
      "Near Sarusajai Stadium,",
      "Opp Central Jail, NH 37, Lokhra, Guwahati",
      "Assam, India",
    ],
    phones: [tel("8787632386")],
    instagram: "emp0rium.guwahati",
    image: "/centres/guwahati.jpg",
  },
  {
    slug: "gangtok",
    name: "Gangtok Centre",
    venue: "Emporium Skills Training Institute",
    state: "Sikkim",
    address: [
      "Nar Bahadur Bhandari Government College,",
      "Tadong, East Sikkim",
      "Gangtok, 737102, India",
    ],
    phones: [tel("9073983000")],
    instagram: "emporiumsikkim",
    image: "/centres/gangtok.jpg",
  },
  {
    slug: "shillong",
    name: "Shillong Centre",
    venue: "Emporium Skills Training Institute",
    state: "Meghalaya",
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
    venue: "Emporium Skills Training Institute",
    state: "Arunachal Pradesh",
    address: [
      "Don Bosco Youth Centre,",
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
    venue: "",
    state: "Jharkhand",
    address: [
      "Gaurav Tower,",
      "above Bank of Baroda, Mango Chowk,",
      "Jamshedpur, 831012, India",
    ],
    phones: [tel("8986618062")],
    image: "/centres/jamshedpur.jpg",
  },
];

export const instagramUrl = (handle: string) =>
  `https://instagram.com/${handle}`;

/** The venue goes ahead of the street lines: most of these sit inside a named
 *  college, which Maps resolves far better than the postal address alone. */
export const directionsUrl = (centre: Centre) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [centre.venue, ...centre.address].filter(Boolean).join(", "),
  )}`;
