import { FileText, Trash2, Eye, Edit2, Plus, Settings } from "lucide-react";
import type { Invoice } from "../types/invoice";
import { calculateTotal, calculateSubTotal, calculateTax } from "../utils/calculations";

interface Props {
  invoices: Invoice[];
  onSelect: (invoice: Invoice) => void;
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
  onSettings: () => void;
}

export default function InvoiceList({
  invoices,
  onSelect,
  onEdit,
  onDelete,
  onCreateNew,
  onSettings,
}: Props) {
  if (invoices.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Invoices</h1>

          <div className="bg-white rounded-xl shadow p-6 sm:p-12 text-center">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No invoices yet
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              Create your first invoice to get started
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onCreateNew}
                className="inline-flex items-center justify-center gap-2 px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Invoice
              </button>
              <button
                onClick={onSettings}
                className="inline-flex items-center justify-center gap-2 px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm sm:text-base"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                Company Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Invoices</h1>
          <div className="flex flex-row justify-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onSettings}
              className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-md font-semibold cursor-pointer text-sm sm:text-base"
              title="Company settings"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sm:inline">Settings</span>
            </button>
            <button
              onClick={onCreateNew}
              className="flex items-center justify-center gap-2 px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-semibold cursor-pointer text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>New</span>
              <span className="hidden sm:inline">Invoice</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {invoices.map((invoice) => {
            const subtotal = calculateSubTotal(invoice.items);
            const tax = calculateTax(subtotal, invoice.taxRate);
            const total = calculateTotal(subtotal, tax);

            return (
              <div
                key={invoice.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                        {invoice.clientName || "Unnamed Client"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-mono">
                        #{invoice.invoiceNumber}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 space-y-1 text-xs sm:text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Due:</span>{" "}
                      {invoice.dueDate || "Not set"}
                    </p>
                    <p>
                      <span className="font-semibold">Items:</span>{" "}
                      {invoice.items.length}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-4">
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Total Amount
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">
                      ${total.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={() => onSelect(invoice)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold text-xs sm:text-sm cursor-pointer"
                      title="View invoice"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">View</span>
                    </button>
                    <button
                      onClick={() => onEdit(invoice)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-xs sm:text-sm cursor-pointer"
                      title="Edit invoice"
                    >
                      <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this invoice?"
                          )
                        ) {
                          onDelete(invoice.id);
                        }
                      }}
                      className="flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold text-xs sm:text-sm cursor-pointer"
                      title="Delete invoice"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
