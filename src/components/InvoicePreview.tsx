import { useRef } from "react";
import type { Invoice } from "../types/invoice";
import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "../utils/calculations";
import { useReactToPrint } from "react-to-print";

interface Props {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: Props) {
  const subtotal = calculateSubTotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const total = calculateTotal(subtotal, tax);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice_${invoice.invoiceNumber}`,
  });

  return (
    <>
      <div ref={printRef} className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>

        <p><strong>Client:</strong> {invoice.clientName}</p>

        <ul className="mt-4 space-y-2">
          {invoice.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.description}</span>
              <span>
                {item.quantity} × {item.unitPrice}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t pt-4">
          <p>Subtotal: {subtotal.toFixed(2)}</p>
          <p>Tax: {tax.toFixed(2)}</p>
          <p className="font-bold">Total: {total.toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="btn mt-4 w-full"
      >
        Download PDF
      </button>

    </>
  );
}
