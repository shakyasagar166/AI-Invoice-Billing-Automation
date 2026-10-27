import React from 'react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  FileText, 
  X, 
  CheckCircle2, 
  CreditCard, 
  AlertTriangle, 
  ShieldCheck, 
  Building2, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function InvoiceDetails({ 
  invoice, 
  onClose, 
  onApprove, 
  onPay 
}) {
  if (!invoice) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-3xl">
        <FileText className="w-12 h-12 mb-3 opacity-30 text-emerald-400" />
        <h3 className="font-bold text-white text-base">Select an Invoice to Inspect</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Click on any invoice in the list to review multi-agent 3-way reconciliation, line item extractions, and audit logs.
        </p>
      </div>
    );
  }

  let anomalyList = [];
  try {
    anomalyList = JSON.parse(invoice.anomaly_flags || '[]');
  } catch (e) {
    anomalyList = [];
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col h-full overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StatusBadge status={invoice.status} />
            <span className="text-[11px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              ID: {invoice.id}
            </span>
          </div>
          <h2 className="text-xl font-black text-white">{invoice.invoice_number}</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" /> {invoice.vendor_name}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* SRE & AI Reconciled Summary Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Autonomous Multi-Agent Audit Summary</span>
          </div>
          <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
            {invoice.match_score}% Match
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {invoice.ai_summary || "Autonomous document intelligence parsing complete. Reconciled with Purchase Order master ledger."}
        </p>

        {anomalyList.length > 0 && (
          <div className="mt-2 p-3 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-1">
            <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Discrepancies & Anomaly Flags:
            </div>
            {anomalyList.map((anom, idx) => (
              <div key={idx} className="text-xs text-rose-300 font-mono">
                &bull; {anom}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Financial Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500">Subtotal</span>
          <div className="font-bold text-sm text-slate-200 mt-0.5">
            {formatCurrency(invoice.subtotal, invoice.currency)}
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500">Tax Amount</span>
          <div className="font-bold text-sm text-slate-200 mt-0.5">
            {formatCurrency(invoice.tax_amount, invoice.currency)}
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500">Total Payable</span>
          <div className="font-black text-sm text-emerald-400 mt-0.5">
            {formatCurrency(invoice.total_amount, invoice.currency)}
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500">Payment Due</span>
          <div className="font-bold text-xs text-slate-300 mt-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {formatDate(invoice.due_date)}
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Extracted Line Items ({invoice.items?.length || 0})
        </h4>

        {invoice.items && invoice.items.length > 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Unit Rate</th>
                  <th className="py-2.5 px-3 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {invoice.items.map((it) => (
                  <tr key={it.id || it.line_number} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 text-slate-200">{it.description}</td>
                    <td className="py-2.5 px-3 text-slate-400">{it.quantity}</td>
                    <td className="py-2.5 px-3 text-slate-400">{formatCurrency(it.unit_price, invoice.currency)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-white">
                      {formatCurrency(it.total_price, invoice.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
            No itemized rows available. Direct GL journal voucher bill.
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 mt-auto">
        <div className="text-xs text-slate-500">
          Extraction Confidence: <strong className="text-slate-300">{invoice.extraction_confidence}%</strong>
        </div>

        <div className="flex items-center gap-2">
          {invoice.status !== 'APPROVED' && invoice.status !== 'PAID' && (
            <button
              onClick={() => onApprove(invoice.id)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Bill</span>
            </button>
          )}

          {invoice.status === 'APPROVED' && (
            <button
              onClick={() => onPay(invoice.id)}
              className="flex items-center gap-1.5 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-cyan-400/20 transition transform hover:-translate-y-0.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Execute ACH Payment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
