"use client";

import { createContext, useContext } from "react";

interface ExpenseContextProps {
  expenseView: boolean;
  setExpenseView: (value: boolean) => void;
}

export const ExpenseContext = createContext<ExpenseContextProps | undefined>(
  undefined
);

export function useExpenseContext() {
  const context = useContext(ExpenseContext);

  if (context === undefined) {
    throw new Error(
      "useExpenseContext must be used within a ExpenseProviderWrapper"
    );
  }

  return context;
}
