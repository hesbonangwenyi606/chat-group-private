import React from 'react';
import { Message, User } from '@/types/chat';
import UserAvatar from './UserAvatar';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
}

export default function MessageBubble({ message, isOwn, showAvatar }: MessageBubbleProps) {
  const sender = message.sender as User | undefined;
  const time = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''} ${showAvatar ? 'mt-4' : 'mt-1'}`}>
      {showAvatar && sender ? (
        <UserAvatar
          src={sender.avatar_url}
          name={sender.display_name}
          status={sender.status as 'online' | 'away' | 'offline'}
          size="md"
        />
      ) : (
        <div className="w-10" />
      )}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {showAvatar && sender && (
          <div className={`flex items-center gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-semibold text-slate-200">{sender.display_name}</span>
            <span className="text-xs text-slate-500">{time}</span>
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-violet-600 text-white rounded-tr-sm'
              : 'bg-slate-700 text-slate-100 rounded-tl-sm'
          }`}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        {isOwn && (
          <div className="flex items-center gap-1 mt-1">
            {message.is_read ? (
              <CheckCheck className="w-4 h-4 text-violet-400" />
            ) : (
              <Check className="w-4 h-4 text-slate-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
