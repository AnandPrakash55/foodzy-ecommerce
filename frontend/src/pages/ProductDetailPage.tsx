import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { Product } from "../components/products/ProductCard";
import { useCartStore } from "../store/useCartStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("50g");
  const [activeTab, setActiveTab] = useState("description");
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function load() {
      const res = await client.get<Product>(`/products/${id}`);
      setProduct(res.data);
    }
    load();
  }, [id]);

  if (!product) return <p className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT SIDEBAR - Categories & Filters */}
        <div className="lg:col-span-2 lg:grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Product Category</h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Juice & Drinks</span>
                  <span className="text-gray-400">(12)</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Dairy & Milk</span>
                  <span className="text-gray-400">(64)</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-600">Snack & Spice</span>
                  <span className="text-gray-400">(54)</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Filter By Price</h3>
                <input type="range" min="0" max="250" className="w-full mb-3" />
                <p className="text-sm text-gray-600 mb-3">Price: $20 - $250</p>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm font-semibold">
                  Filter
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Products Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Vegetables</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Juice</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Food</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Dry Fruits</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Vegetables</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Juice</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Product Image */}
              <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                <img src={product.image_url} alt={product.name} className="max-w-full max-h-96 object-contain" />
              </div>

              {/* Product Details */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-4">Lorem ipsum dolor sit amet consectetur adipiscing elit, in iure metus sarcina quibuds atque molpias.</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400 text-sm">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(75 Reviews)</span>
                </div>

                {/* Product Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex text-sm">
                    <span className="text-gray-600 w-24">Brand</span>
                    <span className="text-gray-800 font-medium">: ISTA REFENO CO</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-600 w-24">Flavour</span>
                    <span className="text-gray-800 font-medium">: Super Saver Pack</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-600 w-24">Diet Type</span>
                    <span className="text-gray-800 font-medium">: Vegetarian</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-600 w-24">Weight</span>
                    <span className="text-gray-800 font-medium">: 200 Grams</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-600 w-24">Speciality</span>
                    <span className="text-gray-800 font-medium">: Gluten Free, Sugar Free</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-600 w-24">Info</span>
                    <span className="text-gray-800 font-medium">: Egg Free, Allergen-Free</span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-600 w-24">Items</span>
                    <span className="text-gray-800 font-medium">: 1</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                    {product.old_price && (
                      <span className="text-lg text-gray-400 line-through">${product.old_price.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Size/Weight Selection */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Size/Weight:</label>
                  <div className="flex gap-2">
                    {['50g', '60g', '80g', '100g', '150g'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-green-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex gap-3 items-center">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) {
                        addItem({
                          productId: product.id,
                          name: product.name,
                          price: product.price,
                          imageUrl: product.image_url,
                        });
                      }
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
              <div className="flex gap-8 border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 font-medium transition-colors ${
                    activeTab === 'description'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('information')}
                  className={`pb-3 font-medium transition-colors ${
                    activeTab === 'information'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Information
                </button>
                <button
                  onClick={() => setActiveTab('review')}
                  className={`pb-3 font-medium transition-colors ${
                    activeTab === 'review'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Review
                </button>
              </div>

              {activeTab === 'description' && (
                <div className="text-gray-600 text-sm leading-relaxed">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur, adipiscing elit. Erat in vero sapiente dolor, enim delectus vero temporibus consectetur, eoius eddsa erat temporibus dolor. Cum tincidunt augue et tempus non vestibulum eouis nisl. Orci commodo interdum augue magna, accumsan tortor cursus viverra dolor. Cras placerat ultricies metus eget viverra sagittis.
                  </p>
                  <p className="mb-4">
                    Ornare id nam rhoncus tellus cursus volutpat sit erat morbi volutpat. Convallis integer bibendum bibendum convallis ipsum ipsum lorem primis nec. Sed habitant porta tempus, netus fringilla erat in vestibulum non. Ac accumsan est diam sagittis, dictum eu ullamcorper volutpat id pellentesque sapien vel.
                  </p>
                  <h3 className="font-semibold text-gray-800 mt-6 mb-3">Packaging & Delivery</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectemur faucibus dolor! Quis vel consequuntur napteur distinctis vero lobium reformar ndos. Neque mollitia aldera sequi magna dolor quisque et distinctis lorem dolor pharetra aliquam tempor bibendum provident diam.
                  </p>
                </div>
              )}

              {activeTab === 'information' && (
                <div className="text-gray-600 text-sm">
                  <p>Product information and specifications will be displayed here.</p>
                </div>
              )}

              {activeTab === 'review' && (
                <div className="text-gray-600 text-sm">
                  <p>Customer reviews will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
