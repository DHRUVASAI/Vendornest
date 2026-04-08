import type { Order } from "./types";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayPaymentPayload {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  notes?: Record<string, string>;
}

const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3002";

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

// Create Razorpay order
export const createRazorpayOrder = async (
  amount: number,
  receipt: string
): Promise<string> => {
  // Call backend API
  const response = await fetch(`${API_BASE_URL}/api/razorpay/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, receipt }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Failed to create order" }));
    throw new Error(errorData.error || `Failed to create order: ${response.status}`);
  }

  const data = await response.json();
  return data.order_id;
};

// Verify payment signature
export const verifyPaymentSignature = async (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/api/razorpay/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Verification failed" }));
    throw new Error(errorData.error || `Payment verification failed: ${response.status}`);
  }

  const data = await response.json();
  return data.verified === true;
};

// Open Razorpay checkout
export const openRazorpayCheckout = (
  options: RazorpayPaymentPayload,
  onSuccess: (paymentId: string) => void,
  onError: (error: string) => void
): void => {
  if (!window.Razorpay) {
    onError("Razorpay script not loaded");
    return;
  }

  try {
    const razorpay = new window.Razorpay({
      ...options,
      handler: async (response: any) => {
        try {
          const verified = await verifyPaymentSignature(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );

          if (verified) {
            onSuccess(response.razorpay_payment_id);
          } else {
            onError("Payment verification failed");
          }
        } catch (err) {
          onError(err instanceof Error ? err.message : "Verification error");
        }
      },
      modal: {
        ondismiss: () => {
          onError("Payment cancelled by user");
        },
      },
    });

    razorpay.open();
  } catch (error) {
    onError(error instanceof Error ? error.message : "Checkout error");
  }
};

// Create subscription plan
export const createSubscriptionPlan = async (
  planName: string,
  amount: number,
  period: "daily" | "weekly" | "monthly" | "yearly"
): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/razorpay/plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planName, amount, period }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Failed to create plan" }));
    throw new Error(errorData.error || `Failed to create subscription plan: ${response.status}`);
  }

  const data = await response.json();
  return data.plan_id;
};

// Create subscription
export const createSubscription = async (
  planId: string,
  customerEmail: string,
  customerName: string
): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/razorpay/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId, customerEmail, customerName }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Failed to create subscription" }));
    throw new Error(errorData.error || `Failed to create subscription: ${response.status}`);
  }

  const data = await response.json();
  return data.subscription_id;
};
