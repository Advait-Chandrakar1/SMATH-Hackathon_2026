"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";


export default function LeafletMapClient() {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-3xl border border-cyan-200/20 shadow-[0_24px_80px_rgba(2,16,24,0.45)]">
      <MapContainer
        center={[20, 0]}
        zoom={1.75}
        minZoom={1.2}
        maxZoom={10}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={0.2}
        scrollWheelZoom={true}
        className="h-full w-full"
        worldCopyJump = {false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
