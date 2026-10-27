import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle, 
  CreditCard,
  AlertCircle
} from 'lucide-react';

export default function InvoiceTable({ 
  invoices, 
  onSelectInvoice, 
  onApproveInvoice, 
  onPayInvoice 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.po_number && inv.po_number.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Table Header Filter Controls */}
      <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by invoice #, vendor name, or PO..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 hidden sm:inline" />
          {['ALL', 'MATCHED', 'DISCREPANCY', 'APPROVED', 'PAID'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4 sm:px-6">Invoice & Vendor</th>
              <th className="py-3 px-4">PO Reference</th>
              <th className="py-3 px-4">Total Due</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Match Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500 text-xs">
                  No invoices found matching criteria.
                </td>
              </tr>
            ) : (
              filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-slate-800/40 transition cursor-pointer"
                  onClick={() => onSelectInvoice(inv)}
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-800 text-emerald-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white hover:text-emerald-400 transition">
                          {inv.invoice_number}
                        </div>
                        <div className="text-xs text-slate-400">{inv.vendor_name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {inv.po_number ? (
                      <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                        {inv.po_number}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 italic">No PO (Direct Bill)</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-black text-white">
                    {formatCurrency(inv.total_amount, inv.currency)}
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {formatDate(inv.due_date)}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            inv.match_score >= 90
                              ? 'bg-emerald-400'
                              : inv.match_score >= 70
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                          }`}
                          style={{ width: `${inv.match_score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-300">
                        {inv.match_score}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={inv.status} />
                  </td>

                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.status === 'MATCHED' && (
                        <button
                          onClick={() => onApproveInvoice(inv.id)}
                          className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/40 transition"
                        >
                          Approve
                        </button>
                      )}
                      {inv.status === 'APPROVED' && (
                        <button
                          onClick={() => onPayInvoice(inv.id)}
                          className="px-2.5 py-1 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 rounded-lg text-xs font-bold border border-cyan-500/40 transition"
                        >
                          Disburse ACH
                        </button>
                      )}
                      <button
                        onClick={() => onSelectInvoice(inv)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
