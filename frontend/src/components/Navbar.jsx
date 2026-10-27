import React from 'react';
import { 
  FileText, 
  CheckSquare, 
  Building2, 
  BarChart3, 
  Settings as SettingsIcon, 
  ExternalLink, 
  GraduationCap, 
  CreditCard,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, discrepancyCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Command Hub', icon: BarChart3 },
    { id: 'invoices', label: 'Invoices & AP Queue', icon: FileText, badge: discrepancyCount },
    { id: 'pos', label: 'Purchase Orders', icon: CheckSquare },
    { id: 'vendors', label: 'Vendor Directory', icon: Building2 },
    { id: 'analytics', label: 'Spend & STP Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-2xl">
      {/* Prominent High-Visibility QA Certification Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 px-4 py-2.5 text-xs md:text-sm text-slate-200 border-b border-emerald-600/30 flex flex-wrap items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-bold tracking-wide flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-400 inline" /> FEATURED QA & TEST AUTOMATION CERTIFICATIONS:
          </span>
          <span className="hidden lg:inline text-slate-300">Fast-track your SDET & automated financial testing career:</span>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://uncodemy.com/course/automation-testing-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-md shadow transition transform hover:-translate-y-0.5"
            title="Uncodemy Automation Testing Course in Noida"
          >
            <span>Automation Testing in Noida</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://uncodemy.com/course/automation-testing-course-in-Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black rounded-md shadow transition transform hover:-translate-y-0.5"
            title="Uncodemy Automation Testing Course in Delhi"
          >
            <span>Automation Testing in Delhi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/20">
              <CreditCard className="w-6 h-6 text-slate-950 font-black" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-300 bg-clip-text text-transparent">
                PayMatrix<span className="text-emerald-400">.AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full">
                Autonomous AP Engine
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>3-Way Auto-Match: <strong className="text-emerald-400 font-bold">Active</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
