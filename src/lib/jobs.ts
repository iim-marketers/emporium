/**
 * Live campus recruitment drives, as posted on the institute's home page.
 *
 * Each drive carries a WhatsApp number candidates message to register — the
 * old site's only per-drive action — plus the shared "Apply Now" CV form.
 */

export type Job = {
  id: string;
  title: string;
  /** Split for the board: where the drive runs. */
  location: string;
  position: string;
  /** Named only on the ground-staff drive. */
  employer?: string;
  date: string;
  time: string;
  venue: string;
  /** What the candidate should send over WhatsApp. */
  registerWith: string;
  whatsapp: { display: string; href: string };
  /** Split-flap board fields — uppercase, ≤17 chars for the destination.
   *  `when` is the compact DD/MM the board's date column shows. */
  board: { flight: string; destination: string; when: string; status: string };
};

/** wa.me wants a bare international number with no spaces or symbols. */
function whatsapp(display: string) {
  const digits = display.replace(/\D/g, "");
  const intl = digits.length === 10 ? `91${digits}` : digits;
  return { display, href: `https://wa.me/${intl}` };
}

export const jobs: Job[] = [
  {
    id: "guwahati-ground-staff",
    title:
      "HIRING GROUND STAFF (MALE/ FEMALE) — OPEN TO ALL | CAMPUS INTERVIEW | GUWAHATI, ASSAM",
    location: "Guwahati, Assam",
    position: "RAMP, Security, Customer Service & Cabin Appearance",
    employer: "Hyderabad International Airport",
    date: "16th September 2026",
    time: "8:00 am onwards",
    venue:
      "Emporium Skills Training Institute, Sardar Ji Building, Near Sarusajai Stadium, Opp. Central Jail, NH 37, Lokhra, Guwahati",
    registerWith: "Apply via WhatsApp your Name, Age, Qualification",
    whatsapp: whatsapp("7086617388"),
    board: { flight: "GAU", destination: "GUWAHATI ASSAM", when: "16/09", status: "OPEN ALL" },
  },
  {
    id: "darjeeling-cabin-crew",
    title:
      "HIRING CABIN CREW (FEMALE) | CAMPUS INTERVIEW — ONLY BY INVITATION | DARJEELING WEST BENGAL",
    location: "Darjeeling, West Bengal",
    position: "Cabin Crew",
    date: "23 May 2026",
    time: "8:00 am onwards",
    venue: "Southfield College",
    registerWith: "Apply via WhatsApp your Name, Age, Qualification",
    whatsapp: whatsapp("74070 07517"),
    board: { flight: "DAJ", destination: "DARJEELING W.B.", when: "23/05", status: "INVITE" },
  },
  {
    id: "imphal-cabin-crew-female",
    title:
      "HIRING CABIN CREW (FEMALE) | CAMPUS INTERVIEW — ONLY BY INVITATION | IMPHAL MANIPUR",
    location: "Imphal, Manipur",
    position: "Cabin Crew",
    date: "29 May 2026",
    time: "8:00 am onwards",
    venue:
      "Emporium Skills Training Institute, Mantripukhri Bazaar, Imphal East, Above Kadak Chai Restaurant, Imphal, Manipur",
    registerWith: "Apply via WhatsApp your Name, Age, Qualification",
    whatsapp: whatsapp("98638 17991"),
    board: { flight: "IMF", destination: "IMPHAL MANIPUR", when: "29/05", status: "INVITE" },
  },
  {
    id: "imphal-cabin-crew-all",
    title:
      "HIRING CABIN CREW (MALE & FEMALE) | CAMPUS INTERVIEW — ONLY BY INVITATION | IMPHAL MANIPUR",
    location: "Imphal, Manipur",
    position: "Cabin Crew",
    date: "11 June 2026",
    time: "8:00 am onwards",
    venue:
      "Emporium Skills Training Institute, Mantripukhri Bazaar, Imphal East, Above Kadak Chai Restaurant, Imphal, Manipur",
    registerWith: "Register via WhatsApp your Name, e-mail, Contact No.",
    whatsapp: whatsapp("88091 01202"),
    board: { flight: "IMF", destination: "IMPHAL MANIPUR", when: "11/06", status: "INVITE" },
  },
];

export const jobsIntro =
  "Since we are working very closely with the industry for the last 9 years in India and we follow all the guidelines given by the airlines, hotels and tourism companies, we do not take open admissions to maintain the quality policy and to ensure that every student gets suitable jobs according to the profile.";
