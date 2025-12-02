import React from 'react';
import { Plus } from 'lucide-react';
import { User } from '@/types/chat';
import UserAvatar from './UserAvatar';

interface DirectMessageListProps {
  users: User[];
  currentUserId: string;
  activeUserId: string | null;
  onSelectUser: (user: User) => void;
  onStartDM: () => void;
}

export default function DirectMessageList({ users, currentUserId, activeUserId, onSelectUser, onStartDM }: DirectMessageListProps) {
  const otherUsers = users.filter(u => u.id !== currentUserId);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Messages</span>
        <button
          onClick={onStartDM}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="space-y-0.5">
        {otherUsers.slice(0, 8).map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
              activeUserId === user.id
                ? 'bg-violet-600 text-white'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <UserAvatar
              src={user.avatar_url}
              name={user.display_name}
              status={user.status as 'online' | 'away' | 'offline'}
              size="sm"
            />
            <span className="truncate text-sm">{user.display_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
