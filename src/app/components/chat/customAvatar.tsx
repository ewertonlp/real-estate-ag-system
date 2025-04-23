// components/ui/custom-avatar.tsx
'use client';

import Image from "next/image";

export const CustomAvatar = ({
  src,
  fallback,
  size = 'md',
  status,
}: {
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline';
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const statusStyles = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
  };

  return (
    <div className={`relative inline-block ${sizes[size]}`}>
      {src ? (
        <Image
          src={src}
          alt="Avatar"
          className="rounded-full object-cover w-full h-full border-2 border-[var(--border)]"
        />
      ) : (
        <div className="rounded-full bg-[var(--primary)] text-white flex items-center justify-center w-full h-full border-2 border-[var(--border)]">
          <span className="font-medium">{fallback[0]}</span>
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full w-3 h-3 ring-2 ring-white ${statusStyles[status]}`}
        />
      )}
    </div>
  );
};