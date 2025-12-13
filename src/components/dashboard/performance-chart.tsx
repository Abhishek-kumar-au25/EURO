"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { performanceData } from "@/lib/data";

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={performanceData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value) => [`${value}%`, undefined]}
        />
        <Legend wrapperStyle={{fontSize: "14px"}} />
        <Bar dataKey="acceptance" name="Acceptance Rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="completion" name="Completion Rate" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
