"use client";
import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mês: "Jan", vendas: 5580000, meta: 5000000 },
  { mês: "Feb", vendas: 6730000, meta: 6000000 },
  { mês: "Mar", vendas: 6850000, meta: 6500000 },
  { mês: "Apr", vendas: 10508000, meta: 9000000 },
  { mês: "May", vendas: 10859000, meta: 9000000 },
  { mês: "Jun", vendas: 9509000, meta: 9000000 },
  { mês: "Jul", vendas: 11349000, meta: 9000000 },
  { mês: "Aug", vendas: 10700000, meta: 9000000 },
  { mês: "Sep", vendas: 10980000, meta: 9500000 },
  { mês: "Oct", vendas: 10425000, meta: 9500000 },
  { mês: "Nov", vendas: 11987000, meta: 9000000 },
  { mês: "Dec", vendas: 7510000, meta: 6000000 },
];

export default function SalesVsTargetChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        <XAxis
          dataKey="mês"
          tick={{ fill: "var(--text)", fontSize: "0.875rem" }}
          axisLine={{ stroke: "var(--text)" }}
          className="text-sm"
        />

        <YAxis
          yAxisId="left"
          tickFormatter={(value) => `$ ${(value / 1000000).toFixed(0)}M`}
          tick={{ fill: "var(--text)", fontSize: "0.875rem" }}
          axisLine={{ stroke: "var(--text)" }}
          className="text-sm"
        />

        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) =>
            `${((value / 100000000) * 100).toFixed(0)}%`
          }
          tick={{ fill: "var(--text)" }}
          axisLine={{ stroke: "var(--text)" }}
          className="text-sm"
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: "8px",
          }}
          formatter={(value, name) => {
            if (name === "meta")
              return [`R$ ${value.toLocaleString()}`, "Meta"];
            return [`R$ ${value.toLocaleString()}`, "Vendas"];
          }}
          labelStyle={{ color: "#e5e7eb" }}
        />

        <Legend
          formatter={(value) => {
            if (value === "vendas") return "Vendas";
            if (value === "meta") return "Meta";
            return value;
          }}
          wrapperStyle={{ paddingTop: "10px" }}
        />

        <Bar
          yAxisId="left"
          dataKey="vendas"
          fill="#3b82f6"
          name="Vendas"
          radius={[4, 4, 0, 0]}
          barSize={22}
        />

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="meta"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ fill: "#ef4444", strokeWidth: 2 }}
          name="Meta"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
