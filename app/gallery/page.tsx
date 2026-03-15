import ClientOnlyGallery from "@/components/ClientOnlyGallery";
import ShowMapButton from "@/components/ShowMapButton";

export default function GalleryPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #041020, #052030 30%, #062a3e 60%, #0a3d56)",
      }}
    >
      <section className="mb-3 ml-2 mt-2.5">
        <ShowMapButton />
      </section>
      <section className="relative z-10 h-screen w-full">
        <ClientOnlyGallery />
      </section>
    </div>
  );
}
