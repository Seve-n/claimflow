"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Claim } from "@/types";

interface ClaimsStatusChartProps {
  claims: Claim[];
}

const ACTIVE_STATUSES = new Set(["submitted", "under_review", "assessment", "decision_pending"]);

/** Small donut chart summarizing claim status distribution, paired with a text legend. */
export function ClaimsStatusChart({ claims }: ClaimsStatusChartProps) {
  const segments = [
    {
      name: "In progress",
      value: claims.filter((c) => ACTIVE_STATUSES.has(c.status)).length,
      color: "var(--info)",
    },
    {
      name: "Awaiting documents",
      value: claims.filter((c) => c.status === "awaiting_documents").length,
      color: "var(--warning)",
    },
    {
      name: "Resolved",
      value: claims.filter((c) => c.status === "resolved").length,
      color: "var(--success)",
    },
    {
      name: "Closed",
      value: claims.filter((c) => c.status === "closed").length,
      color: "var(--muted-foreground)",
    },
  ].filter((segment) => segment.value > 0);

  const total = claims.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims by status</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="relative size-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                dataKey="value"
                nameKey="name"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={2}
                stroke="none"
              >
                {segments.map((segment) => (
                  <Cell key={segment.name} fill={segment.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} claim(s)`, name]}
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "var(--border)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-xl font-semibold text-foreground">{total}</span>
            <span className="text-[10px] text-muted-foreground">total</span>
          </div>
        </div>
        <ul className="flex flex-1 flex-col gap-1.5">
          {segments.map((segment) => (
            <li key={segment.name} className="flex items-center gap-2 text-sm">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: segment.color }}
                aria-hidden="true"
              />
              <span className="flex-1 text-muted-foreground">{segment.name}</span>
              <span className="font-medium text-foreground">{segment.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
