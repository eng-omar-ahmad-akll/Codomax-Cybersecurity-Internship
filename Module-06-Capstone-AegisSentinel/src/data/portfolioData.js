export const PORTFOLIO_DATA = {
  personal: {
    name: "Omar Ahmed Akl",
    title: "Junior SOC Analyst | Threat Detection & Cyber Defense",
    location: "Cairo / Mansoura, Egypt",
    phone: "+20 101 001 6759",
    email: "eng.omar3akll@gmail.com",
    linkedin: "https://linkedin.com/in/omarak1",
    github: "https://github.com/eng-omar-ahmad-akll",
    summary: "Detail-oriented and hands-on Junior SOC Analyst with practical training and lab-tested experience in threat detection, log correlation, alert triage, and network security. Skilled in configuring Fortinet security tools (FortiGate NGFW, FortiAnalyzer), setting up open-source SIEM (Wazuh), and conducting malware analysis and memory forensics (FLARE VM, REMnux, Volatility). Recognized as a top performer across competitive nationwide government scholarship programs (NTRA, Huawei ETA, NTI) and awarded international certification vouchers. Backed by solid foundational knowledge in GRC frameworks (NIST CSF, ISO 27001), secure web application architecture, and AI/LLM threat mitigation."
  },
  skills: [
    {
      category: "Security Operations & Threat Defense",
      color: "cyan",
      items: [
        "SIEM Log Analysis (Wazuh, FortiAnalyzer, FortiSIEM exploration)",
        "Endpoint Telemetry (Sysmon)",
        "Alert Triage & Incident Response Workflows",
        "CTF Challenges (Web Exploitation, PrivEsc)",
        "Malware Analysis (Static & Dynamic)",
        "Memory Forensics (Volatility)",
        "Network Traffic Inspection (Wireshark)",
        "Port Scanning & Reconnaissance (Nmap)",
        "IDS/IPS Rule Tuning (Snort, Suricata)",
        "MITRE ATT&CK Threat Mapping"
      ]
    },
    {
      category: "Network Security & Firewalls",
      color: "emerald",
      items: [
        "Next-Generation Firewalls (NGFW)",
        "Fortinet Security Fabric (FortiOS 7.6, FortiGate, FortiAnalyzer)",
        "Huawei USG Firewalls",
        "Cisco Enterprise Routing & Switching (CCNA/CCNP)",
        "Site-to-Site IPsec & SSL VPNs",
        "Network Address Translation (NAT)",
        "High Availability (VRRP/HRP)",
        "EVE-NG Topology Design"
      ]
    },
    {
      category: "GRC & Compliance Frameworks",
      color: "amber",
      items: [
        "Cybersecurity Risk Assessment",
        "Gap Analysis & Control Mapping",
        "IT Policy Auditing",
        "NIST Cybersecurity Framework (NIST CSF 2.0)",
        "ISO/IEC 27001 Controls",
        "Vendor Risk Assessment",
        "Enterprise Risk Registers"
      ]
    },
    {
      category: "AI & LLM Security",
      color: "rose",
      items: [
        "OWASP Top 10 for LLMs",
        "Prompt Injection Mitigation (Direct & Indirect)",
        "LLM Security Standards (Red Team Leaders)",
        "AI-Assisted Security Triage & Sanitization",
        "Adversarial Input Hardening"
      ]
    },
    {
      category: "Systems, Cloud & Scripting",
      color: "purple",
      items: [
        "Red Hat Enterprise Linux (RHEL / RHCSA track)",
        "Ubuntu Server & Hardening",
        "Windows Server Administration",
        "Python for Security Automation (Log Parsing & IOC Extraction)",
        "Node.js & Express.js",
        "Bash Scripting",
        "PostgreSQL (Supabase) & MongoDB",
        "Git / GitHub Automation",
        "Huawei Cloud Ecosystem"
      ]
    }
  ],
  experience: [
    {
      title: "Cybersecurity & Ethical Hacking Intern",
      company: "Codomax Digital Solutions",
      location: "Remote",
      period: "Nov 2026 – Dec 2026",
      badge: "Capstone",
      responsibilities: [
        "Engineered AegisSentinel SOC platform for the Module 06 Capstone with deterministic rule parsing and IOC extraction.",
        "Executed authorized hands-on vulnerability assessments across isolated multi-subnet virtual environments (192.168.56.0/24).",
        "Formulated comprehensive remediation plans covering OWASP Top 10, service isolation, and enterprise logging."
      ]
    },
    {
      title: "Artificial Intelligence & Cybersecurity Intern",
      company: "ZAWOLF.AI",
      location: "Mansoura, Egypt (Hybrid)",
      period: "Oct 2026 – Present",
      badge: "Current",
      responsibilities: [
        "Securing AI workflows against indirect prompt injection, unauthorized data extraction, and adversarial inputs.",
        "Developing Python log parsing scripts and AI-driven telemetry anomaly detection for enterprise workloads.",
        "Engineering defensive prompt boundary containment layers aligned with OWASP LLM01 standards."
      ]
    },
    {
      title: "Governance, Risk & Compliance (GRC) Trainee",
      company: "Tips Hindawi",
      location: "Hybrid",
      period: "Sep 2026 – Present",
      badge: "Current",
      responsibilities: [
        "Conducted structured risk assessment exercises aligned with NIST CSF 2.0 and ISO/IEC 27001 Annex A controls.",
        "Performed vendor risk assessments, third-party questionnaires, and maintained risk registers for remediation tracking.",
        "Evaluated organizational security posture against statutory compliance frameworks."
      ]
    },
    {
      title: "Cybersecurity Trainee & CTF Competitor",
      company: "Information Technology Institute (ITI)",
      location: "Mansoura, Egypt (120-Hour Bootcamp)",
      period: "Aug 2026 – Present",
      badge: "Bootcamp",
      responsibilities: [
        "Intensive practical training in web application security (OWASP Top 10), privilege escalation, and network forensics.",
        "Competed in high-intensity CTF challenges involving reverse engineering, crypto, and network forensics.",
        "Mastered Red Hat Enterprise Linux administration (RH124) and advanced Python security automation scripting."
      ]
    },
    {
      title: "FortiOS 7.6 Trainee & Capstone Team Leader",
      company: "National Telecommunications Regulatory Authority (NTRA) / NTI",
      location: "Remote",
      period: "Aug 2026 – Sep 2026",
      badge: "1st Place Winner",
      responsibilities: [
        "Led a 5-engineer team earning 1st place in project defense and awarded an international exam voucher.",
        "Configured FortiGate NGFWs, FortiAnalyzer integration, FSSO single sign-on, and IPsec/SSL VPN tunnels.",
        "Tuned IPS sensor signatures, application control policies, and High Availability (HA) active-passive clustering."
      ]
    },
    {
      title: "HCIA-Security Trainee (Top Performer)",
      company: "Huawei ICT Academy & NTI",
      location: "Mansoura, Egypt",
      period: "Jul 2026 – Aug 2026",
      badge: "Ranked 1st in Cohort",
      responsibilities: [
        "Ranked 1st in cohort of 23 engineers with 100% practical score; awarded international exam voucher.",
        "Configured Huawei USG next-gen firewalls, VRRP/HRP stateful synchronization, AAA, and site-to-site IPsec tunnels.",
        "Implemented perimeter defense policies and NAT multi-egress architectures."
      ]
    },
    {
      title: "Ethical Hacking & Cybersecurity Academy Trainee",
      company: "National Telecommunication Institute (NTI)",
      location: "Egypt",
      period: "Jul 2025 – Jun 2026",
      badge: "National Program",
      responsibilities: [
        "Completed comprehensive modules in ethical hacking methodologies, penetration testing phases, and defensive telemetry.",
        "Analyzed packet captures, reconstructed TCP streams, and conducted credential auditing."
      ]
    },
    {
      title: "Cisco Enterprise Networking & Security Trainee",
      company: "Digital Training Center (DTC)",
      location: "Egypt",
      period: "Jul 2024 – Dec 2025",
      badge: "CCNA / CCNP",
      responsibilities: [
        "Extensive practical routing & switching lab work (CCNA 200-301 & CCNP 350-401 ENCOR).",
        "Configured OSPF, EIGRP, BGP, VLAN segmentation, Spanning Tree Protocol (STP), and Access Control Lists (ACLs)."
      ]
    }
  ],
  projects: [
    {
      title: "AegisSentinel SOC Platform",
      tagline: "Codomax Capstone (Module 06)",
      tech: ["React (Vite)", "Tailwind CSS", "Python", "FastAPI", "Sigma Rules", "MITRE ATT&CK"],
      description: "Production-grade, dark-mode 2-in-1 SOC log analyzer, IOC extraction engine, and interactive threat triage platform equipped with 4-zone defense-in-depth visualizer and prompt-injection-resistant AI Co-Pilot.",
      highlights: [
        "Deterministic rule evaluation (SSH brute force, SQLi, Sysmon LolBins, LSASS dumping, C2 beaconing).",
        "Dual-engine triage drawer with MITRE ATT&CK remediation playbooks and exportable incident reports."
      ]
    },
    {
      title: "CyberDesk Enterprise",
      tagline: "ZAWOLF.AI Production Platform",
      tech: ["Node.js", "Express.js", "Supabase PostgreSQL", "RLS / RBAC", "AI Triage"],
      description: "Enterprise IT and security operations service desk featuring strict row-level security (RLS), role-based access control (RBAC), and automated AI triage for incident tickets.",
      highlights: [
        "Prompt-injection-hardened AI classification layer filtering adversarial inputs.",
        "Comprehensive audit logging and SIEM integration for all administrative actions."
      ]
    },
    {
      title: "Enterprise Secure Authentication Engine",
      tagline: "Full-Stack Security Project",
      tech: ["Node.js", "Express", "MongoDB", "Speakeasy 2FA", "JWT", "Bcrypt"],
      description: "Hardened authentication microservice supporting Time-based One-Time Password (TOTP) two-factor authentication, cryptographic session invalidation, and rate-limiting brute-force defenses.",
      highlights: [
        "Stateless JWT access tokens paired with HttpOnly, Secure, and SameSite=Strict cookies.",
        "Zero-trust credential verification and automatic session regeneration upon login."
      ]
    },
    {
      title: "FortiGate & FortiAnalyzer IPS Defense Topology",
      tagline: "1st Place NTRA Capstone",
      tech: ["FortiOS 7.6", "FortiGate NGFW", "FortiAnalyzer", "EVE-NG", "IPsec"],
      description: "High-availability enterprise perimeter defense architecture featuring active-passive clustering, Deep Packet Inspection (DPI), and centralized security logging.",
      highlights: [
        "Engineered site-to-site IPsec tunnels and remote-access SSL VPNs with MFA.",
        "Tuned IPS sensor signatures to block exploit kits while maintaining sub-millisecond throughput."
      ]
    },
    {
      title: "Enterprise SOC & Threat Hunting Simulation Lab",
      tagline: "Custom Home Lab Architecture",
      tech: ["Wazuh SIEM", "Sysmon (SwiftOnSecurity)", "FLARE VM", "REMnux", "Volatility 3", "Suricata"],
      description: "Dedicated virtualized cyber range simulating enterprise multi-tier networks (192.168.100.0/24 & 10.10.20.0/24) for active adversary emulation and digital forensics.",
      highlights: [
        "Full endpoint telemetry ingestion with Sysmon XML configs and Wazuh manager correlation.",
        "Memory forensics pipeline utilizing Volatility 3 to extract injected DLLs and malicious process handles."
      ]
    }
  ],
  education: {
    institution: "Misr Higher Institute for Engineering and Technology (MET), Mansoura",
    degree: "B.Sc. in Computer Science",
    period: "Sep 2023 – Expected Aug 2027",
    focus: "Specialized in Cybersecurity, Information Systems Security, and Computer Networks."
  },
  certifications: [
    {
      name: "Huawei HCIA-Security",
      issuer: "Huawei ICT Academy",
      badge: "1st Place Exam Voucher",
      status: "Achieved / Top Performer"
    },
    {
      name: "Fortinet FortiGate Security FortiOS 7.6",
      issuer: "Fortinet / NTRA",
      badge: "1st Place Voucher Award",
      status: "Achieved / Capstone Leader"
    },
    {
      name: "CLLMSP — Certified LLM Security Practitioner",
      issuer: "Red Team Leaders",
      badge: "AI Security Specialist",
      status: "Certified"
    },
    {
      name: "CLLMSE — Certified LLM Security Expert",
      issuer: "Red Team Leaders",
      badge: "Advanced AI Defense",
      status: "Certified"
    },
    {
      name: "CCEP — Certified Cybercrime Examiner Practitioner",
      issuer: "Red Team Leaders",
      badge: "Digital Forensics",
      status: "Certified"
    },
    {
      name: "Huawei Cloud HCCDA — Cloud Digital Architect",
      issuer: "Huawei Cloud",
      badge: "Cloud Architecture",
      status: "Certified"
    }
  ]
};
