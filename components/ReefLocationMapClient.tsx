"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Reef } from "@/lib/types";
import L from "leaflet";

export default function ReefLocationMapClient({ reef }: { reef: Reef }) {
  const reefIcon = new L.DivIcon({
    className: "",
    html:
      '<div style="width:18px;height:18px;border-radius:999px;background:#38bdf8;border:3px solid #0f172a;box-shadow:0 6px 14px rgba(15,23,42,0.4)"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -8],
  });

  return (
    <div className="h-[360px] w-full overflow-hidden rounded-3xl border border-cyan-200/20 shadow-[0_24px_80px_rgba(2,16,24,0.45)]">
      <MapContainer
        center={[reef.latitude, reef.longitude]}
        zoom={5}
        minZoom={2}
        maxZoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[reef.latitude, reef.longitude]}
          icon={reefIcon}
        >
          <Popup>
            <div className="space-y-1 text-slate-900">
              <h3 className="text-sm font-semibold">{reef.name}</h3>
              <p className="text-xs text-slate-600">
                {reef.description}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
