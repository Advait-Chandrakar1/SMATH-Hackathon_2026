"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Map } from "lucide-react";

// Leaflet touches window/document — must never run on the server.
// We only import it once the dialog is open (triggered by user click),
// which also avoids loading the leaflet bundle on initial page load.
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-sky-400/60">
      Loading map…
    </div>
  ),
});

export default function ShowMapButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Trigger button ───────────────────────────────────────────── */}
      <Button
        onClick={() => setOpen(true)}
        className="gap-2 rounded-full bg-sky-500 px-6 text-white shadow-[0_4px_20px_rgba(14,165,233,0.4)] hover:bg-sky-400 hover:shadow-[0_4px_28px_rgba(14,165,233,0.55)] active:scale-95"
      >
        <Map className="h-4 w-4" />
        View Reef Map
      </Button>

      {/* ── Dialog containing the map ────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          // Full-screen-ish on mobile, large panel on desktop
          className="flex h-[90vh] max-h-[780px] w-[95vw] max-w-5xl flex-col gap-0 overflow-hidden rounded-2xl border border-sky-100/60 bg-white/90 p-0 shadow-2xl backdrop-blur-xl"
        >
          {/* Header */}
          <DialogHeader className="shrink-0 border-b border-sky-100/60 px-6 py-4">
            <DialogTitle className="flex items-center gap-2 text-sky-900">
              <Map className="h-5 w-5 text-sky-500" />
              Coral Reefs of the World
            </DialogTitle>
            <DialogDescription className="text-xs text-sky-500/70">
              Click any marker to learn about the reef and its risk level.
            </DialogDescription>
          </DialogHeader>

          {/* Map — takes the remaining height */}
          <div className="relative min-h-0 flex-1 p-3">
            {open && <LeafletMap />}
          </div>

          {/* Risk legend */}
          <div className="shrink-0 flex flex-wrap items-center gap-4 border-t border-sky-100/60 px-6 py-3">
            {[
              { label: "Low", color: "#22c55e" },
              { label: "Moderate", color: "#f59e0b" },
              { label: "High", color: "#f97316" },
              { label: "Critical", color: "#ef4444" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full border border-white shadow-sm"
                  style={{ background: color }}
                />
                <span className="text-xs text-sky-700/60">{label}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
