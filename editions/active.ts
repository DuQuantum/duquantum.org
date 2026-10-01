/* ═══════════════════════════════════════════════════════════════════════════
 *
 *   THE LIVE EDITION. Change this import to swap the site.
 *
 *   Editions not named here are never imported, so they are tree-shaken out
 *   of the bundle entirely and an archived edition costs nothing at runtime.
 *   They are still type-checked and linted by `npm run build` so errors are caught
 *   before potential fallbacks.
 *
 *   See editions/README.md.
 *
 * ═══════════════════════════════════════════════════════════════════════════ */

export { edition as default } from "./2026";
