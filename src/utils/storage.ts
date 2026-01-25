import type { Invoice } from "../types/invoice";

const KEY = "invoice-data";

export function saveInvoice(invoice: Invoice) {
  localStorage.setItem(KEY, JSON.stringify(invoice));
}

export function loadInvoice(): Invoice | null {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}
