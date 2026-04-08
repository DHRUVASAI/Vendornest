import { useState } from "react";
import { Users, DollarSign, AlertTriangle, BarChart3, CheckCircle, XCircle } from "lucide-react";

const PENDING_SELLERS = [
  { id: 1, name: "NewShop", email: "new@shop.com", applied: "2026-03-25" },
  { id: 2, name: "FreshFinds", email: "fresh@finds.com", applied: "2026-03-26" },
];

const DISPUTES = [
  { id: "D-001", buyer: "Alex M.", seller: "TechVault", product: "Wireless Headphones", reason: "Item not as described", status: "open" },
  { id: "D-002", buyer: "Sam L.", seller: "StyleHive", product: "Leather Jacket", reason: "Defective item", status: "open" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState("sellers");
  const [commissionRate, setCommissionRate] = useState(10);
  const [sellers, setSellers] = useState(PENDING_SELLERS);
  const [disputes, setDisputes] = useState(DISPUTES);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total GMV", value: "₹1.2 Cr", icon: DollarSign },
          { label: "Active Sellers", value: "24", icon: Users },
          { label: "Open Disputes", value: String(disputes.filter(d => d.status === "open").length), icon: AlertTriangle },
          { label: "Commission Rate", value: `${commissionRate}%`, icon: BarChart3 },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2"><s.icon className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">{s.label}</span></div>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {[
          { id: "sellers", label: "Seller Verification" },
          { id: "commission", label: "Commission" },
          { id: "disputes", label: "Disputes" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "sellers" && (
        <div className="space-y-3 animate-fade-in">
          {sellers.length === 0 && <p className="text-sm text-muted-foreground">No pending seller applications.</p>}
          {sellers.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div>
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.email} · Applied {s.applied}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSellers(sellers.filter(x => x.id !== s.id))} className="inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium">
                  <CheckCircle className="h-3.5 w-3.5" /> Approve
                </button>
                <button onClick={() => setSellers(sellers.filter(x => x.id !== s.id))} className="inline-flex items-center gap-1 rounded-lg border border-destructive text-destructive px-3 py-1.5 text-xs font-medium">
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "commission" && (
        <div className="max-w-md space-y-4 animate-fade-in">
          <div className="rounded-lg border border-border bg-card p-6">
            <label className="block text-sm font-medium mb-3">Global Commission Rate: {commissionRate}%</label>
            <input type="range" min={1} max={30} value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1%</span><span>30%</span></div>
          </div>
        </div>
      )}

      {tab === "disputes" && (
        <div className="space-y-3 animate-fade-in">
          {disputes.map((d) => (
            <div key={d.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">{d.id}: {d.reason}</p>
                  <p className="text-xs text-muted-foreground">{d.buyer} vs {d.seller} · {d.product}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${d.status === "open" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>{d.status}</span>
              </div>
              {d.status === "open" && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => setDisputes(disputes.map(x => x.id === d.id ? { ...x, status: "resolved" } : x))} className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium">Refund Buyer</button>
                  <button onClick={() => setDisputes(disputes.map(x => x.id === d.id ? { ...x, status: "dismissed" } : x))} className="rounded-lg border border-border text-muted-foreground px-3 py-1.5 text-xs font-medium">Dismiss</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
