import type { LineItem } from "../types/invoice";

export function calculateSubTotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function calculateTax(subTotal: number, taxRate: number): number {
  return subTotal * (taxRate / 100);
}

export function calculateTotal(subTotal: number, tax: number): number {
  return subTotal + tax;
}
