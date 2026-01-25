import { useEffect, useState } from 'react';
import './App.css'
import type { Invoice, LineItem } from './types/invoice'
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { loadInvoice, saveInvoice } from './utils/storage';

const initialItem: LineItem = {
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  unitPrice: 0,
};

function App() {
  const [invoice, setInvoice] = useState<Invoice>(() => {
    const saved = loadInvoice();
    return (
      saved || {
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: "",
        clientName: "",
        clientEmail: "",
        items: [initialItem],
        taxRate: 0,
        notes: "Thank you for your business!"
      }
    )
  });

  useEffect(() => {
    saveInvoice(invoice);
  }, [invoice]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 grid md:grid-cols-2 gap-6">
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
        <InvoicePreview invoice={invoice} />
      </div>
    </>
  )
}

export default App
