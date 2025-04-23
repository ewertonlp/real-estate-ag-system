// components/chat/MessageBubble.tsx
'use client';

import { Message } from "@/types";
import { CustomAvatar } from "./customAvatar";

export const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2 mb-4`}>
      {message.sender === 'other' && (
        <CustomAvatar
          src={message.avatar}
          fallback={message.name}
          status={message.online ? 'online' : 'offline'}
          size="sm"
        />
      )}
      
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          message.sender === 'user'
            ? 'bg-[var(--primary)]/70 text-text'
            : 'bg-[var(--muted)]'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-end mt-1 ">
          <span className="text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};