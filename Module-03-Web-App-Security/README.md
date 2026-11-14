# 🌐 Module 03: Web Application Security
**Timeframe:** Day 11 – Day 15 | **Level:** Intermediate (Milestone Module)  
**Deliverables:** OWASP Top 10 Analysis, Vulnerability Report, Secure Coding Remediation & Demo Walkthrough  
**Author:** Omar Ahmed Akl

---

## Part 1: Web Application Architecture & HTTP Lifecycle

### 1. How Modern Web Applications Work (3-Tier Architecture)
1. **Presentation Tier (Client / Browser):** Renders HTML/CSS and executes JavaScript in the user's browser sandbox. Communicates asynchronously with backend endpoints via `fetch`/`XHR` over HTTP/HTTPS.
2. **Application Tier (Web & Business Logic Server):** Processes client requests, enforces authentication, session state, authorization rules, and input validation (e.g., Node.js/Express, PHP/Apache, Python/FastAPI).
3. **Data Tier (Database & Storage Server):** Stores persistent application records, credentials, and relational/non-relational data (e.g., PostgreSQL, MySQL, MongoDB) isolated from direct public access.

### 2. HTTP Request / Response Lifecycle
HTTP is a **stateless** application-layer protocol. Every transaction consists of a structured Request and Response:

```text
Client (Browser)                                      Web Server (192.168.56.102)
      │                                                            │
      │─── 1. TCP 3-Way Handshake + TLS Negotiation ──────────────►│
      │─── 2. HTTP Request (POST /login HTTP/1.1 + Payload) ──────►│
      │                                                            │──► 3. AuthN / AuthZ Check
      │                                                            │──► 4. Parameterized DB Query
      │◄── 5. HTTP Response (200 OK + Set-Cookie: HttpOnly) ───────│
```

* **HTTP Request Structure:**
  * **Request Line:** Method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`), URI (`/api/v1/user`), and HTTP Version (`HTTP/1.1` or `HTTP/2`).
  * **Request Headers:** `Host`, `User-Agent`, `Authorization: Bearer <token>`, `Cookie`, `Content-Type`, `Origin`.
  * **Request Body:** Form parameters, JSON payloads, or multipart file uploads.
* **HTTP Response Structure:**
  * **Status Line:** Protocol version + Status Code (`200 OK`, `301/302 Redirect`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`).
  * **Security Response Headers:** `Content-Security-Policy (CSP)`, `Strict-Transport-Security (HSTS)`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.

### 3. Cookies, Sessions, Authentication & Authorization
Because HTTP is stateless, web applications maintain user state across requests using **Stateful Session Identifiers** or **Stateless Tokens (JWT)**:

| Security Attribute | Purpose & Threat Mitigated | Recommended Setting |
| :--- | :--- | :--- |
| **`HttpOnly`** | Prevents client-side JavaScript (`document.cookie`) from accessing the cookie | Mitigates session theft via Cross-Site Scripting (XSS) |
| **`Secure`** | Ensures the cookie is transmitted exclusively over encrypted HTTPS (TLS) connections | Mitigates cleartext sniffing on the network |
| **`SameSite`** | Controls whether cookies are sent with cross-site requests (`Strict` or `Lax`) | Mitigates Cross-Site Request Forgery (CSRF) |
| **Session Regeneration** | Generates a new session ID upon successful authentication (`session_regenerate_id(true)`) | Mitigates Session Fixation attacks |

* **Authentication (AuthN) vs. Authorization (AuthZ):**
  * **Authentication** verifies identity (passwords hashed using **Argon2id** or **bcrypt**, Multi-Factor Authentication, OAuth 2.0 / OIDC).
  * **Authorization** enforces access control on every single request on the server side (Role-Based Access Control **RBAC**, Attribute-Based Access Control **ABAC**, and object-level ownership checks to prevent **IDOR**).

---

## Part 2: OWASP Top 10 Comprehensive Vulnerability Analysis

