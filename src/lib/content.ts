export type Stat = { to: number; suffix: string; label: string };

export const stats: Stat[] = [
  { to: 12000, suffix: "+", label: "Students trained & groomed" },
  { to: 95, suffix: "%", label: "Placement assistance rate" },
  { to: 40, suffix: "+", label: "Airline & hospitality recruiters" },
  { to: 15, suffix: " yrs", label: "Shaping careers across India" },
];

export const recruiters = [
  "IndiGo",
  "Air India",
  "Emirates",
  "Qatar Airways",
  "Vistara",
  "Akasa Air",
  "Etihad",
  "Taj Hotels",
  "Marriott",
  "Oberoi",
  "Singapore Airlines",
];

export type Pillar = { no: string; icon: string; title: string; body: string };

export const pillars: Pillar[] = [
  {
    no: "01",
    icon: "✦",
    title: "Industry-current curriculum",
    body: "Course content mapped to real airline and hotel service standards, refreshed with the industry — not textbooks from a decade ago.",
  },
  {
    no: "02",
    icon: "✈",
    title: "Mock cabin & service labs",
    body: "Practice announcements, service and safety drills in a cabin mock-up and live service setups before you ever face a recruiter.",
  },
  {
    no: "03",
    icon: "☺",
    title: "Grooming & personality",
    body: "Deportment, communication and confidence coaching so you walk into an interview looking and sounding the part.",
  },
  {
    no: "04",
    icon: "✓",
    title: "Interview & GD prep",
    body: "Mock interviews, group discussions and resume clinics run the way airlines actually screen candidates.",
  },
  {
    no: "05",
    icon: "◍",
    title: "Certification readiness",
    body: "Preparation for English proficiency, first-aid and safety awareness expected across aviation and hospitality roles.",
  },
  {
    no: "06",
    icon: "♜",
    title: "Dedicated placement cell",
    body: "On-campus drives, recruiter referrals and lifetime alumni support — your relationship with us doesn't end at graduation.",
  },
];

export type FacilityIcon = "cabin" | "grooming" | "interview" | "lab";

export type Facility = {
  icon: FacilityIcon;
  title: string;
  body: string;
  detail: string;
};

export const facilities: Facility[] = [
  {
    icon: "cabin",
    title: "Cabin mock-up",
    body: "A cabin interior to rehearse service flow, announcements and safety demonstrations.",
    detail:
      "Seats, overhead bins, galley and a working PA — the layout crew actually move through. Students run full service sequences and safety demonstrations here until the choreography is automatic.",
  },
  {
    icon: "grooming",
    title: "Grooming studio",
    body: "Mirrored deportment space for posture, makeup, uniform and presentation coaching.",
    detail:
      "Full-length mirrors, uniform racks and a makeup counter. Weekly grooming checks mirror the standards an airline appearance panel applies on assessment day.",
  },
  {
    icon: "interview",
    title: "Interview studio",
    body: "Recorded mock interviews and group discussions with structured feedback.",
    detail:
      "Every mock is recorded and played back with written feedback on content, body language and voice, so improvement is something students can see rather than be told about.",
  },
  {
    icon: "lab",
    title: "GDS & computer lab",
    body: "Hands-on reservations, ticketing and customer-handling practice on real tools.",
    detail:
      "Workstations for reservation-system practice, fare construction and documentation drills — the systems side of travel and airline front-desk work.",
  },
];

export type Story = {
  stamp: [string, string];
  quote: string;
  initials: string;
  name: string;
  role: string;
};

