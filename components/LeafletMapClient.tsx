"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import L from "leaflet";
import { useRouter } from "next/navigation";
import type { Reef } from "@/lib/types";

export default function LeafletMapClient() {
  const [reefs, setReefs] = useState<Reef[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reefs"), (snapshot) => {
      const reefsData: Reef[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reef[];
      setReefs(reefsData);
    });

    return () => unsubscribe();
  }, []);

  // Optional: custom marker icon
  const reefIcon = new L.DivIcon({
    className: "",
    html: '<div style="width:18px;height:18px;border-radius:999px;background:#22c55e;border:3px solid #0f172a;box-shadow:0 6px 14px rgba(15,23,42,0.4)"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -8],
  });

  return (
    <div className="h-130 w-full overflow-hidden rounded-3xl border border-cyan-200/20 shadow-[0_24px_80px_rgba(2,16,24,0.45)]">
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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reefs.map((reef) => (
          <Marker
            key={reef.id}
            position={[reef.latitude, reef.longitude]}
            icon={reefIcon}
          >
            <Popup>
              <div className="space-y-2 text-slate-900">
                <div>
                  <h3 className="text-sm font-semibold">{reef.name}</h3>
                  <p className="text-xs text-slate-600">{reef.description}</p>
                </div>
                {reef.facts?.length ? (
                  <div>
                    <p className="text-[11px] font-semibold text-slate-700">
                      Quick fact
                    </p>
                    <p className="text-xs text-slate-600">{reef.facts[0]}</p>
                  </div>
                ) : null}
                {reef.issues?.length ? (
                  <div className="flex flex-wrap gap-1 text-[10px] text-rose-600">
                    {reef.issues.slice(0, 2).map((issue) => (
                      <span
                        key={issue}
                        className="rounded-full bg-rose-50 px-2 py-0.5"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                ) : null}
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
