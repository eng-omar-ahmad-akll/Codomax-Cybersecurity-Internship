# 🎯 Module 04: Ethical Hacking & Vulnerability Assessment
**Timeframe:** Day 16 – Day 20 | **Level:** Intermediate  
**Deliverables:** Ethical Hacking Lifecycle Report, Hands-On Vulnerability Assessment Lab Record & Remediation Plan  
**Author:** Omar Ahmed Akl  
**Official PDF Deliverable:** [Module-04-Ethical-Hacking-Vulnerability-Assessment.pdf](./Module-04-Ethical-Hacking-Vulnerability-Assessment.pdf)

---

## Part 1: Ethical Hacking Lifecycle, Asset Discovery & Vulnerability Concepts

### 1. The 5 Phases of the Ethical Hacking Lifecycle
Ethical hacking is a structured, authorized methodology designed to identify, assess, and remediate security vulnerabilities before malicious threat actors can exploit them:

```text
┌─────────────────┐     ┌───────────────────────┐     ┌──────────────────────────┐
│ 1. Recon        │────►│ 2. Scanning &         │────►│ 3. Vulnerability         │
│ (OSINT / Passive│     │    Enumeration (Nmap) │     │    Assessment (Scoring)  │
└─────────────────┘     └───────────────────────┘     └──────────────────────────┘
                                                                   │
                                                                   ▼
┌─────────────────┐     ┌───────────────────────┐     ┌──────────────────────────┐
│ Remediation &   │◄────│ 5. Reporting &        │◄────│ 4. Exploitation          │
│ Verification    │     │    Documentation      │     │    (Proof-of-Concept)    │
└─────────────────┘     └───────────────────────┘     └──────────────────────────┘
```

1. **Phase 1: Reconnaissance (Information Gathering):**
   * *Objective:* Collect technical and organizational intelligence without triggering alarms.
   * *Passive Recon:* DNS querying (`whois`, `dig`, DNSDumpster), Certificate Transparency logs (`crt.sh`), search engine dorking, and OSINT on organizational assets.
   * *Active Recon:* Low-volume host probing, ICMP sweeps, and perimeter DNS queries.
2. **Phase 2: Scanning & Enumeration:**
   * *Objective:* Discover live systems, active open network ports, running services, protocol versions, and OS fingerprints.
   * *Techniques:* TCP SYN stealth scanning (`nmap -sS`), UDP scanning (`nmap -sU`), Banner Grabbing, and service-specific enumeration (SNMP, SMB, NetBIOS).
3. **Phase 3: Vulnerability Assessment:**
   * *Objective:* Analyze enumerated services against vulnerability intelligence databases (CVE, NVD, Exploit-DB) to identify weaknesses and misconfigurations.
   * *Techniques:* Automated vulnerability scanners (`OpenVAS`, `Nessus`, `Nmap Scripting Engine`) paired with manual architectural analysis.
4. **Phase 4: Exploitation (Controlled PoC):**
   * *Objective:* Validate vulnerabilities through controlled exploitation or Proof-of-Concept (PoC) demonstration to eliminate false positives and measure real business impact.
   * *Safety Constraints:* Executed strictly within scope limits, maintaining system stability and data confidentiality.
5. **Phase 5: Reporting & Remediation:**
   * *Objective:* Document technical findings, root cause analyses, CVSS severity ratings, evidence artifacts, and actionable, prioritized hardening steps for engineering teams.

---

### 2. Comparison Matrix: Vulnerability Scanning vs. Penetration Testing

| Comparison Dimension | Vulnerability Scanning (VA) | Penetration Testing (PT) |
| :--- | :--- | :--- |
| **Primary Objective** | Identify, catalog, and rank all potential known vulnerabilities across assets | Demonstrate real-world exploitability, attack path feasibility, and business impact |
| **Execution Method** | Automated scanning engines with signature and banner matching heuristics | Manual, goal-oriented ethical hacking combining automated tools with tailored exploits |
| **Scope & Breadth** | Comprehensive, wide-breadth inventory across subnets and large IP ranges | Deep, targeted scope focusing on specific critical systems, applications, or networks |
| **Frequency & Cadence** | Continuous or scheduled regularly (weekly, monthly, quarterly) | Periodic (annually, bi-annually, or following significant architectural releases) |
| **Cost & Resource Overhead** | Low to moderate; automated operational workflows | High; requires certified specialized penetration testing teams |
| **False Positive Rate** | Moderate to high; relies on version matching without exploiting | Minimal; findings are manually verified via safe exploitation proofs |
| **Depth of Exploitation** | Zero exploitation; stops at identification and potential weakness detection | Active exploitation, post-exploitation, privilege escalation, and lateral movement |

