"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ReefStatsChartProps {
  coralCover: number;
  fishDiversity: number;
  waterClarity: number;
  heatStress: number;
}

export default function ReefStatsChart({
  coralCover,
  fishDiversity,
  waterClarity,
  heatStress,
}: ReefStatsChartProps) {
  const data = [
    { name: "Coral cover", value: coralCover },
    { name: "Fish diversity", value: fishDiversity },
    { name: "Water clarity", value: waterClarity },
    { name: "Heat stress", value: heatStress },
  ];

  return (
    <div className="h-60 w-full rounded-2xl border border-sky-200/20 bg-slate-950/60 p-4">
      <p className="mb-2 text-sm font-semibold text-sky-100">
        Reef health snapshot
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" tick={{ fill: "#cbd5f5", fontSize: 12 }} />
          <YAxis tick={{ fill: "#cbd5f5", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(56,189,248,0.08)" }}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(148,163,184,0.3)",
              borderRadius: "10px",
              color: "#e2e8f0",
            }}
          />
          <Bar dataKey="value" fill="#38bdf8" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
