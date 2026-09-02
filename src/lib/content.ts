/**
 * Page content taken from emporiumsolutions.com — stats, accreditations,
 * centres, alumni, news and blog. Everything the pages render lives here so
 * copy can be edited without touching layout.
 */

/* -------------------------------------------------------------------------- */
/*  Headline numbers                                                           */
/* -------------------------------------------------------------------------- */

export type Stat = { to: number; suffix: string; label: string };

/** Home page band. "Over 50,000+ students placed In 29 different countries". */
export const stats: Stat[] = [
  { to: 50000, suffix: "+", label: "Students placed worldwide" },
  { to: 29, suffix: "", label: "Different countries placed in" },
  { to: 10, suffix: "+", label: "Centres across India" },
  { to: 15, suffix: "+ yrs", label: "In skills development" },
];

/** Placements page headline — the same shape the home page uses for its claim. */
export const placementClaim = {
  count: "Over 15,100+",
  line1: "students",
  line2: "placed",
  line3: "in 14 different countries",
  image: "/placements/hero.png",
};

export const headlineClaim = {
  count: "Over 50,000+",
  line1: "students placed",
  line2: "In 29 different countries",
  body: "Emporium has one of the best aviation course, cruise line, hospitality course, travel & tourism management, and customer service course. It is a leading Vocational Training Provider (VTP) under the Directorate General of Employment & Craftsmen Training, Ministry of Labour & Employment, Government of India.",
  image: "/misc/students-placed.png",
};

/* -------------------------------------------------------------------------- */
/*  Accreditation & empanelment                                                */
/* -------------------------------------------------------------------------- */

export type Accreditation = { src: string; label: string };

export const accreditations: Accreditation[] = [
  {
    src: "/accreditation/msde.png",
    label:
      "Government of India — Ministry of Skill Development & Entrepreneurship",
  },
  {
    src: "/accreditation/nsdc.png",
    label: "National Skill Development Corporation",
  },
  {
    src: "/accreditation/thsc.png",
    label: "Tourism & Hospitality Skill Council",
  },
  { src: "/accreditation/iisc.png", label: "India International Skill Centre" },
];

export const accreditationNote =
  "Emporium is a leading Vocational Training Provider under Directorate General of Employment and Craftsmen Training, Ministry of Labour and Employment, Government of India.";

export const empanelments = {
  intro: "Directorate of Employment, Skill Development & Entrepreneurship",
  items: [
    "Govt. of Nagaland",
    "Govt. of Manipur",
    "Govt. of Meghalaya",
    "Govt. of Arunachal Pradesh",
    "Govt. of Mizoram",
    "Govt. of West Bengal",
  ],
};

/* -------------------------------------------------------------------------- */
/*  Recruiter logo wall                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The old site's recruiter wall. The source files carry no brand names in their
 * filenames or alt text, so the wall is presented as one labelled group rather
 * than pretending to per-logo alt copy we do not have.
 */
export const recruiterLogos: string[] = [
  ...["a", "b", "c", "d"].flatMap((group) =>
    Array.from({ length: 10 }, (_, i) => `/recruiters/${group}${i + 1}.png`),
  ),
  ...Array.from({ length: 7 }, (_, i) => `/recruiters/e${i + 1}.png`),
  "/recruiters/logo8.png",
  "/recruiters/logo10.png",
  "/recruiters/logo15.png",
  "/recruiters/logo9.webp",
  "/recruiters/logo11.webp",
  "/recruiters/el2.webp",
  "/recruiters/el4.webp",
];

/** Marquee strip under the hero — recruiters named in the institute's own copy. */
export const recruiterNames = [
  "Qatar Airways",
  "IndiGo",
  "Park Hyatt",
  "Carnival Cruise",
  "Air Asia",
  "The Oberoi",
  "Go First",
  "Leela Palace",
  "GoAir International",
  "The Hyatt Group",
];

/* -------------------------------------------------------------------------- */
/*  What Emporium offers — the About page's four promises                      */
/* -------------------------------------------------------------------------- */

export type Pillar = { no: string; icon: string; title: string; body: string };

