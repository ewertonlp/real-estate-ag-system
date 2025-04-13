// components/ui/card.tsx
"use client";

import { ReactNode } from "react";

interface CardProps {
  title: string;
  value: ReactNode;
  className?: string;
}

export function Card({ title, value, className }: CardProps) {
  return (
    <div className={`p-4 bg-[var(--card)] shadow rounded-sm ${className}`}>
      <p className="text-text text-md font-medium mb-1">{title}</p>
      <h2 className="text-xl font-bold text-[var(--text)]">{value}</h2>
    </div>
  );
}