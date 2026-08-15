import Link from "next/link";
import { Container, Logo } from "@/components/ui/atoms";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />
        <nav className="flex gap-6 text-sm text-ink-soft">
          <Link href="/create" className="hover:text-ink focus-ring">
            Create
          </Link>
          <Link href="/examples" className="hover:text-ink focus-ring">
            Examples
          </Link>
        </nav>
        <p className="text-xs text-ink-soft/70">© {new Date().getFullYear()} Cornr</p>
      </Container>
    </footer>
  );
}
