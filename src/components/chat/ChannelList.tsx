import React, { useState, useMemo } from 'react';
import { Hash, Plus, Lock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Channel } from '@/types/chat';

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string | null;
  onSelectChannel: (channel: Channel) => void;
  onCreateChannel: () => void;
}

export default function ChannelList({
  channels,
  activeChannelId,
  onSelectChannel,
  onCreateChannel,
}: ChannelListProps) {
  const [search, setSearch] = useState('');

  // SORTING: Unread → Private → Alphabetical
  const sortedChannels = useMemo(() => {
    return [...channels]
      .filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        // unread first
        if ((b.unread_count ?? 0) !== (a.unread_count ?? 0)) {
          return (b.unread_count ?? 0) - (a.unread_count ?? 0);
        }
        // private next
        if (a.is_private !== b.is_private) {
          return a.is_private ? -1 : 1;
        }
        // alphabetical fallback
        return a.name.localeCompare(b.name);
      });
  }, [channels, search]);

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-3 mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Channels
        </span>
        <button
          onClick={onCreateChannel}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-3 mb-3 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search channels…"
          className="w-full pl-9 pr-3 py-2 bg-slate-800 text-sm text-slate-200 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
      </div>

      {/* Channel List */}
      <div className="space-y-0.5">
        <AnimatePresence>
          {sortedChannels.map((channel) => (
            <motion.button
              key={channel.id}
              onClick={() => onSelectChannel(channel)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-all group
                ${
                  activeChannelId === channel.id
                    ? 'bg-violet-600 text-white shadow'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }
              `}
            >
              {/* Icon */}
              {channel.is_private ? (
                <Lock className="w-4 h-4 flex-shrink-0" />
              ) : (
                <Hash className="w-4 h-4 flex-shrink-0" />
              )}

              {/* Name */}
              <span className="truncate text-sm">{channel.name}</span>

              {/* UNREAD BADGE */}
              {channel.unread_count && channel.unread_count > 0 && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="ml-auto bg-red-500/90 text-white text-xs px-1.5 py-0.5 
                             rounded-full min-w-[22px] text-center font-semibold animate-pulse"
                >
                  {channel.unread_count > 99 ? '99+' : channel.unread_count}
                </motion.span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>

        {sortedChannels.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">
            No channels found
          </p>
        )}
      </div>
    </div>
  );
}
