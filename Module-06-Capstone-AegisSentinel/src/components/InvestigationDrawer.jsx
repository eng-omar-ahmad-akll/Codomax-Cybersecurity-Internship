import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Cpu, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  Hash, 
  Globe, 
  Flame, 
  ShieldAlert,
  Server,
  KeyRound,
  Send
} from 'lucide-react';

export default function InvestigationDrawer({ alert, isOpen, onClose, onUpdateStatus }) {
  const [copiedField, setCopiedField] = useState(null);
  const [activePlaybookTab, setActivePlaybookTab] = useState('fortigate');
  const [analystNote, setAnalystNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  if (!isOpen || !alert) return null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!analystNote.trim()) return;
    setNotesList([
      ...notesList, 
      { text: analystNote, time: new Date().toLocaleTimeString('en-GB') }
    ]);
    setAnalystNote('');
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-rose-950/50';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-950/50';
      case 'MEDIUM':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-blue-950/50';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
    }
  };

  // Helper to replace placeholders in containment commands
  const formatCmd = (template) => {
    if (!template) return '';
    const ip = alert.sourceIp || '185.220.101.45';
    const user = alert.iocs?.users?.[0] || 'devops';
    return template.replace(/{IP}/g, ip).replace(/{USER}/g, user);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#070b14] border-l border-cyan-900/40 text-slate-100 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${getSeverityBadge(alert.severity)}`}>
                  {alert.severity}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  {alert.ruleId}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {alert.timestamp}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight">
                {alert.ruleName}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Log Provider: <span className="text-cyan-300">{alert.source}</span> | MITRE: <span className="text-amber-400 font-bold">{alert.mitreId} ({alert.technique})</span>
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Triage Status Selector */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Incident Triage Decision</span>
                <span className="text-cyan-400 font-normal">Current: {alert.status}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {['Open', 'Investigating', 'Contained', 'False Positive'].map((status) => (
                  <button
                    key={status}
                    onClick={() => onUpdateStatus(alert.id, status)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      alert.status === status
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Co-Pilot & Forensic Guardrails (OWASP LLM01 Protected) */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-blue-950/30 border border-cyan-500/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-900/30">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold font-mono text-cyan-300 uppercase tracking-wider">
                      AI SOC Co-Pilot Threat Synthesis
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Isolated Inference Container // Hardened Prompt Sandbox
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>OWASP LLM01 Sanitized</span>
                </div>
              </div>

              {/* Threat Narrative */}
              <div className="mt-3 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
                <p>
                  <strong className="text-cyan-400 font-mono">Detection Analysis: </strong>
                  {alert.description}
                </p>
                {alert.ruleId === 'AEGIS-008' ? (
                  <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-lg text-rose-200 text-xs">
                    <strong className="text-rose-400 font-mono">ADVERSARIAL PROMPT INJECTION BLOCKED: </strong>
                    An in-flight jailbreak payload attempted to override system triage state to "False Positive". The parser strictly quarantined the text within a sanitized &lt;user_log&gt; boundary, preventing automated triage manipulation.
                  </div>
                ) : (
                  <p>
                    <strong className="text-amber-400 font-mono">Adversary TTPs: </strong>
                    Mapped to MITRE ATT&CK <code className="text-cyan-300 font-mono">{alert.mitreId} ({alert.technique})</code> under the <strong className="text-slate-100">{alert.tactic}</strong> phase.
                  </p>
                )}
              </div>
            </div>

            {/* Extracted Malicious IOCs */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Extracted Threat Indicators (IOCs)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Source IP */}
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Source Host / IP</div>
                      <div className="font-mono text-slate-200 font-bold">{alert.sourceIp || '185.220.101.45'}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(alert.sourceIp || '185.220.101.45', 'ip')}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                    title="Copy IP"
                  >
                    {copiedField === 'ip' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* MITRE Technique */}
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">MITRE Technique</div>
                      <div className="font-mono text-slate-200 font-bold">{alert.mitreId}</div>
                    </div>
                  </div>
                  <a 
                    href={`https://attack.mitre.org/techniques/${alert.mitreId.replace('.', '/')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Hashes if present */}
                {alert.iocs?.hashes && alert.iocs.hashes.length > 0 && (
                  <div className="sm:col-span-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <Terminal className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <div className="text-[10px] text-slate-400 font-mono">Cryptographic Hash (SHA-256)</div>
                        <div className="font-mono text-slate-200 text-[11px] truncate">{alert.iocs.hashes[0]}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(alert.iocs.hashes[0], 'hash')}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 rounded transition-colors flex-shrink-0"
                    >
                      {copiedField === 'hash' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Raw Log Evidence (Strictly HTML-escaped) */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>HTML-Escaped Raw Log Evidence (XSS-Safe)</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(alert.rawLog, 'log')}
                  className="flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {copiedField === 'log' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Log</span>
                </button>
              </div>

              {/* Renders escaped text to demonstrate neutralization */}
              <pre className="p-3 bg-black/80 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400/90 overflow-x-auto whitespace-pre-wrap break-all select-all">
                {alert.rawLog}
              </pre>
            </div>

            {/* Actionable Tier-1 Containment Playbook (Multi-Platform Commands) */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Actionable Tier-1 Containment Playbook</span>
                </h3>
              </div>

              {/* Multi-Platform Playbook Tabs */}
              <div className="flex items-center space-x-1 border-b border-slate-800 pb-2">
                {[
                  { id: 'fortigate', label: 'FortiGate CLI' },
                  { id: 'linux', label: 'Linux UFW / iptables' },
                  { id: 'ad', label: 'Active Directory PowerShell' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePlaybookTab(tab.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                      activePlaybookTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Command Code Box */}
              <div className="space-y-1">
                <div className="p-3 bg-black/90 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 flex items-start justify-between">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-all flex-1">
                    {formatCmd(alert.containmentCmds?.[activePlaybookTab]) || 
                     `sudo iptables -I INPUT 1 -s ${alert.sourceIp || '185.220.101.45'} -j DROP`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(
                      formatCmd(alert.containmentCmds?.[activePlaybookTab]) || 
                      `sudo iptables -I INPUT 1 -s ${alert.sourceIp || '185.220.101.45'} -j DROP`,
                      'playbook'
                    )}
                    className="p-1.5 ml-2 text-slate-400 hover:text-cyan-400 transition-colors flex-shrink-0"
                    title="Copy Command"
                  >
                    {copiedField === 'playbook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Procedural Step List */}
              <div className="space-y-1.5 pt-2">
                {alert.remediation && alert.remediation.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 font-sans">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-5">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analyst Investigation Notes */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Analyst Incident Notes
              </h3>

              {notesList.length > 0 && (
                <div className="space-y-2 mb-3">
                  {notesList.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span>Investigator: Omar Ahmed Akl</span>
                        <span>{note.time}</span>
                      </div>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleAddNote} className="flex space-x-2">
                <input
                  type="text"
                  value={analystNote}
                  onChange={(e) => setAnalystNote(e.target.value)}
                  placeholder="Record forensic observation or containment step..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-mono font-bold flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log</span>
                </button>
              </form>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              Target Subnet: <span className="text-cyan-300 font-bold">192.168.100.0/24</span>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors font-semibold"
            >
              Close Triage View
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
