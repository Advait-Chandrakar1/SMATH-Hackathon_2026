"use client";

import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Reef } from "@/lib/types";

export default function MyReefsPage() {
  const { user } = useAuth();
  const [reefs, setReefs] = useState<Reef[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchSaved = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "savedReefs"),
        );
        const reefIds = snapshot.docs.map((doc) => doc.id);

        const reefDocs = await Promise.all(
          reefIds.map(async (id) => {
            const reefSnap = await getDoc(doc(db, "reefs", id));
            if (!reefSnap.exists()) return null;

            const data = reefSnap.data();
            // Ensure all required fields exist
            if (!data || !data.name || !data.latitude || !data.longitude)
              return null;

            return {
              id: reefSnap.id,
              slug: data.slug || "",
              name: data.name,
              description: data.description || "",
              latitude: data.latitude,
              longitude: data.longitude,
              image: data.image,
              likes: data.likes,
              bookmarks: data.bookmarks,
              reviews: data.reviews,
            } as Reef;
          }),
        );

        // Filter out nulls safely
        setReefs(reefDocs.filter((r): r is Reef => r !== null));
      } catch (error) {
        console.error("Error fetching saved reefs:", error);
      }
    };

    fetchSaved();
  }, [user]);

  if (!user) return <p>Please sign in to see saved reefs.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">My Saved Reefs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reefs.map((reef) => (
          <Link key={reef.id} href={`/reefs/${reef.id}`}>
            <div className="border p-2 rounded">{reef.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
