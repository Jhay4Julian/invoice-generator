import { Building2, Calendar, FileText, Plus, Upload } from "lucide-react";
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

    const removeItem = (id: string) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id),
        }));
    }

    const handleLogoUpload = (file: File) => {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onerror = () => {
            alert("Failed to read file. Please try again.");
        };
        reader.onloadend = () => {
            if (reader.result) {
                setInvoice(prev => ({
                    ...prev,
                    logo: reader.result as string,
                }));
            }
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Invoice Details</h2>

            <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <FileText className="w-4 h-4" />
                    Invoice Template
                </label>
                <select
                    className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={invoice.template}
                    onChange={(e) =>
                        setInvoice({ ...invoice, template: e.target.value as "modern" | "classic" })
                    }
                >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                </select>
            </div>

            {/* Logo Upload */}
            <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Building2 className="w-4 h-4" />
                    Business Logo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    <label className="flex-1 w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600 text-center">
                            {invoice.logo ? 'Change logo' : 'Upload your logo'}
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    handleLogoUpload(e.target.files[0]);
                                }
                            }}
                            className="hidden"
                        />
                    </label>
                    {invoice.logo && (
                        <div className="w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                            <img src={invoice.logo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                    )}
                </div>
            </div>

            {/* Client Name */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Client Name *
                </label>
                <input
                    type="text"
                    value={invoice.clientName}
                    onChange={e => setInvoice({ ...invoice, clientName: e.target.value })}
                    placeholder="Enter client name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            {/* Client Email */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Client Email
                </label>
                <input
                    type="email"
                    value={invoice.clientEmail || ""}
                    onChange={e => setInvoice({ ...invoice, clientEmail: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Client Address */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Client Address
                </label>
                <input
                    type="text"
                    value={invoice.clientAddress || ""}
                    onChange={e => setInvoice({ ...invoice, clientAddress: e.target.value })}
                    placeholder="Street Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <input
                        type="text"
                        value={invoice.clientCity || ""}
                        onChange={e => setInvoice({ ...invoice, clientCity: e.target.value })}
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        value={invoice.clientState || ""}
                        onChange={e => setInvoice({ ...invoice, clientState: e.target.value })}
                        placeholder="State"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        value={invoice.clientZipCode || ""}
                        onChange={e => setInvoice({ ...invoice, clientZipCode: e.target.value })}
                        placeholder="ZIP Code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Calendar className="w-4 h-4" />
                        Issue Date
                    </label>
                    <input
                        type="date"
                        value={invoice.issueDate}
                        onChange={(e) => setInvoice({ ...invoice, issueDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <Calendar className="w-4 h-4" />
                        Payment Terms
                    </label>
                    <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) =>
                            setInvoice({
                                ...invoice,
                                dueDate: calculateDueDate(invoice.issueDate, Number(e.target.value)),
                            })
                        }
                    >
                        <option value="7">Net 7 days</option>
                        <option value="14">Net 14 days</option>
                        <option value="30">Net 30 days</option>
                        <option value="60">Net 60 days</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                {invoice.items.map(item => (
                    <LineItemRow
                        key={item.id}
                        item={item}
                        updateItem={updateItem}
                        onRemove={removeItem}
                    />
                ))}
            </div>

            <button onClick={addItem} className="mt-4 mb-5 flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg cursor-pointer">
                <Plus className="w-5 h-5" />
                Add Item
            </button>

            <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    Tax (%)
                </label>
                <input
                    type="number"
                    value={invoice.taxRate}
                    onChange={e => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= 100) {
                            setInvoice({ ...invoice, taxRate: value });
                        }
                    }}
                    className="w-full sm:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="0.1"
                />
            </div>

            {/* Notes */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Notes
                </label>
                <textarea
                    value={invoice.notes || ""}
                    onChange={e => setInvoice({ ...invoice, notes: e.target.value })}
                    placeholder="Thank you for your business!"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
            </div>
        </div>
    );
}

export default InvoiceForm;