"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Reef } from "@/lib/types";
import L from "leaflet";
import { useRouter } from "next/navigation";

export default function UserReefMiniMapClient({ reefs }: { reefs: Reef[] }) {
  const router = useRouter();
  const reefIcon = new L.DivIcon({
    className: "",
    html:
      '<div style="width:14px;height:14px;border-radius:999px;background:#f97316;border:2px solid #0f172a;box-shadow:0 6px 12px rgba(15,23,42,0.35)"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -6],
  });

  return (
    <div className="h-64 w-full overflow-hidden rounded-2xl border border-sky-200/40">
      <MapContainer
        center={[20, 0]}
        zoom={1.8}
        minZoom={1.2}
        maxZoom={6}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reefs.map((reef) => (
          <Marker
            key={reef.slug}
            position={[reef.latitude, reef.longitude]}
            icon={reefIcon}
          >
            <Popup>
              <div className="space-y-1 text-slate-900">
                <h3 className="text-sm font-semibold">{reef.name}</h3>
                <button
                  className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white"
                  onClick={() => {
                    if (!reef.slug) return;
                    router.push(`/reef/${reef.slug}`);
                  }}
                >
                  Open reef
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
