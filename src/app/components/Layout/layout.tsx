'use client';
import Sidebar from './sidebar';
import Header from './header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar fixo */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header fixo */}
        <Header />
        
        {/* Conteúdo principal */}
        <main className="flex-1 overflow-hidden pt-16 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}