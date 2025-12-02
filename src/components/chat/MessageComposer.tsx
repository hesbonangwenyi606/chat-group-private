import React, { useState } from 'react';
import { Send, Smile, Paperclip, AtSign } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

interface MessageComposerProps {
  onSend: (content: string) => void;
  placeholder?: string;
}

export default function MessageComposer({ onSend, placeholder = 'Type a message...' }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700 bg-slate-800/50">
      <div className="flex items-end gap-2 bg-slate-700 rounded-xl p-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 hover:bg-slate-600 rounded-lg transition-colors relative"
          >
            <Smile className="w-5 h-5 text-slate-400" />
            {showEmoji && <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmoji(false)} />}
          </button>
          <button type="button" className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5 text-slate-400" />
          </button>
          <button type="button" className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
            <AtSign className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-[15px] py-2"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
}
