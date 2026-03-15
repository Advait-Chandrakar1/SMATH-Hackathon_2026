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
            Our purpose is simple: turn curiosity into protection.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-sky-100/80">
            We are spreading awareness and giving users a real way to help coral
            reefs across the world. ReefGuard is built to show the risks reefs
            face today - warming oceans, bleaching, and pollution - and to make
            that information feel personal, actionable, and worth caring about.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-sky-100/85 shadow-[0_8px_30px_rgba(2,11,24,0.4)]">
            <h2 className="text-lg font-semibold text-white">See the data</h2>
            <p className="mt-2 text-sm leading-relaxed">
              A user lands on the map and sees the world's reefs color-coded by
              risk. Clicking one - like the Great Barrier Reef - opens a panel
              with temperature trends, bleaching history, coral cover, and a
              real NOAA fact to ground the story in science.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-sky-100/85 shadow-[0_8px_30px_rgba(2,11,24,0.4)]">
            <h2 className="text-lg font-semibold text-white">Adopt and track</h2>
            <p className="mt-2 text-sm leading-relaxed">
              If a reef matters to them, they tap "Adopt this reef" and it's
              saved permanently. They can visit My Reefs anytime to compare the
              reefs they're tracking side by side and watch how conditions
              change over time.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-sky-100/85 shadow-[0_8px_30px_rgba(2,11,24,0.4)]">
            <h2 className="text-lg font-semibold text-white">
              Understand the big picture
            </h2>
            <p className="mt-2 text-sm leading-relaxed">
              The Global Stats tab shows which reefs are hottest, how risk is
              distributed worldwide, and the average coral cover across
              monitored sites - turning individual concern into global context.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 text-sky-100/85">
          <h2 className="text-2xl font-semibold text-white">
            What we want visitors to feel
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            ReefGuard is designed around three things judges respond to: real
            data, a clear emotional hook through adoption, and educational
            content woven throughout rather than bolted on. The goal is to help
            people learn fast, care deeply, and take action - whether that's
            adopting a reef, sharing its story, or changing a daily habit that
            reduces ocean pollution.
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
          <Link href="/my-reefs">
            <Button
              variant="outline"
              className="rounded-full border-sky-200/70 bg-white/10 px-6 text-xs font-semibold uppercase tracking-widest text-sky-100 hover:bg-white/20"
            >
              My Reefs
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
