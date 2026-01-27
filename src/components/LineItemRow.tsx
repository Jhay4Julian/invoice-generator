import { X } from "lucide-react";
import type { LineItem } from "../types/invoice";

interface Props {
    item: LineItem;
    updateItem: (id: string, updates: Partial<LineItem>) => void;
    onRemove: (id: string) => void;
}

const LineItemRow = ({ item, updateItem, onRemove }: Props) => {
    return (
        <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            {/* Description Row */}
            <div className="w-full">
                <input
                    type="text"
                    value={item.description}
                    onChange={e => updateItem(item.id, { description: e.target.value })}
                    placeholder="Description"
                    className="w-full px-2 sm:px-3 py-2 bg-white text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Qty, Price, Amount, Remove Row */}
            <div className="flex gap-2 sm:gap-3 items-center">
                <div className="w-16 sm:w-20 shrink-0">
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
                        className="w-full px-2 py-2 bg-white text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                        step="1"
                    />
                </div>

                <div className="w-20 sm:w-24 shrink-0">
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
                        className="w-full px-2 py-2 bg-white text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="w-20 sm:w-24 px-2 py-2 bg-white rounded-lg border border-gray-200 font-semibold text-gray-700 text-xs sm:text-sm shrink-0">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                </div>
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
        </div>
    );
}

export default LineItemRow;