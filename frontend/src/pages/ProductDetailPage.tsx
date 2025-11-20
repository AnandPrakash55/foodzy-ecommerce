import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { Product } from "../components/products/ProductCard";
import { useCartStore } from "../store/useCartStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function load() {
      const res = await client.get<Product>(`/products/${id}`);
      setProduct(res.data);
    }
    load();
  }, [id]);

  if (!product) return <p className="w-full max-w-[1400px] mx-auto px-8 py-12 text-center text-[--color-text-light]">Loading...</p>;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 py-12 flex gap-8">
      <img src={product.image_url} alt={product.name} className="max-w-[320px] rounded-2xl" />
      <div className="flex-1">
        <h1 className="text-[2.5rem] font-bold text-[--color-text] mb-4">{product.name}</h1>
        <p className="text-[--color-primary] text-[1.2rem] font-bold mb-4">
          ${product.price.toFixed(2)}
        </p>

        {product.old_price && (
          <p className="text-[--color-text-light] mb-6">
            <span>Old price: ${product.old_price.toFixed(2)}</span>
          </p>
        )}

        <button
          className="px-8 py-4 bg-[--color-primary] text-white rounded-md text-base cursor-pointer font-semibold border-none hover:bg-[--color-primary-dark] transition-colors"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.image_url,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
