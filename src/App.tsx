import { useEffect, useState } from 'react';
import './App.css'
import type { Invoice, LineItem } from './types/invoice'
import type { CompanySettings } from './types/company'
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import InvoiceList from './components/InvoiceList';
import CompanySettingsModal from './components/CompanySettingsModal';
import { getAllInvoices, saveInvoice, deleteInvoice } from './utils/storage';
import { getCompanySettingsOrDefaults } from './utils/company';
import { ArrowLeft } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import React from 'react';

type ViewMode = 'list' | 'edit' | 'preview';

const initialItem: LineItem = {
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  unitPrice: 0,
};

const createNewInvoice = (companySettings: CompanySettings): Invoice => ({
  id: crypto.randomUUID(),
  invoiceNumber: `INV-${Date.now()}`,
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: "",
  clientName: "",
  clientEmail: "",
  items: [initialItem],
  taxRate: 0,
  notes: "Thank you for your business!",
  template: "modern",
  createdAt: new Date().toISOString(),
  companyName: companySettings.name,
  companyEmail: companySettings.email,
  companyPhone: companySettings.phone,
  companyAddress: companySettings.address,
  companyCity: companySettings.city,
  companyState: companySettings.state,
  companyZipCode: companySettings.zipCode,
  companyTaxId: companySettings.taxId,
  companyWebsite: companySettings.website,
  logo: companySettings.logo,
});

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(getCompanySettingsOrDefaults());
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(createNewInvoice(companySettings));
  const [error, setError] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);

  // Load invoices on mount
  useEffect(() => {
    try {
      const loaded = getAllInvoices();
      setInvoices(loaded);
      setError("");
    } catch (err) {
      setError("Failed to load invoices");
      console.error(err);
    }
  }, []);

  // Auto-save current invoice when in edit mode
  useEffect(() => {
    if (viewMode === 'edit' && currentInvoice.id) {
      const timer = setTimeout(() => {
        try {
          saveInvoice(currentInvoice);
          setError("");
        } catch (err) {
          setError("Failed to save invoice");
          console.error(err);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentInvoice, viewMode]);

  const handleCreateNew = () => {
    try {
      const newInvoice = createNewInvoice(companySettings);
      setCurrentInvoice(newInvoice);
      setViewMode('edit');
      setError("");
    } catch (err) {
      setError("Failed to create invoice");
      console.error(err);
    }
  };

  const handleSaveInvoice = () => {
    try {
      if (!currentInvoice.clientName.trim()) {
        setError("Please enter a client name");
        return;
      }
      if (currentInvoice.items.length === 0) {
        setError("Please add at least one line item");
        return;
      }

      // Validate line items have descriptions
      const hasEmptyItems = currentInvoice.items.some(
        item => !item.description.trim()
      );
      if (hasEmptyItems) {
        setError("Please fill in all item descriptions");
        return;
      }

      // Validate quantities and prices are positive
      const hasInvalidValues = currentInvoice.items.some(
        item => item.quantity <= 0 || item.unitPrice < 0
      );
      if (hasInvalidValues) {
        setError("Quantities must be greater than 0 and prices cannot be negative");
        return;
      }

      saveInvoice(currentInvoice);
      setInvoices(prev => {
        const exists = prev.find(inv => inv.id === currentInvoice.id);
        if (exists) {
          return prev.map(inv => inv.id === currentInvoice.id ? currentInvoice : inv);
        } else {
          return [...prev, currentInvoice];
        }
      });
      setError("");
      setViewMode('preview');
    } catch (err) {
      setError("Failed to save invoice");
      console.error(err);
    }
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setViewMode('edit');
    setError("");
  };

  const handlePreviewInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setViewMode('preview');
    setError("");
  };

  const handleDeleteInvoice = (id: string) => {
    try {
      deleteInvoice(id);
      setInvoices(prev => prev.filter(inv => inv.id !== id));
      if (currentInvoice.id === id) {
        setViewMode('list');
        setCurrentInvoice(createNewInvoice(companySettings));
      }
      setError("");
    } catch (err) {
      setError("Failed to delete invoice");
      console.error(err);
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setError("");
  };

  const handleUpdateCompanySettings = (settings: CompanySettings) => {
    setCompanySettings(settings);
    setShowSettings(false);
    setError("");
  };
  

  const printRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice_${currentInvoice.invoiceNumber}`,
  });

  return (
    <>
      {error && (
        <div className="fixed top-0 left-0 right-0 bg-red-100 text-red-800 p-3 sm:p-4 z-50 border-b border-red-300">
          <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
            <span className="text-sm sm:text-base flex-1">{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-600 hover:text-red-800 font-semibold cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {viewMode === 'list' ? (
        <InvoiceList
          invoices={invoices}
          onSelect={handlePreviewInvoice}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
          onCreateNew={handleCreateNew}
          onSettings={() => setShowSettings(true)}
        />
      ) : viewMode === 'edit' ? (
        <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 sm:mb-6 flex flex-row gap-3 justify-between items-start sm:items-center">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-semibold border border-gray-300 cursor-pointer text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to List</span>
                <span className="sm:hidden">Back</span>
              </button>
              <button
                onClick={handleSaveInvoice}
                className="w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg cursor-pointer text-sm sm:text-base"
              >
                Save & Preview
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <InvoiceForm invoice={currentInvoice} setInvoice={setCurrentInvoice} />
              <InvoicePreview invoice={currentInvoice} printRef={printRef} />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-semibold border border-gray-300 cursor-pointer text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to List</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>

            <InvoicePreview invoice={currentInvoice} printRef={printRef} />
            <button
              onClick={handlePrint}
              className="mt-4 w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg print:hidden cursor-pointer text-sm sm:text-base"
            >
              Download PDF
            </button>

          </div>
        </div>
      )}

      {showSettings && (
        <CompanySettingsModal
          settings={companySettings}
          onSave={handleUpdateCompanySettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  )
}

export default App
