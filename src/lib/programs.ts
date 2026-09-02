/**
 * The three certificate courses Emporium runs, as published on
 * emporiumsolutions.com. Course copy, module lists, job roles, pay bands and
 * FAQs are reproduced from the institute's own pages.
 */

export type ProgramLevel = "Certificate" | "Advanced Certificate" | "Fast Track";

export type PayBand = {
  /** Role the band applies to — omitted when the course quotes a single band. */
  role?: string;
  domestic: string;
  international: string;
};

export type Faq = { q: string; a: string };

export type Program = {
  slug: string;
  code: string;
  tag: string;
  /** Name as it appears on the home page course card. */
  title: string;
  shortTitle: string;
  /** The course page's own H1. */
  heading: string;
  /** Card blurb, verbatim from the home page. */
  description: string;
  duration: string;
  level: ProgramLevel;
  mode: string;
  gate: string;
  image: string;
  cardImage: string;
  /** Long-form sections, in the order the course page runs them. */
  overview: string;
  whatIs: { heading: string; body: string[] };
  about: { heading: string; body: string[] };
  why: { heading: string; body: string[] };
  trainingMethodology: string;
  modules: string[];
  careers: string[];
  pay: PayBand[];
  eligibility: string;
  documents: string[];
  intake: string;
  faqs: Faq[];
};

/** Shared across all three courses — the institute quotes it on every page. */
const positionDetails = [
  "With practically all of the top regional and international airlines, prestigious 5-star hotel chains, and well-known businesses in the travel, hospitality, and customer service industries, Emporium has successfully built reputable and lasting connections. These businesses then hold private on-campus interviews for Emporium students at different training facilities across the country.",
  "Today, the most popular career in aviation is that it has flexible educational requirements and offers rich prospects. The aviation business provides several work prospects, regardless of a candidate's 10+2 certificate or degree in aviation, hospitality, cruise lines, tourism, or similar fields. Starting salaries in aviation typically range from INR 2 to INR 5 lakhs annually. The remuneration may increase to INR 15 to 35 lakhs annually after five or more years of experience.",
  "In order to assist its students in landing their ideal jobs after completing its courses, Emporium has established a specialized Placement Assistance Cell (PAC). The group also organizes on-campus interviews where senior executives from all the largest domestic and foreign airlines, five-star hotels, cruise lines, and reputable Hospitality, Travel, and Customer Service organizations meet and interact with Emporium students. The organization has a successful track record in this area, placing its graduates in reputable Hospitality, Travel, and Customer Service companies worldwide. These include top domestic and international airlines, hotels, and cruise lines.",
];

const trainingMethodology =
  "The 1 Year Certificate Course in Aviation and Hospitality Management is designed for trainees who want flying careers in Airlines & Hotel Industry. This course will enhance your personality with essential learning needs based on Cabin Crew Requirements. Grooming & Deportment, Effective English Communication, Attitude Formulation, to become a True Professional.";

export const eligibilityCriteria =
  "The Basic Eligibility For Pursuing This Course Is 10+2 Qualification From Any Recognised Educational Board.";

export const requiredDocuments = [
  "10 + 2 Admit Card & Mark sheet",
  "Class 10 Admit card & Marksheet",
  "Highest qualification documents (If Any)",
  "Two passport size color photographs",
  "Aadhar Card / Pan Card / Driving License / Passport (Any one) as ID & address proof",
];

