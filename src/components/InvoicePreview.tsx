import type { Invoice } from "../types/invoice";
import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "../utils/calculations";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";

interface Props {
  invoice: Invoice;
  printRef: React.RefObject<HTMLDivElement | null>;
}

export default function InvoicePreview({ invoice, printRef }: Props) {
  const subtotal = calculateSubTotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const total = calculateTotal(subtotal, tax);

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
    </>
  );
}
