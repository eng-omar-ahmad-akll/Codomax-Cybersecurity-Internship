import React, { useState, useEffect } from 'react';
import TopNav from './components/TopNav';
import SocWorkspace from './components/SocWorkspace';
import ArchitectureTab from './components/ArchitectureTab';
import PortfolioWorkspace from './components/PortfolioWorkspace';
import InvestigationDrawer from './components/InvestigationDrawer';
import { DETECTION_RULES, extractIOCs } from './data/rules';
import { SAMPLE_LOGS } from './data/sampleTelemetry';

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState('soc');
  const [logs, setLogs] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Parse raw log text into alerts using the deterministic detection rules
  const parseLogsToAlerts = (rawText) => {
    const lines = rawText.split('\n').filter(l => l.trim().length > 0);
    const newAlerts = [];
    let alertCounter = 1;

    lines.forEach((line) => {
      DETECTION_RULES.forEach((rule) => {
        if (rule.pattern.test(line)) {
          const iocs = extractIOCs(line);
          const alertId = `ALT-${String(alertCounter).padStart(4, '0')}`;
          alertCounter++;

          newAlerts.push({
            id: alertId,
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            source: rule.source,
            mitreId: rule.mitreId,
            tactic: rule.tactic,
            technique: rule.technique,
            timestamp: new Date().toLocaleTimeString('en-GB'),
            rawLog: line,
            sourceIp: iocs.ips[0] || '192.168.100.45',
            iocs: iocs,
            status: 'Open',
            remediation: rule.remediation,
            containmentCmds: rule.containmentCmds,
            description: rule.description
          });
        }
      });
    });

    return { totalLines: lines.length, alerts: newAlerts };
  };

  // Load sample attack telemetry on startup or on user request
  const loadSampleTelemetry = () => {
    setLogs(SAMPLE_LOGS);
    const result = parseLogsToAlerts(SAMPLE_LOGS);
    setAlerts(result.alerts);
  };

  // Run correlation on the currently entered log text
  const runCorrelation = () => {
    if (!logs.trim()) return;
    const result = parseLogsToAlerts(logs);
    setAlerts(result.alerts);
  };

  useEffect(() => {
    loadSampleTelemetry();
  }, []);

  // Compute live metrics
  const totalEvents = logs ? logs.split('\n').filter(l => l.trim().length > 0).length : 0;
  const criticalAndHigh = alerts.filter(a => a.severity === 'CRITICAL' || a.severity === 'HIGH').length;
  
  // Aggregate unique IOCs
  const allIocIps = new Set();
  const allIocHashes = new Set();
  const allIocUris = new Set();
  const allMitre = new Set();

  alerts.forEach(a => {
    if (a.sourceIp) allIocIps.add(a.sourceIp);
    if (a.iocs?.hashes) a.iocs.hashes.forEach(h => allIocHashes.add(h));
    if (a.iocs?.uris) a.iocs.uris.forEach(u => allIocUris.add(u));
    if (a.mitreId) allMitre.add(a.mitreId);
  });

  const totalUniqueIocs = allIocIps.size + allIocHashes.size + allIocUris.size;

  const metrics = {
    totalEvents: totalEvents,
    criticalAndHigh: criticalAndHigh,
    extractedIocs: totalUniqueIocs || alerts.length,
    mitreTechniques: allMitre.size || alerts.length
  };

  // File Upload Handler (.log, .txt, .json, .csv)
  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setLogs(content);
      const result = parseLogsToAlerts(content);
      setAlerts(result.alerts);
    };
    reader.readAsText(file);
  };

  // Export Incident Report (JSON or CSV)
  const handleExportReport = (format = 'json') => {
    const reportData = {
      incidentReportId: `IR-AEGIS-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      analyst: "Omar Ahmed Akl",
      organization: "Codomax Digital Solutions",
      targetScope: "192.168.100.0/24 & 10.10.20.0/24",
      summaryMetrics: metrics,
      alerts: alerts
    };

    let blob;
    let filename;

    if (format === 'json') {
      const jsonStr = JSON.stringify(reportData, null, 2);
      blob = new Blob([jsonStr], { type: 'application/json' });
      filename = `AegisSentinel_Incident_Report_${Date.now()}.json`;
    } else {
      const headers = "Alert ID,Severity,Rule ID,Rule Name,MITRE ID,Source IP,Status,Timestamp\n";
      const rows = alerts.map(a => 
        `"${a.id}","${a.severity}","${a.ruleId}","${a.ruleName}","${a.mitreId}","${a.sourceIp}","${a.status}","${a.timestamp}"`
      ).join('\n');
      blob = new Blob([headers + rows], { type: 'text/csv' });
      filename = `AegisSentinel_Alerts_${Date.now()}.csv`;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setLogs('');
    setAlerts([]);
    setSelectedAlert(null);
    setIsDrawerOpen(false);
  };

  const handleSelectAlert = (alert) => {
    setSelectedAlert(alert);
    setIsDrawerOpen(true);
  };

  const handleUpdateStatus = (alertId, newStatus) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: newStatus } : a));
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans">
      
      {/* Sticky Top Navigation Bar */}
      <TopNav 
        activeWorkspace={activeWorkspace} 
        setActiveWorkspace={setActiveWorkspace}
        alertCount={criticalAndHigh}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeWorkspace === 'soc' && (
          <SocWorkspace
            logs={logs}
            setLogs={setLogs}
            alerts={alerts}
            metrics={metrics}
            onLoadSampleTelemetry={loadSampleTelemetry}
            onRunCorrelation={runCorrelation}
            onUploadFile={handleUploadFile}
            onExportReport={handleExportReport}
            onClear={handleClear}
            onSelectAlert={handleSelectAlert}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {activeWorkspace === 'architecture' && (
          <ArchitectureTab />
        )}

        {activeWorkspace === 'portfolio' && (
          <PortfolioWorkspace />
        )}
      </main>

      {/* Slide-over Investigation Drawer */}
      <InvestigationDrawer
        alert={selectedAlert}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#04060d] py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            AegisSentinel SOC // Module 06 Capstone Platform © 2026 Codomax Digital Solutions
          </span>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>Author: Omar Ahmed Akl</span>
            <span>•</span>
            <a 
              href="https://github.com/eng-omar-ahmad-akll/Codomax-Cybersecurity-Internship" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cyan-400 hover:underline"
            >
              GitHub Project
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
