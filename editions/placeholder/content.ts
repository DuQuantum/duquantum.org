/**
 * Everything this edition knows about the event. Both types are exported for
 * use inside this folder only -- editions do not share a content contract, so a
 * future edition writes whatever shape its own design needs. What is here is
 * the placeholder's shape, not a schema anyone else has to satisfy.
 */

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  location: string;
  dateLabel: string;
  startDate: string;
  endDate: string;
  deadlines: readonly { label: string; date: string }[];
  email: string;
  duqisUrl: string;
  hackDukeUrl: string;
  applicationUrl: string;
  qiskitFallFestUrl: string;
  mlhUrl: string;
};

/**
 * Single source of truth for event facts that appear in more than one place
 * (metadata, hero, deadlines). Update here, not in JSX.
 *
 * Rolling this placeholder to a new year means editing this block, swapping the
 * organizer photos, and re-exporting the two assets with the year drawn into
 * them (see public/editions/placeholder/logos/circuit-logo.svg).
 */
export const site = {
  name: "DuQuantum",
  tagline: "Quantum Computing Hackathon @Duke",
  description:
    "DuQuantum is the first annual, in-person quantum computing hackathon at Duke. For 24 hours, we invite quantum enthusiasts to tackle challenges designed by industry leaders and gain experience with state-of-the-art quantum tools.",
  url: "https://duquantum.org",
  location: "Duke University, Durham, NC",

  dateLabel: "OCTOBER 24-25",
  startDate: "2026-10-24T09:00:00-04:00",
  endDate: "2026-10-25T18:00:00-04:00",

  deadlines: [
    { label: "Priority Deadline", date: "Sept 23, 11:59 PM ET" },
    { label: "Standard Deadline", date: "Sept 30, 11:59 PM ET" },
  ],

  email: "organizers@duquantum.org",
  duqisUrl: "https://www.dukeqis.org/",
  hackDukeUrl: "https://hackduke.org/",
  applicationUrl: "https://duke.is/duquantum-application-2026",
  qiskitFallFestUrl: "https://www.ibm.com/quantum/blog/qiskit-fall-fest-2026",

  /**
   * Destination of the MLH trust badge (ui/MlhBadge.tsx), copied verbatim from
   * the snippet MLH supplies -- the utm_* parameters are how they attribute the
   * referral, so they are part of the obligation and not decoration.
   */
  mlhUrl:
    "https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white",
} as const satisfies SiteConfig;

/**
 * Figma: OrganizersSection (14:382). Each person is an instance of the
 * `emptyHeadshot` component (48:732), so one card component covers all six.
 *
 * Photos are exported from the image fills and pre-cropped square, which is why
 * the card can use a plain `object-cover` instead of per-person framing.
 */
export type Organizer = {
  name: string;
  role: string;
  org: string;
  photo: string;
  /**
   * LinkedIn or personal site. Optional -- omit it and the headshot renders as a
   * plain photo rather than a link, so people without a profile need no special
   * casing. `satisfies` below is what catches a misspelled key here.
   */
  link?: string;
};

export const organizers = [
  {
    name: "Siddharth Vijaymurugan",
    role: "Lead Organizer",
    org: "DuQIS",
    photo: "/editions/placeholder/organizers/sidd.jpg",
    link: "https://www.linkedin.com/in/svijay-37807624b/",
  },
  {
    name: "Derek Wang",
    role: "Co-Lead Organizer",
    org: "HackDuke",
    photo: "/editions/placeholder/organizers/derek.jpg",
    link: "https://wxrderek.github.io/",
  },
  {
    name: "Giulio Pech",
    role: "Sponsorships",
    org: "DuQIS",
    photo: "/editions/placeholder/organizers/giulio.jpg",
    link: "https://www.linkedin.com/in/giulio-pech-822451298/",
  },
  {
    name: "Makenna Linsky",
    role: "Design",
    org: "HackDuke",
    photo: "/editions/placeholder/organizers/makenna.jpg",
    link: "https://www.linkedin.com/in/makenna-linsky/",
  },
  {
    name: "Eva Samborski",
    role: "Finances",
    org: "DuQIS",
    photo: "/editions/placeholder/organizers/eva.jpg",
    link: "https://www.linkedin.com/in/eva-samborski/",
  },
  {
    name: "Mohammad Zoraiz",
    role: "Operations",
    org: "HackDuke",
    photo: "/editions/placeholder/organizers/mohammad.jpg",
    link: "https://www.linkedin.com/in/mohammad-zoraiz/",
  },
] as const satisfies readonly Organizer[];