---

### 3. Threat Modeling (STRIDE), CVE Dictionary & CVSS v3.1 Scoring

#### Threat Modeling with the STRIDE Methodology
* **S — Spoofing Identity:** Impersonating a user, process, or system component (e.g., ARP spoofing, forged session cookies).
* **T — Tampering with Data:** Modifying data in transit or at rest without authorization (e.g., parameter tampering, payload injection).
* **R — Repudiation:** Plausible denial of performing an action due to missing or non-immutable audit logs.
* **I — Information Disclosure:** Exposing confidential data to unauthorized parties (e.g., verbose error banners, cleartext credentials).
* **D — Denial of Service:** Degrading or eliminating availability of critical services through resource exhaustion.
* **E — Elevation of Privilege:** Unprivileged users acquiring administrative capabilities through software vulnerabilities or misconfigurations.

#### The CVE Dictionary & NVD
* **Common Vulnerabilities and Exposures (CVE):** Standardized, unique alphanumeric identifiers (e.g., `CVE-2017-12617`) assigned by MITRE and CVE Numbering Authorities (CNAs) to publicly known cybersecurity vulnerabilities.
* **National Vulnerability Database (NVD):** The U.S. government repository providing analysis, fix availability, impact metrics, and standardized CVSS scoring for all registered CVEs.

#### CVSS v3.1 Scoring Framework
The Common Vulnerability Scoring System (CVSS v3.1) calculates a composite base score (0.0 to 10.0) reflecting the intrinsic severity of a vulnerability:

* **Base Exploitability Metrics:**
  * **Attack Vector (AV):** Network (`N`), Adjacent (`A`), Local (`L`), Physical (`P`).
  * **Attack Complexity (AC):** Low (`L`), High (`H`).
  * **Privileges Required (PR):** None (`N`), Low (`L`), High (`H`).
  * **User Interaction (UI):** None (`N`), Required (`R`).
  * **Scope (S):** Unchanged (`U`), Changed (`C`).
* **Base Impact Metrics:**
  * **Confidentiality Impact (C):** None (`N`), Low (`L`), High (`H`).
  * **Integrity Impact (I):** None (`N`), Low (`L`), High (`H`).
  * **Availability Impact (A):** None (`N`), Low (`L`), High (`H`).

| Severity Rating | CVSS v3.1 Base Score Range | Remediation SLA |
| :--- | :--- | :--- |
| **Critical** | 9.0 – 10.0 | Within 24 – 48 Hours |
| **High** | 7.0 – 8.9 | Within 7 Days |
| **Medium** | 4.0 – 6.9 | Within 30 Days |
| **Low** | 0.1 – 3.9 | Within 90 Days |
| **None** | 0.0 | Informational / No SLA |

---

### 4. Password Security, Credential Attacks & Risk-Based Prioritization

* **Credential Testing Vectors:**
  * **Brute-Force:** Exhaustive permutation of character sets against a single target account.
  * **Dictionary Attack:** Testing lists of commonly used passwords (`rockyou.txt`) against accounts.
  * **Password Spraying:** Testing a small set of common passwords (e.g., `Autumn2026!`) across hundreds of accounts to bypass lockout thresholds.
  * **Credential Stuffing:** Replaying leaked username/password combos harvested from public breaches against unrelated services.
* **Risk-Based Prioritization Formula:**
  $$\text{Risk} = \text{CVSS Base Severity} \times \text{Asset Criticality} \times \text{Threat / Exploitability Context (EPSS)}$$
  Vulnerabilities with public exploit code targeting internet-facing crown-jewel assets take precedence over high-CVSS findings situated on isolated, read-only internal hosts.

---

## Part 2: Hands-On Vulnerability Assessment Lab Record

### Lab Environment Architecture
* **Isolated Virtual Network:** VirtualBox Host-Only Subnet (`192.168.56.0/24`)
* **Analyst Workstation:** Kali Linux (`192.168.56.101/24`)
* **Target Assessment Server:** Ubuntu Linux Sandbox (`192.168.56.105/24`)

---

### 1. Phase 1 — Host Discovery (Layer 3 & ICMP Sweep)
Executed an ARP/ICMP ping sweep across the `/24` subnet to identify active target endpoints without full port scanning overhead:

```bash
$ sudo nmap -sn 192.168.56.0/24
```

