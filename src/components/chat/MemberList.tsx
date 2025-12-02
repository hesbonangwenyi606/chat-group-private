import React from 'react';
import { User } from '@/types/chat';
import UserAvatar from './UserAvatar';

interface MemberListProps {
  members: User[];
  onSelectUser: (user: User) => void;
}

export default function MemberList({ members, onSelectUser }: MemberListProps) {
  const online = members.filter(m => m.status === 'online');
  const away = members.filter(m => m.status === 'away');
  const offline = members.filter(m => m.status === 'offline');

  const renderSection = (title: string, users: User[], count: number) => (
    <div className="mb-4">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
        {title} — {count}
      </h4>
      <div className="space-y-1">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <UserAvatar
              src={user.avatar_url}
              name={user.display_name}
              status={user.status as 'online' | 'away' | 'offline'}
              size="md"
            />
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{user.display_name}</p>
              {user.status_message && (
                <p className="text-xs text-slate-400 truncate">{user.status_message}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-4">
      {online.length > 0 && renderSection('Online', online, online.length)}
      {away.length > 0 && renderSection('Away', away, away.length)}
      {offline.length > 0 && renderSection('Offline', offline, offline.length)}
    </div>
  );
}
