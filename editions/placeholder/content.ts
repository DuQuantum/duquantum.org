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
