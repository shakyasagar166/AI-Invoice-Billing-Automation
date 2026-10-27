import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  DollarSign, 
  CheckCircle2, 
  Save, 
  ExternalLink, 
  GraduationCap,
  ShieldCheck 
} from 'lucide-react';

export default function Settings() {
  const [stpLimit, setStpLimit] = useState('1500');
  const [tolerance, setTolerance] = useState('2.0');
  const [erpSystem, setErpSystem] = useState('SAP S/4HANA');
  const [ocrEngine, setOcrEngine] = useState('Gemini 1.5 Pro Document AI');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AP Automation & Reconciliation Policies</h1>
            <p className="text-xs text-slate-400">
              Configure Straight-Through Processing thresholds, OCR intelligence, and ERP ledger sync
            </p>
          </div>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Policy Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* STP & Variance Controls */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Autonomous Approval & Variance Thresholds</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Straight-Through Processing (STP) Auto-Approve Limit ($)
              </label>
              <input
                type="number"
                value={stpLimit}
                onChange={(e) => setStpLimit(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Bills with 100% 3-way match below this amount bypass manual human approval.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Allowed PO Price Variance (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={tolerance}
                onChange={(e) => setTolerance(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tolerance margin before automatically routing invoice to the Buyer Exception Queue.
              </p>
            </div>
          </div>
        </div>

        {/* AI OCR & ERP Connectors */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Document AI & Enterprise ERP Connectors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Primary Document OCR Model
              </label>
              <select
                value={ocrEngine}
                onChange={(e) => setOcrEngine(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option>Gemini 1.5 Pro Document AI</option>
                <option>AWS Textract Tables & Queries</option>
                <option>Azure Form Recognizer Invoice Model</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Target General Ledger (ERP)
              </label>
              <select
                value={erpSystem}
                onChange={(e) => setErpSystem(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option>SAP S/4HANA Finance</option>
                <option>Oracle NetSuite ERP</option>
                <option>Workday Financial Management</option>
                <option>Intuit QuickBooks Online Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

      {/* Course Callout Banner in Settings */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <span>Professional Test Automation & Reliability Engineering Training</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Building and testing complex financial automation engines requires advanced QA frameworks, continuous integration, and synthetic testing. Explore specialized curriculum:
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="https://uncodemy.com/course/automation-testing-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 flex items-center gap-1.5"
          >
            <span>Automation Testing in Noida</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-slate-600">&bull;</span>
          <a
            href="https://uncodemy.com/course/automation-testing-course-in-Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5"
          >
            <span>Automation Testing in Delhi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
