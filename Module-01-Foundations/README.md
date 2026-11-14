# 🛡️ Module 01: Cybersecurity & Networking Foundations
**Timeframe:** Day 1 – Day 5 | **Level:** Beginner  
**Deliverables:** Cybersecurity Fundamentals Report & Practical Lab Record  
**Author:** Omar Ahmed Akl

---

## Part 1: Cybersecurity Fundamentals Report

### 1. The CIA Triad & Security Foundations
The **CIA Triad** represents the three foundational pillars of information security. Every security control, policy, and defensive mechanism is engineered to protect one or more of these core principles:

* **Confidentiality:** Preventing unauthorized disclosure of sensitive information and ensuring data is accessible strictly to authorized entities.
  * *Technical Controls:* AES-256 encryption at rest, TLS 1.3 encryption in transit, Access Control Lists (ACLs), and Multi-Factor Authentication (MFA).
  * *Failure / Threat Scenario:* Passive packet sniffing over unencrypted Wi-Fi or credential theft via spear-phishing.
* **Integrity:** Guaranteeing the accuracy, completeness, and authenticity of data across its lifecycle so it cannot be altered or tampered with undetected.
  * *Technical Controls:* Cryptographic hashing (`SHA-256`, `SHA-3`), asymmetric digital signatures, version control, and File Integrity Monitoring (FIM).
  * *Failure / Threat Scenario:* Man-in-the-Middle (MitM) payload modification or unauthorized SQL database tampering.
* **Availability:** Ensuring systems, networks, and data remain reliably accessible to authorized users whenever required.
  * *Technical Controls:* Redundant Arrays of Independent Disks (RAID), High-Availability (HA) load balancing, 3-2-1 backup architecture, and DDoS mitigation (CDN/WAF).
  * *Failure / Threat Scenario:* Volumetric Distributed Denial of Service (DDoS) floods or enterprise ransomware encryption.

---

### 2. Threats, Vulnerabilities, Risk, and Attack Surfaces

#### Core Terminology
* **Asset:** Any data, device, or system component of value to the organization.
* **Vulnerability:** A weakness or flaw in design, implementation, or configuration that can be exploited (e.g., unpatched daemon, cleartext protocol).
* **Threat:** Any potential danger or adversary capable of exploiting a vulnerability to breach security.
* **Risk:** The potential for loss or damage when a threat exploits a vulnerability (`Risk = Likelihood × Impact`).

#### Attack Surface Analysis & Reduction
1. **Network Attack Surface:** Exposed ports, unsegmented flat networks, legacy cleartext services (Telnet/FTP), and weak wireless security.
   * *Reduction:* Network micro-segmentation (VLANs), default-deny firewall rules, and disabling unused services.
2. **Software / Application Attack Surface:** Unsanitized user inputs, outdated third-party libraries, exposed APIs, and default credentials.
   * *Reduction:* Automated patch management, secure coding practices (OWASP Top 10), input validation, and Web Application Firewalls (WAF).
3. **Human / Physical Attack Surface:** Social engineering (phishing, vishing, tailgating), password reuse, and insider threats.
   * *Reduction:* Continuous security awareness training, phishing-resistant MFA (FIDO2), clean-desk policies, and physical badge controls.

---

### 3. Networking Fundamentals: IP, MAC, Ports, and Protocols

* **MAC Address (Layer 2 - Data Link):** A 48-bit physical hardware identifier in hexadecimal format (e.g., `08:00:27:9A:11:01`) used for local frame delivery within the same broadcast domain.
* **IP Address (Layer 3 - Network):** A logical address used for end-to-end packet routing across networks.
  * *IPv4:* 32-bit dotted-decimal notation (e.g., `192.168.56.101/24`). RFC 1918 private ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
  * *IPv6:* 128-bit hexadecimal notation (e.g., `2001:db8::/32`).
* **ARP (Address Resolution Protocol):** Maps a known Layer 3 IPv4 address to an unknown Layer 2 MAC address within the local subnet.
* **TCP vs. UDP (Layer 4 - Transport):**
  * **TCP:** Connection-oriented, reliable protocol utilizing the **3-Way Handshake** (`SYN` → `SYN-ACK` → `ACK`), sequence numbers, acknowledgments, and retransmission.
  * **UDP:** Connectionless, low-overhead, best-effort transport ideal for real-time traffic (DNS, DHCP, VoIP, streaming).

