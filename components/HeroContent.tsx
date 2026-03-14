import Image from "next/image";
import Link from "next/link";

export default function HeroContent() {
  return (
    <main className="relative z-10 flex min-h-screen max-w-2xl flex-col justify-between gap-12 px-12 py-24">
      <div className="flex flex-col gap-5">
        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-cyan-50 drop-shadow-lg">
          Welcome to
          <em
            className="not-italic text-teal-300 ml-3"
            style={{ textShadow: "0 0 24px rgba(78,236,216,0.7)" }}
          >
            SeaFloor
          </em>
        </h1>
      </div>

      <div className="flex flex-wrap gap-4">
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
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center rounded-full border border-teal-400/30 px-7 font-serif text-sm font-light uppercase tracking-widest text-teal-100/80 transition-all hover:-translate-y-0.5 hover:border-teal-400/70 hover:bg-teal-400/5"
        >
          Profile
        </a>
      </div>
    </main>
  );
}
