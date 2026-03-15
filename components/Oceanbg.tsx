const bubbles = [
  { left: "8%", size: 10, dur: "9s", delay: "0s" },
  { left: "20%", size: 6, dur: "12s", delay: "1.5s" },
  { left: "35%", size: 14, dur: "10s", delay: "0.5s" },
  { left: "52%", size: 8, dur: "7s", delay: "3s" },
  { left: "68%", size: 12, dur: "11s", delay: "1.8s" },
  { left: "80%", size: 5, dur: "8s", delay: "2.4s" },
  { left: "91%", size: 16, dur: "14s", delay: "4s" },
];

const seaweeds = [
  { left: "3%", h: 180, dur: "4.5s", delay: "0s" },
  { left: "8%", h: 130, dur: "5.5s", delay: "0.5s" },
  { left: "13%", h: 200, dur: "6s", delay: "1s" },
  { right: "4%", h: 160, dur: "5s", delay: "0.3s" },
  { right: "9%", h: 220, dur: "4s", delay: "1.2s" },
  { right: "15%", h: 140, dur: "6.5s", delay: "0.8s" },
];

export default function OceanBg() {
  return (
    <>
      <style>{`
        @keyframes rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.8; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes sway {
          0%,100% { transform: rotate(-6deg); }
          50%      { transform: rotate(8deg); }
        }
        @keyframes ray {
          0%,100% { opacity: 0.3; transform: scaleX(1); }
          50%      { opacity: 0.6; transform: scaleX(1.3); }
        }
        @keyframes drift {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(20px,15px); }
          66%      { transform: translate(-10px,30px); }
        }
        @keyframes pulse {
          0%,100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.8); }
        }
      `}</style>

      {/* Light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[10, 25, 40, 55, 70, 85].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 w-16 h-2/3 blur-xl"
            style={{
              left: `${left}%`,
              background:
                "linear-gradient(to bottom, rgba(20,184,196,0.15), transparent)",
              animation: `ray ${8 + i}s ease-in-out ${i * 0.7}s infinite`,
            }}
          />
        ))}
      </div>

      {[
        { top: "10%", left: "7%", w: 50, dur: "22s", delay: "0s" },
        { top: "22%", right: "10%", w: 34, dur: "28s", delay: "6s" },
        { top: "6%", left: "58%", w: 28, dur: "18s", delay: "12s" },
      ].map((j, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: j.top,
            left: j.left,
            right: (j as any).right,
            animation: `drift ${j.dur} ease-in-out ${j.delay} infinite`,
          }}
        >
          <div
            className="rounded-t-full border border-purple-400/30"
            style={{
              width: j.w,
              height: j.w * 0.7,
              background:
                "radial-gradient(ellipse at 40% 40%, rgba(180,100,255,0.45), rgba(80,20,140,0.25))",
              boxShadow: "0 0 20px rgba(180,100,255,0.25)",
              animation: `pulse 2.5s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
          <div className="flex gap-1 justify-center pt-0.5">
            {Array.from({ length: 6 }).map((_, t) => (
              <div
                key={t}
                className="w-px bg-gradient-to-b from-purple-400/50 to-transparent"
                style={{ height: j.w * 0.9 }}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full border border-teal-300/30"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3), rgba(20,184,196,0.05))",
              animation: `rise ${b.dur} linear ${b.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Seaweed */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        {seaweeds.map((s, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-4 rounded-t-full"
            style={{
              left: (s as any).left,
              right: (s as any).right,
              height: s.h,
              background: "linear-gradient(to top, #0d5c2e, #1aaa60)",
              transformOrigin: "bottom center",
              animation: `sway ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Sea floor */}
      <div
        className="absolute bottom-0 inset-x-0 h-24"
        style={{
          background: "linear-gradient(to top, #020810, #04111e)",
          borderRadius: "60% 60% 0 0 / 40% 40% 0 0",
        }}
      />
    </>
  );
}
