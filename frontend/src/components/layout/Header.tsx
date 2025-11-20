import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function Header() {
  const items = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header className="bg-white px-8 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)] sticky top-0 z-[100]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-[45px] h-[45px] bg-[#FFD43B] rounded-full flex items-center justify-center text-2xl">
              🥗
            </div>
            <div className="font-bold text-[1.8rem] text-[--color-text]">
              Food<span className="text-[--color-primary]">zy</span>
            </div>
          </Link>

          <div className="flex-1 max-w-[600px] flex relative">
            <select className="px-4 py-3 border-2 border-[--color-border] border-r-0 rounded-l-[5px] bg-white text-[--color-text] outline-none text-[0.9rem]">
              <option>All Categories</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Meats</option>
            </select>
            <input
              type="text"
              placeholder="Search for items..."
              className="flex-1 px-4 py-3 border-2 border-[--color-border] border-r-0 outline-none text-[0.9rem]"
            />
            <button className="px-6 py-3 bg-[--color-primary] border-2 border-[--color-primary] rounded-r-[5px] text-white cursor-pointer font-semibold">
              🔍
            </button>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link to="#" className="flex items-center gap-2 no-underline text-[--color-text] text-[0.95rem]">
                  👤 Account
                </Link>
                <Link to="#" className="flex items-center gap-2 no-underline text-[--color-text] text-[0.95rem]">
                  ❤️ Wishlist
                </Link>
                <Link to="/cart" className="flex items-center gap-2 no-underline text-[--color-text] text-[0.95rem]">
                  🛒 Cart
                  {count > 0 && (
                    <span className="bg-[--color-primary] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                      {count}
                    </span>
                  )}
                </Link>
                <button onClick={logout} className="px-6 py-3 bg-[--color-primary] text-white rounded-[5px] text-base cursor-pointer font-semibold border-none hover:bg-[--color-primary-dark] transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="#" className="flex items-center gap-2 no-underline text-[--color-text] text-[0.95rem]">
                  ❤️ Wishlist
                </Link>
                <Link to="/cart" className="flex items-center gap-2 no-underline text-[--color-text] text-[0.95rem]">
                  🛒 Cart
                  {count > 0 && (
                    <span className="bg-[--color-primary] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                      {count}
                    </span>
                  )}
                </Link>
                <Link to="/login" className="px-6 py-3 bg-[--color-primary] text-white rounded-[5px] text-base cursor-pointer font-semibold no-underline hover:bg-[--color-primary-dark] transition-colors">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-[--color-bg-light] px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex gap-8">
          <Link to="/" className="no-underline text-[--color-text] font-medium text-[0.95rem] hover:text-[--color-primary] transition-colors">
            Home
          </Link>
          <Link to="#" className="no-underline text-[--color-text] font-medium text-[0.95rem] hover:text-[--color-primary] transition-colors">
            Category
          </Link>
          <Link to="#" className="no-underline text-[--color-text] font-medium text-[0.95rem] hover:text-[--color-primary] transition-colors">
            Products
          </Link>
          <Link to="#" className="no-underline text-[--color-text] font-medium text-[0.95rem] hover:text-[--color-primary] transition-colors">
            Pages
          </Link>
          <Link to="#" className="no-underline text-[--color-text] font-medium text-[0.95rem] hover:text-[--color-primary] transition-colors">
            Blog
          </Link>
          <Link to="#" className="no-underline text-[--color-text] font-medium text-[0.95rem] hover:text-[--color-primary] transition-colors">
            Elements
          </Link>
        </div>
      </nav>
    </>
  );
}
