import React from 'react';
import { Channel, User, Message } from '@/types/chat';
import ChatHeader from './ChatHeader';
import MessageArea from './MessageArea';
import MessageComposer from './MessageComposer';
import WelcomeScreen from './WelcomeScreen';

interface ChatContainerProps {
  channel: Channel | null;
  dmUser: User | null;
  messages: Message[];
  currentUserId: string;
  typingUsers: string[];
  memberCount: number;
  notificationsEnabled: boolean;
  onSendMessage: (content: string) => void;
  onToggleNotifications: () => void;
  onToggleMembers: () => void;
}

export default function ChatContainer({
  channel, dmUser, messages, currentUserId, typingUsers,
  memberCount, notificationsEnabled, onSendMessage, onToggleNotifications, onToggleMembers
}: ChatContainerProps) {
  if (!channel && !dmUser) {
    return <WelcomeScreen />;
  }

  const placeholder = channel
    ? `Message #${channel.name}`
    : dmUser
    ? `Message ${dmUser.display_name}`
    : 'Type a message...';

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      <ChatHeader
        channel={channel}
        dmUser={dmUser}
        memberCount={memberCount}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={onToggleNotifications}
        onToggleMembers={onToggleMembers}
      />
      <MessageArea
        messages={messages}
        currentUserId={currentUserId}
        typingUsers={typingUsers}
      />
      <MessageComposer
        onSend={onSendMessage}
        placeholder={placeholder}
      />
    </div>
  );
}
