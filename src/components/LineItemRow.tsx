import { X } from "lucide-react";
import type { LineItem } from "../types/invoice";

interface Props {
    item: LineItem;
    updateItem: (id: string, updates: Partial<LineItem>) => void;
    onRemove: (id: string) => void;
}

const LineItemRow = ({ item, updateItem, onRemove }: Props) => {
    return (
        <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex-2">
                <input
                    type="text"
                    value={item.description}
                    onChange={e => updateItem(item.id, { description: e.target.value })}
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="w-15">
                <input
                    type="number"
                    value={item.quantity}
                    onChange={e => {
                        const value = Number(e.target.value);
                        if (value >= 0) {
                            updateItem(item.id, { quantity: value });
                        }
                    }}
                    placeholder="Qty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    step="1"
                />
            </div>

            <div className="w-20">
                <input
                    type="number"
                    value={item.unitPrice}
                    onChange={e => {
                        const value = Number(e.target.value);
                        if (value >= 0) {
                            updateItem(item.id, { unitPrice: value });
                        }
                    }}
                    placeholder="Unit Price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="w-20 px-3 py-2 bg-white rounded-lg border border-gray-200 font-semibold text-gray-700">
                {(item.quantity * item.unitPrice)}
            </div>
            <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}

export default LineItemRow;