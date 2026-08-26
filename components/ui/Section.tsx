import { cn } from "@/lib/cn";
import Container from "./Container";

/**
 * Vertical rhythm wrapper for a page section. `id` doubles as the anchor
 * target used by the nav.
 */
export default function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-section", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
