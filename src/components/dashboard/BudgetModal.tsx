"use client";

import React from "react";

export default function BudgetModal({
  remainingBudget,
}: {
  remainingBudget: number;
}) {
  return (
    <div className="w-full bg-gray rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white">
      <div className="text-3xl font-extrabold text-white mb-2">
        ₹ {remainingBudget.toLocaleString()}
      </div>
      <div className="text-lg text-white font-medium tracking-wide">
        Budget Left
      </div>
    </div>
  );
}
