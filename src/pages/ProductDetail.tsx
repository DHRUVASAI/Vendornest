import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FALLBACK_IMAGE, fetchProduct, formatPrice } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Star, ShoppingCart, BadgeCheck, ArrowLeft, Box, Truck, RotateCcw, Shield } from "lucide-react";
import { useState } from "react";
import { ARModal } from "@/components/ARModal";
import { ChatWidget } from "@/components/ChatWidget";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useStore();
  const [arOpen, setArOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-xl bg-muted animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
          <div className="h-20 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (!product) return <div className="container mx-auto px-4 py-12 text-center">Product not found.</div>;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const fakeReviews = [
    { name: "Rahul S.", rating: 5, text: "Bahut accha product hai! Quality is top-notch. Delivery was also on time.", date: "2 days ago" },
    { name: "Priya M.", rating: 4, text: "Good product, packaging could be better. But overall happy with the purchase.", date: "1 week ago" },
    { name: "Arjun K.", rating: 5, text: "Exactly as described. Already recommended to friends. Will buy again.", date: "2 weeks ago" },
    { name: "Sneha R.", rating: 4, text: "Value for money. Comparable to products costing 2x more.", date: "3 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
          {/* Image */}
          <div className="rounded-xl border border-border bg-card p-8 md:p-12 flex items-center justify-center sticky top-20 h-fit">
            <img src={product.image} alt={product.title} className="max-h-80 md:max-h-96 object-contain" onError={(e) => { const target = e.currentTarget; if (target.src !== FALLBACK_IMAGE) target.src = FALLBACK_IMAGE; }} />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">{product.category}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-heading leading-tight">{product.title}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating.rate) ? "fill-warning text-warning" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating.rate} ({(product.rating.count / 1000).toFixed(1)}k ratings)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              <span className="text-lg text-muted-foreground line-through">{formatPrice(Math.round(product.price * 1.4))}</span>
              <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">28% off</span>
            </div>

            {/* Seller card */}
            <div className="rounded-xl border border-border bg-secondary/30 p-4 flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {product.seller[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{product.seller}</span>
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Verified Seller · ⭐ 4.7 rating</p>
              </div>
              <button className="text-xs text-primary font-medium border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors">
                Visit Store
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Delivery info */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Delivery", sub: "by 2-4 days" },
                { icon: RotateCcw, label: "Easy Returns", sub: "7 days" },
                { icon: Shield, label: "1 Year", sub: "Warranty" },
              ].map((f) => (
                <div key={f.label} className="text-center rounded-lg border border-border p-3">
                  <f.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="text-xs font-medium">{f.label}</p>
                  <p className="text-[10px] text-muted-foreground">{f.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleAdd}
                className={`inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold transition-all ${
                  added
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>

              {product.arEnabled && (
                <button
                  onClick={() => setArOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-warning text-warning px-6 py-3.5 text-sm font-bold hover:bg-warning/10 transition-colors"
                >
                  <Box className="h-4 w-4" /> Try in AR
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-14 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-heading">Customer Reviews</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-semibold text-foreground">{product.rating.rate}</span>
              <span>• {(product.rating.count / 1000).toFixed(1)}k ratings</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {fakeReviews.map((r, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-card transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{r.name[0]}</div>
                    <span className="font-medium text-sm">{r.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {arOpen && <ARModal product={product} onClose={() => setArOpen(false)} />}
      <ChatWidget sellerName={product.seller} productTitle={product.title} productImage={product.image} />
    </div>
  );
}
