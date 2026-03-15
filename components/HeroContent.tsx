import Link from "next/link";

export default function HeroContent() {
  return (
    <main className="relative z-10 flex flex-col items-center px-6 pb-6 pt-10 text-center">
      <div className="absolute right-6 top-6 flex items-center gap-3">
        <Link
          href="/settings"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-300/40 text-teal-100/90 transition hover:border-teal-200 hover:text-teal-100"
          aria-label="Profile settings"
        >
          <span className="text-sm font-semibold">Me</span>
        </Link>
        <Link
          href="/sign-in"
          className="flex h-10 items-center rounded-full border border-teal-400/30 px-4 text-xs font-semibold uppercase tracking-widest text-teal-100/80 transition hover:-translate-y-0.5 hover:border-teal-400/70 hover:bg-teal-400/5"
        >
          Sign In
        </Link>
      </div>

      <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-cyan-50 drop-shadow-lg">
        Welcome to
        <em
          className="ml-3 not-italic text-teal-300"
          style={{ textShadow: "0 0 24px rgba(78,236,216,0.7)" }}
        >
          SeaFloor
        </em>
      </h1>

      <nav className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/my-reefs"
          className="rounded-full border border-teal-300/40 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-teal-100/90 transition hover:border-teal-200 hover:bg-teal-400/10"
        >
          My Reefs
        </Link>
        <Link
          href="/"
          className="rounded-full bg-teal-400/90 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-cyan-950 shadow-[0_0_18px_rgba(20,184,196,0.55)] transition hover:-translate-y-0.5"
        >
          Home / Map
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-teal-300/40 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-teal-100/90 transition hover:border-teal-200 hover:bg-teal-400/10"
        >
          About Us
        </Link>
      </nav>

      {/*
      <div className="mt-auto flex flex-wrap justify-center gap-4 pb-0.1">
        <a
          href="/gallery"
          rel="noopener noreferrer"
          className="flex h-12 items-center gap-2 rounded-full px-7 font-serif text-sm font-bold uppercase tracking-widest text-cyan-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(20,184,196,0.6)]"
          style={{
            background: "linear-gradient(135deg, #0d7377, #14b8c4)",
            boxShadow: "0 0 16px rgba(13,115,119,0.4)",
          }}
        >
          View Gallery
        </a>
      </div>
      */}
    </main>
  );
}
