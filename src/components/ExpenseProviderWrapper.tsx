"use client";

import { useState } from "react";
import { ExpenseContext } from "../app/context";

export function ExpenseProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expenseView, setExpenseView] = useState(false);

  return (
    <ExpenseContext.Provider value={{ expenseView, setExpenseView }}>
      {children}
    </ExpenseContext.Provider>
  );
}
