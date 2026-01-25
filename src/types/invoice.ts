export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface Invoice {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    clientName: string;
    clientEmail?: string;
    items: LineItem[];
    taxRate: number;
    notes?: string;
}