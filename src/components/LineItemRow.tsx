import type { LineItem } from "../types/invoice";

interface Props {
    item: LineItem;
    updateItem: (id: string, updates: Partial<LineItem>) => void;
}

const LineItemRow = ({ item, updateItem }: Props) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            <input
                type="text"
                value={item.description}
                onChange={e => updateItem(item.id, { description: e.target.value })}
                placeholder="Description"
                className="input col-span-2"
            />

            <input
                type="number"
                value={item.quantity}
                onChange={e => updateItem(item.id, { quantity: Number(e.target.value) })}
                // placeholder="Quantity"
                className="input"
            // min="1"
            />

            <input
                type="number"
                value={item.unitPrice}
                onChange={e => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                // placeholder="Unit Price"
                className="input"
            // min="0"
            />
        </div>
    );
}

export default LineItemRow;