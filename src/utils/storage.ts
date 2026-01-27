import type { Invoice } from "../types/invoice";

const INVOICES_KEY = "invoices:list";

export function saveInvoice(invoice: Invoice): void {
  try {
    const key = `invoice:${invoice.id}`;
    localStorage.setItem(key, JSON.stringify(invoice));
    
    // Update invoice list
    const list = getInvoicesList();
    if (!list.includes(invoice.id)) {
      list.push(invoice.id);
      localStorage.setItem(INVOICES_KEY, JSON.stringify(list));
    }
  } catch (error) {
    console.error("Failed to save invoice:", error);
    throw new Error("Failed to save invoice");
  }
}

export function loadInvoice(id: string): Invoice | null {
  try {
    const key = `invoice:${id}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to load invoice:", error);
    return null;
  }
}

export function getAllInvoices(): Invoice[] {
  try {
    const list = getInvoicesList();
    return list
      .map(id => loadInvoice(id))
      .filter((invoice): invoice is Invoice => invoice !== null);
  } catch (error) {
    console.error("Failed to load invoices:", error);
    return [];
  }
}

export function deleteInvoice(id: string): void {
  try {
    const key = `invoice:${id}`;
    localStorage.removeItem(key);
    
    // Update invoice list
    const list = getInvoicesList();
    const updated = list.filter(invoiceId => invoiceId !== id);
    localStorage.setItem(INVOICES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    throw new Error("Failed to delete invoice");
  }
}

function getInvoicesList(): string[] {
  try {
    const raw = localStorage.getItem(INVOICES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to get invoices list:", error);
    return [];
  }
}
