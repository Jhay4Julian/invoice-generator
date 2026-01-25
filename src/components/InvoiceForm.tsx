import type { Invoice, LineItem } from "../types/invoice";
import { calculateDueDate } from "../utils/dates";
import LineItemRow from "./LineItemRow";

interface Props {
    invoice: Invoice;
    setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}

const InvoiceForm = ({ invoice, setInvoice }: Props) => {
    const updateItem = (id: string, updates: Partial<LineItem>) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, ...updates } : item
            ),
        }));
    };

    const addItem = () => {
        setInvoice(prev => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    id: crypto.randomUUID(),
                    description: "",
                    quantity: 1,
                    unitPrice: 0,
                },
            ],
        }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>

            <input
                type="text"
                value={invoice.clientName}
                onChange={e => setInvoice({ ...invoice, clientName: e.target.value })}
                placeholder="Client Name"
                className="input"
            />

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Issue Date</label>
                    <input
                        type="date"
                        value={invoice.issueDate}
                        onChange={(e) =>
                            setInvoice({ ...invoice, issueDate: e.target.value })
                        }
                        className="input"
                    />
                </div>

                <div>
                    <label className="label">Payment Terms</label>
                    <select
                        className="input"
                        onChange={(e) =>
                            setInvoice({
                                ...invoice,
                                dueDate: calculateDueDate(
                                    invoice.issueDate,
                                    Number(e.target.value)
                                ),
                            })
                        }
                    >
                        <option value="7">Net 7</option>
                        <option value="14">Net 14</option>
                        <option value="30">Net 30</option>
                    </select>
                </div>
            </div>


            <div className="mt-4 space-y-2">
                {invoice.items.map(item => (
                    <LineItemRow
                        key={item.id}
                        item={item}
                        updateItem={updateItem}
                    />
                ))}
            </div>

            <button onClick={addItem} className="mt-4 btn">
                + Add Item
            </button>

            <div className="mt-4">
                <label>Tax (%)</label>
                <input
                    type="number"
                    value={invoice.taxRate}
                    onChange={(e) =>
                        setInvoice({ ...invoice, taxRate: Number(e.target.value) })
                    }
                    className="input"
                />
            </div>
        </div>
    );
}

export default InvoiceForm;