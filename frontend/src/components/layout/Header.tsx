import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function Header() {
  const items = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[100]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* ROW 1: TOP NAV (LIKE YOUR IMAGE) */}
        <div className="flex items-center justify-between h-10 text-[11px] md:text-[13px]">
          {/* Left: Hamburger */}
          <button className="text-xs md:text-sm text-gray-700">
            ☰
          </button>

          {/* Center: Navigation links */}
          <nav className="flex gap-5 md:gap-7 text-gray-700">
            {["Home", "Category", "Products", "Pages", "Blog", "Elements"].map(
              (item) => (
                <Link
                  key={item}
                  to="#"
                  className="flex items-center gap-1 hover:text-[--color-primary] font-normal"
                >
                  {item}
                  {(item !== "Home") && (
                    <span className="text-[9px] mt-[1px]">▼</span>
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Right: Phone */}
          <div className="flex items-center gap-1 text-gray-600">
            📞 <span>+123 (456 / 7890)</span>
          </div>
        </div>

        {/* ROW 2: LOGO + SEARCH + ACCOUNT/WISHLIST/CART */}
        <div className="flex items-center justify-between gap-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img
              src="/logo.png"
              alt="Foodzy logo"
              className="w-[42px] h-[42px] rounded-full object-cover"
            />
            <div className="leading-tight">
              <div className="font-bold text-[1.4rem] text-gray-900">
                Food<span className="text-[--color-primary]">zy</span>
              </div>
              <div className="text-[10px] text-gray-500">
                A Treasure of Taste
              </div>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-[620px]">
            <div className="flex border border-[#e3e7e9] rounded-[2px] overflow-hidden h-9">
              <input
                type="text"
                placeholder="Search for items..."
                className="flex-1 px-3 text-[11px] outline-none"
              />
              <select className="px-3 text-[11px] border-l border-[#e3e7e9] bg-white outline-none min-w-[110px]">
                <option>All Categories</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Milks</option>
              </select>
              <button className="px-4 text-[11px] bg-[#ff4b3a] text-white border-l border-[#ff4b3a]">
                🔍
              </button>
            </div>
          </div>

          {/* Right side: Account / Wishlist / Cart */}
          <div className="flex items-center gap-6 text-[11px] text-gray-700">
            <Link
              to="#"
              className="flex items-center gap-1 hover:text-[--color-primary]"
            >
              👤 <span>Account</span>
            </Link>

            <Link
              to="#"
              className="flex items-center gap-1 hover:text-[--color-primary]"
            >
              🤍 <span>Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-[--color-primary] relative"
            >
              🛒 <span>Cart</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-3 bg-[--color-primary] text-white text-[10px] px-2 py-[1px] rounded-full">
                  {count}
                </span>
              )}
            </Link>

            {!user ? (
              <Link
                to="/login"
                className="hidden md:inline-block px-4 py-[6px] bg-[--color-primary] text-white rounded-[2px] text-[11px] font-medium hover:bg-[--color-primary-dark] transition-colors"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="hidden md:inline-block px-4 py-[6px] bg-[--color-primary] text-white rounded-[2px] text-[11px] font-medium hover:bg-[--color-primary-dark] transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

