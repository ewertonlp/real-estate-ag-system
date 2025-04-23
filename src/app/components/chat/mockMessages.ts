// data/mockConversations.ts
'use client'

import { Conversation } from "@/types";

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'João Silva',
    avatar: '/avatars/1.jpg',
    lastMessage: 'I would like to schedule a visit.',
    unread: 2,
    messages: [
      {
        id: '1',
        name: 'João Silva',
        content: "Hey, I'm interested in the apartment.",
        sender: 'other',
        timestamp: new Date('2024-03-20T10:00:00'),
        read: false
      },
      {
        id: '2',
        name: 'User', // Nome do usuário atual
        content: 'Sure, when would you like to visit?',
        sender: 'user',
        timestamp: new Date('2024-03-20T10:05:00'),
        read: true
      }
    ]
  }
];