import { useQuery } from "@tanstack/react-query";
import { fetchProducts, CATEGORIES, formatPrice } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { ArrowRight, ShoppingBag, Shield, Truck, Zap, Star, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";


const SELLERS = [
  { name: "TechVault India", rating: 4.8, products: 124, emoji: "⚡" },
  { name: "StyleHive", rating: 4.9, products: 89, emoji: "👗" },
  { name: "HomeNest", rating: 4.7, products: 210, emoji: "🏠" },
  { name: "FitGear", rating: 4.6, products: 67, emoji: "💪" },
  { name: "GreenMarket", rating: 4.8, products: 156, emoji: "🌿" },
  { name: "DesiFinds", rating: 4.5, products: 98, emoji: "🪔" },
  { name: "Craftoria", rating: 4.7, products: 72, emoji: "🎨" },
  { name: "LuxeLife", rating: 4.9, products: 45, emoji: "💎" },
];

const DEALS = [
  { label: "Up to 60% Off", sub: "Electronics", color: "bg-primary" },
  { label: "Flat ₹500 Off", sub: "Fashion", color: "bg-warning" },
  { label: "Buy 2 Get 1", sub: "Home & Living", color: "bg-accent" },
];

export default function HomePage() {
  const [category, setCategory] = useState("all");
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filtered = products?.filter((p) => category === "all" || p.category === category);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" /> India's Trusted Multi-Vendor Marketplace
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Shop smarter.<br />
                <span className="text-primary-foreground/80">Sell confidently.</span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/70 max-w-md leading-relaxed">
                Discover unique products from verified Indian sellers. From electronics to ethnic wear — everything delivered to your doorstep.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground text-primary px-7 py-3.5 text-sm font-bold hover:bg-primary-foreground/90 transition-all hover:shadow-lg hover:-translate-y-0.5">
                  Start Selling <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#products" className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 px-7 py-3.5 text-sm font-bold hover:bg-primary-foreground/10 transition-colors">
                  Explore Products
                </a>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-1"><span className="font-bold text-primary-foreground">38+</span> Products</span>
                <span className="flex items-center gap-1"><span className="font-bold text-primary-foreground">10+</span> Sellers</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /><span className="font-bold text-primary-foreground">4.5</span> Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5"><div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10"><Shield className="h-4 w-4 text-primary" /></div> <span className="font-medium">Verified Sellers</span></div>
          <div className="flex items-center gap-2.5"><div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10"><Truck className="h-4 w-4 text-primary" /></div> <span className="font-medium">Pan-India Delivery</span></div>
          <div className="flex items-center gap-2.5"><div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10"><ShoppingBag className="h-4 w-4 text-primary" /></div> <span className="font-medium">Secure Checkout</span></div>
          <div className="flex items-center gap-2.5"><div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10"><Zap className="h-4 w-4 text-primary" /></div> <span className="font-medium">Easy Returns</span></div>
        </div>
      </section>

      {/* Deals strip */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEALS.map((d, i) => (
            <div key={i} className={`${d.color} text-primary-foreground rounded-xl p-5 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity`}>
              <div>
                <p className="text-xl font-bold">{d.label}</p>
                <p className="text-sm opacity-80">{d.sub}</p>
              </div>
              <ChevronRight className="h-5 w-5 opacity-60" />
            </div>
          ))}
        </div>
      </section>

      {/* Category filters + Products */}
      <section id="products" className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-heading">Featured Products</h2>
          <span className="text-sm text-muted-foreground">{filtered?.length || 0} products</span>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                category === c.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-secondary-foreground border border-border hover:bg-secondary hover:border-primary/20"
              }`}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg bg-muted animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered?.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Trending Sellers */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-heading">Trending Sellers</h2>
            <span className="text-sm text-primary font-medium cursor-pointer hover:underline">View All →</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SELLERS.map((s) => (
              <div key={s.name} className="group rounded-xl border border-border bg-background p-5 hover:shadow-card-hover hover:border-primary/20 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                    {s.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors">{s.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span>{s.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{s.products} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/80">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <p className="text-lg font-bold text-background mb-3">🏪 VendorNest</p>
              <p className="text-sm leading-relaxed">India's trusted multi-vendor marketplace. Shop from verified sellers with confidence.</p>
            </div>
            <div>
              <p className="font-semibold text-background mb-3 text-sm">Shop</p>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-background cursor-pointer transition-colors">Electronics</li>
                <li className="hover:text-background cursor-pointer transition-colors">Fashion</li>
                <li className="hover:text-background cursor-pointer transition-colors">Home & Living</li>
                <li className="hover:text-background cursor-pointer transition-colors">Sports</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-background mb-3 text-sm">Sell</p>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-background cursor-pointer transition-colors">Start Selling</li>
                <li className="hover:text-background cursor-pointer transition-colors">Seller Dashboard</li>
                <li className="hover:text-background cursor-pointer transition-colors">Pricing</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-background mb-3 text-sm">Support</p>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-background cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-background cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-background cursor-pointer transition-colors">Returns Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/50">
            © 2026 VendorNest. All rights reserved. Made with ❤️ in India.
          </div>
        </div>
      </footer>
    </div>
  );
}
