import { MapPin, Calendar, Mail } from "lucide-react";
import type { Invoice, LineItem } from "../types/invoice";

interface Props {
  invoice: Invoice;
  subtotal: number;
  tax: number;
  total: number;
}

function ModernTemplate({ invoice, subtotal, tax, total }: Props) {
  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with accent bar */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 h-3"></div>

        <div className="p-10">
          {/* Top Section */}
          <div className="flex justify-between items-start mb-10">
            <div>
              {/* {invoice.logo && (
                <img src={invoice.logo} className="h-16 mb-4" alt="Company Logo" />
              )} */}
              <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Invoice
              </h1>
              <p className="text-gray-500 mt-2 font-mono">#{invoice.invoiceNumber || '2024-001'}</p>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Amount Due</p>
                <p className="text-3xl font-bold text-blue-700">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Client and Date Info */}
          <div className="flex justify-between mb-10">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-xs font-bold text-gray-500 uppercase mb-3">Billed To</p>
              <p className="text-xl font-bold text-gray-800 mb-2">{invoice.clientName || 'Client Name'}</p>
              <div className="space-y-1 text-sm text-gray-600">
                {invoice.clientAddress && <div className="flex gap-2">
                  <MapPin className="w-4 h-4" />
                  <p>{invoice.clientAddress}</p>
                </div>}

                {(invoice.clientCity || invoice.clientState || invoice.clientZipCode) && (
                  <p>
                    {invoice.clientCity && `${invoice.clientCity}, `}
                    {invoice.clientState && `${invoice.clientState} `}
                    {invoice.clientZipCode}
                  </p>
                )}
                {invoice.clientEmail && (
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="w-4 h-4" />
                    <span>{invoice.clientEmail}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Issue Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {invoice.issueDate || new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 rounded-lg p-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Due Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {invoice.dueDate || 'Net 30'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="bg-linear-to-r from-gray-800 to-gray-700 text-white rounded-t-lg px-6 py-3 grid grid-cols-12 gap-4 font-semibold text-sm">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            <div className="border border-gray-200 rounded-b-lg overflow-hidden">
              {invoice.items.map((item: LineItem, index: number) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 ${index !== invoice.items.length - 1 ? 'border-b border-gray-200' : ''
                    } hover:bg-blue-50 transition-colors`}
                >
                  <div className="col-span-6">
                    <p className="font-semibold text-gray-800">{item.description || 'Item description'}</p>
                  </div>
                  <div className="col-span-2 text-center text-gray-700">
                    {item.quantity}
                  </div>
                  <div className="col-span-2 text-right text-gray-700">
                    ${item.unitPrice.toFixed(2)}
                  </div>
                  <div className="col-span-2 text-right font-bold text-gray-800">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end">
            <div className="w-80">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({invoice.taxRate}%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t-2 border-gray-300 pt-3">
                <div className="flex justify-between items-center bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-6 py-4">
                  <span className="text-lg font-bold">Total Due</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">From</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-800">{invoice.companyName || 'Company Name'}</p>
                  {invoice.companyAddress && <p>{invoice.companyAddress}</p>}
                  {invoice.companyCity && <p>{invoice.companyCity}, {invoice.companyState} {invoice.companyZipCode}</p>}
                  {invoice.companyEmail && <p>{invoice.companyEmail}</p>}
                  {invoice.companyPhone && <p>{invoice.companyPhone}</p>}
                  {invoice.companyTaxId && <p>Tax ID: {invoice.companyTaxId}</p>}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Payment Instructions</h3>
                <p className="text-sm text-gray-600">
                  Please make payment via bank transfer or check. Include invoice number in payment reference.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Thank you for your business!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate;