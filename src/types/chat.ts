export interface User {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  status: 'online' | 'away' | 'offline';
  status_message: string;
  last_seen: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  is_private: boolean;
  created_by: string;
  created_at: string;
  unread_count?: number;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  channel_id: string | null;
  recipient_id: string | null;
  is_read: boolean;
  created_at: string;
  sender?: User;
}

export interface DirectMessage {
  user: User;
  lastMessage?: string;
  unread_count: number;
}
