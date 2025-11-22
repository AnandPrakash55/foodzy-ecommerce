import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import client from "../api/client";

export default function CheckoutPage() {
  const { items, clear } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("free");

  if (!items.length)
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-gray-500 text-lg">No items in cart.</p>
      </div>
    );

  const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge = deliveryMethod === "free" ? 0 : 5;
  const total = subTotal + deliveryCharge;

  const placeOrder = async () => {
    if (!email || !otp) {
      alert("Please enter email and OTP");
      return;
    }
    
    try {
      await client.post("/orders", {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });
      clear();
      alert("Order placed! Check your email.");
      navigate("/");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="text-green-600 hover:underline cursor-pointer">Home</span>
          <span>&gt;</span>
          <span>Checkout</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column - Customer & Billing */}
          <div className="space-y-6">
            {/* Customer Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Customer</h2>
              <p className="text-sm text-gray-600 mb-4">Checkout Options</p>
              
              <h3 className="font-semibold text-gray-800 mb-3">Returning Customer</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium">
                    Verify
                  </button>
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Billing Details</h2>
              <p className="text-sm text-gray-600 mb-4">Checkout Options</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">City</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Code</label>
                  <input
                    type="text"
                    placeholder="Post Code"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Country</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region/State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Region/State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Method</h2>
              <p className="text-sm text-gray-600 mb-4">Please select the preferred shipping method to use on this order.</p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="free"
                    checked={deliveryMethod === "free"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm text-gray-700">Free Shipping</span>
                  <span className="ml-auto text-sm text-gray-600">Rate - $0.00</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="flat"
                    checked={deliveryMethod === "flat"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm text-gray-700">Flat Rate</span>
                  <span className="ml-auto text-sm text-gray-600">Rate - $5.00</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
              <p className="text-sm text-gray-600 mb-4">Please select the preferred payment method to use on this order.</p>

              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Cash On Delivery</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">UPI</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Bank Transfer</span>
                </label>
              </div>

              <div className="flex gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" className="h-6" />
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub-Total</span>
                  <span className="font-semibold">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-semibold">${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pt-6 border-t border-gray-200">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-yellow-400 mt-1">
                        ★★★★☆
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-green-600 font-bold">${item.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500 line-through">$29.99</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-semibold transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
