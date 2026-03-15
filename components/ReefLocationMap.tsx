"use client";

import dynamic from "next/dynamic";
import type { Reef } from "@/lib/types";

const ReefLocationMapClient = dynamic(() => import("./ReefLocationMapClient"), {
  ssr: false,
});

export default function ReefLocationMap({ reef }: { reef: Reef }) {
  return <ReefLocationMapClient reef={reef} />;
}
