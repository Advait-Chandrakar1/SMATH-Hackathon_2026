import OceanBg from "@/components/Oceanbg";
import HeroContent from "@/components/HeroContent";

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #041020, #052030 30%, #062a3e 60%, #0a3d56)",
      }}
    >
      <OceanBg />
      <HeroContent />
    </div>
  );
}
