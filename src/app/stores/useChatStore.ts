// stores/useChatStore.ts
import { create } from 'zustand';
import { Conversation, Message } from '@/types';

type ChatStore = {
  // Estado
  unreadCount: number;
  conversations: Conversation[];
  activeConversation: string | null;
  currentUser: { name: string };

  // Ações
  incrementUnread: () => void;
  resetUnread: () => void;
  setActiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, content: string) => void;
  markAsRead: (conversationId: string) => void;
  addConversation: (newConversation: Conversation) => void;
  getActiveConversation: () => Conversation | undefined;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  // Estado inicial
  unreadCount: 0,
  conversations: [],
  activeConversation: null,
  currentUser: { name: 'User' },

  // Ações
  incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  
  resetUnread: () => set({ unreadCount: 0 }),

  setActiveConversation: (id) => {
    set({ activeConversation: id });
  },

  sendMessage: (conversationId, content) => {
    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          const newMessage: Message = {
            id: Date.now().toString(),
            name: get().currentUser.name,
            content,
            sender: 'user',
            timestamp: new Date(),
            read: false
          };

          return {
            ...conv,
            unread: conv.unread + 1,
            lastMessage: content,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      }),
      unreadCount: state.unreadCount + 1
    }));
  },

  markAsRead: (conversationId) => {
    set((state) => {
    
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      
      const unreadDifference = conversation?.unread || 0;
  
      return {
        conversations: state.conversations.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              unread: 0,
              messages: conv.messages.map((msg) => ({
                ...msg,
                read: true
              }))
            };
          }
          return conv;
        }),
        unreadCount: Math.max(state.unreadCount - unreadDifference, 0)
      };
    });
  },

  addConversation: (newConversation) => {
    set((state) => ({
      conversations: [...state.conversations, newConversation]
    }));
  },

  getActiveConversation: () => {
    return get().conversations.find(
      (conv) => conv.id === get().activeConversation
    );
  }
}));