export type Sponsor = {
  name: string;
  /**
   * Trimmed to the mark's own bounding box and capped at 720px on the long
   * edge. Trimming is what makes these comparable: untouched, IQM's mark
   * occupied 70% of a 2697px canvas while others were flush to the edge, so
   * `object-contain` rendered the same logo at wildly different sizes.
   */
  logo: string;
  url: string;
  /**
   * The artwork's own background, for marks that are not designed for a white
   * plate. Classiq's wordmark is lime on near-black and vanishes on white, so
   * its plate field is painted to match the artwork instead. A brand's colour
   * is the sponsor's, not ours -- it belongs here as data rather than in
   * theme.css as a design token.
   */
  background?: string;
};

/**
 * Order is the layout: the grid fills left to right, three to a row, so this
 * array reads exactly as the wall does -- rows of three, then the last two.
 * Reordering here is the whole operation; nothing in the section is positional.
 */
export const sponsors = [
  // row 1
  {
    name: "Alice & Bob",
    logo: "/editions/placeholder/logos/sponsors/alice-and-bob.png",
    url: "https://alice-bob.com/",
  },
  {
    name: "Pasqal",
    logo: "/editions/placeholder/logos/sponsors/pasqal.png",
    url: "https://www.pasqal.com/",
  },
  {
    name: "Google Quantum AI",
    logo: "/editions/placeholder/logos/sponsors/google-quantum-ai.png",
    url: "https://quantumai.google/",
  },

  // row 2
  {
    name: "Classiq",
    logo: "/editions/placeholder/logos/sponsors/classiq.png",
    url: "https://www.classiq.io/",
    background: "#191919",
  },
  {
    name: "BlueQubit",
    logo: "/editions/placeholder/logos/sponsors/bluequbit.png",
    url: "https://www.bluequbit.io/",
  },
  {
    name: "IQM",
    logo: "/editions/placeholder/logos/sponsors/iqm.png",
    url: "https://www.meetiqm.com/",
  },

  // row 3
  {
    name: "Duke Quantum Center",
    logo: "/editions/placeholder/logos/sponsors/duke-quantum-center.png",
    url: "https://quantum.duke.edu/",
    background: "#222D66",
  },
  {
    name: "Quandela",
    logo: "/editions/placeholder/logos/sponsors/quandela.png",
    url: "https://www.quandela.com/",
  },
  {
    name: "NEQXT",
    logo: "/editions/placeholder/logos/sponsors/neqxt.png",
    url: "https://www.neqxt.org/",
  },

  // row 4 -- two plates, centred by the wrap
  {
    name: "Rhodes Information Initiative at Duke",
    logo: "/editions/placeholder/logos/sponsors/rhodes-iid.png",
    url: "https://iid.duke.edu/",
  },
  {
    name: "Duke Department of Physics",
    logo: "/editions/placeholder/logos/sponsors/duke-physics.png",
    url: "https://physics.duke.edu/",
  },
] as const satisfies readonly Sponsor[];

/**
 *
 * An answer is a list of segments rather than one string, which is what lets it
 * carry a link while staying plain data: a bare string is a run of text, an
 * object is a link. Nothing here is markup, so this file stays the event's
 * facts and a future edition can render the same shape however it likes.
 *
 * Add entries by appending to the array. 
 */
export type AnswerSegment =
  | string
  | {
      text: string;
      href: string;
      /**
       * What the link announces, when the visible text does not describe the
       * destination on its own -- "here" tells a screen-reader user nothing
       * out of context. Leave it off when `text` already names the target.
       */
      label?: string;
    };

export type FaqEntry = {
  question: string;
  answer: readonly AnswerSegment[];
  /**
   * Anchor for linking straight to one question (`/#travel-stipends`).
   * Optional: it falls back to a slug of the question, which is fine until the
   * question gets reworded and every link already shared breaks. Set it
   * explicitly on anything you have posted publicly.
   */
  id?: string;
};

