import React from 'react';
import { Hash, Plus, Volume2, Lock } from 'lucide-react';
import { Channel } from '@/types/chat';

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string | null;
  onSelectChannel: (channel: Channel) => void;
  onCreateChannel: () => void;
}

export default function ChannelList({ channels, activeChannelId, onSelectChannel, onCreateChannel }: ChannelListProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between px-3 mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Channels</span>
        <button
          onClick={onCreateChannel}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="space-y-0.5">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => onSelectChannel(channel)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
              activeChannelId === channel.id
                ? 'bg-violet-600 text-white'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            {channel.is_private ? (
              <Lock className="w-4 h-4 flex-shrink-0" />
            ) : (
              <Hash className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="truncate text-sm">{channel.name}</span>
            {channel.unread_count && channel.unread_count > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {channel.unread_count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
