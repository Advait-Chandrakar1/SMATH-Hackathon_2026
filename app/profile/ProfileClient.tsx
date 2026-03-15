"use client";

import { useAuth } from "@/lib/AuthContext";
import ProfileLogin from "@/components/ProfileLogin";
import UserProfile from "@/components/UserProfile";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import type { Reef, UserProfile as UserProfileType } from "@/lib/types";

export default function ProfileClient() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [reefMap, setReefMap] = useState<Record<string, Reef>>({});

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    setDoc(
      userRef,
      {
        uid: user.uid,
        displayName: user.displayName ?? "Reef Guardian",
        email: user.email ?? "",
        bookmarks: [],
        likes: [],
        reviews: [],
      },
      { merge: true }
    );

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (!snapshot.exists()) return;
      setProfile(snapshot.data() as UserProfileType);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    const slugs = Array.from(
      new Set([
        ...profile.bookmarks,
        ...profile.likes,
        ...profile.reviews.map((review) => review.reefSlug),
      ])
    );
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

  if (!user) return <ProfileLogin />;
  if (!profile) return null;

  return (
    <UserProfile
      profile={profile}
      reefs={reefs}
      photoUrl={user.photoURL}
    />
  );
}