export const programs: Program[] = [
  /* ---------------------------------------------------------------- aviation */
  {
    slug: "aviation",
    code: "AVN-12",
    tag: "AVIATION · 12 MONTHS",
    title:
      "Advanced Certification in Aviation, Hospitality Management and Travel and Tourism",
    shortTitle: "Aviation, Hospitality & Travel",
    heading:
      "Aviation Courses After 12th: Become an Air Hostess, Cabin Crew, and More",
    description:
      "This 1 Year Certificate Course is designed for trainees who want flying careers in Airlines & Hotel Industry…",
    duration: "12 months",
    level: "Advanced Certificate",
    mode: "Classroom",
    gate: "A1",
    image: "/courses/aviation-hero.png",
    cardImage: "/courses/aviation-card.png",
    overview: positionDetails.join("\n\n"),
    whatIs: {
      heading: "What is a course in aviation?",
      body: [
        "All factors of the aviation sector are covered in aviation courses, including airport management, ground staff, training for cabin crew, obtaining a pilot's licence, and hospitality. The many demands of the aviation sector are considered in all aviation courses.",
        "For people who are interested in this industry, there are courses and job profiles in aviation. You can choose from a wide variety of courses if you want to work in the aviation sector.",
      ],
    },
    about: {
      heading: "About Air hostess Course",
      body: [
        "There are several aviation courses that can be pursued after 12th grade. Students can take short-term courses like a diploma or certification in aviation or degree-level courses. Many students opt for aviation courses after 12th grade.",
        "There are many opportunities for students to discover their talents in this industry thanks to aviation courses after 12th and beyond graduation. After completing high school, students can enrol in UG, PG, and diploma-level aviation programmes. According to your interests, eligibility for matching, and programme timeline, you can choose any of them.",
        "The activities associated with the aviation sector are referred to as aviation. For graduates in India, it offers a variety of employment prospects. After finishing high school, many individuals choose to study aviation. A degree in aviation counts as a proactive effort to give eager applicants access to education that would equip them with knowledge of airline departments. For those looking to start a career in aviation, it provides a wide range of employment prospects.",
        "The most attractive thing about aviation programmes is that students from all academic backgrounds, including arts, science, and business, can take advantage of interesting employment options in the aviation industry. Candidates are trained for the aviation industry after a positive interview. Things have changed a lot lately! There are numerous courses available that focus on the aviation industry and its needs. The Emporium Training Institute offers a wide range of aviation courses after 12th grade.",
      ],
    },
    why: {
      heading: "Why take the Emporium aviation course?",
      body: [
        "Each Emporium student receives top-notch instruction in personality development, communication skills, grooming, aviation, hospitality, travel, and computerised reservation systems by leveraging the strength of the country's largest network. Each Emporium centre is fully furnished with computer laboratories and model aeroplanes, and it supports top-notch infrastructure. The centre is accompanied by crucial teaching tools like updated projectors and cutting-edge audio-visual gear. Emporium also teaches ancillary skills like swimming and first aid, which are essential for applying to reputable international airlines.",
        "You can take a variety of aviation courses to help you land a decent job in the aviation sector. When you choose the right aviation course after completing your 12th grade, you will be able to earn a handsome living.",
        "The needs of the aviation sector are taken into account when designing aviation courses. By taking aviation classes after graduating from high school, you can pursue a job as a commercial pilot, ground personnel, cabin crew, airport manager, etc. This job is for you if you wish to work in the aviation sector.",
      ],
    },
    trainingMethodology,
    modules: [
      "Spoken English",
      "Aviation",
      "Hospitality",
      "Tourism",
      "Corporate Skill",
      "Customer Service Skills",
      "Personality Development",
      "Grooming & Deportment",
      "Audio Visual Classroom Section",
      "On Job Training",
    ],
    careers: [
      "Cabin Crew",
      "Flight Steward",
      "Air Hostess",
      "Airport Ground services",
      "Airport Customer care services",
      "Airport Security Services",
      "Airport Cargo Services",
      "Flight Ticketing Services",
    ],
    pay: [
      {
        role: "Flight Attendant",
        domestic:
          "Approx. Rs. 3.5 Lacs to Rs. 5.5 Lacs p.a. + Other Lucrative Benefits",
        international:
          "Rs. 9.6 Lacs to Rs. 15 Lacs p.a. + Other Lucrative Benefits",
      },
      {
        role: "Ground Staff",
        domestic:
          "Approx. Rs. 2 Lacs to Rs. 3.5 Lacs p.a. + Other Lucrative Benefits",
        international:
          "Rs. 4.5 Lacs to Rs. 7.5 Lacs p.a. + Other Lucrative Benefits",
      },
    ],
    eligibility: eligibilityCriteria,
    documents: requiredDocuments,
    intake: "Rolling intakes across all Emporium centres",
    faqs: [
      {
        q: "How do I apply for an air hostess course?",
        a: "After 12th grade, if you want to become an Air Hostess, you need a basic qualification from a recognized board to apply to the Aviation Emporium training institute. 12th grader pass, first- or second-year graduate student, passed or appeared in the 12th grade (students in their final year of high school may also apply; the diploma, however, won't be given out until the 12th grade has successfully completed). Proficiency in the English language and the quality of being likable are required. Individual interviews will be used as the basis for selection.",
      },
      {
        q: "What is the eligibility for air hostesses?",
        a: "The lowest age requirement to apply for the course is 18 years, while the maximum age requirement is 26 years. In order to become an air hostess, the aspirant must have completed their 10+2 schooling in any stream or have an undergraduate degree in aviation. The applicant must be at least five feet and two inches tall. The applicant must not be married at the time they enroll in the course. The applicant's vision must be 6/6. The individual must possess a charming demeanor and be physically active. A preliminary screening will be conducted before a written test, a discussion in groups, and individual interviews. Candidates that are accepted undergo the requisite training in pertinent processes.",
      },
      {
        q: "How to become an air hostess?",
        a: "You must have obtained a passing grade in class 12 in any stream to pursue a career as an air hostess. After passing the board exams, you can enroll in an Emporium Training Institute Certificate or Diploma level program in this area. You must be at least 18 years old and at least 5 feet 2 inches tall to be admitted to these courses. In addition, it's critical that you have a current passport.",
      },
      {
        q: "How many days does an air hostess work in a month?",
        a: "Air hostesses have an interesting career path. The profession of an air hostess involves flying in airplanes and helping passengers during flight times. On international routes, shift lengths are longer. A minimum of 75 to 90 hours must be worked by an air hostess each month. She also puts in an additional 50 hours per week managing paperwork, plane mechanics, and planning.",
      },
      {
        q: "How to dress up for an air hostess interview?",
        a: "It is advised to pair a black or grey formal skirt with black stockings and a top-quality Georgette formal shirt that won't wrinkle. Neutral-colored bags and shoes are required. Avoid wearing heels with a heel higher than 2-3 inches. And you're ready to use your personality to win over interviewers.",
      },
      {
        q: "After graduation, how can I become a cabin crew member?",
        a: "We firmly believe that there are times when one wishes to change their career path after graduating or obtain an undergraduate degree before making that career leap. Rest confident that there are many chances for you to pursue a career as an air hostess after graduation. Age: 18 to 26 (at most 27) for domestic/international airlines — may vary. Height: 5'2\" (155–157 centimeters), weight in relation to height, Indian passport holder or eligible for one, 6/6 in both eyes for vision, speaking fluently and clearly in English, and skin that is clear and free of any tattoos.",
      },
    ],
  },

  /* ------------------------------------------------------------- hospitality */
  {
    slug: "hospitality",
    code: "HOS-12",
    tag: "HOSPITALITY · 12 MONTHS",
    title: "Certification in Advanced Hospitality Management",
    shortTitle: "Advanced Hospitality Management",
    heading: "Get Advanced Certification in Hospitality Management",
    description:
      "This 06 Months Certificate Course is a fast track course for aspirants willing to become part of Hotel Industry…",
    duration: "12 months",
    level: "Advanced Certificate",
    mode: "Classroom",
    gate: "B1",
    image: "/courses/hospitality-hero.png",
    cardImage: "/courses/hospitality-card.png",
    overview: positionDetails.join("\n\n"),
    whatIs: {
      heading: "What is a course in Hospitality?",
      body: [
        "Making guests or customers feel welcome calls for the application of strategic thought, innovation, financial and transactional acumen, and a passion for service. The food and beverage service business, travel and tourism, as well as the real estate, financial services, and technology sectors within the hospitality industry, can all be explored through a career in hospitality management and operations. You may help shape the business and create a career that is entirely unique by putting your knowledge and leadership abilities to use.",
        "The general operations of a hotel are managed by those with this job profile. That one can pursue after 12th grade in the Science/Commerce/Arts streams. You may apply for hotel management courses after 12th grade if you graduated from any stream. This includes courses after 12th science, courses after 12th arts, or courses after 12th commerce.",
        "We begin looking for suitable courses that can be taken after the 12th standard after finishing the 12th exam. In order to succeed in the sector of hotel management, candidates must have a strong personality and effective communication abilities. Even if you are pressed for time, you might consider the Vocational Courses in Hotel Management stream.",
        "Students seeking hotel management courses receive professional, certified instruction. You learn how to handle the hotel and your guests from them. After a predetermined amount of time, some authorised courses give completion certificates. Hotel management degree, diploma, and certificate programmes can include hotels after 12th grade.",
      ],
    },
    about: {
      heading: "About Hospitality Management",
      body: [
        "While the area of hospitality management lays an emphasis on making sure guests, whether they are visiting for business or leisure, have a delightful experience. It also involves the profitability and commercial operations of a hotel or resort, but it involves much more. In addition to dealing with hospitality, hotel administration also incorporates issues of marketing, real estate, and operations on a more general corporate level. You can pursue a range of occupations with a degree in hotel administration, from hospitality management to business ventures.",
        "You can fulfil your aspirations of working in the hospitality industry by enrolling in one of the Hotel Administration Certification courses offered by Emporium Training Institute. Learn more about career opportunities in the hospitality industry. In addition, you can complete your Hotel Administration courses at Emporium Training Institute. This can give you the knowledge and abilities you need to innovate and ingrain the idea of hospitality as the foundation of your professional life.",
      ],
    },
    why: {
      heading: "Why take the Emporium Hospitality course?",
      body: [
        "The courses are created to give students the knowledge and abilities needed by hotels in the twenty-first century. Along with producing managers for the hotel business, Emporium has also given students the chance to study, complete internships, and work for prominent global hospitality companies. Today, Emporium operates cutting-edge facilities on par with the finest hotel schools worldwide. Our faculty members have years of expertise in the field and participate in professional development programs to stay current.",
        "The Emporium has consistently been rated as one of Kolkata's finest institutions for hospitality management. World-class infrastructure and a brand-new campus are located in a lush area of greater Kolkata. We offer a comprehensive learning and development environment. We take great satisfaction in being a school that puts students first. Early on, students in this setting are given resources and tasks. In addition to improving their academic achievement, this promotes their overall growth.",
        "Each Emporium student receives outstanding instruction in the areas of personality development, communication skills, grooming, aviation, hospitality, travel, and computerized reservation systems. This is done by leveraging the strength of the largest network in India and an international presence.",
      ],
    },
    trainingMethodology,
    modules: [
      "Spoken English",
      "Grooming",
      "Soft Skills",
      "Hospitality",
      "Corporate Skill",
      "Customer Service Skills",
    ],
    careers: [
      "Front Office Executive",
      "Guest Relations Executive",
      "Food & Beverage (F&B) Associates",
      "Housekeeping Floor Supervisor",
      "Lobby Manager",
    ],
    pay: [
      {
        domestic:
          "Approx. Rs. 1.8 Lacs to Rs. 3.6 Lacs p.a. + Other Lucrative Benefits",
        international:
          "Rs. 3.5 Lacs to Rs. 6 Lacs p.a. + Other Lucrative Benefits",
      },
    ],
    eligibility: eligibilityCriteria,
    documents: requiredDocuments,
    intake: "Rolling intakes across all Emporium centres",
    faqs: [
      {
        q: "What is Hospitality Management?",
        a: "Hospitality Management is a dynamic field that encompasses the study and practice of managing hotels, resorts, restaurants, airlines, cruise lines, and tourism services. This comprehensive discipline focuses on delivering exceptional customer experiences while developing essential skills in operations management, leadership, and business administration within the vibrant hospitality industry.",
      },
      {
        q: "Why should I choose a Hospitality Management course in Kolkata?",
        a: "Kolkata is known as a 'City of Joy' and stands out as an ideal destination for Hospitality offering a unique blend of affordability and quality. The city provides students with direct access to prestigious hotels, leading airlines, and established tourism companies, creating invaluable networking opportunities and practical exposure. This strategic advantage, combined with experienced faculty and industry connections, makes Kolkata an excellent platform for your hospitality career.",
      },
      {
        q: "What is the role of Hospitality in Aviation?",
        a: "Hospitality in aviation plays a crucial role in ensuring passenger satisfaction and comfort throughout their travel experience. This includes managing in-flight services, overseeing ground staff operations, coordinating lounge amenities, and creating seamless experiences from check-in through boarding, during the flight, and until landing. Aviation hospitality professionals are the face of airlines, dedicated to making every journey memorable and comfortable.",
      },
      {
        q: "What are the career options after completing a Hospitality course?",
        a: "Completing a hospitality course an individual hotelier can pursue his career in hotels, restaurants, airlines, and cruises, with different roles in the Food & Beverage department, Event Planner, Front Office Executive, Housekeeping Manager, Cabin Crew, or even Hospitality Entrepreneur. Beyond traditional roles, you can work in tourism, catering, hospital administration, club management, or specialized areas like sales, marketing, and HR within the service industry.",
      },
      {
        q: "Is Hospitality Management a good career choice in 2025 and beyond?",
        a: "Absolutely. The hospitality industry is experiencing robust growth driven by the expansion of tourism, aviation, and global travel. With increasing disposable incomes and a growing appetite for travel experiences, the sector offers strong job opportunities both within India and internationally. The industry's resilience and continuous evolution make it a promising career choice for the foreseeable future.",
      },
      {
        q: "What qualifications are required for a Hospitality course?",
        a: "The minimum educational qualification typically required is completion of 10+2 (Higher Secondary) from any stream. Beyond academic credentials, possessing strong communication skills, a genuine passion for service excellence, an outgoing personality, and cultural awareness significantly enhance your prospects in this people-oriented industry.",
      },
      {
        q: "What is the salary after completing a Hospitality Management course?",
        a: "Entry-level professionals can expect starting salaries ranging from ₹15,000 to ₹30,000 per month, with variations based on the specific job role, organization type, and location. As you gain experience and specialize in particular areas, salary potential increases substantially, with mid-level and senior positions offering significantly higher compensation packages, especially in international placements.",
      },
      {
        q: "Is a Hospitality course suitable for cabin crew jobs?",
        a: "Yes, hospitality courses provide excellent foundational training for cabin crew careers. The curriculum covers essential areas including professional grooming standards, effective communication techniques, customer service excellence, safety protocols, emergency procedures, and cultural sensitivity — all critical competencies for successful cabin crew members in today's competitive aviation industry.",
      },
      {
        q: "Which is the best Hospitality training institute in Kolkata?",
        a: "Emporium Training Institute stands as Kolkata's premier destination for hospitality education, distinguished by its industry-aligned curriculum, experienced faculty with real-world expertise, hands-on practical training opportunities, modern facilities, and robust placement support. Our commitment to excellence ensures that students are thoroughly prepared to excel in their hospitality careers, both in India and internationally.",
      },
    ],
  },

  /* ------------------------------------------------------------------ cruise */
  {
    slug: "cruise",
    code: "CRU-12",
    tag: "CRUISE LINE · 12 MONTHS",
    title: "Exclusive Fast Track Certification in Cruise Lines",
    shortTitle: "Cruise Line Careers",
    heading: "Get Your Cruise Careers with a Cruise Ship Management Course",
    description:
      "This 03 Months fast track course is designed for aspirants willing to become part of Luxurious Cruise Lines…",
    duration: "12 months",
    level: "Fast Track",
    mode: "Classroom",
    gate: "C1",
    image: "/courses/cruise-hero.png",
    cardImage: "/courses/cruise-card.png",
    overview: [
      "The operations of cruise ships offer a wide range of opportunities for people with different backgrounds in hospitality. Each cruise ship operations manager is essential to providing passengers with the highest level of service, from creating delectable meals to locating proper housing. Living in a setting analogous to a five-star hotel for extended periods of time has its advantages, even though their obligations can prohibit them from experiencing every Caribbean atmosphere or Atlantic landscape the ship passes through.",
      positionDetails[1],
      positionDetails[2],
    ].join("\n\n"),
    whatIs: {
      heading: "What is a course in Cruise?",
      body: [
        "All facets of the aviation sector are covered in aviation courses, including airport management, ground staff, training for cabin crew, obtaining a pilot's licence, and hospitality. The many demands of the aviation sector are considered in all aviation courses.",
        "For people who are interested in this industry, there are courses and job profiles in aviation. You can choose from a wide variety of courses if you want to work in the aviation sector.",
      ],
    },
    about: {
      heading: "About Cruise Course",
      body: [
        "The cruise ship management industry offers a wide range of options for those with various hospitality backgrounds. Each cruise ship manager is vital to maintaining the highest level of customer service, whether they are cooking gourmet meals or finding a guest a new accommodation. While their duties might prevent them from taking in every South American vista or Caribbean breeze that the ship encounters, spending extended periods of time in a five-star hotel has its own unique benefits.",
        "You have the chance to interact with individuals from all over the world by working aboard a cruise ship. It helps you establish a confident persona and gives you the opportunity to network internationally.",
        "Typically, the cost of lodging and food falls under the employer's purview. It is simple to save money while leading a luxurious lifestyle. This is because cruise ship operations management jobs require you to spend at least six months of the year on board the ship. This industry is advancing very quickly, making it a very attractive option for people seeking a fast track to success.",
        "A career in cruise ship management offers these advantages in addition to the chance to visit remote areas of the world and establish a prosperous future. Last but not least, one of the most rewarding things about the profession is the opportunity to travel for free.",
        "Even though the hospitality and tourism sector is one of the fastest growing and most competitive in the world, there is still a shortage of qualified workers. The hospitality industry on cruise ships offers some of the most exciting occupations. You may launch your career with the Emporium cruise ship operation certificate program.",
      ],
    },
    why: {
      heading: "Why take the Emporium Cruise course?",
      body: [
        "The courses are created to give students the knowledge and abilities needed on cruise ships in the twenty-first century. Along with producing cruise line management professionals, Emporium has also given students the chance to study, complete internships, and work for prominent global cruise ship companies. Today, Emporium operates cutting-edge facilities on par with the highest quality cruise line education worldwide. Our faculty members have years of expertise in the field and participate in professional development programs to stay current.",
        "The Emporium has consistently been rated as one of Kolkata's finest institutions for cruise line management. World-class infrastructure and a brand-new campus are located in a lush area of greater Kolkata. We offer a comprehensive learning and development environment. We take great satisfaction in being a school that puts students first.",
        "This curriculum is created to give students the knowledge and skills necessary for a successful career in the hospitality and food and beverage operations of the cruise industry. It also provides a comprehensive understanding of all aspects of life and works on a cruise ship. The entire cruise business will be covered in class, including its history, participants, passengers, legal framework, and problems with professionalism, safety, and security.",
      ],
    },
    trainingMethodology,
    modules: [
      "Cruise line operations and management",
      "Cost control of material management",
      "Hygiene and sanitation",
      "Corporate Skill",
      "Spoken English",
      "Grooming",
      "Soft skill",
      "Hospitality",
      "Customer service skills",
    ],
    careers: [
      "Front Office Associates",
      "Food & Beverage (F&B)",
      "Services Crew",
      "Housekeeping attendants",
      "Kitchen Stewards",
      "Casino Crew",
      "Pool Attendants",
    ],
    pay: [
      {
        domestic:
          "Approx. Rs. 1.8 Lacs to Rs. 3.5 Lacs p.a. + Other Lucrative Benefits",
        international:
          "Approx. Rs. 6.5 Lacs to Rs. 8.5 Lacs p.a. + Other Lucrative Benefits",
      },
    ],
    eligibility: eligibilityCriteria,
    documents: requiredDocuments,
    intake: "Rolling intakes across all Emporium centres",
    faqs: [
      {
        q: "What is a Cruise Line course?",
        a: "A Cruise Line course is a specialized training program designed to prepare students for exciting careers aboard luxury cruise ships. This comprehensive course covers multiple aspects of cruise operations including hospitality services, housekeeping management, food and beverage operations, entertainment coordination, and customer service excellence. Students gain both theoretical knowledge and practical skills needed to thrive in the unique and dynamic environment of international cruise liners.",
      },
      {
        q: "What are the job roles available in a cruise line career?",
        a: "The cruise industry offers a wide array of exciting career opportunities including cruise cabin crew positions, food and beverage service staff, housekeeping and stateroom attendants, guest service assistants, front desk coordinators, spa and wellness staff, entertainment team members, youth counselors, retail staff, photographers, casino staff, and shore excursion coordinators. Each role contributes to creating unforgettable experiences for guests while offering unique personal and professional growth opportunities.",
      },
      {
        q: "Who can apply for a Cruise Line course?",
        a: "Students who have successfully completed their 10+2 (Higher Secondary) education from any stream are eligible to apply for cruise line training. While academic qualifications form the foundation, candidates with strong communication skills, a friendly and positive attitude, physical fitness, adaptability, and genuine enthusiasm for hospitality and travel are particularly well-suited for this career path. A passion for meeting people from diverse cultures is a valuable asset.",
      },
      {
        q: "What is the age limit to work on a cruise ship?",
        a: "The minimum age requirement to work on most cruise ships is 18 years. However, certain positions, particularly those involving alcohol service, casino operations, or supervisory responsibilities, may require candidates to be 21 years or older. Age requirements can vary slightly between different cruise companies and specific job roles, so it's important to check individual cruise line policies during the application process.",
      },
      {
        q: "Are there international job opportunities after completing this course?",
        a: "Absolutely! One of the most attractive aspects of a cruise line career is the extensive international exposure it offers. Cruise line jobs provide global placements with opportunities to work in international waters, visiting exotic destinations across multiple continents. This career path allows you to travel the world while earning a competitive salary, experiencing diverse cultures, and building an international professional network — all while your accommodation and meals are provided onboard.",
      },
      {
        q: "What skills are required for a cruise line job?",
        a: "Success in cruise line careers requires a blend of interpersonal and professional skills including exceptional customer service abilities, clear and effective communication, strong teamwork and collaboration, professional grooming and presentation, excellent time management, cultural sensitivity and adaptability, problem-solving capabilities, stamina and physical fitness, positive attitude under pressure, and the ability to work harmoniously in a multicultural environment. These skills ensure you can deliver outstanding service while thriving in the unique lifestyle of working at sea.",
      },
      {
        q: "What is the salary after completing a Cruise Line course?",
        a: "Entry-level positions in the cruise industry offer competitive compensation packages, with freshers typically earning between ₹30,000 to ₹80,000 per month, depending on the cruise company, job role, and your skills. A significant advantage is that accommodation, meals, medical facilities, and entertainment are provided free of cost onboard, allowing you to save most of your earnings. With experience and career progression, salaries increase substantially, and many positions also include tips and bonuses that can significantly boost your total income.",
      },
      {
        q: "Does Emporium Training Institute provide placement support for cruise line jobs?",
        a: "Yes, Emporium Training Institute takes pride in offering comprehensive placement assistance for all our cruise line course graduates. Our dedicated placement cell provides complete support including resume building, mock interviews, grooming sessions, cruise company connections, recruitment drive coordination, and ongoing guidance throughout your job search and application process. We work closely with leading cruise lines to ensure our students have access to excellent career opportunities upon course completion.",
      },
      {
        q: "What is included in the Cruise Line course curriculum?",
        a: "The cruise line training program at Emporium Training Institute covers essential topics such as cruise operations and protocols, international hospitality standards, customer service excellence, food and beverage service techniques, housekeeping operations, safety and emergency procedures, maritime regulations, grooming and personality development, communication skills, cultural awareness, and interview preparation. Our curriculum is regularly updated to align with current industry requirements and international cruise line standards.",
      },
      {
        q: "How long is the Cruise Line course?",
        a: "The duration of cruise line courses typically ranges from 3 to 6 months, depending on the specific program and level of training. This intensive period includes classroom instruction, practical training, soft skills development, and placement preparation — everything you need to launch your cruise line career confidently and successfully.",
      },
    ],
  },
];

export function programBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}
