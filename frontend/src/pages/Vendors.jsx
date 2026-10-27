import React, { useState } from 'react';
import { Building2, ShieldCheck, Mail, Phone, PlusCircle, Search } from 'lucide-react';

export default function Vendors({ vendors, onCreateVendor }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [email, setEmail] = useState('');
  const [terms, setTerms] = useState(30);

  const filtered = vendors.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.tax_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !taxId || !email) return;
    await onCreateVendor({
      name,
      tax_id: taxId,
      email,
      payment_terms_days: parseInt(terms, 10),
      risk_score: 2.0,
      is_verified: true,
    });
    setName('');
    setTaxId('');
    setEmail('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-600/20 text-teal-400 rounded-2xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Verified Supplier & Vendor Master Directory</h1>
            <p className="text-xs text-slate-400">
              Tax ID compliance, banking remittance safeguards, and payment term profiles
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-teal-500/20 transition transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Onboard Vendor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((v) => (
          <div
            key={v.id}
            className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-base text-white">{v.name}</h3>
                <span className="font-mono text-xs text-slate-500">{v.tax_id}</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{v.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Terms:</span>
                <strong className="text-slate-200">Net {v.payment_terms_days} Days</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Forensic Risk Score:</span>
                <strong className="text-emerald-400">{v.risk_score} (Minimal)</strong>
              </div>
              {v.bank_account && (
                <div className="flex items-center justify-between">
                  <span>ACH Account:</span>
                  <span className="font-mono text-slate-300">{v.bank_account}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-white">Onboard Verified Vendor</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Company / Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="Acme Hardware Corp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Tax ID / EIN / GSTIN</label>
                <input
                  type="text"
                  required
                  placeholder="US-EIN-77889900"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Accounts Receivable Email</label>
                <input
                  type="email"
                  required
                  placeholder="billing@acme.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-400 text-slate-950 text-xs font-black shadow-md"
                >
                  Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
