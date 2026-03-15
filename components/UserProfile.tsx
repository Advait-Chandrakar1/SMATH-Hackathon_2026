"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { Reef, UserProfile } from "@/lib/types";
import UserReefMiniMap from "@/components/UserReefMiniMap";
import { useAuth } from "@/lib/AuthContext";

interface UserProfileProps {
  profile: UserProfile;
  reefs: Reef[];
  photoUrl?: string | null;
}

export default function UserProfileCard({
  profile,
  reefs,
  photoUrl,
}: UserProfileProps) {
  const { signOut } = useAuth();

  const initials =
    profile.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  const reviewedSlugs = new Set(profile.reviews.map((r) => r.reefSlug));
  const likesReceived = reefs.reduce((total, reef) => {
    if (reviewedSlugs.has(reef.slug)) {
      return total + (reef.likes ?? 0);
    }
    return total;
  }, 0);
  const guardianScore =
    profile.likes.length * 2 +
    profile.bookmarks.length +
    profile.reviews.length * 3;

  const formatTimestamp = (timestamp?: any) => {
    if (!timestamp) return "";
    try {
      const date =
        typeof timestamp.toDate === "function"
          ? timestamp.toDate()
          : new Date(timestamp);
      return date.toLocaleDateString();
    } catch {
      return "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-sky-100 bg-white/80 shadow-lg backdrop-blur-xl">
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <Avatar className="h-20 w-20 ring-4 ring-sky-200">
            <AvatarImage src={photoUrl ?? undefined} />
            <AvatarFallback className="bg-sky-100 text-sky-600 text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <p className="text-lg font-semibold text-sky-900">
              {profile.displayName}
            </p>
            <p className="text-sm text-sky-500">{profile.email}</p>
          </div>

          <Badge variant="outline" className="border-sky-200 text-sky-600">
            Reef Guardian
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-sky-100 bg-white/80 shadow-lg backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-wider text-sky-400">
            Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-sky-100 bg-white px-3 py-3 text-center">
            <p className="text-2xl font-semibold text-sky-900">
              {profile.bookmarks.length}
            </p>
            <p className="text-xs text-sky-500">Bookmarks</p>
          </div>
          <div className="rounded-xl border border-sky-100 bg-white px-3 py-3 text-center">
            <p className="text-2xl font-semibold text-sky-900">
              {profile.likes.length}
            </p>
            <p className="text-xs text-sky-500">Likes given</p>
          </div>
          <div className="rounded-xl border border-sky-100 bg-white px-3 py-3 text-center">
            <p className="text-2xl font-semibold text-sky-900">
              {likesReceived}
            </p>
            <p className="text-xs text-sky-500">Likes received</p>
          </div>
          <div className="rounded-xl border border-sky-100 bg-white px-3 py-3 text-center">
            <p className="text-2xl font-semibold text-sky-900">
              {profile.reviews.length}
            </p>
            <p className="text-xs text-sky-500">Reviews</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-sky-100 bg-white/80 shadow-lg backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-wider text-sky-400">
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-sky-800">
          <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-white px-3 py-2">
            <span>Profile sync</span>
            <Badge
              variant="outline"
              className="border-emerald-200 text-emerald-600"
            >
              Live
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-white px-3 py-2">
            <span>Saved reefs</span>
            <span className="text-xs text-sky-500">
              {profile.bookmarks.length} synced
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-white px-3 py-2">
            <span>Reviews</span>
            <span className="text-xs text-sky-500">
              {profile.reviews.length} synced
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-sky-100 bg-white/80 shadow-lg backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-wider text-sky-400">
            Your Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bookmarks">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="bookmarks">
              {profile.bookmarks.length === 0 ? (
                <p className="text-sm text-sky-500/70">
                  No bookmarks yet. Tap a reef and save it for later.
                </p>
              ) : (
                <div className="space-y-2">
                  {profile.bookmarks.map((slug) => {
                    const reef = reefs.find((r) => r.slug === slug);
                    return (
                      <Link
                        key={slug}
                        href={`/reef/${slug}`}
                        className="block rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm text-sky-800 shadow-sm transition hover:border-sky-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            {reef?.name ?? slug}
                          </span>
                          {reef?.issues?.length ? (
                            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] text-rose-600">
                              {reef.issues[0]}
                            </span>
                          ) : null}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="likes">
              {profile.likes.length === 0 ? (
                <p className="text-sm text-sky-500/70">
                  No likes yet. Tap the heart on a reef page.
                </p>
              ) : (
                <div className="space-y-2">
                  {profile.likes.map((slug) => {
                    const reef = reefs.find((r) => r.slug === slug);
                    return (
                      <Link
                        key={slug}
                        href={`/reef/${slug}`}
                        className="block rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm text-emerald-900 shadow-sm transition hover:border-emerald-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            {reef?.name ?? slug}
                          </span>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-600">
                            {reef?.likes ?? 0} likes
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              {profile.reviews.length === 0 ? (
                <p className="text-sm text-sky-500/70">
                  No reviews yet. Leave a quick note to help others.
                </p>
              ) : (
                <div className="space-y-3">
                  {profile.reviews.map((review, idx) => {
                    const reef = reefs.find((r) => r.slug === review.reefSlug);
                    return (
                      <div
                        key={`${review.reefSlug}-${idx}`}
                        className="rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm text-sky-800 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">
                            {reef?.name ?? review.reefSlug}
                          </p>
                          <span className="text-[11px] text-slate-400">
                            {formatTimestamp(review.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{review.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-sky-100 bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-sky-900">
                    Guardian score
                  </p>
                  <p className="text-3xl font-semibold text-sky-900">
                    {guardianScore}
                  </p>
                  <p className="text-xs text-sky-500">
                    Based on likes, bookmarks, and reviews.
                  </p>
                </div>
                <div className="rounded-xl border border-sky-100 bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-sky-900">
                    Favorite regions
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {reefs.slice(0, 3).map((reef) => (
                      <span
                        key={reef.slug}
                        className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700"
                      >
                        {reef.name}
                      </span>
                    ))}
                    {reefs.length === 0 ? (
                      <span className="text-xs text-sky-500/70">
                        Like or bookmark a reef to see this.
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <UserReefMiniMap reefs={reefs} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-sky-100 bg-white/80 shadow-lg backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-wider text-sky-400">
            Navigation
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              Home / Map
            </Button>
          </Link>

          <Link href="/gallery">
            <Button variant="ghost" className="w-full justify-start">
              Reef Gallery
            </Button>
          </Link>

          <Link href="/about">
            <Button variant="ghost" className="w-full justify-start">
              About
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-sky-100 bg-white/80 shadow-lg backdrop-blur-xl">
        <CardContent className="flex flex-col gap-4 pt-6">
          <Separator />

          <Button
            onClick={signOut}
            variant="outline"
            className="border-rose-200 text-rose-500 hover:bg-rose-50"
          >
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
