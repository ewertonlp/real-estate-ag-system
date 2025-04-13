// components/TopProgressBar.tsx
'use client';


import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import { Progress } from './progress';

export function TopProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    
    const handleStart = () => {
      setProgress(10);
      NProgress.start();
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => setProgress(0), 300);
      NProgress.done();
    };

    // Event listeners para transições
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  useEffect(() => {
    // Resetar progresso quando a rota muda
    setProgress(100);
    const timer = setTimeout(() => setProgress(0), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Progress 
      value={progress}
      className="fixed top-0 left-0 w-full h-1 rounded-none z-[9999] transition-all duration-300"
    />
  );
}