import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CheckSquare, PlusCircle, Search, Building2, Package } from 'lucide-react';

export default function PurchaseOrders({ purchaseOrders, onCreatePO }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [poNumber, setPoNumber] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const filtered = purchaseOrders.filter((po) =>
    po.po_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.vendor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!poNumber || !vendorName || !totalAmount) return;
    await onCreatePO({
      po_number: poNumber,
      vendor_id: 'ven_custom',
      vendor_name: vendorName,
      total_amount: parseFloat(totalAmount),
      currency: 'USD',
      status: 'OPEN',
      items_json: JSON.stringify([{ description: 'General Services & Hardware', qty: 1, unit_price: parseFloat(totalAmount), total: parseFloat(totalAmount) }])
    });
    setPoNumber('');
    setVendorName('');
    setTotalAmount('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-600/20 text-cyan-400 rounded-2xl">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Purchase Orders & Commitments</h1>
            <p className="text-xs text-slate-400">
              Contractual baseline for automated 2-way and 3-way line item reconciliation
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Purchase Order</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search purchase orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-6">PO Number</th>
                <th className="py-3 px-6">Vendor</th>
                <th className="py-3 px-6">Committed Total</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date Issued</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filtered.map((po) => (
                <tr key={po.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-6 font-mono font-bold text-cyan-400">
                    {po.po_number}
                  </td>
                  <td className="py-4 px-6 text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span>{po.vendor_name}</span>
                  </td>
                  <td className="py-4 px-6 font-black text-white">
                    {formatCurrency(po.total_amount, po.currency)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {po.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {formatDate(po.created_at || po.issue_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-white">Register New Purchase Order</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">PO Number</label>
                <input
                  type="text"
                  required
                  placeholder="PO-99101"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Vendor Name</label>
                <input
                  type="text"
                  required
                  placeholder="CloudScale Networks Inc."
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Total Authorized Amount (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="2500.00"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
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
                  className="px-4 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-black shadow-md"
                >
                  Create PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
