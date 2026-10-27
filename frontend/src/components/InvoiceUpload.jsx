import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';

export default function InvoiceUpload({ onUploadComplete, onClose }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // Form states
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const loadSample = (type) => {
    if (type === 'matched') {
      setInvoiceNumber('INV-2026-8801');
      setVendorName('CloudScale Networks Inc.');
      setPoNumber('PO-89401');
      setTotalAmount('2592.00');
    } else if (type === 'discrepancy') {
      setInvoiceNumber('INV-2026-8802');
      setVendorName('Apex Office & Tech Supplies');
      setPoNumber('PO-89402');
      setTotalAmount('1620.00'); // PO was 1450.00 -> variance
    } else {
      setInvoiceNumber('INV-2026-8803');
      setVendorName('Global Logistics & Freight Corp');
      setPoNumber('PO-89403');
      setTotalAmount('4200.00');
    }
  };

  const handleSimulatedUpload = async (e) => {
    e.preventDefault();
    if (!invoiceNumber || !vendorName || !totalAmount) return;

    setIsProcessing(true);
    // Simulate OCR entity extraction latency
    setTimeout(async () => {
      await onUploadComplete({
        invoice_number: invoiceNumber,
        vendor_name: vendorName,
        po_number: poNumber || null,
        total_amount: parseFloat(totalAmount),
        currency: 'USD',
      });
      setIsProcessing(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">AI Invoice Intake & OCR Studio</h2>
              <p className="text-xs text-slate-400">
                Upload scanned PDF, TIFF or raw invoice for automated 3-way matching
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Pre-fill Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Quick Samples:
          </span>
          <button
            type="button"
            onClick={() => loadSample('matched')}
            className="px-2.5 py-1 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 text-xs font-bold rounded-lg border border-emerald-800 transition"
          >
            Matched Cloud Invoice ($2,592)
          </button>
          <button
            type="button"
            onClick={() => loadSample('discrepancy')}
            className="px-2.5 py-1 bg-rose-950 text-rose-400 hover:bg-rose-900 text-xs font-bold rounded-lg border border-rose-800 transition"
          >
            Variance Discrepancy ($1,620)
          </button>
        </div>

        <form onSubmit={handleSimulatedUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Invoice Number *
              </label>
              <input
                type="text"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="e.g. INV-2026-9901"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Vendor Name *
              </label>
              <input
                type="text"
                required
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="e.g. CloudScale Networks Inc."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Purchase Order #
              </label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="e.g. PO-89401"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Total Billed Amount (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="e.g. 2592.00"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Autonomous OCR Parsing...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Parse & Reconcile Bill</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
