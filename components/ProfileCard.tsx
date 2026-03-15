"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function ProfileCard({ user }: any) {
  const { signOut } = useAuth();

  const initials =
    user.displayName
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-sky-100 bg-white/80 shadow-lg backdrop-blur-xl">
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <Avatar className="h-20 w-20 ring-4 ring-sky-200">
            <AvatarImage src={user.photoURL ?? undefined} />
            <AvatarFallback className="bg-sky-100 text-sky-600 text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <p className="text-lg font-semibold text-sky-900">
              {user.displayName}
            </p>
            <p className="text-sm text-sky-500">{user.email}</p>
          </div>

          <Badge variant="outline" className="border-sky-200 text-sky-600">
            Reef Guardian
          </Badge>
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
              Home
            </Button>
          </Link>

          <Link href="/my-reefs">
            <Button variant="ghost" className="w-full justify-start">
              My Saved Reefs
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