| Rank | OWASP Category | Root Cause & Attack Mechanism | Real-World Impact | Primary Defense & Secure Coding Control |
| :--- | :--- | :--- | :--- | :--- |
| **A01** | **Broken Access Control** | Missing server-side ownership checks (IDOR), forced browsing to `/admin`, or privilege tampering in JWT/cookies. | Unauthorized viewing, modification, or deletion of other users' sensitive records or full admin takeover. | Enforce server-side RBAC/ABAC checks on every endpoint; use indirect/UUID references; deny by default. |
| **A02** | **Cryptographic Failures** | Transmitting data over cleartext HTTP, using deprecated hashes (`MD5`/`SHA1`), or hardcoded encryption keys. | Exposure of credentials, PII, and financial data via network sniffing or rainbow table cracking. | Enforce TLS 1.3 (HSTS), encrypt sensitive data at rest (AES-256-GCM), and hash passwords with **Argon2id** or **bcrypt**. |
| **A03** | **Injection (SQLi, XSS, OS Cmd)** | Untrusted user input is concatenated directly into SQL queries, OS shell commands, or rendered HTML/DOM. | Full database dump/bypass (SQLi), Remote Code Execution (RCE), or session hijacking via injected scripts (XSS). | Use **Parameterized Queries (Prepared Statements)**, context-aware output encoding (`htmlspecialchars`), and strict CSP. |
| **A04** | **Insecure Design** | Architectural flaws lacking threat modeling, business logic limits, or rate-limiting workflows. | Automated scalping, workflow bypass (e.g., negative checkout quantities), or account enumeration. | Integrate threat modeling in SDLC, enforce strict business logic state validation, and apply rate limiting. |
| **A05** | **Security Misconfiguration** | Default credentials enabled, verbose stack traces/error messages, directory listing, or missing HTTP security headers. | Information disclosure of server internals and easy compromise via default admin consoles. | Automate hardening baselines, disable debug mode in production, remove `/phpinfo.php`, and set security headers. |
| **A06** | **Vulnerable & Outdated Components** | Running unpatched web servers (e.g., Apache 2.2.8), outdated CMS plugins, or vulnerable npm/pip/composer packages. | Exploitation of known public CVEs leading to server compromise or data breach. | Maintain an SBOM, run automated SCA scanners (`npm audit`, `Dependabot`, `Snyk`), and patch promptly. |
| **A07** | **Identification & Auth Failures** | Permitting weak passwords, missing brute-force protection, predictable session IDs, or missing session invalidation on logout. | Credential stuffing, brute-force account takeover, and session hijacking. | Enforce MFA, implement account lockout/rate limiting, rotate session IDs on login, and validate against breached password lists. |
| **A08** | **Software & Data Integrity Failures** | Insecure deserialization of untrusted data or pulling unsigned CI/CD dependencies and CDN scripts without integrity checks. | Remote Code Execution (RCE) via deserialization gadgets or supply-chain compromise. | Use Subresource Integrity (`SRI`) hashes on external scripts, sign CI/CD artifacts, and avoid deserializing untrusted objects. |
| **A09** | **Security Logging & Monitoring Failures** | Failing to log failed logins, privilege changes, or high-value transactions, or storing logs only locally without alerting. | Delayed breach detection, inability to perform post-incident forensics, and undetected lateral movement. | Log all authentication and access control failures in structured format and forward to a centralized SIEM with real-time alerts. |
| **A10** | **Server-Side Request Forgery (SSRF)** | Application fetches a remote URL supplied by the user without validating the destination IP or protocol scheme. | Scanning internal network ports, accessing cloud metadata (`169.254.169.254`), or bypassing perimeter firewalls. | Enforce a strict allowlist of permitted domains/protocols, disable HTTP redirects, and block private/loopback IP ranges (RFC 1918). |

---

## Part 3: Secure Web Application Lab Record (Identify → Test → Fix → Document)

### Lab Environment & Sandbox Setup
* **Isolated Network:** VirtualBox Host-Only Subnet (`192.168.56.0/24`)
* **Analyst Machine:** Kali Linux (`192.168.56.101/24`) running **Burp Suite Professional/Community**, **OWASP ZAP**, and `curl`/`sqlmap`.
* **Target Sandbox:** DVWA / Custom PHP & MySQL Web App on `192.168.56.102/24`

---

### Lab Case 01: SQL Injection (SQLi) — OWASP A03

#### 1. Identify (Code & Endpoint Audit)
* **Endpoint:** `GET /vulnerabilities/sqli/?id=1&Submit=Submit`
* **Root Cause:** The backend directly concatenates the `$_GET['id']` parameter into the SQL string without parameterization.

#### 2. Test (Proof of Concept in Sandbox)
Intercepted the request in **Burp Suite Proxy** and sent it to **Burp Repeater** with a tautology and UNION-based payload:

```http
GET /vulnerabilities/sqli/?id=1'+UNION+SELECT+user,password+FROM+users--+-&Submit=Submit HTTP/1.1
Host: 192.168.56.102
Cookie: security=low; PHPSESSID=8a9d7f6c5b4e3a2d1c0b9a8e7f6d5c4b
```

**Observed Vulnerable Output:**
```text
ID: 1' UNION SELECT user,password FROM users-- -
First name: admin
Surname: 5f4dcc3b5aa765d61d8327deb882cf99
```

