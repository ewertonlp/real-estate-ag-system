// components/ui/custom-scroll.tsx
'use client';

export const CustomScroll = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative overflow-y-auto ${className}`}
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: 'hsl(var(--border)) hsl(var(--background-color))',
    }}
  >
    {children}
  </div>
);