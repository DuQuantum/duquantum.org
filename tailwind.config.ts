import type { Config } from "tailwindcss";

/**
 * Every value resolves to a CSS custom property declared by the active edition's
 * theme.css. This file is the shared *name* layer; the values are per-edition,
 * which is what lets two editions use `bg-base-purple` and get different purples.
 *
 * Because it is shared, treat it as APPEND-ONLY across editions: a new edition
 * may add entries, but changing or repurposing an existing name reaches back
 * into every frozen edition that uses it. See editions/README.md.
 */
const rgb = (token: string) => `rgb(var(${token}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./editions/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          purple: rgb("--base-purple"),
          teal: rgb("--base-teal"),
          white: rgb("--base-white"),
          blue: rgb("--base-blue"),
          cyan: rgb("--base-cyan"),
        },
      },
      fontSize: {
        gate: "var(--gate-size)",
        "gate-sm": "var(--gate-small-size)",
        "section-header": "var(--section-header-size)",
        "section-body": "var(--section-body-size)",
        "section-caption": "var(--section-caption-size)",
        display: "var(--display-size)",
      },
      borderWidth: {
        6: "6px",
      },
      spacing: {
        gutter: "var(--container-pad)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
