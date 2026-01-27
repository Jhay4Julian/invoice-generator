import { useRef } from "react";
import type { Invoice } from "../types/invoice";
import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "../utils/calculations";
import { useReactToPrint } from "react-to-print";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";

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
        {invoice.template === "classic" ? (
          <ClassicTemplate
            invoice={invoice}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        ) : (
          <ModernTemplate
            invoice={invoice}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        )}
      </div>

      <button
        onClick={handlePrint}
        className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg print:hidden cursor-pointer"
      >
        Download PDF
      </button>

    </>
  );
}
