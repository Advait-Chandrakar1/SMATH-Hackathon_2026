"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ReefCard from "@/components/ReefCard";
import ShowMapButton from "@/components/ShowMapButton";
import LeafletMap from "@/components/LeafletMap";
import SeedReefsButton from "@/components/SeedReefsButton";
import type { Reef } from "@/lib/types";

export default function GalleryPage() {
  const [reefs, setReefs] = useState<Reef[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reefs"), (snapshot) => {
      const data: Reef[] = [];
      snapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...(docSnap.data() as Reef) });
      });
      setReefs(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden p-4"
      style={{
        background:
          "linear-gradient(to bottom, #041020, #052030 30%, #062a3e 60%, #0a3d56)",
      }}
    >
      <section className="mb-3 ml-2 mt-2.5 flex flex-wrap items-center gap-3">
        <ShowMapButton />
        <SeedReefsButton />
      </section>

      <section className="mb-6">
        <LeafletMap />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reefs.map((reef) => (
          <ReefCard key={reef.id} reef={reef} />
        ))}
      </section>
    </div>
  );
}
