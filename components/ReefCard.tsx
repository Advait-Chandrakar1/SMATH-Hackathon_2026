"use client";

import Link from "next/link";
import type { Reef } from "@/lib/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

interface ReefCardProps {
  reef: Reef;
}

export default function ReefCard({ reef }: ReefCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-200/20 bg-cyan-950/50">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={reef.image || "/reefguard logo.png"}
          alt={reef.name}
          className="h-full w-full object-cover"
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold text-white">{reef.name}</h2>
        <p className="text-sm text-sky-100/80">{reef.description}</p>
        {reef.issues?.length ? (
          <div className="flex flex-wrap gap-1 text-[11px] text-rose-100">
            {reef.issues.slice(0, 2).map((issue) => (
              <span
                key={issue}
                className="rounded-full bg-rose-500/20 px-2 py-0.5"
              >
                {issue}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-sky-100/70">
          <span>{reef.likes ?? 0} likes</span>
          <span>{reef.reviews?.length ?? 0} reviews</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/reef/${reef.slug}`} className="w-full">
          <Button className="w-full rounded-full bg-sky-500 hover:bg-sky-400">
            View reef
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
