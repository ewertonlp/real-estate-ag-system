// components/chat/ChatWindow.tsx
'use client';

import { useState } from 'react';
import { useChatStore } from '@/app/stores/useChatStore';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CustomScroll } from '../ui/customScroll';
import { MessageBubble } from './messageBubble';

export function ChatWindow() {
  const { activeConversation, conversations, sendMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState('');

  const activeConv = conversations.find(
    (conv) => conv.id === activeConversation
  );

  const handleSend = () => {
    if (activeConversation && newMessage.trim()) {
      sendMessage(activeConversation, newMessage); // Passa ambos os argumentos
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-sm shadow-sm bg-[var(--card)]">
      <CustomScroll className="flex-1 p-4">
        {activeConv?.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </CustomScroll>

      <div className="flex gap-2 p-4 border-t border-[var(--border)]">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          onClick={handleSend}
          size="lg"
          disabled={!activeConversation || !newMessage.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}