import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';
import { User } from '@/types/chat';
import UserAvatar from './UserAvatar';

interface UserSettingsModalProps {
  user: User;
  onClose: () => void;
  onSave: (updates: Partial<User>) => void;
}

export default function UserSettingsModal({ user, onClose, onSave }: UserSettingsModalProps) {
  const [displayName, setDisplayName] = useState(user.display_name);
  const [statusMessage, setStatusMessage] = useState(user.status_message || '');
  const [status, setStatus] = useState(user.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ display_name: displayName, status_message: statusMessage, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <UserAvatar src={user.avatar_url} name={user.display_name} status={status as any} size="lg" />
              <button type="button" className="absolute bottom-0 right-0 p-1.5 bg-violet-600 rounded-full">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Status Message</label>
            <input
              type="text"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <div className="flex gap-2">
              {['online', 'away', 'offline'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-lg capitalize ${status === s ? 'bg-violet-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
