"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { reefSeedData } from "@/lib/reefSeed";
import { Button } from "@/components/ui/button";

export default function SeedReefsButton() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      await Promise.all(
        reefSeedData.map((reef) =>
          setDoc(doc(db, "reefs", reef.slug), reef, { merge: true })
        )
      );
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSeed}
      disabled={loading}
      className="rounded-full border-sky-200 text-sky-700"
    >
      {done ? "Seeded reefs" : loading ? "Seeding..." : "Seed reef data"}
    </Button>
  );
}
