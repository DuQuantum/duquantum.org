/**
 * Single source of truth for event facts that appear in more than one place
 * (metadata, hero, deadlines). Update here, not in JSX.
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
} as const;