export const faq = [
  {
    id: "location",
    question: "Where will the hackathon take place?",
    answer: [
      "DuQuantum 2026 will take place in-person on the campus of Duke University in Durham, North Carolina, in particular the Wilkinson Building (534 Research Dr, Durham, NC, USA, 27705).",
    ],
  },
  {
    id: "dates",
    question: "When will the hackathon happen?",
    answer: [
      "DuQuantum 2026 will run Saturday, October 24 - Sunday, October 25. Check-in begins 9 AM on Saturday, hacking begins at 11:30 AM on Saturday and ends at 11:30 AM on Sunday, and the closing ceremony ends at 4:30 PM on Sunday.",
    ],
  },
  {
    id: "virtual",
    question: "Can I attend DuQuantum virtually?",
    answer: ["No. DuQuantum 2026 is an in-person only event."],
  },
  {
    id: "travel-stipends",
    question: "Can I be reimbursed for travel?",
    answer: [
      "DuQuantum offers travel stipends to participants who are (1) traveling from outside the greater Triangle area, i.e. outside a 40-mile radius from Durham, North Carolina, and (2) traveling from within the United States. We are unfortunately unable to provide stipends to international travelers. Participants may apply for travel stipends using the form sent out by organizers@duquantum.org; these are due October 5. Applications are reviewed and approved on a case-by-case basis.",
    ],
  },
  {
    id: "stipend-process",
    question: "How do travel stipends work?",
    answer: [
      "Travel stipends are provided via reimbursement after the event, contingent on whether the participant shows up and checks in. If you have been approved to receive a travel stipend, we will contact you with further instructions and requests. Expect to provide ID, itemized receipts, confirmation of attendance, etc, via the PaymentWorks online service (more details to come). We expect to fully reimburse costs up to $75, and partially reimburse a significant portion of additional costs.",
    ],
  },
  {
    id: "non-travel-expenses",
    question:
      "Can non-travel expenses be reimbursed, e.g. lodging and local transportation (e.g. Uber)?",
    answer: [
      "Unfortunately, we are not able to offer stipends for non-travel expenses (and expenses for localized travel). However, we may be able to obtain discounted rates at nearby hotels for those who may be interested in booking a room at their own expense (this is not guaranteed). Note that meals will be provided at no cost throughout the duration of the event.",
    ],
  },
  {
    id: "what-to-bring",
    question: "What should I bring?",
    answer: [
      "Bring your laptop, chargers, any necessary cables, and personal items you might need over the 24-hours of hacking and surrounding activities. If you plan to spend the night in the Wilkinson Building, you are encouraged to bring your own sleeping supplies, e.g. a sleeping bag. Note the building gets quite cold at night.",
    ],
  },
  {
    id: "eligibility",
    question: "Who is eligible to participate in DuQuantum?",
    answer: [
      "All currently-enrolled undergraduate, Master’s, and PhD students are eligible to attend, provided that they are above 18 years of age by October 24, 2026.",
    ],
  },
  {
    id: "cost",
    question: "Do I have to pay to participate in DuQuantum?",
    answer: [
      "No! Participation in DuQuantum 2026 is completely free, modulo usual living and partial travel costs. Meals will be provided throughout the duration of the event as well.",
    ],
  },
  {
    id: "beginners",
    question: "What if I know nothing about quantum computing?",
    answer: [
      "Beginners to quantum computing are particularly welcome to attend and compete in the Introductory Track challenges, which are designed to be accessible and educational, and are judged disjointly from their Standard Track counterparts. Organizers will provide a plethora of introductory resources, so you can familiarize yourself with basic concepts. An introductory workshop will also occur early on Saturday, October 24, to get you started on your project!",
    ],
  },
  {
    id: "teams",
    question: "Who can I work with?",
    answer: [
      "Participants can work in teams of up to 4. You may also work solo, though we highly recommend working in a team so you can get to know your fellow hackers! Accepted participants may use the #team-finding channel in the DuQuantum 2026 Discord to find additional teammates. Teammate preferences are due via form (send out by organizers@duquantum.org) by October 14, and will be finalized shortly afterward.",
    ],
  },
  {
    id: "teammate-applications",
    question: "Do all of my teammates need to complete an application?",
    answer: [
      "Yes. All applications are considered for admission on an individual basis. As such, all prospective teammates must fill out an application.",
    ],
  },
  {
    id: "code-of-conduct",
    question: "What is the Code of Conduct?",
    answer: [
      "The DuQuantum 2026 Participant Code of Conduct can be found in the Hacker Guide, the Discord #announcements channel, and the participant confirmation form. It incorporates the Duke Community Standard, the Qiskit Fall Fest Code of Conduct, and the MLH Code of Conduct ",
      {
        text: "here",
        href: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
        label: "MLH Code of Conduct",
      },
      ". Participants MUST agree to abide by the Code of Conduct on the confirmation form.",
    ],
  },
] as const satisfies readonly FaqEntry[];
