import { useState } from "react";
import { useStore } from "@/lib/store";
import { useNavigate, Link } from "react-router-dom";
import type { UserRole } from "@/lib/types";

export default function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: "u1", name: email.split("@")[0] || "User", email, role });
    navigate(role === "seller" ? "/seller" : role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-card animate-fade-in">
        <h1 className="text-xl font-bold text-heading mb-6 text-center">Log in to VendorNest</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" required className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Login as</label>
            <div className="flex gap-2">
              {(["buyer", "seller", "admin"] as UserRole[]).map((r) => (
                <button type="button" key={r} onClick={() => setRole(r)} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${role === r ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">Log in</button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