#### Common Network Ports & Security Matrix

| Port | Protocol | Transport | Primary Purpose | Security Hardening Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **20 / 21** | FTP | TCP | File transfer (cleartext) | Disable FTP; migrate to **SFTP (Port 22)** or FTPS |
| **22** | SSH | TCP | Encrypted remote administration | Enforce SSH key authentication; set `PermitRootLogin no` |
| **23** | Telnet | TCP | Unencrypted remote shell | Disable immediately; replace exclusively with SSH |
| **25** | SMTP | TCP | Mail routing between servers | Enforce STARTTLS; configure SPF, DKIM, and DMARC |
| **53** | DNS | TCP / UDP | Domain name to IP resolution | Restrict zone transfers (`AXFR`); implement DNSSEC |
| **67 / 68** | DHCP | UDP | Dynamic IP configuration | Enable **DHCP Snooping** on Layer 2 switches |
| **80** | HTTP | TCP | Unencrypted web traffic | Redirect all traffic (301) to HTTPS and enable HSTS |
| **443** | HTTPS | TCP | Encrypted web traffic over TLS | Enforce TLS 1.2 / TLS 1.3; disable weak cipher suites |
| **445** | SMB | TCP | Network file & printer sharing | Block at perimeter firewall; disable legacy SMBv1 |
| **3389** | RDP | TCP / UDP | Windows Remote Desktop | Place behind VPN; require Network Level Auth (NLA) & MFA |

---

### 4. OSI Model vs. TCP/IP Model Comparison

| OSI Layer | Layer Name | TCP/IP Equivalent | PDU | Core Protocols & Devices | Security Controls |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Layer 7** | Application | Application | Data | HTTP, HTTPS, DNS, SSH, SMTP | WAF, DLP, Input Sanitization |
| **Layer 6** | Presentation | Application | Data | TLS/SSL, ASCII, JSON, JPEG | TLS Encryption, Certificate Pinning |
| **Layer 5** | Session | Application | Data | NetBIOS, RPC, Sockets | Session Timeouts, Secure Token Handling |
| **Layer 4** | Transport | Transport | Segment / Datagram | TCP, UDP | Stateful Firewalls, TLS/DTLS |
| **Layer 3** | Network | Internet | Packet | IPv4, IPv6, ICMP, IPSec, Routers | Network ACLs, IPSec VPNs |
| **Layer 2** | Data Link | Network Access | Frame | Ethernet, ARP, VLAN, Switches | Port Security, Dynamic ARP Inspection (DAI), 802.1X |
| **Layer 1** | Physical | Network Access | Bits | UTP/Fiber Cables, Hubs, NICs | Biometric Locks, CCTV, Cable Shielding |

---

### 5. Core Protocols (HTTP/HTTPS, DNS, DHCP) & AAA Security

* **HTTP vs. HTTPS:** HTTP transmits methods (`GET`, `POST`, `PUT`, `DELETE`) and status codes (`200`, `301`, `401`, `403`, `404`, `500`) in plaintext. HTTPS wraps HTTP inside a **TLS** tunnel using asymmetric cryptography (X.509 certificates) for authentication/key exchange and symmetric session keys (AES-GCM) for fast payload encryption.
* **DNS Resolution Hierarchy:** `Client Stub Resolver` → `Recursive Resolver` → `Root Nameserver (.)` → `TLD Nameserver (.com)` → `Authoritative Nameserver` → returns IP (`A`/`AAAA`).
* **DHCP DORA Process:**
  1. **Discover:** Client broadcasts (`255.255.255.255`) to locate available DHCP servers.
  2. **Offer:** Server proposes an IP address lease, subnet mask, gateway, and DNS server.
  3. **Request:** Client broadcasts acceptance of the offered IP parameters.
  4. **Acknowledge (ACK):** Server confirms the lease and binds the IP to the client MAC.
