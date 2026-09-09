/**
 * The press releases as they were hard-coded before the admin panel existed,
 * kept only as the input to `src/seed/index.ts`. The home page now reads them
 * from Postgres, in the order they are listed here.
 */

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