export const pillars: Pillar[] = [
  {
    no: "01",
    icon: "✦",
    title: "Industrial Certified Training Modules",
    body: "Each course covers topics ranging from communication skills, grooming skills, English enhancement and personality improvement to detailed knowledge of the Aviation, Hospitality, Cruise line, Travel & Tourism and Customer Service industries.",
  },
  {
    no: "02",
    icon: "✈",
    title: "State of art facilities",
    body: "Every Emporium centre is fully furnished with computer laboratories and model aeroplanes, supported by updated projectors and cutting-edge audio-visual gear.",
  },
  {
    no: "03",
    icon: "✓",
    title: "100 Percent Placement Assistance",
    body: "A specialized Placement Assistance Cell (PAC) organizes on-campus interviews where senior executives from the largest domestic and foreign airlines, five-star hotels and cruise lines meet Emporium students.",
  },
  {
    no: "04",
    icon: "☺",
    title: "Learning from the best in the industry",
    body: "Faculty members have years of expertise in the field and participate in professional development programs to stay current with industry practice.",
  },
];

export const aboutIntro =
  "Emporium is a leading Vocational Training Institute in India under the Directorate General of Employment & Craftsmen Training, Ministry of Labour & Employment, Government of India.";

export const aboutBody = [
  "Emporium has one of the best aviation course, cruise line, hospitality course, travel & tourism management, and customer service course. It is a leading Vocational Training Provider (VTP) under the Directorate General of Employment & Craftsmen Training, Ministry of Labour & Employment, Government of India.",
  // "The major courses are aviation courses, cruise management, hospitality management, travel management, and Customer Service. Each course covers topics ranging from Communication skills, Grooming skills, English enhancement, and Personality improvement to detailed knowledge of Aviation, Hospitality, Cruise line, Travel & Tourism, and Customer Service Industries.",
  "The Emporium Certificate courses have become well-known for their particular topic, length flexibility, and the value they add to a student's growth plans. Emporium prepares students for high-paying careers.",
];

/* -------------------------------------------------------------------------- */
/*  Training centres shown on the home page                                    */
/* -------------------------------------------------------------------------- */

/** The home page pairs each centre's address with its institution crest. */
export type CentreCard = { image: string; address: string };

