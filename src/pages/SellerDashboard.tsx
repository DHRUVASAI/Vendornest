import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package, DollarSign, Truck, Star, MessageCircle, LayoutDashboard, BarChart3, User } from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Sub-Orders", icon: Truck },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "chat", label: "Chat Inbox", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
];

const STATS = [
  { label: "Total Revenue", value: "₹10,34,500", icon: DollarSign },
  { label: "Orders Fulfilled", value: "89", icon: Truck },
  { label: "Pending Payout", value: "₹1,02,300", icon: Package },
  { label: "Seller Rating", value: "4.8", icon: Star },
];

const CHART_DATA = [
  { month: "Jan", revenue: 98000 }, { month: "Feb", revenue: 145000 },
  { month: "Mar", revenue: 198000 }, { month: "Apr", revenue: 156000 },
  { month: "May", revenue: 267000 }, { month: "Jun", revenue: 232000 },
];

const MOCK_ORDERS = [
  { id: "SO-001", buyer: "Rahul S.", product: "boAt Rockerz 450", total: 1499, status: "pending" },
  { id: "SO-002", buyer: "Priya M.", product: "Puma Running Shoes", total: 3999, status: "shipped" },
  { id: "SO-003", buyer: "Arjun K.", product: "Fire-Boltt Smart Watch", total: 1799, status: "delivered" },
];

const MOCK_PRODUCTS = [
  { id: 1, name: "boAt Rockerz 450 Headphones", price: 1499, stock: 45, category: "Electronics" },
  { id: 2, name: "Puma Softride Running Shoes", price: 3999, stock: 23, category: "Sports" },
  { id: 3, name: "Fire-Boltt Phoenix Smart Watch", price: 1799, stock: 12, category: "Electronics" },
  { id: 4, name: "Allen Solly Formal Shirt", price: 1299, stock: 56, category: "Fashion" },
];

export default function SellerDashboard() {
  const [tab, setTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} shrink-0 border-r border-border bg-card transition-all hidden md:block`}>
        <div className="p-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded hover:bg-muted w-full text-left text-xs text-muted-foreground">
            {sidebarOpen ? "← Collapse" : "→"}
          </button>
        </div>
        <nav className="space-y-0.5 px-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm transition-colors ${
                tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{t.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card flex overflow-x-auto">
        {TABS.slice(0, 5).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 flex flex-col items-center py-2 text-[10px] ${tab === t.id ? "text-primary" : "text-muted-foreground"}`}>
            <t.icon className="h-4 w-4 mb-0.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
        {tab === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-heading">Seller Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-card p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <p className="text-xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-card">
              <h2 className="text-sm font-medium mb-4">Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CHART_DATA}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(148, 65%, 26%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-heading">Products</h1>
              <button className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">+ Add Product</button>
            </div>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Price</th><th className="text-left p-3">Stock</th><th className="text-left p-3">Category</th><th className="p-3">Actions</th></tr>
                </thead>
                <tbody>
                  {MOCK_PRODUCTS.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3">₹{p.price.toLocaleString("en-IN")}</td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3 text-center space-x-2">
                        <button className="text-primary text-xs hover:underline">Edit</button>
                        <button className="text-destructive text-xs hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-2xl font-bold text-heading">Sub-Orders</h1>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr><th className="text-left p-3">ID</th><th className="text-left p-3">Buyer</th><th className="text-left p-3">Product</th><th className="text-left p-3">Total</th><th className="text-left p-3">Status</th></tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map((o) => (
                    <tr key={o.id} className="border-t border-border">
                      <td className="p-3 font-mono text-xs">{o.id}</td>
                      <td className="p-3">{o.buyer}</td>
                      <td className="p-3">{o.product}</td>
                      <td className="p-3">₹{o.total.toLocaleString("en-IN")}</td>
                      <td className="p-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          o.status === "delivered" ? "bg-primary/10 text-primary" :
                          o.status === "shipped" ? "bg-warning/10 text-warning" :
                          "bg-muted text-muted-foreground"
                        }`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "revenue" && (
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-2xl font-bold text-heading">Revenue & Payouts</h1>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Gross Revenue</p><p className="text-2xl font-bold mt-1">₹10,34,500</p></div>
              <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Commission (10%)</p><p className="text-2xl font-bold mt-1 text-destructive">-₹1,03,450</p></div>
              <div className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Net Payout</p><p className="text-2xl font-bold mt-1 text-primary">₹9,31,050</p></div>
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-2xl font-bold text-heading">Analytics</h1>
            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="text-sm font-medium mb-4">Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={CHART_DATA}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(148, 65%, 26%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-medium mb-3">Top Products</h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>1. Fire-Boltt Smart Watch</span><span className="text-muted-foreground">₹3,42,000</span></li>
                  <li className="flex justify-between"><span>2. Puma Running Shoes</span><span className="text-muted-foreground">₹2,56,000</span></li>
                  <li className="flex justify-between"><span>3. boAt Rockerz 450</span><span className="text-muted-foreground">₹1,98,000</span></li>
                </ol>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-medium mb-3">Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Return Rate</span><span>2.3%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Avg. Order Value</span><span>₹2,432</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Repeat Customers</span><span>34%</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "chat" && (
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-2xl font-bold text-heading">Chat Inbox</h1>
            <div className="space-y-2">
              {["Alex M.", "Jordan K.", "Sam L."].map((name) => (
                <div key={name} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:shadow-card-hover transition-shadow cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{name[0]}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">Last message about product inquiry...</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div className="space-y-4 animate-fade-in max-w-md">
            <h1 className="text-2xl font-bold text-heading">Profile</h1>
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Store Name</label><input className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" defaultValue="TechVault" /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" defaultValue="seller@techvault.com" /></div>
              <button className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Save Changes</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
