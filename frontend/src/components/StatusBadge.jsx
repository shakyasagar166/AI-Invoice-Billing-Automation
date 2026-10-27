import React from 'react';
import { CheckCircle2, AlertTriangle, Clock, Ban, CheckCheck } from 'lucide-react';

export default function StatusBadge({ status }) {
  switch (status) {
    case 'MATCHED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" /> 3-Way Matched
        </span>
      );
    case 'APPROVED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
          <CheckCheck className="w-3.5 h-3.5" /> Approved
        </span>
      );
    case 'PAID':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-950 text-blue-400 border border-blue-800">
          <CheckCheck className="w-3.5 h-3.5 text-blue-400" /> Settled / Paid
        </span>
      );
    case 'DISCREPANCY':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-950 text-rose-400 border border-rose-800 animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5" /> Discrepancy Flagged
        </span>
      );
    case 'PENDING_EXTRACTION':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-400 border border-amber-800">
          <Clock className="w-3.5 h-3.5" /> Extraction In Progress
        </span>
      );
  }
}
