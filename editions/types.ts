import type { Metadata } from "next";
import type { ComponentType } from "react";

/**
 * The entire contract between an edition and the app shell -- deliberately this
 * small. An edition owns its sections, its primitives, its content shape, its
 * design tokens and its assets; the shell only needs to know what to render,
 * what to put in <head>, and which font class to hang on <html>.
 *
 * Adding a field here is the one change that touches every edition at once, so
 * it should stay rare.
 */
export type Edition = {
  /** Folder name under editions/. Used for asset paths and error messages. */
  id: string;
  /** The whole page. Rendered by app/page.tsx at "/". */
  Page: ComponentType;
  /** Merged into <head> by app/layout.tsx. */
  metadata: Metadata;
  /**
   * `.variable` (or `.className`) from a next/font call, applied to <html>.
   * Lives on the edition so each one can pick its own typeface.
   */
  fontClassName: string;
};
