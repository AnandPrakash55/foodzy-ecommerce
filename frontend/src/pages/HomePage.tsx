import { useEffect, useState } from "react";
import client from "../api/client";
import ProductCard, { Product } from "../components/products/ProductCard";

// ------------------------------------------
// ★ POPULAR PRODUCTS DATA
// ------------------------------------------
export const products: Product[] = [
  {
    id: 101,
    name: "Seeds Of Change Organic Quinoa",
    image_url: "https://images.unsplash.com/photo-1505253468034-514d2507d914?auto=format&fit=crop&w=600&q=80",
    price: 32.85,
    old_price: 39.0,
    category: "Snacks",
  },
  {
    id: 103,
    name: "Blue Diamond Almonds Lightly Salted",
    image_url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80",
    price: 23.85,
    old_price: 28.0,
    category: "Snacks",
  },
  {
    id: 104,
    name: "Encore Seafoods Stuffed Salmon",
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    price: 35.85,
    old_price: 42.0,
    category: "Meats",
  },
  {
    id: 106,
    name: "Organic Vanilla Farm Watermelon",
    image_url: "https://images.unsplash.com/photo-1439127989242-c3749a012eac?auto=format&fit=crop&w=600&q=80",
    price: 48.85,
    old_price: 52.0,
    category: "Fruits",
  },
  {
    id: 108,
    name: "Simply Lemonade with Raspberry",
    image_url: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=600&q=80",
    price: 15.95,
    old_price: 19.0,
    category: "Drinks",
  },
];
 


// -----------------------------------------------------
// ★ HOMEPAGE COMPONENT
// -----------------------------------------------------
export default function HomePage() {
  const [popular, setPopular] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function load() {
      const res = await client.get<Product[]>("/products?popular=1");
      setPopular(res.data);
    }
    load();
  }, []);

  return (
    <>
      {/* ----------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ----------------------------------------------------- */}
      <section className="relative bg-[#f7f7f7] py-24 overflow-hidden">

  {/* Floating Doodles */}
  <img
    src="/doodle-top.png"
    className="absolute top-6 left-10 w-10 opacity-60"
  />
  <img
    src="/doodle-small.png"
    className="absolute bottom-10 left-10 w-12 opacity-60"
  />
  <img
    src="/doodle-fruits.png"
    className="absolute top-10 right-1/3 w-10 opacity-60"
  />

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    
    {/* LEFT TEXT SIDE */}
    <div>
      <span className="text-[12px] font-semibold text-red-500">
        100% <span className="text-gray-800">Organic Vegetables</span>
      </span>

      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight text-gray-900">
        The best way to<br />stuff your wallet.
      </h1>

      <p className="text-gray-600 mt-4 max-w-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
        reiciendis tenetur consequuntur.
      </p>

      {/* EMAIL INPUT */}
      <div className="flex mt-8 bg-white rounded-full shadow-sm w-full max-w-md overflow-hidden">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-5 py-3 text-sm outline-none"
        />
        <button className="bg-green-500 text-white px-6 text-sm font-semibold hover:bg-green-600">
          Subscribe
        </button>
      </div>
    </div>

    {/* Right Image is NOT inside the grid, placed absolutely */}
    <div className="relative w-full h-full">
      <img
        src="/lettuce.png"
        className="absolute right-0 bottom-[-40px] w-[450px] md:w-[520px] object-contain"
      />
    </div>

  </div>
</section>

      {/* ----------------------------------------------------- */}
      {/* POPULAR PRODUCTS */}
      {/* ----------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 mt-14 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Popular Products</h2>

          {/* TABS */}
          <div className="flex gap-8 text-sm">
            {[
              "All",
              "Milks & Dairies",
              "Coffees & Teas",
              "Pet Foods",
              "Meats",
              "Vegetables",
              "Fruits",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`hover:text-green-600 transition-colors ${
                  activeTab === tab.toLowerCase()
                    ? "text-green-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID — 5 per row (like screenshot) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popular.length > 0 ? popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          )) : products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------- */}
{/* DAILY BEST SELLS */}
{/* ----------------------------------------------------- */}

<div className="max-w-7xl mx-auto px-4 mt-16">
  {/* Heading */}
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-semibold">Daily Best Sells</h2>

    {/* Tabs */}
    <div className="flex gap-5 text-sm">
      <button className="text-green-600 font-medium border-b-2 border-green-600 pb-1">
        Featured
      </button>
      <button className="text-gray-500 hover:text-green-600 transition">Popular</button>
      <button className="text-gray-500 hover:text-green-600 transition">
        New added
      </button>
    </div>
  </div>

  {/* MAIN GRID */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

    {/* LEFT BANNER */}
    <div className="md:col-span-1 relative rounded-xl overflow-hidden">
      <img
        src="/deal.png"
        className="w-full h-full object-cover"
        alt="Daily Best Banner"
      />
      <div className="absolute inset-0 flex flex-col justify-center p-6 text-white bg-black/40 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-4 leading-tight">
          Bring nature<br />into your home
        </h2>
        <button className="bg-red-500 text-white px-5 py-2 rounded-full font-medium text-sm w-fit hover:bg-red-600 transition">
          Shop Now →
        </button>
      </div>
    </div>

    {/* PRODUCT GRID - first 3 popular */}
    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {(popular.length > 0 ? popular : products).slice(0, 3).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>

  </div>
</div>



      {/* ----------------------------------------------------- */}
      {/* NEWSLETTER + FEATURES BAR  */}
      {/* (same as your original file, unchanged) */}
      {/* ----------------------------------------------------- */}

      <section className="bg-green-50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Stay home & get your daily needs</h2>
            <p className="text-gray-600 mt-2">Start your daily shopping now</p>

            <div className="flex mt-6">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-l-lg border"
              />
              <button className="bg-green-600 text-white px-6 py-2 rounded-r-lg hover:bg-green-700">
                Subscribe
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
            className="rounded-xl shadow"
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { icon: "💰", title: "Best price & offers", text: "Orders $50 or more" },
          { icon: "🚚", title: "Free delivery", text: "24/7 amazing services" },
          { icon: "🎲", title: "Great daily deal", text: "When you sign up" },
          { icon: "📦", title: "Wide assortment", text: "Mega Discounts" },
          { icon: "↻", title: "Easy returns", text: "Within 30 days" },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="text-3xl">{f.icon}</span>
            <div>
              <h4 className="font-semibold">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
