import type { Metadata } from "next";
import localFont from "next/font/local";
import { Alumni_Sans, Intel_One_Mono } from "next/font/google";
import type { Edition } from "../types";
import Page from "./Page";
import { site } from "./content";
import "./theme.css";

/**
 * Figma sets display type in Trek, which has no web licence. Edge of the Galaxy
 * is a public-domain cut of the same Star Trek monitor lettering (licence in
 * fonts/LICENSE.txt), so it stands in wherever Figma says Trek.
 */
const display = localFont({
  src: "./fonts/edge-of-the-galaxy.otf",
  display: "swap",
  variable: "--font-display",
});

/** Body copy and every schedule / terminal label. */
const mono = Intel_One_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

/** Only the "at" in "at Duke University" (Alumni Sans Black). */
const condensed = Alumni_Sans({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
  variable: "--font-condensed",
});

const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/editions/2026/favicon.svg" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const edition: Edition = {
  id: "2026",
  Page,
  metadata,
  fontClassName: [display.variable, mono.variable, condensed.variable].join(" "),
};
