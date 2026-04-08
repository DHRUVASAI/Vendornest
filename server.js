import express from "express";
import cors from "cors";
import crypto from "crypto";
import Razorpay from "razorpay";

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Razorpay credentials - MUST be set via environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error("❌ ERROR: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables");
  process.exit(1);
}

// Initialize Razorpay
const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Mock in-memory store for orders
const orders = new Map();

// Create Razorpay Order
app.post("/api/razorpay/orders", async (req, res) => {
  try {
    const { amount, receipt, description } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({ error: "Amount and receipt are required" });
    }

    // Create order using Razorpay API
    const options = {
      amount: amount, // Already in paise
      currency: "INR",
      receipt: receipt,
      description: description || "VendorNest Order",
    };

    const order = await razorpayInstance.orders.create(options);

    // Store order details locally
    orders.set(order.id, {
      id: order.id,
      amount,
      receipt,
      description,
      status: "created",
      razorpayOrderId: order.id,
      createdAt: new Date(),
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
});

// Verify Payment
app.post("/api/razorpay/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    // Verify payment signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ verified: false, error: "Invalid signature" });
    }

    // Update order status
    if (orders.has(razorpay_order_id)) {
      const order = orders.get(razorpay_order_id);
      order.status = "verified";
      order.paymentId = razorpay_payment_id;
      order.signature = razorpay_signature;
    }

    res.json({
      verified: true,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: error.message || "Payment verification failed" });
  }
});

// Create Subscription Plan
app.post("/api/razorpay/plans", async (req, res) => {
  try {
    const { planName, amount, period } = req.body;

    const planOptions = {
      period: period, // "daily", "weekly", "monthly", "yearly"
      interval: 1,
      amount: amount, // in paise
      currency: "INR",
      description: planName,
    };

    const plan = await razorpayInstance.plans.create(planOptions);

    res.json({
      plan_id: plan.id,
      period: plan.period,
      amount: plan.amount,
      name: planName,
    });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ error: error.message || "Failed to create plan" });
  }
});

// Create Subscription
app.post("/api/razorpay/subscriptions", async (req, res) => {
  try {
    const { planId, customerEmail, customerName } = req.body;

    const subscriptionOptions = {
      plan_id: planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 12, // Number of subscription cycles
      notes: {
        customer_name: customerName,
        customer_email: customerEmail,
      },
    };

    const subscription = await razorpayInstance.subscriptions.create(subscriptionOptions);

    res.json({
      subscription_id: subscription.id,
      plan_id: subscription.plan_id,
      customer_email: customerEmail,
      customer_name: customerName,
      status: subscription.status,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: error.message || "Failed to create subscription" });
  }
});

// Get order details
app.get("/api/razorpay/orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = orders.get(orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Razorpay backend server running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Razorpay Backend Server running on http://localhost:${PORT}`);
  console.log(`📝 Razorpay Key ID: ${RAZORPAY_KEY_ID}`);
});
