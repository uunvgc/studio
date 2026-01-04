// app/page.tsx
"use client";

import { useState } from "react";
import UpgradePlan from "@/components/views/UpgradePlan";
import type { PlanTier } from "@/lib/types";

export default function Page() {
  // Track the current plan for this user (could come from your backend later)
  const [currentPlan, setCurrentPlan] = useState<PlanTier>("free");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">
          Upgrade Your FiiLTHY Experience
        </h1>
        <p className="mt-2 text-lg text-gray-600 max-w-xl mx-auto">
          Choose a plan that fits your ambition and unlock next-level features.
        </p>
      </header>

      <UpgradePlan
        currentPlan={currentPlan}
        setCurrentPlan={setCurrentPlan}
      />
    </div>
  );
}
