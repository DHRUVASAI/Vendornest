import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, AlertCircle } from "lucide-react";
import { 
  openRazorpayCheckout, 
  loadRazorpayScript, 
  createRazorpayOrder,
  type RazorpayPaymentPayload 
} from "@/lib/razorpay";

interface RazorpayCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
}

export function RazorpayCheckout({
  open,
  onOpenChange,
  amount,
}: RazorpayCheckoutProps) {
  const { user, finalizePayment } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    if (!user) {
      setError("Please login to proceed with payment");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!keyId) {
        throw new Error("Razorpay Key ID not configured");
      }

      // Create order on backend first
      const receipt = `receipt_${Date.now()}`;
      const amountInPaise = amount * 100; // Convert to paise
      
      const orderId = await createRazorpayOrder(amountInPaise, receipt);

      const options: RazorpayPaymentPayload = {
        key: keyId,
        amount: amountInPaise,
        currency: "INR",
        name: "VendorNest",
        description: "Order Payment",
        order_id: orderId, // Use real Razorpay order ID
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3b82f6",
        },
      };

      openRazorpayCheckout(
        options,
        (paymentId: string) => {
          finalizePayment(orderId, paymentId, "completed");
          onOpenChange(false);
          setLoading(false);
        },
        (errorMsg: string) => {
          setError(errorMsg);
          setLoading(false);
        }
      );
    } catch (err: any) {
      const errorMessage = typeof err === "string" ? err : (err?.message || "Payment failed");
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Secure Payment</DialogTitle>
          <DialogDescription>
            Complete your purchase with Razorpay
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <div className="text-sm text-muted-foreground">Order Amount</div>
            <div className="text-2xl font-bold">₹{amount.toFixed(2)}</div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Processing..." : "Pay with Razorpay"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Powered by Razorpay | Secure Payment Gateway
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
