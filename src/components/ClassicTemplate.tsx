import type { Invoice, LineItem } from "../types/invoice";

interface Props {
  invoice: Invoice;
  subtotal: number;
  tax: number;
  total: number;
}

function ClassicTemplate({ invoice, subtotal, tax, total }: Props) {
  return (
    <div className="bg-white p-4 sm:p-8 md:p-12 max-w-4xl mx-auto text-xs sm:text-sm md:text-base">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-gray-800">
        <div>
          {invoice.logo && (
            <img src={invoice.logo} className="h-12 sm:h-16 md:h-20 mb-2 sm:mb-3" alt="Company Logo" />
          )}
          <div className="text-gray-600 text-xs sm:text-sm">
            <p className="font-semibold text-sm sm:text-base">{invoice.companyName || 'Your Company Name'}</p>
            {invoice.companyAddress && <p>{invoice.companyAddress}</p>}
            {invoice.companyCity && <p>{invoice.companyCity}, {invoice.companyState} {invoice.companyZipCode}</p>}
            {invoice.companyPhone && <p>{invoice.companyPhone}</p>}
            {invoice.companyEmail && <p>{invoice.companyEmail}</p>}
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">INVOICE</h1>
          <p className="text-gray-600 text-xs sm:text-sm">#{invoice.invoiceNumber || '001'}</p>
        </div>
      </div>

      {/* Client and Date Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Bill To</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800">{invoice.clientName || 'Client Name'}</p>
          {invoice.clientAddress && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{invoice.clientAddress}</p>
          )}
          {(invoice.clientCity || invoice.clientState || invoice.clientZipCode) && (
            <p className="text-xs sm:text-sm text-gray-600">
              {invoice.clientCity && `${invoice.clientCity}, `}
              {invoice.clientState && `${invoice.clientState} `}
              {invoice.clientZipCode}
            </p>
          )}
          {invoice.clientEmail && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{invoice.clientEmail}</p>
          )}
        </div>
        <div className="text-right">
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Issue Date</p>
            <p className="text-xs sm:text-sm text-gray-800">{invoice.issueDate || new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Due Date</p>
            <p className="text-xs sm:text-sm text-gray-800">{invoice.dueDate || 'Net 30'}</p>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <table className="w-full mb-6 sm:mb-8">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm">Description</th>
            <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm w-16 sm:w-24">Qty</th>
            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm w-20 sm:w-32">Unit Price</th>
            <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm w-20 sm:w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item: LineItem, index: number) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 sm:py-3 px-2 sm:px-4 border-b border-gray-200">
                <p className="font-medium text-gray-800 text-xs sm:text-sm">{item.description || 'Item description'}</p>
              </td>
              <td className="text-center py-2 sm:py-3 px-2 sm:px-4 border-b border-gray-200 text-gray-700 text-xs sm:text-sm">
                {item.quantity}
              </td>
              <td className="text-right py-2 sm:py-3 px-2 sm:px-4 border-b border-gray-200 text-gray-700 text-xs sm:text-sm">
                ${item.unitPrice.toFixed(2)}
              </td>
              <td className="text-right py-2 sm:py-3 px-2 sm:px-4 border-b border-gray-200 font-semibold text-gray-800 text-xs sm:text-sm">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-6 sm:mb-8">
        <div className="w-48 sm:w-80">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600 text-xs sm:text-sm">Subtotal</span>
            <span className="font-semibold text-gray-800 text-xs sm:text-sm">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600 text-xs sm:text-sm">Tax ({invoice.taxRate}%)</span>
            <span className="font-semibold text-gray-800 text-xs sm:text-sm">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3 bg-gray-800 text-white px-4 mt-2">
            <span className="font-bold text-sm sm:text-lg">Total Due</span>
            <span className="font-bold text-sm sm:text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-600">
        <p className="mb-2">Thank you for your business!</p>
        <p>Please make payment within the specified due date.</p>
      </div>
    </div>
  );
}

export default ClassicTemplate;