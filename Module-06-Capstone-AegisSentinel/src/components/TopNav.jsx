import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  UserCheck, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Github, 
  Layers
} from 'lucide-react';

export default function TopNav({ activeWorkspace, setActiveWorkspace, alertCount }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { 
        timeZone: 'Africa/Cairo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    {
      id: 'soc',
      label: '🛡️ AegisSentinel SOC Console',
      badge: alertCount > 0 ? alertCount : null
    },
    {
      id: 'architecture',
      label: '📐 Security Architecture & MITRE Matrix',
      badge: 'VAL-01..06'
    },
    {
      id: 'portfolio',
      label: '👨💻 Omar Ahmed Akl — SOC Portfolio & CV',
      badge: 'Active'
    }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#050811]/90 border-b border-cyan-900/30 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black tracking-wider text-slate-100 font-mono">
                  AEGIS<span className="text-cyan-400">SENTINEL</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono hidden sm:inline-block">
                  CAPSTONE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden md:block">
                Codomax Digital Solutions // Omar Ahmed Akl
              </p>
            </div>
          </div>

          {/* Center 3 Navigation Tabs */}
          <div className="flex items-center p-1 bg-slate-900/80 border border-slate-800 rounded-xl shadow-inner overflow-x-auto max-w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveWorkspace(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeWorkspace === item.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    item.id === 'soc' && alertCount > 0 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                      : 'bg-cyan-950 text-cyan-400 border border-cyan-800/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right Status Badges */}
          <div className="hidden xl:flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cairo (UTC+2):</span>
              <span className="text-cyan-300 font-bold">{currentTime || '20:30:00'}</span>
            </div>

            <a
              href="https://github.com/eng-omar-ahmad-akll/Codomax-Cybersecurity-Internship"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-cyan-900/40"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
