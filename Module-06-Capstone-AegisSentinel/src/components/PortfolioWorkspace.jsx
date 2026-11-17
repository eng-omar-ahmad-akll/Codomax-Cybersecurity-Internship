import React, { useState } from 'react';
import { 
  PORTFOLIO_DATA 
} from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Network, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Server, 
  Download,
  Flame,
  Globe
} from 'lucide-react';

export default function PortfolioWorkspace() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('ALL');
  const { personal, skills, experience, projects, education, certifications } = PORTFOLIO_DATA;

  const filteredSkills = selectedSkillCategory === 'ALL' 
    ? skills 
    : skills.filter(s => s.category === selectedSkillCategory);

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero & Contact Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070b14] via-slate-900/90 to-[#070b14] border border-cyan-900/40 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Open to Junior SOC / Threat Defense Opportunities</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 font-mono tracking-tight">
                {personal.name}
              </h1>
              <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 font-mono">
                {personal.title}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
              {personal.summary}
            </p>

            {/* Contact Information Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personal.location}</span>
              </div>

              <a 
                href={`tel:${personal.phone.replace(/\s+/g, '')}`} 
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personal.phone}</span>
              </a>

              <a 
                href={`mailto:${personal.email}`} 
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>{personal.email}</span>
              </a>
            </div>
          </div>

          {/* Direct External Action Cards */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-200 text-xs font-mono font-bold transition-all shadow-md group"
            >
              <div className="flex items-center space-x-2">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold transition-all shadow-md group"
            >
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repositories</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            <button
              onClick={() => window.print()}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all shadow-md"
            >
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Save CV / Print Dossier</span>
              </div>
            </button>
          </div>

        </div>
      </section>

      {/* Skills & Competencies Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Technical Skills & Core Competencies</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Tested across enterprise lab topologies, national bootcamps, and CTF competitions
            </p>
          </div>

          {/* Skill Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            <button
              onClick={() => setSelectedSkillCategory('ALL')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedSkillCategory === 'ALL'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              All Domains
            </button>
            {skills.map(s => (
              <button
                key={s.category}
                onClick={() => setSelectedSkillCategory(s.category)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedSkillCategory === s.category
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {s.category.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((category) => (
            <div 
              key={category.category}
              className="p-5 rounded-2xl bg-[#070b14] border border-slate-800 hover:border-cyan-900/60 shadow-lg space-y-3 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <h3 className="text-xs font-bold font-mono text-cyan-300 uppercase tracking-wider">
                  {category.category}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                  {category.items.length} Skills
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.items.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Experience & Internships Timeline */}
      <section className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span>Professional Experience & Hands-On Internships</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Government scholarship programs, defense leadership, and industry engineering roles
          </p>
        </div>

        <div className="relative border-l-2 border-cyan-900/50 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              </div>

              <div className="p-6 rounded-2xl bg-[#070b14] border border-slate-800 hover:border-cyan-900/50 shadow-xl space-y-3 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold font-mono text-slate-100">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono font-semibold">
                      {exp.company} <span className="text-slate-500">•</span> <span className="text-slate-400">{exp.location}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                      {exp.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 font-sans list-disc list-inside">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="leading-relaxed">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Technical Projects & Home Lab Showcase */}
      <section className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <span>Key Security Projects & Home Lab Architecture</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Practical architectures designed for threat hunting, security automation, and active defense
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[#070b14] border border-slate-800 hover:border-cyan-900/60 shadow-xl flex flex-col justify-between space-y-4 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/40">
                      {proj.tagline}
                    </span>
                    <h3 className="text-base font-bold font-mono text-slate-100 mt-1.5">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {proj.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  {proj.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-400 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {proj.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Education Card */}
        <div className="p-6 rounded-2xl bg-[#070b14] border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold font-mono text-slate-100">
              Academic Education
            </h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300">
                {education.degree}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {education.period}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-200">
              {education.institution}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
              {education.focus}
            </p>
          </div>
        </div>

        {/* Certifications & Vouchers Card */}
        <div className="p-6 rounded-2xl bg-[#070b14] border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-mono text-slate-100">
              Certifications & Sponsored Vouchers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 hover:border-cyan-900/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-300 px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-800/40">
                    {cert.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {cert.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold font-mono text-slate-200">
                  {cert.name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
