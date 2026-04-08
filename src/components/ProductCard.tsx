import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { FALLBACK_IMAGE, formatPrice } from "@/lib/api";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block animate-fade-in">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== FALLBACK_IMAGE) target.src = FALLBACK_IMAGE;
            }}
          />
          {product.arEnabled && (
            <span className="absolute top-2.5 left-2.5 rounded-md bg-warning px-2 py-0.5 text-[10px] font-bold text-warning-foreground shadow-sm">
              AR Preview
            </span>
          )}
          {/* Quick add */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        {/* Info */}
        <div className="p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-[8px] font-bold text-primary">{product.seller[0]}</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium truncate">{product.seller}</p>
          </div>
          <h3 className="text-sm font-medium leading-snug text-card-foreground line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>
          <div className="flex items-center justify-between pt-1">
            <span className="text-base font-bold text-card-foreground">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="text-muted-foreground font-medium">{product.rating.rate}</span>
              <span className="text-muted-foreground/60">({(product.rating.count / 1000).toFixed(1)}k)</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
