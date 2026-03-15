"use client";

import type { ReefReview } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewListProps {
  reviews: ReefReview[];
}

function formatTimestamp(timestamp?: any) {
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
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-sky-200/60">
        No reviews yet. Be the first to drop a vibe check.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review, idx) => (
        <Card
          key={`${review.uid}-${idx}`}
          className="border border-sky-200/10 bg-slate-900/60"
        >
          <CardContent className="space-y-1 p-3">
            <p className="text-sm text-sky-50">{review.text}</p>
            <p className="text-[11px] text-sky-200/60">
              {formatTimestamp(review.timestamp)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
