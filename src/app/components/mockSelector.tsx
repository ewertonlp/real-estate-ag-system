// components/MockSelector.tsx
'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MockSelector() {
  const searchParams = useSearchParams();
  const [currentMock, setCurrentMock] = useState('default');

  const mockOptions = [
    { value: 'default', label: 'Default User' },
    { value: 'admin', label: 'Admin User' },
    { value: 'empty', label: 'Empty Fields' }
  ];

  useEffect(() => {
    setCurrentMock(searchParams.get('mock') || 'default');
  }, [searchParams]);

  return (
    <div className="max-w-screen mb-4 p-4 bg-[var(--card)] rounded-sm shadow">
      <h3 className="text-sm font-semibold mb-2">Mock Scenarios:</h3>
      <div className="flex flex-wrap justify-center items-center gap-2">
        {mockOptions.map((option) => (
          <Link
            key={option.value}
            href={{
              pathname: '/profile',
              query: { mock: option.value }
            }}
            scroll={false} // Evita recarregamento completo da página
            className={`px-3 py-1 text-sm rounded transition-colors ${
              currentMock === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}