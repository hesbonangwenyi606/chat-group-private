import React from 'react';
import { MessageSquare, Users, Hash, Zap } from 'lucide-react';

export default function WelcomeScreen() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center max-w-lg px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30">
          <MessageSquare className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Welcome to ChatFlow</h1>
        <p className="text-slate-400 mb-8">
          Connect with your team in real-time. Start a conversation by selecting a channel or direct message from the sidebar.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <Hash className="w-8 h-8 text-violet-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-white">Channels</h3>
            <p className="text-xs text-slate-400 mt-1">Group discussions</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <Users className="w-8 h-8 text-violet-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-white">Direct Messages</h3>
            <p className="text-xs text-slate-400 mt-1">Private chats</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <Zap className="w-8 h-8 text-violet-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-white">Real-time</h3>
            <p className="text-xs text-slate-400 mt-1">Instant delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
