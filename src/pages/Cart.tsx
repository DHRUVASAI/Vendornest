import { Link } from "react-router-dom";
import { useStore } from "@/lib/store";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Shield } from "lucide-react";
import { useState } from "react";
import { FALLBACK_IMAGE, formatPrice } from "@/lib/api";
import { RazorpayCheckout } from "@/components/RazorpayCheckout";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useStore();
  const [ordered, setOrdered] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const bySeller: Record<string, typeof cart> = {};
  cart.forEach((item) => {
    const s = item.product.seller;
    if (!bySeller[s]) bySeller[s] = [];
    bySeller[s].push(item);
  });

  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const handleOrder = () => {
    const order = placeOrder();
    if (order) {
      setOrderData(order);
      setShowPayment(true);
    }
  };

  if (ordered) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-heading mb-2">Order Confirmed! 🎉</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Your sub-orders have been created and sent to each seller. You'll receive tracking updates soon.</p>
        <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold hover:bg-primary/90 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Show payment modal if it's open, even if cart is empty
  if (showPayment && orderData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <RazorpayCheckout
          open={showPayment}
          onOpenChange={(open) => {
            setShowPayment(open);
            if (!open) {
              setOrdered(true);
            }
          }}
          amount={orderData.total}
        />
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold text-heading mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="text-sm text-primary font-semibold hover:underline">Browse Products →</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>
      <h1 className="text-2xl font-bold text-heading mb-6">Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {Object.entries(bySeller).map(([seller, items]) => (
            <div key={seller} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{seller[0]}</div>
                <span className="text-sm font-semibold">{seller}</span>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Free Delivery</span>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <img src={item.product.image} alt={item.product.title} className="h-20 w-20 object-contain rounded-lg bg-secondary p-2 shrink-0" onError={(e) => { const target = e.currentTarget; if (target.src !== FALLBACK_IMAGE) target.src = FALLBACK_IMAGE; }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2 leading-snug">{item.product.title}</p>
                      <p className="text-base font-bold mt-1">{formatPrice(item.product.price)}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="text-sm font-semibold w-7 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border text-right text-sm">
                Subtotal: <span className="font-bold text-base">{formatPrice(items.reduce((s, i) => s + i.product.price * i.quantity, 0))}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 h-fit sticky top-20">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span><span className="font-medium">{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary font-semibold">FREE</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <button onClick={handleOrder} className="w-full mt-5 rounded-xl bg-primary text-primary-foreground py-3.5 text-sm font-bold hover:bg-primary/90 transition-all hover:shadow-lg">
              Proceed to Payment
            </button>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 text-xs text-muted-foreground">
            <Shield className="h-5 w-5 text-primary shrink-0" />
            <span>Your payment information is secure. We use SSL encryption to protect your data.</span>
          </div>
        </div>
      </div>

      <RazorpayCheckout
        open={showPayment}
        onOpenChange={(open) => {
          setShowPayment(open);
          if (!open) {
            setOrdered(true);
          }
        }}
        amount={total}
      />
    </div>
  );
}