```text
Starting Nmap 7.94SVN ( https://nmap.org )
Nmap scan report for 192.168.56.1
Host is up (0.00041s latency).
MAC Address: 0A:00:27:00:00:00 (Oracle VirtualBox)
Nmap scan report for 192.168.56.101
Host is up.
Nmap scan report for 192.168.56.105
Host is up (0.00052s latency).
MAC Address: 08:00:27:3C:99:A5 (Oracle VirtualBox)
Nmap done: 256 IP addresses (3 hosts up) scanned in 2.14 seconds
```

Target confirmed live at `192.168.56.105`.

---

### 2. Phase 2 — Comprehensive Port, Version & Script Enumeration
Executed a full-spectrum TCP SYN stealth scan across all 65,535 ports with service version detection and default safe NSE scripts:

```bash
$ sudo nmap -sS -sC -sV -p- -T4 192.168.56.105
```

```text
Starting Nmap 7.94SVN ( https://nmap.org )
Nmap scan report for 192.168.56.105
Host is up (0.00061s latency).
Not shown: 65531 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 3a:41:8c:92:ef:21:40:59:71:b8:90:54:12:44:81:10 (RSA)
|_  256 99:a4:2b:81:4c:77:49:10:e1:82:70:34:22:98:50:ef (ECDSA)
80/tcp   open  http        Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Corporate Portal - Under Construction
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
3306/tcp open  mysql       MySQL 5.7.22-0ubuntu0.16.04.1
| mysql-info: 
|   Protocol: 10
|   Version: 5.7.22-0ubuntu0.16.04.1
|   Thread ID: 4
|   Capabilities flags: 63487
|   Some Capabilities: Support41Auth, LongColumnFlag, Speaks41ProtocolOld
|   Status: Autocommit
|_  Salt: \x0e\x1b\x2a\x54\x31\x7f\x40\x11...
8080/tcp open  http-proxy  Apache Tomcat/Coyote JSP engine 1.1
|_http-server-header: Apache-Coyote/1.1
|_http-title: Apache Tomcat/8.5.15
| http-enum: 
|   /manager/html: Apache Tomcat Manager (credentials: admin:admin)
|_  /host-manager/html: Apache Tomcat Host Manager
MAC Address: 08:00:27:3C:99:A5 (Oracle VirtualBox)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 28.45 seconds
```

---

### 3. Phase 3 & 4 — Deep In-Lab Vulnerability Analysis

#### Finding 1: Port 8080/tcp — Apache Tomcat 8.5.15 Default Manager Credentials & RCE Risk
* **Discovered Service:** Apache Tomcat JSP Engine version `8.5.15` on port `8080`.
* **Identified Vulnerability:** The Tomcat Application Manager (`/manager/html`) was left publicly accessible with default credentials (`admin:admin`). Furthermore, Tomcat versions prior to 8.5.23 are vulnerable to Remote Code Execution via PUT request mishandling (CVE-2017-12617).
* **Exploitation Impact:** An unauthenticated attacker can log into the manager interface, upload a malicious WAR file containing a JSP web shell, and achieve instant root/system-level interactive shell access.

#### Finding 2: Port 3306/tcp — Remote MySQL Exposure & Plaintext Database Access
* **Discovered Service:** MySQL Server `5.7.22` listening openly on `0.0.0.0:3306`.
* **Identified Vulnerability:** Database service binds to public/all interfaces rather than the local loopback (`127.0.0.1`), exposing database authentication directly to network brute-force attacks and network eavesdropping.
* **Exploitation Impact:** Direct network exploitation of weak database credentials, bypass of application-tier business logic, and exfiltration of production databases.

#### Finding 3: Port 22/tcp — Outdated OpenSSH 7.2p2 & User Enumeration
* **Discovered Service:** OpenSSH `7.2p2` Ubuntu package `4ubuntu2.8`.
* **Identified Vulnerability:** OpenSSH versions prior to 7.7 are vulnerable to username enumeration via timing analysis of malformed authentication packets (CVE-2018-15473).
* **Exploitation Impact:** Threat actors can enumerate valid system usernames to fuel focused password-spraying campaigns.

#### Finding 4: Port 80/tcp — Apache 2.4.18 Banner Disclosure & Missing Hardening
* **Discovered Service:** Apache HTTP Server `2.4.18`.
* **Identified Vulnerability:** Server leaks exact operating system and web server build numbers in HTTP headers (`Server: Apache/2.4.18 (Ubuntu)`) and lacks modern defense-in-depth security response headers.
* **Exploitation Impact:** Reconnaissance facilitation allowing attackers to look up precise zero-day/one-day exploits tailored to the exact running kernel and package versions.

