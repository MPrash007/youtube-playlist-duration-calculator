import React, { useState, useEffect } from 'react';
import { Clock, PlayCircle, FastForward, RefreshCw, AlertCircle } from 'lucide-react';
import { formatTime } from './utils';

export default function Popup() {
  const [data, setData] = useState({ totalSeconds: 0, videoCount: 0, error: null });
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(false);

  const scanPage = async () => {
    setLoading(true);
    setData(prev => ({ ...prev, error: null }));
    
    // For Chrome extensions
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.url.includes('youtube.com')) {
         setData({ totalSeconds: 0, videoCount: 0, error: 'Please navigate to a YouTube page.'});
         setLoading(false);
         return;
      }
      
      chrome.tabs.sendMessage(tab.id, { action: 'SCAN_PLAYLIST' }, (response) => {
        if (chrome.runtime.lastError) {
           setData({ totalSeconds: 0, videoCount: 0, error: 'Cannot connect to the content script. Try refreshing the page.'});
        } else if (response) {
           if (response.error) {
             setData({ totalSeconds: 0, videoCount: 0, error: response.error });
           } else {
             setData({ totalSeconds: response.totalSeconds, videoCount: response.videoCount, error: null });
           }
        }
        setLoading(false);
      });
    } else {
      // Mock for standard browser testing
      setTimeout(() => {
        setData({ totalSeconds: 3600 * 2 + 1500, videoCount: 42, error: null });
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    scanPage();
  }, []);

  const speeds = [1, 1.25, 1.5, 1.75, 2];
  const adjustedSeconds = data.totalSeconds / speed;

  return (
    <div className="w-[360px] bg-slate-950 text-slate-100 p-5 font-sans selection:bg-rose-500/30">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="bg-rose-500/20 p-2 rounded-lg">
          <PlayCircle className="w-6 h-6 text-rose-500" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wider uppercase text-slate-200">Playlist Calc</h1>
          <p className="text-xs text-slate-400">Duration Insights</p>
        </div>
      </div>

      {data.error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 mb-6 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{data.error}</p>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group hover:border-rose-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Total Duration</span>
            </div>
            <div className="text-3xl font-light tracking-tight text-white drop-shadow-sm">
              {formatTime(adjustedSeconds)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
               <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Videos</span>
               <span className="text-lg font-semibold">{data.videoCount}</span>
            </div>
            <div className="bg-slate-900 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
               <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Speed</span>
               <div className="flex items-center gap-1">
                 <FastForward className="w-3 h-3 text-rose-400" />
                 <span className="text-lg font-semibold">{speed}x</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {!data.error && (
        <div className="mb-6 space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider pl-1">Playback Speed</label>
          <div className="flex bg-slate-900 rounded-lg p-1 border border-white/5">
            {speeds.map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${speed === s ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={scanPage}
        disabled={loading}
        className="w-full bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        <span>{loading ? 'Scanning...' : 'Scan Playlist Again'}</span>
      </button>
    </div>
  );
}
