"use client";

import dynamic from "next/dynamic";
import type { Reef } from "@/lib/types";

const UserReefMiniMapClient = dynamic(
  () => import("./UserReefMiniMapClient"),
  { ssr: false }
);

export default function UserReefMiniMap({ reefs }: { reefs: Reef[] }) {
  if (reefs.length === 0) return null;
  return <UserReefMiniMapClient reefs={reefs} />;
}
