import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Channel, Message } from '@/types/chat';
import { Sidebar, ChatContainer, RightPanel, CreateChannelModal, UserSettingsModal, UserSelectModal } from './chat';

const CURRENT_USER_ID = '11111111-1111-1111-1111-111111111111';

export default function AppLayout() {
  const [users, setUsers] = useState<User[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activeDmUser, setActiveDmUser] = useState<User | null>(null);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [typingUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const [usersRes, channelsRes] = await Promise.all([
        supabase.from('chat_users').select('*'),
        supabase.from('channels').select('*')
      ]);
      if (usersRes.data) {
        setUsers(usersRes.data);
        setCurrentUser(usersRes.data.find(u => u.id === CURRENT_USER_ID) || null);
      }
      if (channelsRes.data) setChannels(channelsRes.data);
      setLoading(false);
    };
    init();

    // Set up real-time subscription for new messages
    const messagesChannel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
        const { data } = await supabase
          .from('messages')
          .select('*, sender:chat_users!sender_id(*)')
          .eq('id', payload.new.id)
          .single();
        if (data) {
          setMessages(prev => {
            if (prev.some(m => m.id === data.id)) return prev;
            return [...prev, data];
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, []);


  const fetchMessages = useCallback(async (channelId?: string, recipientId?: string) => {
    let query = supabase.from('messages').select('*, sender:chat_users!sender_id(*)');
    if (channelId) query = query.eq('channel_id', channelId);
    else if (recipientId) {
      query = query.or(`and(sender_id.eq.${CURRENT_USER_ID},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${CURRENT_USER_ID})`);
    }
    const { data } = await query.order('created_at', { ascending: true });
    if (data) setMessages(data);
  }, []);

  const handleSelectChannel = (channel: Channel) => {
    setActiveChannel(channel);
    setActiveDmUser(null);
    fetchMessages(channel.id);
  };

  const handleSelectUser = (user: User) => {
    setActiveDmUser(user);
    setActiveChannel(null);
    fetchMessages(undefined, user.id);
  };

  const handleSendMessage = async (content: string) => {
    const { data } = await supabase.from('messages').insert({
      content,
      sender_id: CURRENT_USER_ID,
      channel_id: activeChannel?.id || null,
      recipient_id: activeDmUser?.id || null,
    }).select('*, sender:chat_users!sender_id(*)').single();
    if (data) setMessages(prev => [...prev, data]);
  };

  const handleCreateChannel = async (name: string, description: string, isPrivate: boolean) => {
    const { data } = await supabase.from('channels').insert({
      name, description, is_private: isPrivate, created_by: CURRENT_USER_ID
    }).select().single();
    if (data) setChannels(prev => [...prev, data]);
  };

  const handleSaveSettings = async (updates: Partial<User>) => {
    await supabase.from('chat_users').update(updates).eq('id', CURRENT_USER_ID);
    setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
  };

  if (loading) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-slate-900 text-white overflow-hidden">
      <Sidebar
        currentUser={currentUser}
        users={users}
        channels={channels}
        activeChannelId={activeChannel?.id || null}
        activeUserId={activeDmUser?.id || null}
        onSelectChannel={handleSelectChannel}
        onSelectUser={handleSelectUser}
        onCreateChannel={() => setShowCreateChannel(true)}
        onStartDM={() => setShowUserSelect(true)}
        onSettings={() => setShowSettings(true)}
      />
      <ChatContainer
        channel={activeChannel}
        dmUser={activeDmUser}
        messages={messages}
        currentUserId={CURRENT_USER_ID}
        typingUsers={typingUsers}
        memberCount={users.length}
        notificationsEnabled={notifications}
        onSendMessage={handleSendMessage}
        onToggleNotifications={() => setNotifications(!notifications)}
        onToggleMembers={() => setShowRightPanel(!showRightPanel)}
      />
      {showRightPanel && (
        <RightPanel
          channel={activeChannel}
          dmUser={activeDmUser}
          members={users}
          onClose={() => setShowRightPanel(false)}
          onSelectUser={handleSelectUser}
        />
      )}
      {showCreateChannel && (
        <CreateChannelModal
          onClose={() => setShowCreateChannel(false)}
          onCreate={handleCreateChannel}
        />
      )}
      {showSettings && currentUser && (
        <UserSettingsModal
          user={currentUser}
          onClose={() => setShowSettings(false)}
          onSave={handleSaveSettings}
        />
      )}
      {showUserSelect && (
        <UserSelectModal
          users={users}
          currentUserId={CURRENT_USER_ID}
          onClose={() => setShowUserSelect(false)}
          onSelect={handleSelectUser}
        />
      )}
    </div>
  );
}
