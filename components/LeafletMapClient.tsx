"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import L from "leaflet";

interface Reef {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export default function LeafletMapClient() {
  const [reefs, setReefs] = useState<Reef[]>([]);

  useEffect(() => {
    async function fetchReefs() {
      const snapshot = await getDocs(collection(db, "reefs"));
      const reefsData: Reef[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reef[];
      setReefs(reefsData);
    }

    fetchReefs();
  }, []);

  // Optional: custom marker icon
  const reefIcon = new L.Icon({
    iconUrl: "/reef-marker.png", // add an icon in /public
    iconSize: [30, 30],
  });

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
              <div className="text-white">
                <h3 className="font-bold">{reef.name}</h3>
                <p>{reef.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
