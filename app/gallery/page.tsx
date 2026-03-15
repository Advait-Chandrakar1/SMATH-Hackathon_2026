import ClientOnlyGallery from "@/components/ClientOnlyGallery";

export default function GalleryPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #041020, #052030 30%, #062a3e 60%, #0a3d56)",
      }}
    >
      <section className="relative z-10 h-screen w-full">
        <ClientOnlyGallery />
      </section>
    </div>
  );
}
