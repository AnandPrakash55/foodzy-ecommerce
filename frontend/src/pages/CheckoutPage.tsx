import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import client from "../api/client";

export default function CheckoutPage() {
  const { items, clear } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  if (!items.length)
    return (
      <div className="w-full max-w-[1400px] mx-auto px-8 py-12">
        <p className="text-center text-[--color-text-light] text-lg">No items in cart.</p>
      </div>
    );

  if (!user)
    return (
      <div className="w-full max-w-[1400px] mx-auto px-8 py-12">
        <p className="text-center text-[--color-text-light] text-lg">Please login before checkout.</p>
      </div>
    );

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const placeOrder = async () => {
    await client.post("/orders", {
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    });
    clear();
    alert("Order placed! Check your email.");
    navigate("/");
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 py-12">
      <h1 className="text-[2.5rem] font-bold text-[--color-text] mb-8">Checkout</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-[600px] mx-auto">
        <p className="text-2xl font-bold text-[--color-text] mb-6">
          Total: <span className="text-[--color-primary]">${total.toFixed(2)}</span>
        </p>
        <button
          className="w-full px-8 py-4 bg-[--color-primary] text-white rounded-md text-base cursor-pointer font-semibold border-none hover:bg-[--color-primary-dark] transition-colors"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
