"use client";

import { useAuth } from "@/lib/AuthContext";
import ProfileLogin from "@/components/ProfileLogin";
import ProfileCard from "@/components/ProfileCard";

export default function ProfileClient() {
  const { user } = useAuth();

  if (!user) return <ProfileLogin />;

  return <ProfileCard user={user} />;
}
