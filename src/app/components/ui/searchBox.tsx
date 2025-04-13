// components/ui/search-box.tsx
"use client";

import { Input } from "./input";
import { Search } from "lucide-react";

import { forwardRef } from "react";

export const SearchBox = forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        ref={ref}
        type="search"
        placeholder="Search"
        className="pl-10 pr-24 py-2 bg-[var(--card)] border-[var(--border)] hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-0 "
        {...props}
      />
      {/* <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd> */}
    </div>
  );
});

SearchBox.displayName = "SearchBox";
