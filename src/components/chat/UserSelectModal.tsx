import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { User } from '@/types/chat';
import UserAvatar from './UserAvatar';

interface UserSelectModalProps {
  users: User[];
  currentUserId: string;
  onClose: () => void;
  onSelect: (user: User) => void;
}

export default function UserSelectModal({ users, currentUserId, onClose, onSelect }: UserSelectModalProps) {
  const [search, setSearch] = useState('');
  
  const filteredUsers = users.filter(u => 
    u.id !== currentUserId &&
    (u.display_name.toLowerCase().includes(search.toLowerCase()) ||
     u.username.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">New Message</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 mb-4">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none py-3"
            />
          </div>
          <div className="max-h-80 overflow-y-auto space-y-1">
            {filteredUsers.map(user => (
              <button
                key={user.id}
                onClick={() => { onSelect(user); onClose(); }}
                className="w-full flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <UserAvatar
                  src={user.avatar_url}
                  name={user.display_name}
                  status={user.status as 'online' | 'away' | 'offline'}
                  size="md"
                />
                <div className="text-left">
                  <p className="font-medium text-white">{user.display_name}</p>
                  <p className="text-sm text-slate-400">@{user.username}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
