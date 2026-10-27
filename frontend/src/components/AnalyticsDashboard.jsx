import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { 
  DollarSign, 
  FileCheck2, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  Building2, 
  Clock,
  ShieldCheck 
} from 'lucide-react';

export default function AnalyticsDashboard({ stats }) {
  const metrics = [
    {
      label: 'Total Processed Spend',
      value: formatCurrency(stats?.total_spend_usd || 10162.00),
      subtext: 'Across all active vendors',
      icon: DollarSign,
      color: 'emerald',
    },
    {
      label: 'Straight-Through Processing',
      value: `${stats?.stp_automation_rate || 85.0}%`,
      subtext: 'Zero-touch automated approvals',
      icon: Zap,
      color: 'teal',
    },
    {
      label: '3-Way Match Average',
      value: `${stats?.average_match_score || 96.2}%`,
      subtext: 'PO & GRN correlation score',
      icon: ShieldCheck,
      color: 'cyan',
    },
    {
      label: 'Discrepancy Exception Queue',
      value: stats?.discrepancy_count || 1,
      subtext: 'Requires buyer variance review',
      icon: AlertTriangle,
      color: 'rose',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl relative overflow-hidden group hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {m.label}
              </span>
              <div className="p-2.5 rounded-2xl bg-slate-800 text-emerald-400 group-hover:scale-110 transition">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="text-2xl font-black text-white tracking-tight">
              {m.value}
            </div>

            <p className="text-xs text-slate-500 mt-1">
              {m.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
