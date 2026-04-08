import { Link } from "react-router-dom";
import { Search, ShoppingCart, MessageCircle, User, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";

export function Navbar() {
  const { cart, user, logout, unreadCount } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight shrink-0">
          <span className="text-xl">🏪</span> VendorNest
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg bg-primary-foreground/10 border-0 py-2 pl-9 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart" className="relative p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-warning-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/chat" className="relative p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
            <MessageCircle className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-warning-foreground">
                {unreadCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link to={user.role === "seller" ? "/seller" : user.role === "admin" ? "/admin" : "/"} className="text-sm font-medium hover:underline">
                {user.name}
              </Link>
              <button onClick={logout} className="text-xs opacity-80 hover:opacity-100">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors">Log in</Link>
              <Link to="/signup" className="text-sm font-medium px-3 py-1.5 rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors">Sign up</Link>
            </div>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-primary-foreground/10 p-4 space-y-3 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search..." className="w-full rounded-lg bg-primary-foreground/10 border-0 py-2 pl-9 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2">
              <ShoppingCart className="h-4 w-4" /> Cart ({cartCount})
            </Link>
            {user ? (
              <>
                <Link to={user.role === "seller" ? "/seller" : "/admin"} onClick={() => setMobileOpen(false)} className="py-2">Dashboard</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left py-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="py-2">Log in</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="py-2">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
