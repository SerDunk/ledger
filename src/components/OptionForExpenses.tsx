"use client";

import { Switch } from "./ui/switch";
import { useExpenseContext } from "@/app/context";

export default function OptionForExpenses() {
  const { expenseView, setExpenseView } = useExpenseContext();
  console.log(expenseView);
  return (
    <div className="flex p-2 px-4 items-center justify-between border-slate-200 border-2 rounded-md">
      <div>
        <p className="text-slate-300">Hide expenses from members</p>
      </div>
      <div className="mt-1.5">
        <Switch onCheckedChange={(checked) => setExpenseView(checked)} />
      </div>
    </div>
  );
}
