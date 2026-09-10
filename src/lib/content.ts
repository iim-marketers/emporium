export type Stat = { to: number; suffix: string; label: string };

export const stats: Stat[] = [
  { to: 50000, suffix: "+", label: "Students placed worldwide" },
  { to: 29, suffix: "", label: "Different countries placed in" },
  { to: 10, suffix: "+", label: "Centres across India" },
  { to: 15, suffix: "+ yrs", label: "In skills development" },
];

export const placementClaim = {
  count: "Over 15,100+",
  line1: "students",
  line2: "placed",
  line3: "in 14 different countries",
  image: "/placements/hero-v2.png",
};

export const headlineClaim = {
  count: "Over 50,000+",
  line1: "students",
  line2: "placed",
  line3: "in 29 different countries",
  body: "Emporium has one of the best aviation course, cruise line, hospitality course, travel & tourism management, and customer service course. It is a leading Vocational Training Provider (VTP) under the Directorate General of Employment & Craftsmen Training, Ministry of Labour & Employment, Government of India.",
  image: "/misc/students-placed-v2.png",
};

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
  "The Emporium Certificate courses have become well-known for their particular topic, length flexibility, and the value they add to a student's growth plans. Emporium prepares students for high-paying careers.",
];

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

export type TestimonialVideo = {
  id: string;
  title: string;
};

/** Landscape only — the row is 16:9, and the channel's vertical Shorts would
 *  have to be cropped past the point of keeping their subject. */
export const testimonialVideos: TestimonialVideo[] = [
  { id: "0ek6Q1XbsH0", title: "A dream I didn't know was this close" },
  {
    id: "W5rjm9aEL4c",
    title: "Dreams that took flight, careers that began here",
  },
  { id: "n62u4t4Wnhs", title: "From training to takeoff in just 60 days" },
  { id: "X8cC0DivyLk", title: "Where dreams come true" },
  {
    id: "1aojZBio8OM",
    title: "Found us on social media, found my career in 60 days",
  },
  { id: "7MzXSGsoldA", title: "One scroll. One decision. One new life." },
  {
    id: "9MOnUG8LD_E",
    title: "Placed in 40 days at ITC Grand Chola",
  },
  {
    id: "NsogEH67ZqI",
    title: "Placed at ITC Grand Chola and Jio World Centre, Mumbai",
  },
  {
    id: "wsYgzdmCpqs",
    title: "Placed at Jio World Centre, Mumbai",
  },
  {
    id: "WBG9qzZr-dI",
    title: "The Emporium placement policy, explained",
  },
  {
    id: "6RFs-MCQ8U4",
    title: "60 days to your dream career in hospitality, aviation and cruise",
  },
  { id: "c_n6w_oqGvg", title: "Unlock your career potential today" },
];

export const placementsIntro =
  "Since we are working very closely with the industry for the last 9 years in India and we follow all the guidelines given by the airlines, hotels and tourism companies, we do not take open admissions to maintain the quality policy and to ensure that every student gets suitable jobs according to the profile.";

export const placementsBody = [
  "According to the eligibility criteria mentioned above for the various job roles it is mandatory for every candidate to go through screening and interview process and successfully pass in all the two rounds of interview. Our students are getting good starting salaries in India and overseas. Apart from attractive salary packages; our candidates are also getting other benefits like free boarding & lodging, medical, insurance etc. Candidates placed overseas are getting free boarding, lodging, free air tickets, free visa, medical & insurance coverage, traveling allowance etc.",
  "We feel proud to announce that we have achieved 100% placements with all our batches under the Skill Development Initiative Scheme (SDIS) under the Directorate General of Employment & Training, Ministry of Labour & Employment, Govt. of India. 100% placements will be provided to students who will successfully complete the training and will pass in all the subjects in the final exam. Kindly find some pictures below of our beloved students from North East India who have got jobs with the most eminent brands.",
];

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
  image: "/misc/franchise-v2.png",
};
