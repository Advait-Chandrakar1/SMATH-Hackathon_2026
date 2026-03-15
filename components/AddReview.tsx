"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface AddReviewProps {
  disabled?: boolean;
  onSubmit: (text: string) => Promise<void> | void;
}

export default function AddReview({ disabled, onSubmit }: AddReviewProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await onSubmit(text.trim());
    setLoading(false);
    setText("");
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="rounded-full bg-emerald-500 text-white hover:bg-emerald-400"
      >
        Add review
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg border border-sky-100/50 bg-white/95">
          <DialogHeader>
            <DialogTitle className="text-sky-900">
              Drop a quick reef review
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Keep it casual. What stood out? What would you tell your friends?"
              rows={5}
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Posting..." : "Post review"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
