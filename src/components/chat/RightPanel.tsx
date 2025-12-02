import React from 'react';
import { X, Hash, Calendar, Users } from 'lucide-react';
import { Channel, User } from '@/types/chat';
import MemberList from './MemberList';
import UserAvatar from './UserAvatar';

interface RightPanelProps {
  channel?: Channel | null;
  dmUser?: User | null;
  members: User[];
  onClose: () => void;
  onSelectUser: (user: User) => void;
}

export default function RightPanel({ channel, dmUser, members, onClose, onSelectUser }: RightPanelProps) {
  return (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-700">
        <h3 className="font-semibold text-white">
          {channel ? 'Channel Details' : 'Profile'}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {channel && (
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{channel.name}</h4>
                <p className="text-xs text-slate-400">Channel</p>
              </div>
            </div>
            {channel.description && (
              <p className="text-sm text-slate-300 mb-3">{channel.description}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Created {new Date(channel.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        )}
        
        {dmUser && (
          <div className="p-4 border-b border-slate-700 text-center">
            <UserAvatar src={dmUser.avatar_url} name={dmUser.display_name} status={dmUser.status as any} size="lg" />
            <h4 className="font-semibold text-white mt-3">{dmUser.display_name}</h4>
            <p className="text-sm text-slate-400">@{dmUser.username}</p>
            {dmUser.status_message && (
              <p className="text-sm text-slate-300 mt-2">{dmUser.status_message}</p>
            )}
          </div>
        )}
        
        {channel && (
          <>
            <div className="px-4 py-3 flex items-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4" />
              <span>{members.length} Members</span>
            </div>
            <MemberList members={members} onSelectUser={onSelectUser} />
          </>
        )}
      </div>
    </div>
  );
}
