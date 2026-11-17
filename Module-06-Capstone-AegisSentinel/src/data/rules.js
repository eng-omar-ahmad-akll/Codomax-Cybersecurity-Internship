export const DETECTION_RULES = [
  {
    id: "AEGIS-001",
    name: "SSH / RDP Distributed Brute Force (>=5 Failed Attempts)",
    source: "Linux Auth / FortiOS Syslog",
    mitreId: "T1110.001",
    tactic: "Credential Access",
    technique: "Password Guessing",
    severity: "HIGH",
    description: "Detects repeated authentication failures (>=5 failed logins) within a narrow temporal window indicating automated dictionary or brute-force attacks.",
    pattern: /(Failed password for|authentication failure|sshd.*Failed|login failed|pam_unix.*authentication failure|dstport="?(?:22|3389)"?.*action="?deny"?)/i,
    remediation: [
      "Perimeter: Add source IP to FortiGate quarantine group and ban list.",
      "Linux Host: Run 'sudo iptables -I INPUT 1 -s {IP} -j DROP' or 'sudo ufw deny from {IP}'.",
      "Account Defense: Audit target user accounts for successful authentication following failures.",
      "Persistence Hardening: Enforce Fail2ban jail with 24h ban duration and disable password auth."
    ],
    containmentCmds: {
      fortigate: 'config firewall address\n  edit "HOST_BLOCK_{IP}"\n    set subnet {IP}/32\n  next\nend\nconfig firewall policy\n  edit 99\n    set srcaddr "HOST_BLOCK_{IP}"\n    set action deny\n    set schedule "always"\n  next\nend',
      linux: 'sudo iptables -I INPUT 1 -s {IP} -j DROP\nsudo ufw insert 1 deny from {IP} to any',
      ad: 'Disable-ADAccount -Identity "{USER}"\nSet-ADUser -Identity "{USER}" -ChangePasswordAtLogon $true'
    }
  },
  {
    id: "AEGIS-002",
    name: "SQL Injection Probe (UNION SELECT / Tautology / xp_cmdshell)",
    source: "Nginx / WAF Access Logs",
    mitreId: "T1190",
    tactic: "Initial Access",
    technique: "Exploit Public-Facing Application",
    severity: "CRITICAL",
    description: "Identifies SQL injection syntax including UNION SELECT, OR 1=1 tautologies, database schema enumeration, or Microsoft SQL xp_cmdshell invocation.",
    pattern: /(UNION.*SELECT|SELECT.*FROM|OR\s+1\s*=\s*1|information_schema|--\s*-|benchmark\s*\(|waitfor\s+delay|sleep\s*\(\d+\)|xp_cmdshell|1=1)/i,
    remediation: [
      "WAF Enforcement: Drop connection immediately at reverse proxy / FortiWeb tier.",
      "Code Review: Ensure all database interactions utilize Prepared Statements (PDO / parameterized queries).",
      "Database Hardening: Revoke elevated privileges from the application database account.",
      "Audit Query Logs: Check database general log for unauthorized table reads or data dumps."
    ],
    containmentCmds: {
      fortigate: 'config waf profile\n  edit "STRICT_WAF"\n    config signature\n      set credit-card-detection enable\n      set sql-injection-detection block\n    end\n  next\nend',
      linux: 'sudo iptables -I INPUT 1 -s {IP} -p tcp --dport 80,443 -j DROP',
      ad: 'Revoke-SqlRoleMember -ServerInstance "DB01" -Database "Prod" -RoleName "db_owner" -MemberName "web_app_user"'
    }
  },
  {
    id: "AEGIS-003",
    name: "XSS & Web Log Poisoning (<script> / onerror / javascript:)",
    source: "Nginx / Web Access Logs",
    mitreId: "T1059.007",
    tactic: "Execution",
    technique: "JavaScript",
    severity: "HIGH",
    description: "Detects Cross-Site Scripting (XSS) reflection, DOM script injection, event-handler payloads (onerror=, onload=), or log poisoning targeting SOC SIEM consoles.",
    pattern: /(<script>|%3Cscript%3E|onerror\s*=|onload\s*=|javascript:|document\.cookie|document\.domain|alert\s*\(|prompt\s*\()/i,
    remediation: [
      "Output Encoding: Apply context-aware HTML entity encoding (htmlspecialchars ENT_QUOTES) before rendering user inputs.",
      "CSP Policy: Deploy Strict Content-Security-Policy (default-src 'self'; script-src 'self'; object-src 'none').",
      "Cookie Hardening: Set HttpOnly, Secure, and SameSite=Strict flags on all session cookies.",
      "Log Sanitization: Ensure SIEM web consoles render incoming logs inside escaped text elements."
    ],
    containmentCmds: {
      fortigate: 'config waf profile\n  edit "XSS_BLOCKER"\n    config signature\n      set cross-site-scripting-detection block\n    end\n  next\nend',
      linux: 'sudo sed -i \'s/ServerTokens.*/ServerTokens Prod/\' /etc/apache2/conf-available/security.conf',
      ad: 'Clear-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Internet Explorer" -Name "DisableScriptDebugger"'
    }
  },
  {
    id: "AEGIS-004",
    name: "Path Traversal & Sensitive File Exposure (../ /etc/passwd win.ini)",
    source: "Web Application / Auditd",
    mitreId: "T1083",
    tactic: "Discovery",
    technique: "File and Directory Discovery",
    severity: "HIGH",
    description: "Identifies dot-dot-slash directory traversal sequences attempting to break out of web document root and access sensitive OS files (/etc/passwd, win.ini).",
    pattern: /(\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e\/|\/etc\/passwd|win\.ini|boot\.ini|\/proc\/self\/environ)/i,
    remediation: [
      "Path Validation: Resolve file paths using absolute canonical path validation (realpath) against an allowlisted directory.",
      "Chroot Isolation: Sandbox web daemons with non-privileged service accounts (www-data / nobody).",
      "Permissions Audit: Ensure /etc/shadow is strictly 0640 and restricted to root:shadow.",
      "WAF Rule: Configure path normalization rules to reject encoded dot-slash sequences."
    ],
    containmentCmds: {
      fortigate: 'config waf signature\n  edit 11000\n    set pattern ".*\\.\\.[\\/\\\\].*"\n    set action block\n  next\nend',
      linux: 'sudo chmod 640 /etc/shadow && sudo chmod 644 /etc/passwd\nsudo iptables -I INPUT 1 -s {IP} -j DROP',
      ad: 'icacls "C:\\inetpub\\wwwroot" /deny "IUSR:(OI)(CI)(W,D)"'
    }
  },
  {
    id: "AEGIS-005",
    name: "Encoded PowerShell / LOLBAS Reverse Shell (-enc / IEX / DownloadString)",
    source: "Windows Sysmon (EID 1) / Linux Bash",
    mitreId: "T1059.001",
    tactic: "Execution",
    technique: "PowerShell & LOLBAS",
    severity: "CRITICAL",
    description: "Detects process execution spawning powershell.exe with Base64 encoded commands, hidden windows, memory download cradles (IEX / WebClient), or /dev/tcp Linux reverse shells.",
    pattern: /(powershell.*-enc|-encodedcommand|downloadstring|iex\s*\(|Invoke-Expression|certutil.*-urlcache|\/dev\/tcp\/\d+|\/bin\/bash\s*-i)/i,
    remediation: [
      "EDR Containment: Immediately isolate host endpoint from the corporate network.",
      "Payload Deobfuscation: Extract and decode Base64 command-line arguments to identify C2 IP and staging servers.",
      "Process Termination: Kill offending process ID and parent process tree immediately.",
      "Application Control: Enforce AppLocker / WDAC constrained language mode for PowerShell."
    ],
    containmentCmds: {
      fortigate: 'config firewall policy\n  edit 105\n    set name "ISOLATE_HOST_{IP}"\n    set srcaddr "{IP}"\n    set dstaddr "all"\n    set action deny\n  next\nend',
      linux: 'sudo pkill -f "/bin/bash -i" || sudo pkill -f "python3 -c import socket"',
      ad: 'Stop-Process -Name powershell -Force\nSet-ExecutionPolicy Restricted -Scope LocalMachine -Force'
    }
  },
  {
    id: "AEGIS-006",
    name: "LSASS Credential Dumping (Sysmon EID 10 / 0x1010 / 0x1FFFFF)",
    source: "Windows Sysmon (Event ID 10)",
    mitreId: "T1003.001",
    tactic: "Credential Access",
    technique: "LSASS Memory Dumping",
    severity: "CRITICAL",
    description: "Identifies suspicious cross-process memory access targeting lsass.exe with elevated access rights (0x1010 PROCESS_VM_READ or 0x1FFFFF PROCESS_ALL_ACCESS) typical of Mimikatz or ProcDump.",
    pattern: /(TargetImage.*lsass\.exe|GrantedAccess.*0x1010|GrantedAccess.*0x1fffff|procdump.*lsass|mimikatz|sekurlsa|comsvcs\.dll.*MiniDump)/i,
    remediation: [
      "Endpoint Quarantine: Sever network adapter on affected host to prevent domain-wide credential reuse (Pass-the-Hash).",
      "Credential Invalidation: Initiate immediate enterprise rotation of all Domain Admin and Tier-0 service account passwords.",
      "Security Controls: Enable Windows Defender Credential Guard and LSA Protection (RunAsPPL).",
      "Process Forensics: Capture memory triage artifact (WinPmem / DumpIt) and terminate source process handle."
    ],
    containmentCmds: {
      fortigate: 'diagnose sys session filter src {IP}\ndiagnose sys session clear',
      linux: 'sudo kill -9 $(pgrep -f "procdump|mimikatz")',
      ad: 'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa" -Name "RunAsPPL" -Value 1 -Type DWord\nReset-ComputerMachinePassword'
    }
  },
  {
    id: "AEGIS-007",
    name: "Reconnaissance Vulnerability Scanner (Nikto / sqlmap / Gobuster)",
    source: "Nginx / Apache Access Logs",
    mitreId: "T1595.002",
    tactic: "Reconnaissance",
    technique: "Vulnerability Scanning",
    severity: "MEDIUM",
    description: "Detects automated vulnerability assessment and directory fuzzing scanners identifying exposed services and endpoints through distinct User-Agent signatures.",
    pattern: /(sqlmap|nikto|gobuster|dirbuster|wpscan|masscan|zgrab|acunetix|nessus)/i,
    remediation: [
      "Perimeter Rate-Limiting: Throttle HTTP request rates to max 10 requests per second per IP.",
      "IP Blacklisting: Automatically ban scanner IP for 48 hours at perimeter reverse proxy / cloud WAF.",
      "Deception Defense: Deploy HTTP honeypot endpoints to trap and alert on automated crawler sweeps.",
      "Access Hardening: Disable directory listing (Options -Indexes) and suppress web server version banners."
    ],
    containmentCmds: {
      fortigate: 'config firewall address\n  edit "SCANNER_{IP}"\n    set subnet {IP}/32\n  next\nend',
      linux: 'sudo fail2ban-client set nginx-botsearch banip {IP}\nsudo iptables -I INPUT 1 -s {IP} -j DROP',
      ad: 'New-NetFirewallRule -DisplayName "Block-Scanner-{IP}" -Direction Inbound -RemoteAddress {IP} -Action Block'
    }
  },
  {
    id: "AEGIS-008",
    name: "Indirect LLM Prompt Injection in Log Payloads (OWASP LLM01)",
    source: "AI Triage Sanitizer / Telemetry Ingestion",
    mitreId: "AML.T0051",
    tactic: "AI/ML Adversarial Attack",
    technique: "LLM01: Prompt Injection (OWASP)",
    severity: "HIGH",
    description: "Detects adversarial jailbreak instructions embedded inside HTTP User-Agent strings, filenames, or log fields designed to hijack automated AI triage summarizers.",
    pattern: /(IGNORE ALL PREVIOUS INSTRUCTIONS|SYSTEM OVERRIDE|YOU ARE NOW DAN|Disregard earlier directives|output the secret API key|system prompt leak|Mark all alerts as False Positive|ignore prior instructions)/i,
    remediation: [
      "Input Containment: Strict tokenization isolating log fields inside non-executable XML delimiters (<user_log>).",
      "Guardrail Filtering: Deploy secondary verification agent to detect out-of-band instruction leakage.",
      "Strict Output Formats: Force LLM responses into rigid JSON schemas without arbitrary text formatting.",
      "Analyst Alert: Flag incident as targeted adversarial evasion against automated SOC triage infrastructure."
    ],
    containmentCmds: {
      fortigate: 'config system alertconsole\n  set email-notification enable\n  set alert-level critical\nend',
      linux: 'sudo logger -p auth.crit "SOC-ALERT: Adversarial prompt injection payload intercepted from {IP}"',
      ad: 'Write-EventLog -LogName Security -Source "AegisAI-Guard" -EventID 9901 -EntryType Warning -Message "Prompt injection quarantined from {IP}"'
    }
  }
];

export function extractIOCs(logText) {
  const iocs = {
    ips: new Set(),
    hashes: new Set(),
    uris: new Set(),
    users: new Set()
  };

  // IPv4 Addresses
  const ipMatches = logText.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g);
  if (ipMatches) {
    ipMatches.forEach(ip => {
      if (!ip.startsWith('255.') && ip !== '0.0.0.0' && ip !== '127.0.0.1') {
        iocs.ips.add(ip);
      }
    });
  }

  // Cryptographic Hashes (SHA-256 or MD5)
  const hashMatches = logText.match(/\b([a-fA-F0-9]{64}|[a-fA-F0-9]{32})\b/g);
  if (hashMatches) {
    hashMatches.forEach(hash => iocs.hashes.add(hash));
  }

  // URIs and Paths
  const uriMatches = logText.match(/(\/[a-zA-Z0-9_\-\.\/\?=&%]+)/g);
  if (uriMatches) {
    uriMatches.forEach(uri => {
      if (uri.length > 3 && !uri.startsWith('//')) {
        iocs.uris.add(uri);
      }
    });
  }

  // Users
  const userMatches = logText.match(/user[=:\s]+([a-zA-Z0-9_\-]+)/gi);
  if (userMatches) {
    userMatches.forEach(u => {
      const clean = u.replace(/user[=:\s]+/i, '').trim();
      if (clean) iocs.users.add(clean);
    });
  }

  return {
    ips: Array.from(iocs.ips),
    hashes: Array.from(iocs.hashes),
    uris: Array.from(iocs.uris).slice(0, 5),
    users: Array.from(iocs.users)
  };
}
