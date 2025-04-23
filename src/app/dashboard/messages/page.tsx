// app/dashboard/messages/page.tsx
'use client';

import { ChatWindow } from "@/app/components/chat/chatWindows";
import { ConversationList } from "@/app/components/chat/conversationList";
import { useChatStore } from "@/app/stores/useChatStore";



export default function MessagesPage() {
  const { conversations } = useChatStore();

  return (
    <div className="flex h-[calc(100vh-140px)]">
      <div className="w-80 mr-4 bg-[var(--card)] gap-2 rounded-sm shadow-sm">
        <ConversationList />
      </div>
      <div className="flex-1 bg-[var(--background-color)]">
        {conversations.length > 0 ? (
          <ChatWindow />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[var(--text)]">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}