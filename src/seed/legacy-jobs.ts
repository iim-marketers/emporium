/** Input to `src/seed/index.ts` only; the site reads drives from Postgres. */

export type JobSeed = {
  title: string;
  location: string;
  position: string;
  employer?: string;
  date: string;
  time: string;
  venue: string;
  registerWith: string;
  whatsapp: string;
  board: { flight: string; destination: string; status: "OPEN ALL" | "INVITE" };
};

export const jobs: JobSeed[] = [
  {
    title:
      "HIRING GROUND STAFF (MALE/ FEMALE) — OPEN TO ALL | CAMPUS INTERVIEW | GUWAHATI, ASSAM",
    location: "Guwahati, Assam",
    position: "RAMP, Security, Customer Service & Cabin Appearance",
    employer: "Hyderabad International Airport",
    date: "September 16, 2026",
    time: "8:00 am onwards",
    venue:
      "Emporium Skills Training Institute, Sardar Ji Building, Near Sarusajai Stadium, Opp. Central Jail, NH 37, Lokhra, Guwahati",
    registerWith: "Apply via WhatsApp your Name, Age, Qualification",
    whatsapp: "7086617388",
    board: {
      flight: "GAU",
      destination: "GUWAHATI ASSAM",
      status: "OPEN ALL",
    },
  },
  {
    title:
      "HIRING CABIN CREW (FEMALE) | CAMPUS INTERVIEW — ONLY BY INVITATION | DARJEELING WEST BENGAL",
    location: "Darjeeling, West Bengal",
    position: "Cabin Crew",
    date: "May 23, 2026",
    time: "8:00 am onwards",
    venue: "Southfield College",
    registerWith: "Apply via WhatsApp your Name, Age, Qualification",
    whatsapp: "74070 07517",
    board: {
      flight: "DAJ",
      destination: "DARJEELING W.B.",
      status: "INVITE",
    },
  },
  {
    title:
      "HIRING CABIN CREW (FEMALE) | CAMPUS INTERVIEW — ONLY BY INVITATION | IMPHAL MANIPUR",
    location: "Imphal, Manipur",
    position: "Cabin Crew",
    date: "May 29, 2026",
    time: "8:00 am onwards",
    venue:
      "Emporium Skills Training Institute, Mantripukhri Bazaar, Imphal East, Above Kadak Chai Restaurant, Imphal, Manipur",
    registerWith: "Apply via WhatsApp your Name, Age, Qualification",
    whatsapp: "98638 17991",
    board: {
      flight: "IMF",
      destination: "IMPHAL MANIPUR",
      status: "INVITE",
    },
  },
  {
    title:
      "HIRING CABIN CREW (MALE & FEMALE) | CAMPUS INTERVIEW — ONLY BY INVITATION | IMPHAL MANIPUR",
    location: "Imphal, Manipur",
    position: "Cabin Crew",
    date: "June 11, 2026",
    time: "8:00 am onwards",
    venue:
      "Emporium Skills Training Institute, Mantripukhri Bazaar, Imphal East, Above Kadak Chai Restaurant, Imphal, Manipur",
    registerWith: "Register via WhatsApp your Name, e-mail, Contact No.",
    whatsapp: "88091 01202",
    board: {
      flight: "IMF",
      destination: "IMPHAL MANIPUR",
      status: "INVITE",
    },
  },
];
