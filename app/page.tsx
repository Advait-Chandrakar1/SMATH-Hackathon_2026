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
      <HeroContent />

      {/* Map Section
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <LeafletMap />
      // </section> */}
      {/* goint o make the leaflet connected to the DB and also make it a button from shadcn and suc
       */}
    </div>
  );
}
