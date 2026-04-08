export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  seller: string;
  arEnabled: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  productId: number;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface SubOrder {
  id: string;
  seller: string;
  items: CartItem[];
  status: "pending" | "shipped" | "delivered";
  total: number;
}

export interface Order {
  id: string;
  subOrders: SubOrder[];
  total: number;
  createdAt: Date;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentStatus?: "pending" | "completed" | "failed";
}

export type UserRole = "buyer" | "seller" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified?: boolean;
}
