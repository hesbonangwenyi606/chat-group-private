import React from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊',
  '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋',
  '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
  '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌',
  '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
  '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓',
  '👍', '👎', '👏', '🙌', '🤝', '🙏', '💪', '🎉', '🎊', '✨',
  '💯', '🔥', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
  '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'
];

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-3 w-72">
      <div className="grid grid-cols-10 gap-1">
        {emojis.map((emoji, i) => (
          <button
            key={i}
            onClick={() => { onSelect(emoji); onClose(); }}
            className="w-6 h-6 flex items-center justify-center hover:bg-slate-700 rounded transition-colors text-lg"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
