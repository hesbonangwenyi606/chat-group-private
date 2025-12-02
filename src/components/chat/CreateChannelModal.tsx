import React, { useState } from 'react';
import { X, Hash, Lock } from 'lucide-react';

interface CreateChannelModalProps {
  onClose: () => void;
  onCreate: (name: string, description: string, isPrivate: boolean) => void;
}

export default function CreateChannelModal({ onClose, onCreate }: CreateChannelModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim().toLowerCase().replace(/\s+/g, '-'), description, isPrivate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Create Channel</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Channel Name</label>
            <div className="flex items-center bg-slate-700 rounded-lg px-3">
              <Hash className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="new-channel"
                className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none py-3 px-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this channel about?"
              className="w-full bg-slate-700 text-white placeholder-slate-400 outline-none rounded-lg p-3 resize-none h-20"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="sr-only" />
            <div className={`w-10 h-6 rounded-full transition-colors ${isPrivate ? 'bg-violet-600' : 'bg-slate-600'}`}>
              <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${isPrivate ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-slate-300">Private Channel</span>
          </label>
          <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition-colors">
            Create Channel
          </button>
        </form>
      </div>
    </div>
  );
}
