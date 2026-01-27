export type InvoiceTemplate = "modern" | "classic";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  clientCity?: string;
  clientState?: string;
  clientZipCode?: string;
  items: LineItem[];
  taxRate: number;
  notes?: string;
  logo?: string;
  template?: InvoiceTemplate;
  createdAt?: string;

  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyCity?: string;
  companyState?: string;
  companyZipCode?: string;
  companyTaxId?: string;
  companyWebsite?: string;
}
