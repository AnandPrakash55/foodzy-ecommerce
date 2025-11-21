import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  categoryId?: number;
}

interface Props {
  product: Product;
  badge?: string;
}

export default function ProductCard({ product, badge }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const badges = ["Sale", "Hot", "New", "-14%", "-25%"];
  const randomBadge = badge || badges[Math.floor(Math.random() * badges.length)];
  const showBadge = Math.random() > 0.3;

  return (
    <div className="bg-white rounded-[15px] p-4 border border-[--color-bg-light] transition-all duration-300 relative hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1">
      {showBadge && (
        <span
          className={`absolute top-4 left-4 text-white px-3 py-1 rounded-[5px] text-xs font-semibold z-10 ${
            randomBadge === "Sale"
              ? "bg-[#FF6B6B]"
              : randomBadge === "Hot"
              ? "bg-[#FFA726]"
              : "bg-[#29B6F6]"
          }`}
        >
          {randomBadge}
        </span>
      )}

      <Link to={`/product/${product.id}`}>
        <div className="relative pb-[100%] overflow-hidden rounded-[10px] mb-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px]"
          />
        </div>
      </Link>

      <div className="mt-3">
        <p className="text-xs text-[--color-text-lighter] mb-1">Category</p>

        <p className="text-[0.95rem] font-medium mb-2 text-[--color-text] leading-[1.3] line-clamp-2">
          {product.name}
        </p>

        <div className="flex items-center gap-1 mb-2">
          <span className="text-[#FFC107] text-[0.85rem]">★★★★☆</span>
        </div>

        <p className="text-[0.8rem] text-[--color-text-lighter] mb-3">
          By NestFood
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2 items-baseline">
            <span className="text-[--color-primary] font-bold text-[1.1rem]">
              ${product.price.toFixed(2)}
            </span>

            {product.originalPrice && (
              <span className="line-through text-[--color-text-lighter] text-[0.9rem]">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            className="px-4 py-2 bg-[--color-bg-green-light] text-[--color-primary] border-none rounded-[5px] cursor-pointer font-semibold text-[0.85rem] transition-all duration-300 flex items-center gap-1 hover:bg-[--color-primary] hover:text-white"
            onClick={() =>
              addItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
              })
            }
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}
