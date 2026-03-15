"use client";

import dynamic from "next/dynamic";

const DomeGallery = dynamic(() => import("@/components/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sky-100/70">
      Loading gallery...
    </div>
  ),
});

export default function ClientOnlyGallery() {
  return (
    <DomeGallery
      fit={0.8}
      minRadius={600}
      maxVerticalRotationDeg={0}
      segments={34}
      dragDampening={2}
      grayscale
    />
  );
}
