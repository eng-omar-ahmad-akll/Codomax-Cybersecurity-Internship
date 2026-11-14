# 🐧 Module 02: Linux, Security Tools & Reconnaissance
**Timeframe:** Day 6 – Day 10 | **Level:** Beginner  
**Deliverables:** Technical Report & Controlled Reconnaissance Lab Record  
**Author:** Omar Ahmed Akl

---

## Part 1: Linux Fundamentals, Reconnaissance & Security Tools Report

### 1. Linux Fundamentals & Security Administration

#### Filesystem Hierarchy Standard (FHS) Security Relevance
* **`/etc`:** Stores core system configurations (`/etc/passwd`, `/etc/shadow`, `/etc/sudoers`, `/etc/ssh/sshd_config`).
* **`/var/log`:** Central repository for audit and forensic logs (`auth.log`, `syslog`, `apache2/access.log`).
* **`/bin` & `/sbin`:** Standard user binaries vs. privileged system administration binaries.
* **`/tmp`:** World-writable directory (`1777`); frequently abused by threat actors to drop payloads. Hardened by mounting with `noexec,nosuid,nodev`.
* **`/proc`:** Virtual kernel filesystem exposing live process metadata (`/proc/<PID>/cmdline`).

#### Permissions, Ownership & Special Bits
* **Permission Scopes & Values:** Owner (`u`), Group (`g`), Others (`o`) evaluated using Read (`r=4`), Write (`w=2`), and Execute (`x=1`).
  * `chmod 750 file` → `rwxr-x---`
  * `chmod 640 file` → `rw-r-----`
  * `chmod 600 file` → `rw-------`
* **Special Permission Bits:**
  * **SUID (`4000` / `u+s`):** Executes binary with file owner (`root`) privileges. Misconfigured SUID bits on binaries like `nmap`, `find`, `vim`, or `bash` enable immediate root privilege escalation.
  * **SGID (`2000` / `g+s`):** Executes under group privileges or enforces group ownership inheritance on directories.
  * **Sticky Bit (`1000` / `+t`):** Prevents unprivileged users from deleting other users' files in shared directories like `/tmp` (`drwxrwxrwt`).

#### Users, Groups & Process Management
* **Identity Files:** `/etc/passwd` stores user metadata (`UID 0` = root, `1000+` = standard users), while `/etc/shadow` (`640 root:shadow`) protects salted password hashes. `/etc/sudoers` (edited via `visudo`) enforces least-privilege command delegation.
* **Process & Socket Auditing:** Active processes and network daemons are audited using `ps aux`, `top`, `pstree`, `systemctl`, and `sudo ss -tulnp`.

---

### 2. Passive vs. Active Reconnaissance & DNS Enumeration

| Attribute | Passive Reconnaissance (OSINT) | Active Reconnaissance |
| :--- | :--- | :--- |
| **Target Interaction** | Zero direct traffic to target; queries public third-party sources | Sends direct probes/packets to target networks and hosts |
| **SIEM / IDS Detection** | Near zero detection risk by target monitoring systems | High detection risk; logged by firewalls, IDS/IPS, and WAFs |
| **Primary Techniques** | `whois`, Certificate Transparency (`crt.sh`), Shodan, Google Dorks | `nmap` port scans, DNS Zone Transfers (`AXFR`), web directory fuzzing |

* **DNS Enumeration & Zone Transfers (`AXFR`):** Querying `A`, `AAAA`, `MX`, `TXT`, `NS`, and `SOA` records maps domain infrastructure. If an authoritative DNS server permits unauthenticated `AXFR` requests (`dig axfr @<NS> <domain>`), it dumps the entire internal zone file, exposing internal hosts and subdomains.

---

### 3. Essential Security Tools Deep Dive

1. **Nmap (Network Mapper):**
   * **Port States:** `open`, `closed`, `filtered`, `unfiltered`, `open|filtered`.
   * **Key Flags:** `-sS` (SYN Stealth Scan), `-sT` (TCP Connect), `-sU` (UDP Scan), `-sV` (Service Version), `-O` (OS Detection), `-sC` / `--script` (NSE Lua scripts).
2. **Wireshark:**
   * **Capture Filters (BPF):** `host 192.168.56.102`, `port 80`.
   * **Display Filters:** `ip.addr == 192.168.56.102 && tcp.flags.syn == 1`, `http.request.method == "POST"`.
3. **Burp Suite:**
   * **Proxy (`127.0.0.1:8080`):** Intercepts and modifies inline HTTP/HTTPS requests.
   * **Repeater:** Re-issues manipulated requests to test parameters, headers, and methods.
   * **Intruder:** Automates fuzzing and brute-forcing (`Sniper`, `Battering Ram`, `Pitchfork`, `Cluster Bomb`).
