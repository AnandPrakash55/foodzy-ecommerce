import { useEffect, useState } from "react";
import client from "../api/client";
import ProductCard, { Product } from "../components/products/ProductCard";

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
      {/* HERO SECTION */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
              100% Organic Vegetables
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
              The best way to stuff your wallet.
            </h1>

            <p className="text-gray-600 mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              reiciendis beatae consequuntur.
            </p>

            <div className="flex mt-6">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
              />
              <button className="bg-green-600 text-white px-6 py-2 rounded-r-lg hover:bg-green-700">
                Subscribe
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=600&fit=crop"
            alt="Fresh vegetables"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* FEATURE CARDS */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="flex items-center justify-between bg-[#f6ead9] p-6 rounded-xl shadow">
          <div className="max-w-[60%]">
            <h3 className="text-xl font-semibold">Everyday Fresh & Clean with Our Products</h3>
            <p className="text-gray-600 mt-1">Organic vegetables and fruits</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Shop Now
            </button>
          </div>
          <img src="/images/Onions.png" alt="Onions" className="w-28 md:w-36" />
        </div>

        <div className="flex items-center justify-between bg-[#fde4e4] p-6 rounded-xl shadow">
          <div className="max-w-[60%]">
            <h3 className="text-xl font-semibold">Make your Breakfast Healthy and Easy</h3>
            <p className="text-gray-600 mt-1">Fresh smoothies and healthy meals</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Shop Now
            </button>
          </div>
          <img src="/images/strawberry-milk.png" alt="smoothie" className="w-28 md:w-36" />
        </div>

        <div className="flex items-center justify-between bg-[#eaf1ff] p-6 rounded-xl shadow">
          <div className="max-w-[60%]">
            <h3 className="text-xl font-semibold">The best Organic Products Online</h3>
            <p className="text-gray-600 mt-1">Quality products delivered to your door</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Shop Now
            </button>
          </div>
          <img src="/images/basket.png" alt="basket" className="w-28 md:w-36" />
        </div>

      </div>

      
     {/* POPULAR PRODUCTS */}
<div className="max-w-7xl mx-auto px-4 mt-14">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-semibold">Popular Products</h2>

    {/* TABS */}
    <div className="flex gap-6 text-sm text-gray-500">
      {["All", "Milks & Dairies", "Coffees & Teas", "Pet Foods", "Meats", "Vegetables", "Fruits"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`hover:text-green-600 transition ${
            activeTab === tab.toLowerCase() ? "text-green-600 font-medium" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>

  {/* PRODUCTS GRID */}
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
    {popular.map((p, index) => (
      <div
        key={p.id}
        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
      >
        {/* BADGE */}
        <div className="flex justify-between">
          <span
            className={`text-xs px-2 py-1 rounded-full text-white 
              ${
                index % 3 === 0
                  ? "bg-red-500"
                  : index % 3 === 1
                  ? "bg-green-500"
                  : "bg-blue-500"
              }
            `}
          >
            {index % 3 === 0 ? "Hot" : index % 3 === 1 ? "New" : "Sale"}
          </span>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center my-4">
          <img
            src={p.image_url}
            alt={p.name}
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* CATEGORY */}
        <p className="text-xs text-gray-400 capitalize">{p.category || "Snack"}</p>

        {/* TITLE */}
        <h3 className="font-medium text-gray-700 leading-tight line-clamp-2 mt-1">
          {p.name}
        </h3>

        {/* BRAND */}
        <p className="text-xs text-gray-500 mt-1">
          by <span className="text-green-600 font-medium">NestFood</span>
        </p>

        {/* PRICE ROW */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-green-600 font-bold text-lg">
              ${p.price.toFixed(2)}
            </span>
            {p.old_price && (
              <span className="text-gray-400 text-sm line-through">
                ${p.old_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* ADD BUTTON */}
          <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-lg">
            + Add
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* DAILY BEST SELLS */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold">Daily Best Sells</h2>

        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 rounded-full bg-green-600 text-white">Featured</button>
          <button className="px-4 py-2 rounded-full border">Popular</button>
          <button className="px-4 py-2 rounded-full border">New Added</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {popular.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <section className="bg-green-50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Stay home & get your daily needs</h2>
            <p className="text-gray-600 mt-2">Start your daily shopping now</p>

            <div className="flex mt-6">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-l-lg border border-gray-300"
              />
              <button className="bg-green-600 text-white px-6 py-2 rounded-r-lg hover:bg-green-700">
                Subscribe
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
            alt="Delivery man"
            className="rounded-xl shadow"
          />
        </div>
      </section>

      {/* FEATURES BAR */}
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

