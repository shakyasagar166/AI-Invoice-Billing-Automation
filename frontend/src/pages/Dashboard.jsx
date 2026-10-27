import React from 'react';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import InvoiceTable from '../components/InvoiceTable';
import { 
  FileText, 
  CreditCard, 
  PlusCircle, 
  ArrowRight, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  Zap, 
  ShieldAlert,
  Sparkles 
} from 'lucide-react';

export default function Dashboard({
  stats,
  invoices,
  onNavigate,
  onSelectInvoice,
  onApproveInvoice,
  onPayInvoice,
  onOpenUploadModal,
}) {
  const discrepancies = invoices.filter((i) => i.status === 'DISCREPANCY');

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Autonomous Accounts Payable Live
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Financial Billing & 3-Way Reconciliation Hub
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time OCR extraction, straight-through approval pipelines, duplicate fraud defense, and cash discount optimization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Invoice</span>
          </button>
          <button
            onClick={() => onNavigate('invoices')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>View AP Queue</span>
          </button>
        </div>
      </div>

      {/* PROMINENT HIGH-VISIBILITY TRAINING SECTION (NOIDA & DELHI) */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-cyan-950 border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-64 h-64 text-emerald-300" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Award className="w-4 h-4 text-slate-950" /> INDUSTRY RECOGNIZED QA PROGRAMS
            </span>
            <span className="text-xs text-emerald-300 font-semibold">100% Placement Support & Live SDET Automation Projects</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Master Test Automation, Financial APIs & Continuous QA Engineering
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-3xl leading-relaxed">
            Gain mastery in end-to-end automated testing, API validation, Selenium/Cypress frameworks, and performance reliability with industry-grade classroom & online programs:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-3xl">
            {/* Card 1: Noida */}
            <a
              href="https://uncodemy.com/course/automation-testing-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 transition transform hover:-translate-y-1 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Noida Center</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                  Automation Testing Course in Noida
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Hands-on Selenium, Playwright, API Testing with Postman & RestAssured, Docker, and CI/CD pipelines.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-black text-emerald-400">
                <span>Explore Noida Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Card 2: Delhi */}
            <a
              href="https://uncodemy.com/course/automation-testing-course-in-Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-950/80 hover:bg-slate-950 border border-cyan-500/40 hover:border-cyan-400 transition transform hover:-translate-y-1 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Delhi Center</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                  Automation Testing Course in Delhi
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Comprehensive SDET career path, live enterprise test suites, frameworks architecture, and interview prep.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-black text-cyan-400">
                <span>Explore Delhi Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <AnalyticsDashboard stats={stats} />

      {/* Exception Discrepancy Alert Banner */}
      {discrepancies.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {discrepancies.length} Invoices In Exception Review Queue
              </h4>
              <p className="text-xs text-slate-400">
                Price or quantity variance detected exceeding 2.0% tolerance against original Purchase Orders.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('invoices')}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition whitespace-nowrap"
          >
            Resolve Exceptions
          </button>
        </div>
      )}

      {/* Main Invoice Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white">Active Financial Invoices</h3>
            <p className="text-xs text-slate-400">Real-time status across multi-stage reconciliation pipelines</p>
          </div>
          <button
            onClick={() => onNavigate('invoices')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Full Invoice Repository</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <InvoiceTable
          invoices={invoices}
          onSelectInvoice={onSelectInvoice}
          onApproveInvoice={onApproveInvoice}
          onPayInvoice={onPayInvoice}
        />
      </div>
    </div>
  );
}
