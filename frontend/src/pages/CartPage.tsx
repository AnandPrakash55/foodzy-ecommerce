import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

export default function CartPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!items.length)
    return (
      <div className="w-full max-w-[1400px] mx-auto px-8 py-12">
        <p className="text-center text-[--color-text-light] text-lg">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 py-12">
      <h1 className="text-[2.5rem] font-bold text-[--color-text] mb-8">Your Cart</h1>
      <div className="mt-4">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4 items-center py-3 border-b border-[#e5e5e5]">
            <img src={item.imageUrl} alt={item.name} className="w-[60px] rounded-lg" />
            <span className="flex-1 text-[--color-text] font-medium">{item.name}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                updateQty(item.productId, Number(e.target.value))
              }
              className="w-[80px] px-4 py-3 rounded-md border border-[#ddd] text-[0.95rem] outline-none focus:border-[--color-primary]"
            />
            <span className="text-[--color-primary] font-bold text-lg">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(item.productId)}
              className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md cursor-pointer font-semibold text-sm border-none hover:bg-[#FF5252] transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-2xl font-bold text-[--color-text] mb-4">
          Total: <span className="text-[--color-primary]">${total.toFixed(2)}</span>
        </p>
        <Link
          to="/checkout"
          className="inline-block px-8 py-4 bg-[--color-primary] text-white rounded-md text-base cursor-pointer font-semibold no-underline hover:bg-[--color-primary-dark] transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
