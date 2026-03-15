import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HeroContent() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-8 text-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400&display=swap');

        @keyframes caustic {
          0%, 100% { opacity: 0.4; transform: scale(1) translate(0, 0); }
          33%       { opacity: 0.7; transform: scale(1.08) translate(12px, -8px); }
          66%       { opacity: 0.5; transform: scale(0.95) translate(-8px, 12px); }
        }
        @keyframes shimmerIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glassFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .hero-font  { font-family: 'Lora', Georgia, serif; }
        .body-font  { font-family: 'DM Sans', system-ui, sans-serif; }
        .anim-in    { animation: shimmerIn 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .glass-float { animation: glassFloat 6s ease-in-out infinite; }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {[
          { w: 420, top: "-8%", left: "15%", dur: "9s", del: "0s" },
          { w: 300, top: "10%", left: "60%", dur: "13s", del: "2s" },
          { w: 260, top: "40%", left: "-5%", dur: "11s", del: "1.5s" },
          { w: 380, top: "55%", left: "55%", dur: "8s", del: "3.5s" },
          { w: 200, top: "75%", left: "30%", dur: "10s", del: "0.8s" },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.w,
              height: b.w,
              top: b.top,
              left: b.left,
              background:
                "radial-gradient(circle, rgba(186,234,255,0.55) 0%, rgba(147,214,255,0.25) 45%, transparent 70%)",
              filter: "blur(40px)",
              animation: `caustic ${b.dur} ease-in-out ${b.del} infinite`,
            }}
          />
        ))}
      </div>

      {/* here we are going to uese a glass component  */}
      <div
        className="glass-float relative flex flex-col items-center gap-7 rounded-3xl px-10 py-12 anim-in"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.42) 0%, rgba(200,230,245,0.28) 60%, rgba(170,210,240,0.22) 100%)",
          backdropFilter: "blur(28px) saturate(1.6)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow:
            "0 8px 60px rgba(80,180,240,0.18), 0 1px 0 rgba(255,255,255,0.85) inset, 0 -1px 0 rgba(127,190,235,0.3) inset",
          maxWidth: 560,
        }}
      >
        {/* Eyebrow badge */}
        <Badge
          className="body-font border-sky-200/80 bg-sky-50/80 text-sky-500 backdrop-blur"
          variant="outline"
          style={{ animationDelay: "0.1s" }}
        >
          🪸 Shivang Patel | Advait Chandrakar | Abhinav Ramireddy
        </Badge>

        {/* Heading */}
        <div className="anim-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="hero-font text-5xl font-semibold leading-tight tracking-tight text-sky-950 md:text-6xl">
            Welcome to{" "}
            <em
              className="not-italic"
              style={{
                background:
                  "linear-gradient(135deg, #0ea5e9, #06b6d4, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 16px rgba(14,165,233,0.35))",
              }}
            >
              ReefGuard
            </em>
          </h1>
        </div>

        <p
          className="body-font anim-in max-w-sm text-base font-light leading-relaxed text-black"
          style={{ animationDelay: "0.3s" }}
        >
          Explore endangered coral reefs, discover what threatens them, and find
          out exactly how you can help.
        </p>

        <Separator className="bg-sky-200/50" />
        {/* this is our card content for quick action links */}
        <nav
          className="anim-in flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.4s" }}
        >
          <Link href="/gallery">
            <Button
              className="body-font rounded-full px-6 text-xs font-semibold uppercase tracking-widest text-white"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                boxShadow:
                  "0 4px 20px rgba(14,165,233,0.4), 0 1px 0 rgba(255,255,255,0.3) inset",
              }}
            >
              Reefs
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              className="body-font rounded-full border-sky-200/70 bg-white/40 px-5 text-xs font-medium uppercase tracking-widest text-sky-600 backdrop-blur hover:bg-white/60 hover:border-sky-300 hover:text-sky-700"
            >
              About Us
            </Button>
          </Link>
        </nav>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(2,11,24,0.6), transparent)",
        }}
      />
    </main>
  );
}