4. **OWASP ZAP:**
   * **Traditional & AJAX Spider:** Crawls static HTML and dynamic JavaScript endpoints.
   * **Passive vs. Active Scan:** Passively flags missing security headers (`CSP`, `X-Frame-Options`, `HSTS`) and insecure cookies (`HttpOnly`, `Secure`); actively probes for XSS, SQLi, and Path Traversal.

---

## Part 2: Controlled Reconnaissance Lab Record (Day 6 – Day 10)

### Lab 1: Linux Permissions, Process Auditing & SUID Escalation Discovery
```bash
# 1. Audit interactive shell accounts
$ grep -E '/bin/(bash|sh)$' /etc/passwd
root:x:0:0:root:/root:/bin/bash
msfadmin:x:1000:1000:msfadmin,,,:/home/msfadmin:/bin/bash

# 2. Enforce strict access control on security audit directory
$ sudo mkdir -p /opt/sec_audit && sudo touch /opt/sec_audit/credentials.txt
$ sudo groupadd sec_team && sudo chown -R root:sec_team /opt/sec_audit
$ sudo chmod 750 /opt/sec_audit && sudo chmod 600 /opt/sec_audit/credentials.txt

# 3. Hunt for SUID binaries & remediate misconfigured /usr/bin/nmap
$ find / -perm -4000 -type f 2>/dev/null
/usr/bin/passwd
/usr/bin/sudo
/usr/bin/nmap
$ sudo chmod u-s /usr/bin/nmap
```

### Lab 2: Active DNS Reconnaissance & Zone Transfer (`AXFR`)
```bash
$ dig axfr @192.168.56.102 target.codemax.lab
target.codemax.lab.     86400   IN   SOA  ns1.target.codemax.lab. admin.target.codemax.lab. (2026111401 3600 900 604800 86400)
ns1.target.codemax.lab. 86400   IN   A    192.168.56.102
www.target.codemax.lab. 86400   IN   A    192.168.56.102
dev.target.codemax.lab. 86400   IN   A    192.168.56.160
db.target.codemax.lab.  86400   IN   A    192.168.56.150
```
* **Remediation:** Set `allow-transfer { none; };` inside `/etc/bind/named.conf.options`.

### Lab 3: Nmap NSE Enumeration & Wireshark Stealth Scan Analysis
```bash
$ sudo nmap -sS -sV -O --script=http-enum,smb-os-discovery -p 21,22,23,53,80,139,445,3306,8180 192.168.56.102
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
80/tcp   open  http        Apache httpd 2.2.8 ((Ubuntu) DAV/2)
| http-enum:
|   /dvwa/: Damn Vulnerable Web App
|   /mutillidae/: OWASP Mutillidae II
|   /phpinfo.php: PHP configuration disclosure
|_  /admin/: Possible administrative directory
445/tcp  open  netbios-ssn Samba smbd 3.0.20-Debian
8180/tcp open  http        Apache Tomcat/Coyote JSP engine 1.1
```
* **Wireshark Verification:** Confirmed half-open `-sS` scan signature (`SYN` → `SYN, ACK` → `RST`) tearing down connections prior to completing handshake.

### Lab 4: Web Application Reconnaissance (Burp Suite & OWASP ZAP)
```http
GET /dvwa/login.php HTTP/1.1
Host: 192.168.56.102

HTTP/1.1 200 OK
Server: Apache/2.2.8 (Ubuntu) DAV/2
X-Powered-By: PHP/5.2.4
Set-Cookie: PHPSESSID=8a9d7f6c5b4e3a2d1c0b9a8e7f6d5c4b; path=/
```

### 5. Consolidated Reconnaissance Findings Matrix

| ID | Category | Tool | Finding Description | Severity | Remediation Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Linux PrivEsc | `find` | SUID bit (`4000`) on `/usr/bin/nmap` allows root shell escape | **High** | Remove SUID bit (`sudo chmod u-s /usr/bin/nmap`) |
| **SEC-02** | DNS Security | `dig axfr` | Unrestricted DNS Zone Transfer leaks internal hosts | **High** | Restrict `allow-transfer { none; };` in BIND config |
| **SEC-03** | Network Daemon | `Nmap` | Backdoored `vsftpd 2.3.4` & exposed `Telnet`/`Samba` | **Critical** | Disable legacy services; patch packages & restrict via UFW |
| **SEC-04** | Web Headers | `Burp` / `ZAP` | Missing `Content-Security-Policy` & `X-Frame-Options` | **Medium** | Configure security headers in Apache virtual host |
| **SEC-05** | Session Cookie | `Burp` / `ZAP` | `PHPSESSID` missing `HttpOnly` and `Secure` flags | **Medium** | Enable `session.cookie_httponly` & `cookie_secure` in `php.ini` |
| **SEC-06** | Info Disclosure | `Nmap` / `ZAP` | Public `/phpinfo.php` & verbose `Server` / `X-Powered-By` banners | **Medium** | Remove `/phpinfo.php`, set `ServerTokens Prod` & `expose_php = Off` |
