import React from 'react';

interface UserAvatarProps {
  src: string;
  name: string;
  status?: 'online' | 'away' | 'offline';
  size?: 'sm' | 'md' | 'lg';
}

export default function UserAvatar({ src, name, status, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400'
  };

  const statusSize = {
    sm: 'w-2.5 h-2.5 border',
    md: 'w-3 h-3 border-2',
    lg: 'w-3.5 h-3.5 border-2'
  };

  return (
    <div className="relative flex-shrink-0">
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-slate-700`}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSize[size]} ${statusColors[status]} rounded-full border-slate-800`}
        />
      )}
    </div>
  );
}
