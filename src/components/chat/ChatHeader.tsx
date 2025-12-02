import React from 'react';
import { Hash, Phone, Video, Pin, Users, Search, Settings, Bell, BellOff } from 'lucide-react';
import { Channel, User } from '@/types/chat';
import UserAvatar from './UserAvatar';

interface ChatHeaderProps {
  channel?: Channel | null;
  dmUser?: User | null;
  memberCount?: number;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onToggleMembers: () => void;
}

export default function ChatHeader({ channel, dmUser, memberCount, notificationsEnabled, onToggleNotifications, onToggleMembers }: ChatHeaderProps) {
  return (
    <div className="h-14 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-800/50">
      <div className="flex items-center gap-3">
        {channel && (
          <>
            <Hash className="w-5 h-5 text-slate-400" />
            <div>
              <h2 className="font-semibold text-white">{channel.name}</h2>
              {channel.description && (
                <p className="text-xs text-slate-400 truncate max-w-xs">{channel.description}</p>
              )}
            </div>
          </>
        )}
        {dmUser && (
          <>
            <UserAvatar
              src={dmUser.avatar_url}
              name={dmUser.display_name}
              status={dmUser.status as 'online' | 'away' | 'offline'}
              size="md"
            />
            <div>
              <h2 className="font-semibold text-white">{dmUser.display_name}</h2>
              <p className="text-xs text-slate-400">{dmUser.status_message || dmUser.status}</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-1">
        {dmUser && (
          <>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-slate-400" />
            </button>
          </>
        )}
        <button onClick={onToggleNotifications} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
          {notificationsEnabled ? <Bell className="w-5 h-5 text-slate-400" /> : <BellOff className="w-5 h-5 text-slate-400" />}
        </button>
        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-slate-400" />
        </button>
        {channel && (
          <button onClick={onToggleMembers} className="p-2 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1">
            <Users className="w-5 h-5 text-slate-400" />
            {memberCount && <span className="text-xs text-slate-400">{memberCount}</span>}
          </button>
        )}
      </div>
    </div>
  );
}
