import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Upload, 
  Download, 
  Play, 
  RotateCcw, 
  Search, 
  Flame, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Terminal, 
  Zap, 
  Layers, 
  Cpu, 
  FileText
} from 'lucide-react';

export default function SocWorkspace({ 
  logs, 
  setLogs,
  alerts, 
  metrics, 
  onLoadSampleTelemetry, 
  onRunCorrelation,
  onUploadFile, 
  onExportReport, 
  onClear, 
  onSelectAlert,
  onUpdateStatus
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showLogInput, setShowLogInput] = useState(true);

  // Filter alerts based on user selections
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.ruleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.mitreId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alert.sourceIp && alert.sourceIp.includes(searchQuery)) ||
      alert.rawLog.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Command Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#070b14] via-slate-900/90 to-[#070b14] border border-cyan-900/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-950/90 text-cyan-400 border border-cyan-500/40">
                MODULE 06 CAPSTONE
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                Authorized Isolated Lab Telemetry Mode (192.168.100.0/24 & 10.10.20.0/24)
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 font-mono tracking-tight flex flex-wrap items-center gap-2">
              <span>AegisSentinel SOC</span>
              <span className="text-cyan-400 font-light">//</span>
              <span className="text-slate-300 font-semibold text-base sm:text-xl">
                AI-Assisted Log Analyzer & MITRE ATT&CK Triage Platform
              </span>
            </h1>
            
            <p className="text-xs text-slate-400 font-mono">
              Author: <strong className="text-slate-200">Omar Ahmed Akl</strong> | Target Organization: <span className="text-cyan-300 font-semibold">Codomax Digital Solutions</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onLoadSampleTelemetry}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-cyan-950/60 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Load Multi-Vector Lab Attack Logs</span>
            </button>

            <label className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs font-mono cursor-pointer transition-colors active:scale-95">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Upload Log File</span>
              <input 
                type="file" 
                accept=".log,.txt,.json,.csv" 
                onChange={onUploadFile} 
                className="hidden" 
              />
            </label>

            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 overflow-hidden">
              <button
                onClick={() => onExportReport('json')}
                className="flex items-center space-x-1.5 px-3 py-2 text-slate-200 hover:text-cyan-300 text-xs font-mono font-semibold transition-colors border-r border-slate-800"
                title="Export JSON Incident Report"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => onExportReport('csv')}
                className="px-2.5 py-2 text-slate-200 hover:text-cyan-300 text-xs font-mono font-semibold transition-colors"
                title="Export CSV Incident Alerts"
              >
                CSV
              </button>
            </div>

            <button
              onClick={onClear}
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-800/40 transition-colors"
              title="Clear Telemetry Logs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* KPI Metric Strip (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Events Parsed */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Total Telemetry Events Parsed
            </span>
            <div className="text-2xl font-black font-mono text-slate-100 flex items-center space-x-2">
              <span>{metrics.totalEvents}</span>
              <span className="text-[11px] font-mono font-normal text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40">
                Processed
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Critical & High Alerts */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Critical & High Severity Alerts
            </span>
            <div className="text-2xl font-black font-mono text-rose-400 flex items-center space-x-2">
              <span>{metrics.criticalAndHigh}</span>
              <span className="text-[11px] font-mono font-normal text-rose-300 px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-800/40 animate-pulse">
                Action Req.
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/40 text-rose-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Extracted Malicious IOCs */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Extracted Malicious IOCs
            </span>
            <div className="text-2xl font-black font-mono text-amber-400 flex items-center space-x-2">
              <span>{metrics.extractedIocs}</span>
              <span className="text-[10px] font-mono font-normal text-slate-400">
                IPs / Hashes / Payloads
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/40 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Active MITRE ATT&CK Tactics */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Active MITRE Tactics Triggered
            </span>
            <div className="text-2xl font-black font-mono text-emerald-400 flex items-center space-x-2">
              <span>{metrics.mitreTechniques}</span>
              <span className="text-[11px] font-mono font-normal text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/40">
                Mapped
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Live Log Ingestion & Deterministic Rule Engine */}
      <div className="p-5 rounded-2xl bg-[#070b14] border border-cyan-900/30 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Live Telemetry Stream & Heuristic Correlation Engine
            </h2>
          </div>
          <button
            onClick={() => setShowLogInput(!showLogInput)}
            className="text-xs font-mono text-cyan-400 hover:underline"
          >
            {showLogInput ? 'Collapse Ingestion Stream' : 'Expand Ingestion Stream'}
          </button>
        </div>

        {showLogInput && (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={logs}
                onChange={(e) => setLogs(e.target.value)}
                placeholder="Paste or upload raw syslog, Nginx access logs, Windows Sysmon JSON events, or FortiGate traffic lines..."
                rows={5}
                className="w-full bg-black/80 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 resize-y leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Active Rules: AEGIS-001 through AEGIS-008 (SSH Brute Force, SQLi, XSS, Path Traversal, PowerShell, LSASS, Scanner, LLM01)
              </span>

              <button
                onClick={onRunCorrelation}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold transition-all active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                <span>Run Threat Correlation</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alert Triage Table & Investigation Workspace */}
      <div className="rounded-2xl bg-[#070b14] border border-slate-800 shadow-xl overflow-hidden space-y-0">
        
        {/* Table Filters & Search Header */}
        <div className="p-4 bg-slate-900/70 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter alerts by Rule, MITRE ID, IP, or payload..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Severity Filter */}
            <div className="flex items-center space-x-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono">
              <span className="text-slate-500 px-1.5">Severity:</span>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    severityFilter === sev
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono">
              <span className="text-slate-500 px-1.5">Status:</span>
              {['ALL', 'Open', 'Investigating', 'Contained', 'False Positive'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    statusFilter === st
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Triage Alert Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/90 text-slate-400 font-mono text-[11px] border-b border-slate-800 uppercase tracking-wider">
                <th className="py-3 px-4">Rule ID & Severity</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Threat Scenario & Rule</th>
                <th className="py-3 px-4">Source IP / Host</th>
                <th className="py-3 px-4">MITRE Technique</th>
                <th className="py-3 px-4">Triage Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    <ShieldAlert className="w-8 h-8 mx-auto mb-2 opacity-30 text-cyan-400" />
                    <p className="text-sm font-semibold">No alerts matching current filters.</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Click "Load Multi-Vector Lab Attack Logs" or paste raw logs and click "Run Threat Correlation".
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => {
                  return (
                    <tr 
                      key={alert.id}
                      onClick={() => onSelectAlert(alert)}
                      className="hover:bg-slate-900/60 transition-colors cursor-pointer group"
                    >
                      {/* ID & Severity */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            alert.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' :
                            alert.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' :
                            'bg-blue-500/20 text-blue-300 border-blue-500/50'
                          }`}>
                            {alert.severity}
                          </span>
                          <span className="text-cyan-400 font-bold">{alert.ruleId}</span>
                        </div>
                      </td>

                      {/* Timestamp */}
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                        {alert.timestamp}
                      </td>

                      {/* Rule Name */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {alert.ruleName}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-xs font-sans">
                          {alert.description}
                        </div>
                      </td>

                      {/* Source IP */}
                      <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                        <span className="font-mono text-cyan-300 text-[11px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {alert.sourceIp || '192.168.100.45'}
                        </span>
                      </td>

                      {/* MITRE */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 text-[10px] font-bold">
                            {alert.mitreId}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                            {alert.technique}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={alert.status}
                          onChange={(e) => onUpdateStatus(alert.id, e.target.value)}
                          className={`text-[11px] font-mono font-semibold py-1 px-2 rounded-lg border bg-slate-950 cursor-pointer focus:outline-none ${
                            alert.status === 'Open' ? 'text-rose-300 border-rose-800/50' :
                            alert.status === 'Investigating' ? 'text-amber-300 border-amber-800/50' :
                            alert.status === 'Contained' ? 'text-emerald-300 border-emerald-800/50' :
                            'text-slate-400 border-slate-800'
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="Investigating">Investigating</option>
                          <option value="Contained">Contained</option>
                          <option value="False Positive">False Positive</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAlert(alert);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold transition-colors inline-flex items-center space-x-1"
                        >
                          <span>Triage Panel</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>Showing {filteredAlerts.length} of {alerts.length} Total Alerts</span>
          <span className="text-[11px] text-slate-500">
            Click any row to open the AI Co-Pilot & Forensic Investigation Panel
          </span>
        </div>

      </div>

    </div>
  );
}
