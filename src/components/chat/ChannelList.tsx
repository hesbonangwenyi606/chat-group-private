import React, { useState, useMemo } from "react";
import {
  Hash,
  Plus,
  Lock,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Channel } from "@/types/chat";

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string | null;
  onSelectChannel: (channel: Channel) => void;
  onCreateChannel: () => void;
  onDeleteChannel?: (channel: Channel) => void;
  onMuteChannel?: (channel: Channel) => void;
  onMarkAsRead?: (channel: Channel) => void;
}

export default function ChannelList({
  channels,
  activeChannelId,
  onSelectChannel,
  onCreateChannel,
  onDeleteChannel,
  onMuteChannel,
  onMarkAsRead,
}: ChannelListProps) {
  const [search, setSearch] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    channels.forEach((c) => cats.add(c.category || "Uncategorized"));
    return Array.from(cats);
  }, [channels]);

  // Sort and filter channels per category
  const getSortedChannels = (category: string) => {
    return channels
      .filter(
        (c) =>
          (c.category || "Uncategorized") === category &&
          c.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if ((b.unread_count ?? 0) !== (a.unread_count ?? 0)) {
          return (b.unread_count ?? 0) - (a.unread_count ?? 0);
        }
        if (a.is_private !== b.is_private) {
          return a.is_private ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
  };

  // Status dot color
  const getStatusColor = (status?: "online" | "offline" | "away") => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-400";
      default:
        return "bg-gray-500";
    }
  };

  const toggleSection = (category: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

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

      {/* Search */}
      <div className="px-3 mb-3 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search channels…"
          className="w-full pl-9 pr-3 py-2 bg-slate-800 text-sm text-slate-200 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
        />
      </div>

      {/* Channel Sections */}
      <div className="space-y-2">
        {categories.map((category) => {
          const channelsInCategory = getSortedChannels(category);
          if (channelsInCategory.length === 0) return null;

          const isCollapsed = collapsedSections[category] ?? false;

          return (
            <div key={category} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(category)}
                className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-700/20 text-slate-300 rounded-md
                           hover:bg-slate-700/50 transition-colors font-semibold text-sm"
              >
                <span>{category}</span>
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Channels */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isCollapsed ? "max-h-0" : "max-h-[1000px]"
                }`}
              >
                <div className="space-y-0.5 mt-1">
                  {channelsInCategory.map((channel) => (
                    <div key={channel.id} className="relative">
                      <button
                        onClick={() => onSelectChannel(channel)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setMenuOpenId(channel.id);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-150
                        ${
                          activeChannelId === channel.id
                            ? "bg-violet-600 text-white shadow"
                            : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                        }
                        hover:scale-[1.02] active:scale-[0.98]
                      `}
                      >
                        {channel.is_private ? (
                          <Lock className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <Hash className="w-4 h-4 flex-shrink-0" />
                        )}

                        {/* Name + Status */}
                        <span className="truncate text-sm flex-1 flex items-center gap-2">
                          {channel.name}
                          {channel.status && (
                            <span
                              className={`w-2 h-2 rounded-full ${getStatusColor(
                                channel.status
                              )}`}
                            />
                          )}
                        </span>

                        {/* Unread Badge */}
                        {channel.unread_count && channel.unread_count > 0 && (
                          <span
                            className="ml-auto bg-red-500/90 text-white text-xs px-1.5 py-0.5 rounded-full 
                            min-w-[22px] text-center font-semibold animate-pulse"
                          >
                            {channel.unread_count > 99 ? "99+" : channel.unread_count}
                          </span>
                        )}
                      </button>

                      {/* Context Menu */}
                      {menuOpenId === channel.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-slate-800 rounded-md shadow-lg z-50">
                          <button
                            onClick={() => {
                              onMarkAsRead?.(channel);
                              setMenuOpenId(null);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-slate-700 transition"
                          >
                            Mark as Read
                          </button>
                          <button
                            onClick={() => {
                              onMuteChannel?.(channel);
                              setMenuOpenId(null);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-slate-700 transition"
                          >
                            Mute Channel
                          </button>
                          <button
                            onClick={() => {
                              onDeleteChannel?.(channel);
                              setMenuOpenId(null);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-red-600 hover:text-white transition"
                          >
                            Delete Channel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No channels found */}
      {channels.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
        .length === 0 && (
        <p className="text-center text-slate-500 text-sm py-4">No channels found</p>
      )}
    </div>
  );
}
