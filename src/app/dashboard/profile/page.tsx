// app/profile/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { agentList,  } from '../../../mocks/team';
import UserProfileCard from '../../components/userProfileCard';
import Loading from '../../components/ui/loading';
import { User } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';
import { Agents } from '@/types';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<Agents | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = searchParams.get('id'); // Assume que estamos buscando por ID
    
    const loadUser = () => {
      try {
        // Encontra o usuário pelo ID
        const selectedUser = agentList.find(agent => agent.id === userId);
        
        if (selectedUser) {
          setUser(selectedUser);
        } else {
          console.error('User not found');
          setUser(agentList[0]); // Fallback para primeiro usuário
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(agentList[0]); // Usa primeiro usuário como fallback
      }
      setLoading(false);
    };

    const timer = setTimeout(loadUser, 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  if (loading) return <Loading />;
  
  return (
    <div className="p-2 bg-[var(--background-color)] min-h-screen">
      <Progress value={33} />

      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
        
            <User size={24} className="text-[var(--text)]" />
            <h1 className="ml-2 text-2xl font-bold text-[var(--text)]">Profile Page</h1>
          </div>
        
      </div>

      {/* Conteúdo Centralizado */}
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 my-6">
       

        {user ? (
          <div className="w-full max-w-2xl">
            <UserProfileCard user={user} />
          </div>
        ) : (
          <div className="bg-[var(--card)] p-6 rounded-lg shadow-md text-center">
            <p className="text-red-500 font-medium">User not found</p>
          </div>
        )}
      </div>
    </div>
  );
}