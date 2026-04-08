import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/api";

interface ChatWidgetProps {
  sellerName: string;
  productTitle: string;
  productImage: string;
}

interface Msg {
  from: "buyer" | "seller";
  text: string;
  time: string;
}

export function ChatWidget({ sellerName, productTitle, productImage }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { from: "seller", text: `Hi! I'm ${sellerName}. How can I help you with this product?`, time: "Just now" },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg: Msg = { from: "buyer", text: input, time: "Just now" };
    setMessages((m) => [...m, newMsg]);
    setInput("");

    // Simulated seller reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "seller", text: "Thanks for your interest! Let me check on that for you.", time: "Just now" },
      ]);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-accent border-2 border-card" />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-lg border border-border bg-card shadow-xl animate-fade-in flex flex-col max-h-[28rem]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border p-3">
            <img src={productImage} alt="" className="h-8 w-8 rounded object-contain bg-secondary p-0.5" onError={(e) => { const target = e.currentTarget; if (target.src !== FALLBACK_IMAGE) target.src = FALLBACK_IMAGE; }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{sellerName}</p>
              <p className="text-[10px] text-muted-foreground truncate">{productTitle}</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted"><X className="h-4 w-4" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "buyer" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.from === "buyer" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button onClick={send} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
