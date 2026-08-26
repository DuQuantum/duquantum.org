/**
 * Figma: OrganizersSection (14:382). Each person is an instance of the
 * `emptyHeadshot` component (48:732), so one card component covers all six.
 *
 * Photos are exported from the image fills and pre-cropped square, which is why
 * the card can use a plain `object-cover` instead of per-person framing.
 */
type Organizer = {
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
    photo: "/organizers/sidd.jpg",
    link: "https://www.linkedin.com/in/svijay-37807624b/",
  },
  {
    name: "Derek Wang",
    role: "Co-Lead Organizer",
    org: "HackDuke",
    photo: "/organizers/derek.jpg",
    link: "https://wxrderek.github.io/",
  },
  {
    name: "Giulio Pech",
    role: "Sponsorships",
    org: "DuQIS",
    photo: "/organizers/giulio.jpg",
    link: "https://www.linkedin.com/in/giulio-pech-822451298/",
  },
  {
    name: "Makenna Linsky",
    role: "Design",
    org: "HackDuke",
    photo: "/organizers/makenna.jpg",
    link: "https://www.linkedin.com/in/makenna-linsky/",
  },
  {
    name: "Eva Samborski",
    role: "Finances",
    org: "DuQIS",
    photo: "/organizers/eva.jpg",
    link: "https://www.linkedin.com/in/eva-samborski/",
  },
  {
    name: "Mohammad Zoraiz",
    role: "Operations",
    org: "HackDuke",
    photo: "/organizers/mohammad.jpg",
    link: "https://www.linkedin.com/in/mohammad-zoraiz/",
  },
] as const satisfies readonly Organizer[];
