
import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { gemini } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [strategy, setStrategy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!niche) return;
    setLoading(true);
    setStrategy('');
    const result = await gemini.getGrowthStrategy(niche, platform);
    setStrategy(result || '');
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Growth Strategist</h2>
            <p className="text-slate-400 text-sm">Powered by Gemini - Let's plan your social dominance.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Target Platform</label>
            <select 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>Instagram</option>
              <option>TikTok</option>
              <option>YouTube</option>
              <option>Twitter / X</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">What's your niche?</label>
            <input 
              type="text" 
              placeholder="e.g. Fitness, Crypto, E-commerce, Lifestyle"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !niche}
          className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          Generate Strategy
        </button>
      </div>

      {(loading || strategy) && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl rounded-full" />
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 border-2 border-slate-800">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold mb-4">Recommended Strategy</h4>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-slate-800 rounded w-2/3 animate-pulse" />
                </div>
              ) : (
                <div className="prose prose-invert prose-slate max-w-none text-slate-300 whitespace-pre-line">
                  {strategy}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
