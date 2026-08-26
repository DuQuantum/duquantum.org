import type { Config } from "tailwindcss";

/**
 * Every value resolves to a CSS custom property in styles/globals.css, which
 * mirrors the Figma variable set. Re-syncing the design means editing tokens
 * there, not this file.
 */
const rgb = (token: string) => `rgb(var(${token}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
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
      height: {
        section: "var(--section-height)",
      },
      minHeight: {
        section: "var(--section-height)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
