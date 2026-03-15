"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  increment,
  limit,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import type { Reef, UserProfile } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, Waves } from "lucide-react";
import ReefLocationMap from "@/components/ReefLocationMap";
import ReefStatsChart from "@/components/ReefStatsChart";
import ReviewList from "@/components/ReviewList";
import AddReview from "@/components/AddReview";

export default function ReefDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;
  const { user } = useAuth();

  const [reef, setReef] = useState<Reef | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!slug) return;
    const reefQuery = query(
      collection(db, "reefs"),
      where("slug", "==", slug),
      limit(1)
    );
    const unsubscribe = onSnapshot(reefQuery, (snapshot) => {
      if (snapshot.empty) {
        setReef(null);
        return;
      }
      const docSnap = snapshot.docs[0];
      setReef({ id: docSnap.id, ...(docSnap.data() as Reef) });
    });

    return () => unsubscribe();
  }, [slug]);

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const ensureUserDoc = async () => {
      const snap = await getDoc(userRef);
      if (snap.exists()) return;
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName ?? "Reef Guardian",
        email: user.email ?? "",
        bookmarks: [],
        likes: [],
        reviews: [],
      });
    };
    ensureUserDoc();
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (!snapshot.exists()) return;
      setUserProfile(snapshot.data() as UserProfile);
    });
    return () => unsubscribe();
  }, [user]);

  const isLiked = useMemo(() => {
    if (!userProfile || !slug) return false;
    return userProfile.likes.includes(slug);
  }, [userProfile, slug]);

  const isBookmarked = useMemo(() => {
    if (!userProfile || !slug) return false;
    return userProfile.bookmarks.includes(slug);
  }, [userProfile, slug]);

  const ensureUserDoc = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) return;
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName ?? "Reef Guardian",
      email: user.email ?? "",
      bookmarks: [],
      likes: [],
      reviews: [],
    });
  };

  const handleToggleLike = async () => {
    if (!user || !reef || !slug) return;
    const reefRef = doc(db, "reefs", reef.id!);
    const userRef = doc(db, "users", user.uid);

    try {
      await ensureUserDoc();
      if (isLiked) {
        await setDoc(userRef, { likes: arrayRemove(slug) }, { merge: true });
        await updateDoc(reefRef, { likes: increment(-1) });
      } else {
        await setDoc(userRef, { likes: arrayUnion(slug) }, { merge: true });
        await updateDoc(reefRef, { likes: increment(1) });
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleToggleBookmark = async () => {
    if (!user || !reef || !slug) return;
    const reefRef = doc(db, "reefs", reef.id!);
    const userRef = doc(db, "users", user.uid);

    try {
      await ensureUserDoc();
      if (isBookmarked) {
        await setDoc(
          userRef,
          { bookmarks: arrayRemove(slug) },
          { merge: true }
        );
        await updateDoc(reefRef, { bookmarks: increment(-1) });
      } else {
        await setDoc(
          userRef,
          { bookmarks: arrayUnion(slug) },
          { merge: true }
        );
        await updateDoc(reefRef, { bookmarks: increment(1) });
      }
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
    }
  };

  const handleSubmitReview = async (text: string) => {
    if (!user || !reef || !slug) return;
    const reefRef = doc(db, "reefs", reef.id!);
    const userRef = doc(db, "users", user.uid);
    const timestamp = Timestamp.now();
    try {
      await ensureUserDoc();
      await updateDoc(reefRef, {
        reviews: arrayUnion({
          uid: user.uid,
          text,
          timestamp,
        }),
      });
      await setDoc(
        userRef,
        {
          reviews: arrayUnion({
            reefSlug: slug,
            text,
            timestamp,
          }),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  if (!reef) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-sky-100">
        Loading reef...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <ReefLocationMap reef={reef} />

        <Card className="border border-sky-200/20 bg-slate-950/70 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">{reef.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              <div className="flex h-56 w-full items-center justify-center rounded-2xl border border-sky-200/10 bg-gradient-to-br from-sky-500/20 via-cyan-500/20 to-emerald-500/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-sky-200/30 bg-slate-950/50">
                  <Waves className="h-10 w-10 text-sky-200" />
                </div>
              </div>
              <p className="text-sm text-sky-100/80">{reef.description}</p>
              {(reef.facts?.length || reef.issues?.length) && (
                <div className="space-y-3 rounded-2xl border border-sky-200/10 bg-slate-900/60 p-4">
                  {reef.facts?.length ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-sky-200/70">
                        Fast facts
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-sky-100/80">
                        {reef.facts.map((fact, idx) => (
                          <li key={`${fact}-${idx}`}>• {fact}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {reef.issues?.length ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-rose-200/70">
                        Issues right now
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {reef.issues.map((issue) => (
                          <span
                            key={issue}
                            className="rounded-full bg-rose-500/15 px-3 py-1 text-xs text-rose-100"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleToggleLike}
                  disabled={!user}
                  variant={isLiked ? "default" : "outline"}
                  className="gap-2 rounded-full"
                >
                  <Heart className="h-4 w-4" />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button
                  onClick={handleToggleBookmark}
                  disabled={!user}
                  variant={isBookmarked ? "default" : "outline"}
                  className="gap-2 rounded-full"
                >
                  <Bookmark className="h-4 w-4" />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                {!user && (
                  <p className="text-xs text-sky-200/70">
                    Sign in to like, bookmark, or review.
                  </p>
                )}
              </div>
            </div>

            <ReefStatsChart
              coralCover={reef.stats?.coralCover ?? 0}
              fishDiversity={reef.stats?.fishDiversity ?? 0}
              waterClarity={reef.stats?.waterClarity ?? 0}
              heatStress={reef.stats?.heatStress ?? 0}
            />
          </CardContent>
        </Card>

        <Card className="border border-sky-200/20 bg-slate-950/70 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Reef reviews</CardTitle>
            <AddReview disabled={!user} onSubmit={handleSubmitReview} />
          </CardHeader>
          <CardContent className="space-y-4">
            <ReviewList reviews={reef.reviews ?? []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
