import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_KEY = 'invoice-api-key-2026';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
});

export const api = {
  checkHealth: async () => {
    const res = await client.get('/health');
    return res.data;
  },

  // Invoices
  getInvoices: async (params = {}) => {
    const res = await client.get('/api/v1/invoices', { params });
    return res.data;
  },

  getInvoice: async (id) => {
    const res = await client.get(`/api/v1/invoices/${id}`);
    return res.data;
  },

  createInvoice: async (payload) => {
    const res = await client.post('/api/v1/invoices', payload);
    return res.data;
  },

  approveInvoice: async (id) => {
    const res = await client.post(`/api/v1/invoices/${id}/approve`);
    return res.data;
  },

  payInvoice: async (id) => {
    const res = await client.post(`/api/v1/invoices/${id}/pay`);
    return res.data;
  },

  extractDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await client.post('/api/v1/invoices/extract-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  // Purchase Orders
  getPurchaseOrders: async () => {
    const res = await client.get('/api/v1/purchase-orders');
    return res.data;
  },

  createPurchaseOrder: async (payload) => {
    const res = await client.post('/api/v1/purchase-orders', payload);
    return res.data;
  },

  // Vendors
  getVendors: async () => {
    const res = await client.get('/api/v1/vendors');
    return res.data;
  },

  createVendor: async (payload) => {
    const res = await client.post('/api/v1/vendors', payload);
    return res.data;
  },

  // Reconciliation
  reconcileInvoice: async (invoiceId) => {
    const res = await client.post(`/api/v1/matching/reconcile/${invoiceId}`);
    return res.data;
  },

  // Analytics
  getAnalytics: async () => {
    const res = await client.get('/api/v1/analytics/dashboard');
    return res.data;
  },
};

export default api;
