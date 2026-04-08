import { create } from "zustand";
import type { CartItem, Product, User, Order, ChatMessage } from "./types";

interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  chatMessages: ChatMessage[];
  unreadCount: number;
  isProcessing: boolean;

  login: (user: User) => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  createOrder: () => Order | null;
  placeOrder: () => Order | null;
  finalizeOrder: (paymentData: any) => void;
  finalizePayment: (orderId: string, paymentId: string, status: string) => void;
  setIsProcessing: (processing: boolean) => void;
  addChatMessage: (msg: ChatMessage) => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  cart: [],
  orders: [],
  chatMessages: [],
  unreadCount: 0,
  isProcessing: false,

  login: (user) => set({ user }),
  logout: () => set({ user: null }),

  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find((i) => i.product.id === product.id);
    if (existing) {
      set({ cart: cart.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ cart: [...cart, { product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => set({ cart: get().cart.filter((i) => i.product.id !== productId) }),

  updateQuantity: (productId, qty) => {
    if (qty <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({ cart: get().cart.map((i) => i.product.id === productId ? { ...i, quantity: qty } : i) });
  },

  clearCart: () => set({ cart: [] }),

  createOrder: () => {
    const cart = get().cart;
    if (!cart.length) return null;

    const bySeller: Record<string, CartItem[]> = {};
    cart.forEach((item) => {
      const s = item.product.seller;
      if (!bySeller[s]) bySeller[s] = [];
      bySeller[s].push(item);
    });

    const subOrders = Object.entries(bySeller).map(([seller, items]) => ({
      id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      seller,
      items,
      status: "pending" as const,
      total: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    }));

    const order: Order = {
      id: `ord-${Date.now()}`,
      subOrders,
      total: subOrders.reduce((s, o) => s + o.total, 0),
      createdAt: new Date(),
    };

    return order;
  },

  placeOrder: () => {
    const order = get().createOrder();
    if (!order) return null;
    set({ orders: [...get().orders, order], cart: [] });
    return order;
  },

  finalizeOrder: (paymentData) => {
    set({ isProcessing: false });
  },

  finalizePayment: (orderId, paymentId, status) => {
    const orders = get().orders;
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, razorpayOrderId: orderId, razorpayPaymentId: paymentId, paymentStatus: status as any }
        : order
    );
    set({ orders: updatedOrders, isProcessing: false });
  },

  setIsProcessing: (processing) => set({ isProcessing: processing }),

  addChatMessage: (msg) => set({
    chatMessages: [...get().chatMessages, msg],
    unreadCount: get().unreadCount + 1,
  }),
}));