---

## Part 3: Professional Vulnerability Assessment Report & Remediation Plan

### 1. Consolidated Executive Vulnerability Matrix

| Vuln ID | Vulnerability Title | Affected Service | CVSS v3.1 Vector & Score | Severity | Finding Summary & Remediation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **VA-01** | Tomcat Manager Default Credentials & Potential RCE | `8080/tcp` (Tomcat) | `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` **(9.8)** | **Critical** | Default credentials on `/manager/html`; revoke default users, enforce strong credentials, restrict access to `127.0.0.1`, and upgrade Tomcat. |
| **VA-02** | Remote MySQL Exposure to Untrusted Network | `3306/tcp` (MySQL) | `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N` **(7.5)** | **High** | Database daemon bound to `0.0.0.0`; rebind strictly to `127.0.0.1` and enforce local Unix socket connections or VPN/SSH tunneling. |
| **VA-03** | OpenSSH User Enumeration & Outdated Package | `22/tcp` (OpenSSH) | `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N` **(5.3)** | **Medium** | CVE-2018-15473 username enumeration; patch OpenSSH to latest stable release and disable password auth in favor of Ed25519 keys. |
| **VA-04** | Apache Banner Leakage & Missing Security Headers | `80/tcp` (Apache) | `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N` **(5.3)** | **Medium** | Banner disclosure; configure `ServerTokens Prod`, `ServerSignature Off`, and deploy CSP, HSTS, and X-Content-Type-Options headers. |

---

### 2. Concrete Linux Hardening & Remediation Playbook

#### Remediation for VA-01: Hardening Apache Tomcat
```bash
# 1. Restrict Tomcat Manager access to localhost in /opt/tomcat/webapps/manager/META-INF/context.xml
<Valve className="org.apache.catalina.valves.RemoteAddrValve"
       allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />

# 2. Revoke default and weak user credentials in tomcat-users.xml
# Remove <user username="admin" password="admin" ... />
# Enforce strong, randomly generated passwords with least-privilege roles
<role rolename="manager-gui"/>
<user username="sec_ops_mgr" password="H@rd3n3d_T0mc@t_2026!#z" roles="manager-gui"/>

# 3. Restart Tomcat daemon to apply changes
sudo systemctl restart tomcat
```

#### Remediation for VA-02: Isolating MySQL Database
```bash
# 1. Edit MySQL configuration (/etc/mysql/mysql.conf.d/mysqld.cnf)
sudo sed -i 's/^bind-address.*/bind-address = 127.0.0.1/' /etc/mysql/mysql.conf.d/mysqld.cnf

# 2. Enforce UFW default-deny firewall rule for external MySQL requests
sudo ufw deny 3306/tcp comment 'Block external MySQL network exposure'
sudo ufw reload

# 3. Restart MySQL server and verify local-only listening state
sudo systemctl restart mysql
sudo ss -tulnp | grep 3306
# Expected output: 127.0.0.1:3306
```

#### Remediation for VA-03: Hardening OpenSSH Server
```bash
# 1. Update package repositories and install patched OpenSSH release
sudo apt update && sudo apt install --only-upgrade openssh-server -y

# 2. Harden /etc/ssh/sshd_config
sudo bash -c 'cat >> /etc/ssh/sshd_config << EOF
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
X11Forwarding no
EOF'

# 3. Test configuration syntax and reload daemon
sudo sshd -t && sudo systemctl restart ssh
```

#### Remediation for VA-04: Suppressing Apache Headers & Adding Security Headers
```bash
# 1. Suppress version information in /etc/apache2/conf-available/security.conf
sudo sed -i 's/^ServerTokens.*/ServerTokens Prod/' /etc/apache2/conf-available/security.conf
sudo sed -i 's/^ServerSignature.*/ServerSignature Off/' /etc/apache2/conf-available/security.conf

# 2. Enable Apache headers module and configure defensive headers
sudo a2enmod headers
sudo bash -c 'cat > /etc/apache2/conf-available/http-security-headers.conf << EOF
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "DENY"
Header always set X-XSS-Protection "1; mode=block"
Header always set Content-Security-Policy "default-src '\''self'\'';"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
EOF'
sudo a2enconf http-security-headers
sudo apache2ctl configtest && sudo systemctl restart apache2
```
