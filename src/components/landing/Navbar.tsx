import Link from "next/link";
import { Logo, Container, LinkButton } from "@/components/ui/atoms";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-ink/10 bg-chalk/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <Link href="/examples" className="text-sm text-ink-soft hover:text-ink focus-ring">
            Examples
          </Link>
          <Link href="/create" className="text-sm text-ink-soft hover:text-ink focus-ring">
            Portfolio vs Vibe
          </Link>
        </nav>
        <LinkButton href="/create" variant="coral" className="text-xs sm:text-sm px-4 sm:px-6 py-2.5">
          Create My Website
        </LinkButton>
      </Container>
    </div>
  );
}
