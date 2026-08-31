import edition from "@/editions/active";

/**
 * The shell. It holds no content, no styling and no design of its own --
 * everything visible comes from whichever edition editions/active.ts points at,
 * including the stylesheet (pulled in by that import) and the font.
 */

export const metadata = edition.metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={edition.fontClassName}>
      <body>{children}</body>
    </html>
  );
}
