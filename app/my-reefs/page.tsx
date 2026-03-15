"use client";

import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Reef, UserProfile } from "@/lib/types";

export default function MyReefsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reefMap, setReefMap] = useState<Record<string, Reef>>({});

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (!snapshot.exists()) return;
      setProfile(snapshot.data() as UserProfile);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    const slugs = profile.bookmarks ?? [];
    if (slugs.length === 0) {
      setReefMap({});
      return;
    }

    const chunks: string[][] = [];
    for (let i = 0; i < slugs.length; i += 10) {
      chunks.push(slugs.slice(i, i + 10));
    }

    const unsubscribes = chunks.map((chunk) =>
      onSnapshot(
        query(collection(db, "reefs"), where("slug", "in", chunk)),
        (snapshot) => {
          setReefMap((prev) => {
            const next = { ...prev };
            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as Reef;
              const reefSlug = data.slug || docSnap.id;
              next[reefSlug] = { ...data, slug: reefSlug, id: docSnap.id };
            });
            return next;
          });
        }
      )
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [profile]);

  const reefs = useMemo(() => Object.values(reefMap), [reefMap]);

  if (!user) return <p>Please sign in to see saved reefs.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">My Saved Reefs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reefs.map((reef) => (
          <Link key={reef.id} href={`/reef/${reef.slug}`}>
            <div className="border p-2 rounded">{reef.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
