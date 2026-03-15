"use client";

import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileLogin() {
  const { signInWithGoogle } = useAuth();

  return (
    <Card className="border-sky-100 bg-white/80 shadow-xl backdrop-blur-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-sky-900">
          Sign in to view your profile
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 text-center">
        <p className="text-sm text-sky-600/70">
          Save reefs and track conservation activity.
        </p>

        <Button
          onClick={signInWithGoogle}
          className="w-full rounded-full bg-sky-500 hover:bg-sky-400"
        >
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
}
