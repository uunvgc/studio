"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { useState } from "react";

export default function Upgrade() {
  const [loading, setLoading] = useState<null | "pro" | "beast">(null);

  const handleCheckout = async (plan: "pro" | "beast") => {
    try {
      setLoading(plan);
      const res = await createCheckoutSession(plan);
      if (res?.url) {
        // Redirect to Stripe Checkout
        window.location.href = res.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">Upgrade Your Plan</h2>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {/* PRO PLAN */}
        <div className="border rounded-xl p-4 flex-1 text-center shadow-md">
          <h3 className="text-lg font-semibold">Pro Plan</h3>
          <p className="mt-2 text-gray-700">$9.99 / month</p>
          <p className="mt-1 text-gray-500 text-sm">Unlock advanced features</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            onClick={() => handleCheckout("pro")}
            disabled={loading !== null}
          >
            {loading === "pro" ? "Loading..." : "Upgrade to Pro"}
          </button>
        </div>

        {/* BEAST PLAN */}
        <div className="border rounded-xl p-4 flex-1 text-center shadow-md">
          <h3 className="text-lg font-semibold">Beast Plan</h3>
          <p className="mt-2 text-gray-700">$19.99 / month</p>
          <p className="mt-1 text-gray-500 text-sm">Unlock EVERYTHING</p>
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            onClick={() => handleCheckout("beast")}
            disabled={loading !== null}
          >
            {loading === "beast" ? "Loading..." : "Upgrade to Beast"}
          </button>
        </div>
      </div>
    </div>
  );
}
