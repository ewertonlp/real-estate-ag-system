"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    mês: "Jan",
    "2024": 45,
    "2025": 58,
  },
  {
    mês: "Feb",
    "2024": 68,
    "2025": 75,
  },
  {
    mês: "Mar",
    "2024": 78,
    "2025": 82,
  },
  {
    mês: "Apr",
    "2024": 120,
    "2025": 107,
  },
  {
    mês: "May",
    "2024": 95,
    "2025": 108,
  },
  {
    mês: "Jun",
    "2024": 86,
    "2025": 95,
  },
  {
    mês: "Jul",
    "2024": 95,
    "2025": 110,
  },
  {
    mês: "Aug",
    "2024": 80,
    "2025": 96,
  },
  {
    mês: "Sep",
    "2024": 96,
    "2025": 104,
  },
  {
    mês: "Oct",
    "2024": 108,
    "2025": 101,
  },
  {
    mês: "Nov",
    "2024": 101,
    "2025": 115,
  },
  {
    mês: "Dec",
    "2024": 85,
    "2025": 79,
  },
];

export default class MonthlyCharts extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="mês"
            tick={{
              fill: "var(--text) ",
              fontSize: "0.875rem",
            }}
            axisLine={{ stroke: "var(--text)" }}
          />
          <YAxis
            tickFormatter={(value) => `${Math.round(value).toLocaleString()}`}
            tick={{ fill: "var(--text)", fontSize: "0.875rem" }}
            axisLine={{ stroke: "var(--text)" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
            }}
            formatter={(value) => [`${value.toLocaleString()}`, "Sales"]}
            labelStyle={{ color: "#e5e7eb" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "15px" }}
            formatter={(value) => (value === "2024" ? "2024" : "2025")}
          />
          <Bar
            dataKey="2024"
            fill="#3b82f6"
            name="2024"
            radius={[4, 4, 0, 0]}
            barSize={18}
          />
          <Bar
            dataKey="2025"
            fill="#10b981"
            name="2025"
            radius={[4, 4, 0, 0]}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
