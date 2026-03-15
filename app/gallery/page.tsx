"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ReefCard from "@/components/ReefCard";
import ShowMapButton from "@/components/ShowMapButton";

interface Reef {
  id: string;
  name: string;
  description: string;
  image: string;
  reviews?: { userId: string; text: string; likes?: string[] }[];
}

export default function GalleryPage() {
  const [reefs, setReefs] = useState<Reef[]>([]);

  useEffect(() => {
    const fetchReefs = async () => {
      const querySnapshot = await getDocs(collection(db, "reefs"));
      const data: Reef[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...(docSnap.data() as Reef) });
      });
      setReefs(data);
    };
    fetchReefs();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden p-4"
      style={{
        background:
          "linear-gradient(to bottom, #041020, #052030 30%, #062a3e 60%, #0a3d56)",
      }}
    >
      <section className="mb-3 ml-2 mt-2.5">
        <ShowMapButton />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reefs.map((reef) => (
          <ReefCard key={reef.id} reef={reef} />
        ))}
      </section>
    </div>
  );
}