#### 3. Fix (Vulnerable vs. Remediated Code)
```php
// ❌ VULNERABLE CODE (Direct String Concatenation)
$id = $_GET['id'];$query = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
$result = mysqli_query($conn,$query);

// ✅ REMEDIATED SECURE CODE (PDO Prepared Statements + Strict Type Validation)
$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if ($id === false \vert{}\vert{}$id === null) {
    http_response_code(400);
    exit("Invalid user ID format.");
}
$stmt =$pdo->prepare('SELECT first_name, last_name FROM users WHERE user_id = :id LIMIT 1');
$stmt->execute(['id' =>$id]);
$user =$stmt->fetch(PDO::FETCH_ASSOC);
```

#### 4. Document & Verify
Re-issued the `' UNION SELECT` payload in Burp Repeater after applying PDO Prepared Statements; the application rejected the non-integer payload with `HTTP 400 Bad Request` and executed zero unauthorized SQL commands.

---

### Lab Case 02: Cross-Site Scripting (Reflected & Stored XSS) — OWASP A03

#### 1. Identify
* **Endpoint:** `GET /vulnerabilities/xss_r/?name=<input>`
* **Root Cause:** The application echoes `$_GET['name']` directly into the HTML response body without output encoding, and `PHPSESSID` lacks the `HttpOnly` flag.

#### 2. Test (Proof of Concept)
Submitted the following payload to verify arbitrary JavaScript execution in the victim browser context:

```html
<script>alert('XSS_PoC_Origin: ' + document.domain)</script>
```
**Observed Vulnerable Output:** The browser parsed the `<script>` tag and executed the JavaScript payload immediately within the application origin (`192.168.56.102`).

#### 3. Fix (Vulnerable vs. Remediated Code)
```php
// ❌ VULNERABLE CODE (Unencoded Reflection)
echo "<pre>Hello " . $_GET['name'] . "</pre>";

// ✅ REMEDIATED SECURE CODE (Contextual Output Encoding + CSP Header)
header("Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';");
header("X-Content-Type-Options: nosniff");

$safe_name = htmlspecialchars($_GET['name'] ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
echo "<pre>Hello " . $safe_name . "</pre>";
```

#### 4. Document & Verify
After applying `htmlspecialchars()` and the `Content-Security-Policy` header, `<` and `>` were rendered safely as `&lt;script&gt;` in the HTML response, completely neutralizing script execution.

---

### Lab Case 03: Broken Access Control (IDOR) — OWASP A01

#### 1. Identify
* **Endpoint:** `GET /api/profile.php?account_id=1001`
* **Root Cause:** The endpoint queries the requested `account_id` without verifying whether the authenticated session user (`$_SESSION['account_id']`) owns that record or holds an administrative role.

#### 2. Test (Proof of Concept)
Authenticated as standard user `msfadmin` (`account_id=1002`), intercepted the request in **Burp Repeater**, and modified `account_id=1002` to `account_id=1001`:

```http
GET /api/profile.php?account_id=1001 HTTP/1.1
Host: 192.168.56.102
Cookie: PHPSESSID=8a9d7f6c5b4e3a2d1c0b9a8e7f6d5c4b
```
**Observed Vulnerable Output:** Returned `HTTP 200 OK` containing the private profile, email, and role metadata of the administrator (`account_id=1001`).

#### 3. Fix (Vulnerable vs. Remediated Code)
```php
// ❌ VULNERABLE CODE (Missing Object-Level Authorization)
$stmt =$pdo->prepare('SELECT username, email, role FROM accounts WHERE id = :id');
$stmt->execute(['id' =>$_GET['account_id']]);

// ✅ REMEDIATED SECURE CODE (Strict Server-Side Ownership & RBAC Check)
session_start();
if (!isset($_SESSION['account_id'])) {
    http_response_code(401);
    exit("Authentication required.");
}

$requested_id = filter_input(INPUT_GET, 'account_id', FILTER_VALIDATE_INT);$is_owner = ($_SESSION['account_id'] ===$requested_id);
$is_admin = ($_SESSION['role'] ?? '') === 'admin';

if (!$is_owner && !$is_admin) {
    error_log("IDOR Attempt Blocked: User {$_SESSION['account_id']} requested Account {$requested_id}");
    http_response_code(403);
    exit("Forbidden: Access denied to this resource.");
}

$stmt =$pdo->prepare('SELECT username, email, role FROM accounts WHERE id = :id');
$stmt->execute(['id' =>$requested_id]);
```

