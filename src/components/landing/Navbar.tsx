import Link from "next/link";
import { Logo, Container, LinkButton } from "@/components/ui/atoms";

export default function Navbar() {
  return (
    <div className="sticky top-3 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-6xl rounded-2xl border border-white/10 bg-chalk/85 shadow-2xl shadow-black/35 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <Link href="/create" className="text-sm text-ink-soft hover:text-ink focus-ring">
            Create
          </Link>
          <Link href="/examples" className="text-sm text-ink-soft hover:text-ink focus-ring">
            Examples
          </Link>
          <Link href="/#how-it-works" className="text-sm text-ink-soft hover:text-ink focus-ring">
            How it works
          </Link>
          <Link href="/#pricing" className="text-sm text-ink-soft hover:text-ink focus-ring">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-3"><Link href="/login" className="hidden text-sm text-ink-soft hover:text-ink sm:block">Login</Link><LinkButton href="/create" variant="coral" className="text-xs sm:text-sm px-4 sm:px-6 py-2.5 shadow-lg shadow-coral/20">Create My Corner</LinkButton></div>
      </Container>
    </div>
  );
}
