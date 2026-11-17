# 🛡️ Codomax Digital Solutions — Cybersecurity & Ethical Hacking Internship

Welcome to the official technical portfolio and lab repository for the **Codomax Digital Solutions Cybersecurity & Ethical Hacking Internship**. This repository houses comprehensive technical reports, architectural analyses, and hands-on lab records conducted within an isolated security environment.

## 👨💻 Intern Profile
* **Name:** Omar Ahmed Akl
* **Role:** SOC Analyst & Cybersecurity Specialist
* **GitHub:** [@eng-omar-ahmad-akll](https://github.com/eng-omar-ahmad-akll)

## 📂 Internship Modules & Deliverables

| Module | Timeframe | Level | Topic | Deliverables | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[Module 01](./Module-01-Foundations/README.md)** | Day 1 – Day 5 | Beginner | **Cybersecurity & Networking Foundations** | Fundamentals Report & Practical Lab Record ([PDF](./Module-01-Foundations/CodeMax%20-%20Module%2001.pdf)) | ✅ Completed |
| **[Module 02](./Module-02-Linux-Recon/README.md)** | Day 6 – Day 10 | Beginner | **Linux, Security Tools & Reconnaissance** | Technical Report & Controlled Recon Lab Record ([PDF](./Module-02-Linux-Recon/CodeMax%20-%20Module%2002.pdf)) | ✅ Completed |
| **[Module 03](./Module-03-Web-App-Security/README.md)** | Day 11 – Day 15 | Intermediate | **Web Application Security (Milestone)** | OWASP Top 10 Analysis, Vulnerability Report & Secure Code Lab ([PDF](./Module-03-Web-App-Security/CodeMax%20-%20Module%2003.pdf)) | ✅ Completed |
| **[Module 04](./Module-04-Ethical-Hacking-VA/README.md)** | Day 16 – Day 20 | Intermediate | **Ethical Hacking & Vulnerability Assessment** | Technical Report, VA Assessment & Remediation Plan ([PDF](./Module-04-Ethical-Hacking-VA/Module-04-Ethical-Hacking-Vulnerability-Assessment.pdf)) | ✅ Completed |
| **[Module 05](./Module-05-Defensive-Security-IR/README.md)** | Day 21 – Day 25 | Advanced | **Defensive Security & Incident Response (Capstone)** | Architecture Report, SIEM Telemetry & Incident Playbook ([PDF](./Module-05-Defensive-Security-IR/Module-05-Defensive-Security-Incident-Response.pdf)) | ✅ Completed |
| **[Module 06](./Module-06-Capstone-AegisSentinel/README.md)** | Day 26 – Day 30 | Capstone | **AegisSentinel SOC & Interactive Portfolio** | Production 2-in-1 Web App, Real-Time Log Analyzer & CV | ✅ Completed |

## 🏗️ Controlled Security Lab Architecture

All practical exercises, packet captures, and vulnerability assessments are executed exclusively within an isolated Host-Only virtual network (`192.168.56.0/24`) to ensure zero external exposure.

```text
       ┌──────────────────────────────────────────────────────────┐
       │     Isolated Virtual Subnet: 192.168.56.0/24             │
       │                                                          │
       │   ┌─────────────────────┐      ┌─────────────────────┐   │
       │   │ Analyst Workstation │      │ Target Server       │   │
       │   │ Kali Linux          │◄────►│ Metasploitable 2    │   │
       │   │ 192.168.56.101/24   │      │ 192.168.56.102/24   │   │
       │   └─────────────────────┘      └─────────────────────┘   │
       └──────────────────────────────────────────────────────────┘
```
