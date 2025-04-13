// components/ProgressProvider.tsx
'use client';

import { Progress } from '@/app/components/ui/progress';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProgressProvider() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const start = () => {
      setIsAnimating(true);
      setProgress(20);
      setTimeout(() => setProgress(66), 150);
    };

    const complete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsAnimating(false);
        setProgress(0);
      }, 300);
    };

    // Event listeners para navegação
    window.addEventListener('beforeunload', start);
    window.addEventListener('load', complete);

    // Simular transição ao mudar de rota
    start();
    const timeout = setTimeout(complete, 500);

    return () => {
      window.removeEventListener('beforeunload', start);
      window.removeEventListener('load', complete);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Progress
        value={progress}
        className={`h-1 rounded-none transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}