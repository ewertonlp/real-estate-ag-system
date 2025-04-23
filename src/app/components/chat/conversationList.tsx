// components/chat/ConversationList.tsx
'use client';


import { useChatStore } from '@/app/stores/useChatStore';
import { cn } from '@/utils/utils';
import { useEffect } from 'react';

export const ConversationList = () => {
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    markAsRead,
    unreadCount
  } = useChatStore();

  // Seleciona a primeira conversa automaticamente
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0].id);
    }
  }, [conversations, activeConversation, setActiveConversation]);

  return (
    <div className="h-full overflow-y-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => {
            setActiveConversation(conversation.id);
            markAsRead(conversation.id);
          }}
          className={cn(
            'flex items-center p-4 hover:bg-[var(--hover)] cursor-pointer border-b border-[var(--border)]',
            activeConversation === conversation.id && 'bg-[var(--primary)]/10'
          )}
        >
          {/* Avatar Customizado */}
          <div className="relative flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <span className="text-text font-medium">
                {conversation.name[0]}
              </span>
            </div>
            {/* Indicador Online */}
            {conversation.unread > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {conversation.unread}
              </div>
            )}
          </div>

          <div className="ml-4 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-[var(--text)] truncate">
                {conversation.name}
              </h3>
              <span className="text-xs text-[var(--muted-foreground)]">
                {new Date(
                  conversation.messages[conversation.messages.length - 1]
                    ?.timestamp
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-sm text-[var(--text)] truncate">
              {conversation.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};