export const centreCards: CentreCard[] = [
  {
    image: "/centres/crests/shillong.jpg",
    address:
      "Don Bosco Youth Centre, Don Bosco Square, Laitumkhrah Shillong, Meghalaya",
  },
  {
    image: "/centres/crests/gangtok.jpg",
    address: "Nar Bahadur Bhandari Government College, Tadong, Gangtok, Sikkim",
  },
  {
    image: "/centres/crests/siliguri.jpg",
    address: "Salesian College, Don Bosco Colony, Siliguri, West Bengal",
  },
  {
    image: "/centres/crests/senapati.jpg",
    address: "Mount Everest College, Senapati, Manipur",
  },
  {
    image: "/centres/crests/maram.png",
    address:
      "Don Bosco College Autonomous, Maram Bazar P.O, Senapati District, Manipur, India - 795015",
  },
  {
    image: "/centres/crests/itanagar.png",
    address:
      "Don Bosco Youth Centre, Vivek Vihar, Itanagar, Arunachal Pradesh, 791111 Landmark- Bharatiya Janata Party State office.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Student testimonials (screenshot gallery)                                  */
/* -------------------------------------------------------------------------- */

export const testimonialImages: string[] = Array.from(
  { length: 10 },
  (_, i) => `/testimonials/testimonial-${i + 1}.png`,
);

/* -------------------------------------------------------------------------- */
/*  Placements                                                                 */
/* -------------------------------------------------------------------------- */

export const placementsIntro =
  "Since we are working very closely with the industry for the last 9 years in India and we follow all the guidelines given by the airlines, hotels and tourism companies, we do not take open admissions to maintain the quality policy and to ensure that every student gets suitable jobs according to the profile.";

export const placementsBody = [
  "According to the eligibility criteria mentioned above for the various job roles it is mandatory for every candidate to go through screening and interview process and successfully pass in all the two rounds of interview. Our students are getting good starting salaries in India and overseas. Apart from attractive salary packages; our candidates are also getting other benefits like free boarding & lodging, medical, insurance etc. Candidates placed overseas are getting free boarding, lodging, free air tickets, free visa, medical & insurance coverage, traveling allowance etc.",
  "We feel proud to announce that we have achieved 100% placements with all our batches under the Skill Development Initiative Scheme (SDIS) under the Directorate General of Employment & Training, Ministry of Labour & Employment, Govt. of India. 100% placements will be provided to students who will successfully complete the training and will pass in all the subjects in the final exam. Kindly find some pictures below of our beloved students from North East India who have got jobs with the most eminent brands.",
];

/**
 * The "Emporium Alumni" cards — placed students, captioned with the brand and
 * posting they went to. Image/caption pairs are taken from the institute's own
 * markup, not inferred.
 */
export const placementCards: { image: string; brand: string; role: string }[] =
  [
    { image: "/placements/pic4.jpg", brand: "Carnival", role: "Cruise" },
    { image: "/placements/pic5.jpg", brand: "GoAir", role: "International" },
    {
      image: "/placements/pl2.jpg",
      brand: "Indigo Airlines",
      role: "Domestic",
    },
    { image: "/placements/pic1-1.jpg", brand: "Park Hyatt", role: "Abu Dhabi" },
    {
      image: "/placements/pic2.jpg",
      brand: "Indigo Airlines",
      role: "Domestic",
    },
    { image: "/placements/pic3.jpg", brand: "Leela Palace", role: "Bangalore" },
    {
      image: "/placements/team-member1.jpg",
      brand: "Air Asia",
      role: "Cabin Crew",
    },
  ];

/* -------------------------------------------------------------------------- */
/*  Alumni — "Recruiters Speak"                                                */
/* -------------------------------------------------------------------------- */

export type Alumnus = {
  image: string;
  name: string;
  employer: string;
  quote: string;
};

export const alumni: Alumnus[] = [
  {
    image: "/alumni/steffy-nongthoman.jpeg",
    name: "Steffy Nongthoman",
    employer: "The Park Hyatt Hotel & Villas",
    quote:
      "Emporium Alumni Steffy Nongthoman, currently working at THE PARK HYATT HOTEL & VILLAS — one of the most elite, top luxury, premium global hospitality brands under the HYATT group of hotels from the United States of America.",
  },
  {
    image: "/alumni/alemienla-imsong.jpg",
    name: "Alemienla Imsong",
    employer: "Go First Airlines",
    quote:
      "Emporium Alumni Alemienla Imsong, currently working as a Cabin Crew with Go First Airlines, became the first Naga brand ambassador of the airline. Now her picture is featured on the Go First Airline global website. This is indeed a moment of pride for all of us.",
  },
  {
    image: "/alumni/vikhono-savino.jpg",
    name: "Vikhono Savino",
    employer: "Qatar Airways",
    quote:
      "Vikhono Savino from Nagaland — Emporium alumni. Currently flying with Qatar Airways, World's No.1 Airline, as a Cabin Crew. Vikhono has flown to over 67 countries and has a flying experience of over 7 years now.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Achievements                                                               */
/* -------------------------------------------------------------------------- */

export const achievementsLede =
  "Success is the result of determination, resilience, and seizing opportunities.";

export type Achievement = { image?: string; title: string; body: string };

export const achievements: Achievement[] = [
  {
    image: "/achievements/temsuinla.jpg",
    title:
      "Meet Temsuinla — Emporium alumni | Completed her Cabin Crew graduation.",
    body: "Family is proud of you and we wish you all the very best for your future endeavors. Fly High.",
  },
  {
    title:
      "Two Emporium alumni featured in #7wonders of Tourism & Hospitality Sector Skill Council",
    body: "Linseshi Lamlui — Cabin Crew, Go Air & Nitumoni Gogoi — The Oberoi Hotels, Dubai got featured in this video. Both of them completed their training from Emporium Nagaland.",
  },
  {
    image: "/achievements/lika-zhimomi.jpg",
    title: "Lika Zhimomi at SALT Kite Beach Dubai",
    body: "Emporium Alumni Lika Zhimomi posing for the lens with famous Bollywood Singer Daler Mehndi at SALT Kite Beach Dubai.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Franchise                                                                  */
/* -------------------------------------------------------------------------- */

export const franchise = {
  eyebrow: "India's No.1 Air Hostess Training Institute",
  title: "Join hands and be a part of the fastest growing industry",
  returns: "High Returns In 12 To 18 Months Only",
  invest: "Invest with Emporium",
  intro: "Own Your Franchise Today with Emporium!",
  body: [
    "The Company has over 15 years of experience in skills development for its students in the Aviation, Hospitality, Travel Management, and Customer Service sectors. Successfully trained and placed 30,000+ candidates worldwide.",
    "More than 10 Centers across India including franchise centers.",
  ],
  specs: [
    { label: "Carpet Area of", value: "2000 sq ft to 2500 sq ft" },
    { label: "Minimum Investment of", value: "₹50 Lac to ₹80 Lac" },
  ],
  benefits: [
    "INDIA's No. 1 Air Hostess Training Institute",
    "State of the art infrastructure at Training Centers",
    "Emporium job-oriented Certificate courses in Aviation, Cruise Lines, Hospitality, Travel Management and Customer Service are appreciated by Industry",
    "100% Placement Assistance to students provided by Emporium's Expert & Experienced Placement Cell",
    "Exclusive updated training curriculum for students in soft skills, communications & personality development",
  ],
  support: [
    "Marketing & Advertising",
    "Staff Recruitment",
    "Centralized digital course Delivery",
    "Site section & Layout",
  ],
  image: "/misc/franchise.jpg",
};

/* -------------------------------------------------------------------------- */
/*  Latest news                                                                */
/* -------------------------------------------------------------------------- */

export type NewsItem = { title: string; date?: string; body: string[] };

export const news: NewsItem[] = [
  {
    title:
      "PRESS RELEASE — DON BOSCO YOUTH CENTRE SIGNS MOU WITH EMPORIUM TRAINING & CONSULTANCY PVT. LTD. TO BOOST GLOBAL EMPLOYMENT OPPORTUNITIES FOR MEGHALAYA'S YOUTH",
    date: "September 1, 2025",
    body: [
      "Shillong, September 1, 2025: Don Bosco Youth Centre (DBYC), Shillong, one of the oldest and most trusted training centres in Meghalaya, has signed a Memorandum of Understanding (MoU) with Emporium Training & Consultancy Pvt. Ltd. (ETCPL) to provide skill development and employment opportunities to educated unemployed youths of the state.",
      "Since its inception, Don Bosco Youth Centre has been at the forefront of youth empowerment, providing training in diverse sectors and successfully placing hundreds of students in reputed organizations every year. Known for its commitment to holistic education and skill development, DBYC continues to be a beacon of hope for young people seeking professional growth and livelihood.",
      "ETCPL, India's leading skill training institute in the fields of Aviation, Hospitality, and Cruiseline, is accredited under the Ministry of Skill Development & Entrepreneurship, Government of India, the National Skill Development Corporation (NSDC), and Skill India International. Established in 2007, ETCPL has placed over one lakh youth globally, with a strong presence in Northeast India.",
      "Through this collaboration, ETCPL will conduct professional training at the Don Bosco Youth Centre, Shillong, preparing students for careers in aviation, luxury hospitality, and international cruise lines. Placement opportunities will be extended in over 20 countries worldwide, opening doors for the youth of Meghalaya to build successful careers abroad.",
      "Young aspirants who dream of working as Cabin Crew, Airport Ground Staff, five-star luxury hotel professionals, or on international cruise liners can now connect with the ETCPL office located at the Don Bosco Youth Centre, Laitumkhrah, Shillong. The first batch of training in Shillong will commence in September 2025.",
      "This MoU marks a significant milestone in advancing employment readiness and global mobility for the youth of Meghalaya, bridging local talent with international opportunities.",
    ],
  },
  {
    title:
      "KOLKATA AIRPORT BREAKS PRE-COVID PEAKS, RECORDS ALL-TIME HIGHEST PROFIT",
    body: [
      "Netaji Subhas Chandra Bose International Airport in Kolkata set an all-time financial high in FY 2023-24, registering its highest-ever revenue of ₹1,578.6 crore and net profit of ₹670 crore — 2.5 times that of Chennai airport's profit and 23% more than Kolkata's previous high in 2019-20. This historic performance re-establishes Kolkata as the highest-grossing airport operated by the Airports Authority of India (AAI).",
      "The increase in profitability is primarily attributed to traffic revenue, accounting for 79% of overall earnings, with 85% derived from domestic operations. The airport is also a major transit point in the northeast and has healthy international traffic, particularly to Southeast Asia. Number of passengers was 2.1 crore in 2024, an increase of 32 lakh over 2023, close to the pre-pandemic year's highest of 2.3 crore in 2019. Average per-flight passenger load improved to 146, higher than all earlier years.",
      "Substantial infrastructure overhauls — like a new ATC tower, resurfacing of runways, and apron expansion — have facilitated growth. Terminal capacity expansion and the construction of a domestic cargo terminal are among the projects in the pipeline. With increased investment and growing traffic, the airport plans to reach ₹1,000 crore in profits in 2025-26 and reduce cost by going green.",
    ],
  },
  {
    title:
      "INDIGO TO INTRODUCE DIRECT FLIGHTS FROM MUMBAI TO ALMATY, TASHKENT, TBILISI",
    body: [
      "IndiGo, India's domestic carrier, said it will introduce direct international flights from Mumbai to three key Central Asian cities — Almaty in Kazakhstan, Tashkent in Uzbekistan, and Tbilisi in Georgia. The new flights are expected to enhance connectivity between India and Central Asia.",
      "The airline will operate the Mumbai-Almaty sector on July 1, the Mumbai-Tashkent sector on August 1, and the Mumbai-Tbilisi sector on August 2. IndiGo had previously introduced flights to these destinations from Delhi in 2023, and this development indicates its increasing emphasis on international travel.",
      "It will operate four flights a week to Almaty and Tashkent, and three flights a week to Tbilisi. IndiGo maintains these new destinations will not only enhance travel choices but also assist tourism, trade, and cultural connections between India and the nations concerned.",
      "Vinay Malhotra, IndiGo's Head of Global Sales, stated that these flights will facilitate easier travel and deepen global connections. He added that these culturally diverse destinations would become more accessible to Indian travelers, aligning with IndiGo's vision of making India more closely connected to the world.",
    ],
  },
  {
    title:
      "CIVIL AVIATION MINISTER SAID INDIA IN NEXT FIVE YEARS TO CONSTRUCT FIFTY MORE AIRPORTS",
    body: [
      "Emphasizing the rise of the Indian aviation industry, Union minister K Rammohan Naidu on Monday stated the nation plans to have 50 more airports within the next 5 years. There are presently 162 airports in India and the figure has increased by more than double from 74 airports in 2014. Addressing the annual general meeting of International Air Transport Association (IATA), he also mentioned that the regional air connectivity scheme of the government (UDAN) made air travel democratic and operationalized 619 routes altogether. Plans are also underway to position India as a global Maintenance, Repair and Overhaul (MRO) hub and the segment is expected to be valued at USD 4 billion by 2031, Naidu added. Naidu also called on international players to partner with India in making sustainable aviation fuel as he stressed the decarbonisation imperative.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Latest blog                                                                */
/* -------------------------------------------------------------------------- */

export type BlogPost = {
  image: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

export const blogPosts: BlogPost[] = [
  {
    image: "/blog/aviation-courses.jpg",
    title: "Soaring to Success: Unleash Your Wings with Top Aviation Courses",
    date: "September 21, 2023",
    excerpt:
      "Introduction: In Indian mythology flying chariot denotes the concept of aviation activities during that time. Flying birds …",
    href: "https://www.emporiumsolutions.com/soaring-to-success-unleash-your-wings-with-top-aviation-courses/",
  },
  {
    image: "/blog/global-career.png",
    title:
      "Your Global Career Starts Here: Why Thousands Trust Emporium for Aviation, Hospitality & Cruise Training",
    date: "July 30, 2025",
    excerpt:
      "In a world where skilled professionals are in demand across hospitality, aviation, and cruise industries, the right …",
    href: "https://www.emporiumsolutions.com/your-global-career-starts-here-why-thousands-trust-emporium-for-aviation-hospitality-cruise-training/",
  },
  {
    image: "/blog/top-10-skills.png",
    title: "Top 10 Skills You Need to Succeed in Aviation and Hospitality",
    date: "August 5, 2025",
    excerpt:
      "The aviation and hospitality industries are more than just glamorous uniforms and international travel. They demand precision, …",
    href: "https://www.emporiumsolutions.com/top-10-skills-you-need-to-succeed-in-aviation-and-hospitality/",
  },
  {
    image: "/blog/civil-aviation-boom.png",
    title:
      "India's Civil Aviation Boom: A Sky Full of Opportunities for Aspiring Professionals",
    date: "August 11, 2025",
    excerpt:
      "India's civil aviation sector has soared to impressive heights in recent years. According to recent data, India …",
    href: "https://www.emporiumsolutions.com/indias-civil-aviation-boom-a-sky-full-of-opportunities-for-aspiring-professionals/",
  },
];
