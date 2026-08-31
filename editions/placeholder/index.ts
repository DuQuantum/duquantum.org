import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import type { Edition } from "../types";
import Page from "./Page";
import { site } from "./content";
import "./theme.css";

/** Figma type styles are set in IBM Plex Sans (Regular / Medium / SemiBold / Bold Italic). */
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-sans",
});

const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/editions/placeholder/favicon.svg" },
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
  id: "placeholder",
  Page,
  metadata,
  fontClassName: sans.variable,
};