* **AAA Framework:**
  * **Authentication (AuthN):** Proving identity via *Something You Know* (password), *Something You Have* (FIDO2/TOTP token), and *Something You Are* (biometrics).
  * **Authorization (AuthZ):** Enforcing access permissions post-authentication via **RBAC** (Role-Based), **ABAC** (Attribute-Based), **DAC** (Discretionary), or **MAC** (Mandatory Access Control) under the **Principle of Least Privilege (PoLP)**.
  * **Accounting:** Auditing user actions and security events within centralized SIEM logs.

---

## Part 2: Practical Lab Record (Day 1 – Day 5)

### Lab 1: Safe Security Lab Setup
* **Hypervisor:** Oracle VirtualBox (Isolated Host-Only Network `192.168.56.0/24`)
* **Analyst Machine:** Kali Linux (`192.168.56.101/24` | MAC `08:00:27:9a:11:01`)
* **Target Machine:** Metasploitable 2 (`192.168.56.102/24` | MAC `08:00:27:4b:22:02`)
* **Safety Controls:** Host-Only adapter isolation verified, internet egress disabled on target VM, and baseline clean snapshots created prior to testing.

### Lab 2: Network Interface, Routing & ARP Inspection
```bash
# 1. Inspect network interface IP and MAC address
$ ip addr show eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:9a:11:01 brd ff:ff:ff:ff:ff:ff
    inet 192.168.56.101/24 brd 192.168.56.255 scope global eth0

# 2. Inspect Layer 3 routing table
$ ip route show
default via 192.168.56.1 dev eth0 proto dhcp metric 100
192.168.56.0/24 dev eth0 proto kernel scope link src 192.168.56.101 metric 100

# 3. Verify ICMP reachability & inspect Layer 2 ARP cache
$ ping -c 4 192.168.56.102
$ ip neigh show
192.168.56.102 dev eth0 lladdr 08:00:27:4b:22:02 REACHABLE
```

### Lab 3: Protocol Verification & Wireshark Packet Analysis
* **HTTP Header Inspection:**
```bash
$ curl -I http://192.168.56.102
HTTP/1.1 200 OK
Server: Apache/2.2.8 (Ubuntu) DAV/2
X-Powered-By: PHP/5.2.4
```
* **Wireshark Captures:**
  * **DHCP DORA:** Captured on UDP ports `67/68` (`bootp` filter) verifying Discover → Offer → Request → ACK.
  * **TCP 3-Way Handshake:** Captured on port `80` verifying `[SYN] Seq=0` → `[SYN, ACK] Seq=0 Ack=1` → `[ACK] Seq=1 Ack=1`.

### Lab 4: Port Scanning & Vulnerability Remediation Matrix
```bash
$ nmap -sC -sV -O 192.168.56.102
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
23/tcp   open  telnet      Linux telnetd
53/tcp   open  domain      ISC BIND 9.4.2
80/tcp   open  http        Apache httpd 2.2.8 ((Ubuntu) DAV/2)
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian
3306/tcp open  mysql       MySQL 5.0.51a-3ubuntu5
```

| Port | Detected Service | Risk Severity | Finding & Concrete Hardening Action |
| :--- | :--- | :--- | :--- |
| **21/tcp** | `vsftpd 2.3.4` | **Critical** | Contains backdoor vulnerability (CVE-2011-2523) and cleartext auth; disable FTP and enforce SFTP. |
| **22/tcp** | `OpenSSH 4.7p1` | **Medium** | Outdated SSH daemon; patch package, set `PermitRootLogin no`, and enforce key-based authentication. |
| **23/tcp** | `Linux telnetd` | **High** | Transmits credentials in plaintext; disable Telnet service (`systemctl disable --now inetd`). |
| **80/tcp** | `Apache 2.2.8` | **Medium** | Leaks version banners (`ServerTokens Full`) over HTTP; configure HTTPS (443) and set `ServerTokens Prod`. |
| **445/tcp** | `Samba 3.0.20` | **High** | Vulnerable to Remote Code Execution (CVE-2007-2447); restrict via firewall (`ufw deny 445/tcp`) and patch. |
| **3306/tcp** | `MySQL 5.0.51a` | **High** | Listening on all interfaces (`0.0.0.0`); bind strictly to localhost (`bind-address = 127.0.0.1`). |
