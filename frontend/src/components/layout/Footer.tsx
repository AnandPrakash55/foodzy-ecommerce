export default function Footer() {
  return (
    <footer className="bg-white border-t border-[--color-bg-light] mt-auto px-8 pt-12 pb-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[45px] h-[45px] bg-[#FFD43B] rounded-full flex items-center justify-center text-2xl">
                🥗
              </div>
              <div className="font-bold text-[1.8rem] text-[--color-text]">
                Food<span className="text-[--color-primary]">zy</span>
              </div>
            </div>
            <p className="text-[--color-text-light] text-[0.9rem] leading-[1.8]">
              Foodzy is the biggest market of grocery products. Get your daily
              needs from our store.
            </p>
            <p className="text-[--color-text-light] text-[0.9rem] leading-[1.8] mt-4">
              <strong>📍</strong> 51 Green St.Huntington ohaio beach ontario, NY 11746 KY 4783, USA.
            </p>
            <p className="text-[--color-text-light] text-[0.9rem] leading-[1.8]">
              <strong>📧</strong> example@email.com
            </p>
            <p className="text-[--color-text-light] text-[0.9rem] leading-[1.8]">
              <strong>📞</strong> +91 123 4567 890
            </p>
          </div>

          <div>
            <h3 className="text-[1.1rem] mb-4 text-[--color-text]">Company</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                About Us
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Delivery Information
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Contact Us
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Support Center
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[1.1rem] mb-4 text-[--color-text]">Category</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Dairy & Bakery
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Fruits & Vegetable
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Snack & Spice
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Juice & Drinks
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Chicken & Meat
              </a>
              <a href="#" className="text-[--color-text-light] text-[0.9rem] leading-[1.8] no-underline hover:text-[--color-primary] transition-colors">
                Fast Food
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[1.1rem] mb-4 text-[--color-text]">Subscribe Our Newsletter</h3>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Search here..."
                className="flex-1 px-3 py-3 border border-[#ddd] border-r-0 rounded-l-[5px]"
              />
              <button className="px-6 py-3 bg-[--color-primary] text-white border-none rounded-r-[5px] cursor-pointer font-semibold">
                →
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-[35px] h-[35px] rounded-full bg-[--color-bg-light] flex items-center justify-center text-[--color-text] no-underline hover:bg-[--color-primary] hover:text-white transition-colors">
                👍
              </a>
              <a href="#" className="w-[35px] h-[35px] rounded-full bg-[--color-bg-light] flex items-center justify-center text-[--color-text] no-underline hover:bg-[--color-primary] hover:text-white transition-colors">
                🐦
              </a>
              <a href="#" className="w-[35px] h-[35px] rounded-full bg-[--color-bg-light] flex items-center justify-center text-[--color-text] no-underline hover:bg-[--color-primary] hover:text-white transition-colors">
                📷
              </a>
              <a href="#" className="w-[35px] h-[35px] rounded-full bg-[--color-bg-light] flex items-center justify-center text-[--color-text] no-underline hover:bg-[--color-primary] hover:text-white transition-colors">
                🔗
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-[--color-bg-light] text-[--color-text-light] text-[0.9rem]">
          <p>© {new Date().getFullYear()} Foodzy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
