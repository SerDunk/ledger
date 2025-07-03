// app/components/OptionForExpenses.tsx
"use client";
import { useState } from "react";
import { Switch } from "./ui/switch";

export function OptionForExpenses({ initialValue }: { initialValue: boolean }) {
  const [isHidden, setIsHidden] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await fetch("/api/hide-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: !isHidden }),
      });
      setIsHidden((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex p-2 px-4 items-center justify-between border-slate-200 border-2 rounded-md">
      <div>
        <p className="text-slate-300">Hide expenses from members</p>
      </div>
      <div className="mt-1.5">
        <button type="button" onClick={handleToggle} disabled={loading}>
          <Switch checked={isHidden} />
        </button>
      </div>
    </div>
  );
}

// TODO: Create /api/hide-expense API route to update hideExpense in the database for the current user.
