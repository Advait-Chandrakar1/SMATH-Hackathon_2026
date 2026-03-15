"use client";

interface Review {
  userId: string;
  text: string;
  likes?: string[];
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0)
    return <p className="text-sm text-gray-400">No reviews yet.</p>;

  return (
    <div className="mt-2 space-y-1">
      {reviews.map((r, idx) => (
        <div key={idx} className="p-2 bg-gray-900/40 rounded">
          <p className="text-sm">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
