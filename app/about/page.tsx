import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #041020, #052030 30%, #062a3e 60%, #0a3d56)",
      }}
    >
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-20 pt-16">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">
            About ReefGuard
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Our purpose is simple: Raise and Spread Awareness about coral reefs.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-sky-100/80">
            With our site, we are spreading awareness and giving users real ways to help coral
            reefs across the world. ReefGuard is built to show the risks reefs
            face today, such as warming oceans, bleaching, and pollution, and to make
            that information feel personal, actionable, and something worth caring about.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 md:place-items-center">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-6 text-sky-100/85 shadow-[0_8px_30px_rgba(2,11,24,0.4)]">
            <h2 className="text-lg font-semibold text-white">See the data</h2>
            <p className="mt-2 text-sm leading-relaxed">
              A user lands on to the homepage and gets a warm welcome to the site.  They can explore and see all the reefs we have data on or talk with our ReefGuard AI assistant.
            </p>
          </div>
  
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-6 text-sky-100/85 shadow-[0_8px_30px_rgba(2,11,24,0.4)]">
            <h2 className="text-lg font-semibold text-white">
              Understand the big picture
            </h2>
            <p className="mt-2 text-sm leading-relaxed">
              The reefs page and our AI assistant are designed to give insightful information about the state of reefs, the risk they face, and ways users can help.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 text-sky-100/85">
          <h2 className="text-center text-2xl font-semibold text-white">
            What we want visitors to feel
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            ReefGuard is designed to make users feel informed and connected to the issue of coral reef conservation.
            We want them to feel moved to care about reefs and to take action to help protect them.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full border-sky-200/70 bg-white/10 px-6 text-xs font-semibold uppercase tracking-widest text-sky-100 hover:bg-white/20"
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/gallery">
            <Button className="rounded-full bg-sky-500 px-6 text-xs font-semibold uppercase tracking-widest text-white hover:bg-sky-400">
              Explore Reefs
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              variant="outline"
              className="rounded-full border-sky-200/70 bg-white/10 px-6 text-xs font-semibold uppercase tracking-widest text-sky-100 hover:bg-white/20"
            >
              Reef
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
