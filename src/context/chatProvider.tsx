// providers/ChatProvider.tsx
'use client';

import { mockConversations } from '@/app/components/chat/mockMessages';
import { useChatStore } from '@/app/stores/useChatStore';
import { useEffect } from 'react';


export function ChatProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Calcula a contagem total de mensagens não lidas
    const totalUnread = mockConversations.reduce(
      (acc, conv) => acc + conv.unread,
      0
    );

    // Inicializa o estado completo da store
    useChatStore.setState({
      conversations: mockConversations,
      activeConversation: mockConversations[0]?.id || null,
      unreadCount: totalUnread, // Inicializa com base nas conversas mockadas
    });
  }, []);

  return <>{children}</>;
}