#### 4. Document & Verify
Replaying `GET /api/profile.php?account_id=1001` from user `1002`'s session returned `HTTP 403 Forbidden` and logged an access control alert in the server audit log.

---

### Lab Case 04: Identification & Authentication Failures — OWASP A07

#### 1. Identify
* **Endpoint:** `POST /login.php`
* **Root Cause:** Passwords stored as unsalted `MD5` hashes, session ID not regenerated upon login (enabling Session Fixation), and cookies issued without `HttpOnly`, `Secure`, or `SameSite` flags.

#### 2. Fix (Vulnerable vs. Remediated Code)
```php
// ❌ VULNERABLE CODE
if (md5($_POST['password']) ===$user['password_md5']) {
    $_SESSION['user_id'] =$user['id'];
}

// ✅ REMEDIATED SECURE CODE (Argon2id + Session Hardening + Regeneration)
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'secure' => true,      // Transmit over HTTPS only
    'httponly' => true,    // Block JavaScript access
    'samesite' => 'Strict' // Mitigate CSRF
]);
session_start();

if ($user && password_verify($_POST['password'],$user['password_hash'])) {
    session_regenerate_id(true); // Prevent Session Fixation
    $_SESSION['account_id'] = $user['id'];$_SESSION['role'] = $user['role'];$_SESSION['last_auth'] = time();
}
```

---

## Part 4: Consolidated Vulnerability Report & Demo Walkthrough

### 1. Executive Vulnerability & Remediation Matrix

| Vuln ID | Vulnerability Title | OWASP Category | Affected Endpoint | CVSS v3.1 | Remediation Applied | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **WEB-01** | SQL Injection (UNION & Auth Bypass) | **A03: Injection** | `/vulnerabilities/sqli/` | **9.8 (Critical)** | Replaced raw SQL concatenation with PDO Prepared Statements & integer validation | ✅ Fixed & Verified |
| **WEB-02** | Broken Object Level Authorization (IDOR) | **A01: Broken Access Control** | `/api/profile.php` | **8.1 (High)** | Enforced server-side session ownership check (`$_SESSION['account_id'] === $requested_id`) | ✅ Fixed & Verified |
| **WEB-03** | Weak Password Hashing & Session Fixation | **A07: Auth Failures** | `/login.php` | **8.1 (High)** | Migrated from MD5 to `PASSWORD_ARGON2ID`, added `session_regenerate_id(true)`, and set `HttpOnly`/`SameSite=Strict` | ✅ Fixed & Verified |
| **WEB-04** | Reflected & Stored Cross-Site Scripting (XSS) | **A03: Injection** | `/vulnerabilities/xss_r/` | **6.1 (Medium)** | Applied `htmlspecialchars()` encoding (`ENT_QUOTES`, `UTF-8`) and strict `Content-Security-Policy` | ✅ Fixed & Verified |
| **WEB-05** | Missing Security Headers & Server Banner Leak | **A05: Security Misconfiguration** | Global HTTP Responses | **5.3 (Medium)** | Configured `CSP`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `ServerTokens Prod` | ✅ Fixed & Verified |

---

### 2. Step-by-Step Demo Walkthrough

1. **Step 1 — Baseline Environment & Proxy Interception:**
   * Launch Kali Linux (`192.168.56.101`) and verify reachability to the target sandbox (`192.168.56.102`).
   * Open **Burp Suite**, bind the proxy listener to `127.0.0.1:8080`, and route the browser traffic through Burp.
2. **Step 2 — Demonstrating Exploitation (Before Patching):**
   * **SQLi Demo:** Send `GET /vulnerabilities/sqli/?id=1` to **Burp Repeater**, inject `1' UNION SELECT user,password FROM users-- -`, and observe the full credential table dump in the HTTP 200 response.
   * **XSS Demo:** Submit `<script>alert(document.domain)</script>` into the input parameter and observe immediate DOM script execution.
   * **IDOR Demo:** Log in as user `1002`, change `account_id=1002` to `account_id=1001` in Burp Repeater, and observe unauthorized disclosure of admin profile data.
3. **Step 3 — Deploying Secure Code Patches:**
   * Apply the refactored PHP patches utilizing **PDO Prepared Statements**, `htmlspecialchars()` + **CSP headers**, **Server-Side Ownership Validation**, and **Argon2id + `session_regenerate_id(true)`**.
4. **Step 4 — Post-Patch Verification (Retesting):**
   * Replay all three attack payloads from **Burp Repeater** history:
     * SQLi payload returns `HTTP 400 Bad Request`.
     * XSS payload renders harmlessly as HTML-encoded text with CSP active.
     * IDOR request returns `HTTP 403 Forbidden` and writes an entry to the security log.
