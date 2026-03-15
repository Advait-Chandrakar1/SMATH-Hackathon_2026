"use client";

import { Reef } from "@/app/gallery/page";

import ReviewList from "./ReviewList";
import AddReview from "./AddReview";
import { Card } from "./ui/card";

interface ReefCardProps {
  reef: Reef;
}

export default function ReefCard({ reef }: ReefCardProps) {
  return (
    <Card className="bg-cyan-950/50 p-4 rounded-xl">
      <img
        src={reef.image}
        alt={reef.name}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <h2 className="text-xl font-semibold">{reef.name}</h2>
      <p className="text-sm mb-2">{reef.description}</p>

      <ReviewList reviews={reef.reviews || []} />
      <AddReview reefId={reef.id} />
    </Card>
  );
}
