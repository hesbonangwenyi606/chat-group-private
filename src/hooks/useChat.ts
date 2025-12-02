import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Channel, Message, DirectMessage } from '@/types/chat';

export function useChat(currentUserId: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    const { data } = await supabase.from('chat_users').select('*');
    if (data) setUsers(data);
  }, []);

  const fetchChannels = useCallback(async () => {
    const { data } = await supabase.from('channels').select('*');
    if (data) setChannels(data);
  }, []);

  const fetchMessages = useCallback(async (channelId?: string, recipientId?: string) => {
    let query = supabase.from('messages').select('*, sender:chat_users!sender_id(*)');
    if (channelId) {
      query = query.eq('channel_id', channelId);
    } else if (recipientId) {
      query = query.or(`and(sender_id.eq.${currentUserId},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${currentUserId})`);
    }
    const { data } = await query.order('created_at', { ascending: true });
    if (data) setMessages(data);
  }, [currentUserId]);

  const sendMessage = useCallback(async (content: string, channelId?: string, recipientId?: string) => {
    const { data, error } = await supabase.from('messages').insert({
      content,
      sender_id: currentUserId,
      channel_id: channelId || null,
      recipient_id: recipientId || null,
    }).select('*, sender:chat_users!sender_id(*)').single();
    if (data && !error) {
      setMessages(prev => [...prev, data]);
    }
    return { data, error };
  }, [currentUserId]);

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchUsers(), fetchChannels()]);
      setLoading(false);
    };
    init();
  }, [fetchUsers, fetchChannels]);

  return { users, channels, messages, loading, fetchMessages, sendMessage, fetchUsers };
}
