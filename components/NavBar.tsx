"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

import { app } from "@/lib/firebase";

export default function NavProfile() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, [auth]);

  const handleGoogleSignIn = async () => {
    await signInWithPopup(auth, provider);
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  // Signed-out state
  if (!user) {
    return (
      <button
        onClick={handleGoogleSignIn}
        className="rounded-full border border-sky-200/40 bg-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-sky-700 backdrop-blur transition hover:bg-white/40"
      >
        Sign In
      </button>
    );
  }

  const initials =
    user.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ??
    user.email?.[0]?.toUpperCase() ??
    "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full ring-2 ring-sky-300/40 ring-offset-2 ring-offset-transparent transition hover:ring-sky-400/70 focus:outline-none"
          aria-label="Open profile menu"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.photoURL ?? undefined}
              alt={user.displayName ?? "Profile"}
            />
            <AvatarFallback className="bg-sky-100 text-xs font-semibold text-sky-700">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-48 rounded-2xl border border-sky-100/70 bg-white/80 p-1 shadow-xl backdrop-blur-xl"
      >
        <DropdownMenuLabel className="truncate px-2 py-1.5 text-xs font-normal text-sky-400/80">
          {user.displayName ?? user.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 bg-sky-100/70" />

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sky-800"
          >
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sky-800"
          >
            Home
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/gallery"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sky-800"
          >
            Reefs
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-sky-100/70" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-rose-500"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