export const stories: Story[] = [
  {
    stamp: ["CABIN", "CREW"],
    quote:
      "The mock interviews were tougher than the real one. By the time I sat in front of the airline panel, I'd already done it twenty times.",
    initials: "AK",
    name: "Aanya K.",
    role: "EMP-201 · placed as Cabin Crew",
  },
  {
    stamp: ["GROUND", "STAFF"],
    quote:
      "I joined shy and unsure. The grooming and GD sessions changed how I carry myself — that confidence got me the offer.",
    initials: "RM",
    name: "Rohan M.",
    role: "EMP-301 · Airport Customer Service",
  },
  {
    stamp: ["HOTEL", "FRONT"],
    quote:
      "Emporium didn't just teach the syllabus. They kept sending me for drives until I landed the right role in a five-star property.",
    initials: "SP",
    name: "Sara P.",
    role: "EMP-401 · Guest Experience",
  },
];

export type Step = { n: string; title: string; body: string; progress: string };

export const admissionSteps: Step[] = [
  {
    n: "STEP 01",
    title: "Enquire",
    body: "Send us your details or call admissions. We'll share programs, fees and the next intake dates.",
    progress: "25%",
  },
  {
    n: "STEP 02",
    title: "Counselling",
    body: "A one-on-one session and aptitude check to match you with the right program for your goals.",
    progress: "50%",
  },
  {
    n: "STEP 03",
    title: "Enrol & train",
    body: "Complete admission and begin hands-on training, grooming and soft-skills modules.",
    progress: "75%",
  },
  {
    n: "STEP 04",
    title: "Interview & place",
    body: "Sit for recruiter drives with full interview prep and dedicated placement support.",
    progress: "100%",
  },
];

export const eligibilityNote =
  "Open to candidates who have passed or are appearing for 10+2 (any stream). Graduates welcome. Minimum age and role criteria vary by airline — we'll guide you.";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I need to have finished 10+2 to apply?",
    a: "You can apply while you are appearing for 10+2. Admission is confirmed once results are declared; students who have already passed, or who hold a degree, can join straight away.",
  },
  {
    q: "Is a job guaranteed at the end of the program?",
    a: "No, and we will not tell you otherwise. Emporium runs a dedicated placement cell that brings recruiters on campus, refers candidates and prepares you for every round — but the final offer depends on your performance and the recruiter's criteria.",
  },
  {
    q: "What are the fees, and are instalments available?",
    a: "Fees vary by program length and level. Instalment plans and merit scholarships are available — our admissions team walks you through the exact numbers for the program you pick during counselling.",
  },
  {
    q: "Are there height, age or medical criteria?",
    a: "For in-flight roles, airlines set their own age, height, vision and medical standards, and they differ between carriers. We assess you against the criteria of the airlines currently hiring and tell you honestly where you stand.",
  },
  {
    q: "Can I switch programs after I enrol?",
    a: "Within the first two weeks, yes — if counselling suggests a better fit, we move you and adjust the fee against the new program.",
  },
  {
    q: "Are classes in person or online?",
    a: "All programs are classroom-based on campus. Practical work in the cabin mock-up, grooming studio and computer lab is the core of the training, and it does not translate to a screen.",
  },
];

export type PlacementSupport = { title: string; body: string };

export const placementSupport: PlacementSupport[] = [
  {
    title: "On-campus recruiter drives",
    body: "Airlines, ground handlers and hotel groups screen on campus through the year, so students interview without chasing openings alone.",
  },
  {
    title: "Profile & resume clinics",
    body: "Aviation resumes have a format of their own. We build yours, shoot the photograph, and get the profile recruiter-ready.",
  },
  {
    title: "Interview & GD rehearsal",
    body: "Recorded mocks in recruiter format, repeated until the real panel feels like one more rehearsal.",
  },
  {
    title: "Referrals & alumni network",
    body: "Alumni already inside airlines and hotels flag openings, and referrals go out from the placement cell directly.",
  },
  {
    title: "Post-placement support",
    body: "Support does not stop at the first offer — come back to us when you are ready for the next move.",
  },
  {
    title: "Documentation guidance",
    body: "Background checks, medicals and joining paperwork handled with you, so nothing derails a confirmed offer.",
  },
];
