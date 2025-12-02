import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface MessageAreaProps {
  messages: Message[];
  currentUserId: string;
  typingUsers: string[];
}

export default function MessageArea({ messages, currentUserId, typingUsers }: MessageAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const shouldShowAvatar = (index: number) => {
    if (index === 0) return true;
    const prev = messages[index - 1];
    const curr = messages[index];
    return prev.sender_id !== curr.sender_id;
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">No messages yet</h3>
            <p className="text-slate-400">Start the conversation!</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender_id === currentUserId}
              showAvatar={shouldShowAvatar(index)}
            />
          ))}
          <TypingIndicator users={typingUsers} />
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}
