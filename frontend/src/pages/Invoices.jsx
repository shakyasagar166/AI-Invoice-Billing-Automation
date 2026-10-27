import React from 'react';
import InvoiceTable from '../components/InvoiceTable';
import InvoiceDetails from '../components/InvoiceDetails';
import { FileText, PlusCircle, Filter } from 'lucide-react';

export default function Invoices({ 
  invoices, 
  selectedInvoice, 
  onSelectInvoice, 
  onApproveInvoice, 
  onPayInvoice, 
  onOpenUploadModal 
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Accounts Payable Invoice War Room</h1>
            <p className="text-xs text-slate-400">
              Autonomous OCR intake, 3-way reconciliation, variance resolution & ERP sync
            </p>
          </div>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload New Bill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left Table (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <InvoiceTable
            invoices={invoices}
            onSelectInvoice={onSelectInvoice}
            onApproveInvoice={onApproveInvoice}
            onPayInvoice={onPayInvoice}
          />
        </div>

        {/* Right Details Panel (5 cols on lg) */}
        <div className="lg:col-span-5 h-[calc(100vh-210px)] min-h-[550px] sticky top-28">
          <InvoiceDetails
            invoice={selectedInvoice}
            onClose={() => onSelectInvoice(null)}
            onApprove={onApproveInvoice}
            onPay={onPayInvoice}
          />
        </div>
      </div>
    </div>
  );
}
