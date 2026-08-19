export type ProgramLevel = "Diploma" | "Certificate" | "Adv. Diploma";

export type Program = {
  slug: string;
  code: string;
  tag: string;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  level: ProgramLevel;
  mode: string;
  gate: string;
  /** Split-flap board fields — uppercase, short enough for the cells. */
  board: { flight: string; destination: string; status: string };
  overview: string;
  modules: { title: string; detail: string }[];
  outcomes: string[];
  careers: string[];
  eligibility: string;
  intake: string;
};

export const programs: Program[] = [
  {
    slug: "aviation-hospitality-travel-management",
    code: "EMP-101",
    tag: "EMP-101 · DIPLOMA",
    title: "Aviation, Hospitality & Travel Management",
    shortTitle: "Aviation, Hospitality & Travel",
    description:
      "Our flagship all-round program covering cabin crew, ground, hospitality and travel — the widest set of career doors.",
    duration: "11 months",
    level: "Diploma",
    mode: "Classroom",
    gate: "A1",
    board: { flight: "EMP101", destination: "AVIATION & TRAVEL", status: "BOARDING" },
    overview:
      "The flagship Emporium diploma is built for students who want every door open. You train across in-flight service, airport operations, hotel front office and travel retail, then specialise in the stream where your interviews go best. It is the widest program we run, and the one our placement cell can push into the most recruiter drives.",
    modules: [
      {
        title: "Aviation industry foundations",
        detail:
          "How airlines, airports and regulators fit together — fleets, routes, terminals, and the roles inside each.",
      },
      {
        title: "In-flight service & safety awareness",
        detail:
          "Cabin service flow, announcements, passenger handling and safety demonstrations practised in the cabin mock-up.",
      },
      {
        title: "Airport ground operations",
        detail:
          "Check-in, baggage, boarding and departure control procedures as run at a real terminal counter.",
      },
      {
        title: "Hospitality & guest relations",
        detail:
          "Front office, food & beverage service standards and the guest-recovery skills hotels screen for.",
      },
      {
        title: "Travel, ticketing & GDS basics",
        detail:
          "Fares, itineraries, reservations and hands-on practice on reservation systems in the computer lab.",
      },
      {
        title: "Grooming, communication & personality",
        detail:
          "Deportment, spoken English, uniform presentation and confidence coaching through the full program.",
      },
      {
        title: "Interview craft & placement readiness",
        detail:
          "Recorded mock interviews, group discussions, resume clinics and recruiter-format screening practice.",
      },
    ],
    outcomes: [
      "Carry yourself to airline and hotel presentation standards",
      "Handle a full check-in to boarding sequence without prompting",
      "Deliver in-flight service and announcements with confidence",
      "Clear group discussions and panel interviews in recruiter format",
    ],
    careers: [
      "Cabin Crew",
      "Airport Customer Service Agent",
      "Front Office Associate",
      "Travel Consultant",
      "Guest Relations Executive",
    ],
    eligibility:
      "Passed or appearing for 10+2 in any stream. Graduates welcome. Minimum age and role criteria vary by airline.",
    intake: "Rolling monthly intakes",
  },
  {
    slug: "air-hostess-cabin-crew-training",
    code: "EMP-201",
    tag: "EMP-201 · CERTIFICATE",
    title: "Air Hostess & Cabin Crew Training",
    shortTitle: "Air Hostess & Cabin Crew",
    description:
      "Focused, fast-track preparation for in-flight roles — service, safety, announcements, grooming and interview craft.",
    duration: "8 months",
    level: "Certificate",
    mode: "Classroom",
    gate: "B2",
    board: { flight: "EMP201", destination: "CABIN CREW", status: "BOARDING" },
    overview:
      "A focused, fast-track route to the cabin. Everything in this certificate points at one outcome: walking into an airline assessment day prepared. You will spend more hours in the cabin mock-up and the grooming studio than in any other program we run.",
    modules: [
      {
        title: "Cabin crew role & responsibilities",
        detail:
          "What crew actually do across a duty cycle — briefing, boarding, service, turnaround and reporting.",
      },
      {
        title: "In-flight service standards",
        detail:
          "Trolley service, meal and beverage sequences, special requests and premium-cabin etiquette.",
      },
      {
        title: "Safety & emergency awareness",
        detail:
          "Safety demonstrations, equipment familiarisation and calm passenger handling under pressure.",
      },
      {
        title: "Announcements & spoken English",
        detail:
          "Diction, pace and clarity for PA announcements, plus English proficiency preparation.",
      },
      {
        title: "Grooming & deportment",
        detail:
          "Skin and hair discipline, makeup, uniform standards, posture and walk in the mirrored studio.",
      },
      {
        title: "Assessment day preparation",
        detail:
          "Reach tests, group activities, and the exact screening format airlines use on open days.",
      },
    ],
    outcomes: [
      "Meet airline grooming and deportment expectations",
      "Run a full cabin service sequence unprompted",
      "Deliver clear PA announcements in neutral English",
      "Handle assessment-day group tasks and panel rounds",
    ],
    careers: [
      "Cabin Crew",
      "In-flight Supervisor (with experience)",
      "Corporate / Charter Crew",
      "Airline Customer Service",
    ],
    eligibility:
      "Passed or appearing for 10+2 in any stream. Airline-specific age, height and medical criteria apply — we guide you on each.",
    intake: "Rolling monthly intakes",
  },
  {
    slug: "airport-ground-staff-customer-service",
    code: "EMP-301",
    tag: "EMP-301 · CERTIFICATE",
    title: "Airport Ground Staff & Customer Service",
    shortTitle: "Airport Ground Staff",
    description:
      "Check-in, boarding, passenger handling and customer service for roles across the terminal and airline front desk.",
    duration: "6 months",
    level: "Certificate",
    mode: "Classroom",
    gate: "C3",
    board: { flight: "EMP301", destination: "GROUND SERVICES", status: "CHECK-IN" },
    overview:
      "The terminal is where most aviation careers actually begin. This certificate trains you on the counter and gate work airlines and ground handlers hire for in volume — and it is our shortest route to a first aviation job.",
    modules: [
      {
        title: "Terminal & airline operations",
        detail: "Who does what across landside, airside, ramp and the airline front desk.",
      },
      {
        title: "Check-in & departure control",
        detail: "Passenger acceptance, documents, seat allocation and baggage acceptance rules.",
      },
      {
        title: "Boarding & gate handling",
        detail: "Gate announcements, boarding sequence, delays and irregular-operations handling.",
      },
      {
        title: "Passenger service & recovery",
        detail:
          "Special assistance, unaccompanied minors, complaints and the language that de-escalates.",
      },
      {
        title: "Safety & security awareness",
        detail: "Restricted items, ramp safety basics and the reporting discipline expected airside.",
      },
      {
        title: "Grooming & interview prep",
        detail: "Uniform presentation, communication drills and recruiter-format mock interviews.",
      },
    ],
    outcomes: [
      "Run a check-in counter interaction end to end",
      "Handle boarding, delays and difficult passengers calmly",
      "Apply baggage and document rules accurately",
      "Present to airline front-desk grooming standards",
    ],
    careers: [
      "Airport Customer Service Agent",
      "Check-in / Ticketing Staff",
      "Ground Handling Executive",
      "Airline Front Desk",
      "Lounge Executive",
    ],
    eligibility:
      "Passed or appearing for 10+2 in any stream. Graduates welcome. Background checks apply for airside roles.",
    intake: "Rolling monthly intakes",
  },
  {
    slug: "hospitality-guest-experience-management",
    code: "EMP-401",
    tag: "EMP-401 · DIPLOMA",
    title: "Hospitality & Guest Experience Management",
    shortTitle: "Hospitality & Guest Experience",
    description:
      "Front office, food & beverage and guest relations for careers with leading hotels, resorts and premium brands.",
    duration: "9 months",
    level: "Diploma",
    mode: "Classroom",
    gate: "D4",
    board: { flight: "EMP401", destination: "GUEST EXPERIENCE", status: "BOARDING" },
    overview:
      "Hospitality rewards people who make service look effortless. This diploma builds that in the live service setups on campus — front office, restaurant floor and guest relations — so a five-star property can put you in front of guests from week one.",
    modules: [
      {
        title: "Hospitality industry & brand standards",
        detail: "How hotel groups are structured and what separates a three-star from a five-star SOP.",
      },
      {
        title: "Front office operations",
        detail: "Reservations, check-in and check-out, upselling and property-management system basics.",
      },
      {
        title: "Food & beverage service",
        detail: "Restaurant floor sequence, table setup, order taking and beverage service on the live setup.",
      },
      {
        title: "Housekeeping & rooms division",
        detail: "Room standards, inspection discipline and the coordination front office depends on.",
      },
      {
        title: "Guest relations & service recovery",
        detail: "Reading a guest, handling complaints and turning a bad stay around.",
      },
      {
        title: "Grooming, etiquette & communication",
        detail: "Presentation, dining etiquette and the spoken polish premium brands screen for.",
      },
    ],
    outcomes: [
      "Run front-desk check-in and check-out confidently",
      "Serve a full restaurant sequence to brand standard",
      "Resolve guest complaints without escalation",
      "Interview to premium-hospitality presentation standards",
    ],
    careers: [
      "Front Office Associate",
      "Guest Relations Executive",
      "F&B Service Associate",
      "Reservations Executive",
      "Lounge & Hospitality Staff",
    ],
    eligibility:
      "Passed or appearing for 10+2 in any stream. Graduates welcome.",
    intake: "Rolling monthly intakes",
  },
  {
    slug: "travel-tourism-management",
    code: "EMP-501",
    tag: "EMP-501 · CERTIFICATE",
    title: "Travel & Tourism Management",
    shortTitle: "Travel & Tourism",
    description:
      "Ticketing, itineraries, GDS basics and destination knowledge for travel agencies, OTAs and tour operators.",
    duration: "6 months",
    level: "Certificate",
    mode: "Classroom",
    gate: "E5",
    board: { flight: "EMP501", destination: "TRAVEL & TOURISM", status: "ENROLLING" },
    overview:
      "Travel work is part product knowledge, part systems, part sales. This certificate covers all three — fares and itineraries, hands-on reservation systems, and the consultative selling that agencies and online travel companies hire for.",
    modules: [
      {
        title: "Travel industry & distribution",
        detail: "Agencies, OTAs, tour operators, consolidators — who earns what, and how bookings flow.",
      },
      {
        title: "Fares, ticketing & documentation",
        detail: "Fare construction basics, rules, refunds, reissues and travel documentation.",
      },
      {
        title: "GDS & reservations practice",
        detail: "Hands-on searching, booking and managing itineraries in the computer lab.",
      },
      {
        title: "Destination & product knowledge",
        detail: "Domestic and international destinations, seasons, visas and package building.",
      },
      {
        title: "Tour operations & itinerary design",
        detail: "Costing, vendor coordination and building itineraries that actually sell.",
      },
      {
        title: "Sales, service & interview prep",
        detail: "Consultative selling, client handling and recruiter-format mock interviews.",
      },
    ],
    outcomes: [
      "Build and price a multi-city itinerary",
      "Issue, reissue and refund tickets correctly",
      "Work confidently inside a reservation system",
      "Sell travel products consultatively to a client",
    ],
    careers: [
      "Travel Consultant",
      "Ticketing Executive",
      "Tour Coordinator",
      "OTA Customer Support",
      "Visa & Documentation Executive",
    ],
    eligibility: "Passed or appearing for 10+2 in any stream. Graduates welcome.",
    intake: "Rolling monthly intakes",
  },
  {
    slug: "advanced-airport-aviation-management",
    code: "EMP-601",
    tag: "EMP-601 · ADVANCED",
    title: "Advanced Airport & Aviation Management",
    shortTitle: "Advanced Aviation Management",
    description:
      "Operations, ramp, cargo and supervisory skills for those aiming at management tracks within the aviation industry.",
    duration: "12 months",
    level: "Adv. Diploma",
    mode: "Classroom",
    gate: "F6",
    board: { flight: "EMP601", destination: "AIRPORT MGMT", status: "CHECK-IN" },
    overview:
      "For students aiming past the front line. The advanced diploma goes into operations, ramp coordination, cargo and the supervisory habits — rostering, reporting, incident handling — that airlines and ground handlers look for when they promote from within.",
    modules: [
      {
        title: "Airport operations management",
        detail: "Terminal flow, slot and stand allocation, and the coordination behind an on-time departure.",
      },
      {
        title: "Ramp & turnaround coordination",
        detail: "Turnaround sequence, ground support equipment, safety discipline and delay codes.",
      },
      {
        title: "Air cargo & logistics",
        detail: "Cargo acceptance, documentation, dangerous-goods awareness and warehouse flow.",
      },
      {
        title: "Airline commercial & revenue basics",
        detail: "Scheduling, load factors, ancillary revenue and why routes get cut.",
      },
      {
        title: "Aviation safety, security & compliance",
        detail: "Regulatory framework, audits, incident reporting and a safety-first working culture.",
      },
      {
        title: "Supervisory & people skills",
        detail: "Rostering, briefing a team, escalation discipline and management-round interview prep.",
      },
    ],
    outcomes: [
      "Coordinate a turnaround against an on-time target",
      "Read and act on operational reports and delay codes",
      "Apply safety and compliance procedure correctly",
      "Interview for supervisory and management-track roles",
    ],
    careers: [
      "Airport Operations Executive",
      "Ramp Coordinator",
      "Cargo Operations Executive",
      "Duty Supervisor (with experience)",
      "Ground Handling Team Lead",
    ],
    eligibility:
      "Graduates preferred; 10+2 with relevant aviation experience considered. Background checks apply for airside roles.",
    intake: "Two intakes a year",
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

export const programSlugs = programs.map((program) => program.slug);
