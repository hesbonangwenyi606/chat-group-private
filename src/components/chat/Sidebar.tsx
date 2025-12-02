import React from 'react';
import { MessageSquare, Settings, LogOut } from 'lucide-react';
import { User, Channel } from '@/types/chat';
import UserAvatar from './UserAvatar';
import ChannelList from './ChannelList';
import DirectMessageList from './DirectMessageList';

interface SidebarProps {
  currentUser: User | null;
  users: User[];
  channels: Channel[];
  activeChannelId: string | null;
  activeUserId: string | null;
  onSelectChannel: (channel: Channel) => void;
  onSelectUser: (user: User) => void;
  onCreateChannel: () => void;
  onStartDM: () => void;
  onSettings: () => void;
}

export default function Sidebar({
  currentUser, users, channels, activeChannelId, activeUserId,
  onSelectChannel, onSelectUser, onCreateChannel, onStartDM, onSettings
}: SidebarProps) {
  return (
    <div className="w-72 bg-slate-800 flex flex-col border-r border-slate-700">
      <div className="h-14 flex items-center gap-3 px-4 border-b border-slate-700">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-white text-lg">ChatFlow</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ChannelList
          channels={channels}
          activeChannelId={activeChannelId}
          onSelectChannel={onSelectChannel}
          onCreateChannel={onCreateChannel}
        />
        <DirectMessageList
          users={users}
          currentUserId={currentUser?.id || ''}
          activeUserId={activeUserId}
          onSelectUser={onSelectUser}
          onStartDM={onStartDM}
        />
      </div>
      
      {currentUser && (
        <div className="p-3 border-t border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <UserAvatar
              src={currentUser.avatar_url}
              name={currentUser.display_name}
              status={currentUser.status as 'online' | 'away' | 'offline'}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentUser.display_name}</p>
              <p className="text-xs text-slate-400 truncate">{currentUser.status_message || 'Online'}</p>
            </div>
            <button onClick={onSettings} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
