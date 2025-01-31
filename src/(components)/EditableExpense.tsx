"use client";

import { useEffect, useState } from "react";
import { updateExpense, deleteExpense } from "@/(actions)/actions";
import { X, Pencil, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useActionState } from "react";
import { workSans } from "../../public/fonts";

type Expense = {
  name: string;
  amount: number;
  id: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function EditableExpense({ expense }: { expense: Expense }) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, action, isPending] = useActionState(updateExpense, undefined);

  useEffect(() => {
    if (data) {
      if (data.success) {
        setIsEditing(false);
      }
    }
  }, [data]);

  return (
    <li
      className={`flex justify-between px-8 p-2  text-lg w-full ${workSans.className}`}
    >
      {isEditing ? (
        <form
          action={action}
          className="flex gap-2 w-full justify-between items-center"
        >
          <div className="flex justify-between w-60">
            <input type="hidden" name="id" value={expense.id} />
            <input type="hidden" name="eventId" value={expense.eventId} />
            <input
              type="text"
              defaultValue={expense.name || ""}
              name="name"
              className="border rounded px-2 py-1 w-36"
            />
            {data?.fieldErrors?.name && (
              <p className="text-red-500">{data.fieldErrors.name}</p>
            )}
            <input
              type="number"
              defaultValue={expense.amount || 0}
              name="amount"
              className="border rounded px-2 py-1 w-16"
            />
            {data?.fieldErrors?.name && (
              <p className="text-red-500">{data.fieldErrors.amount}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              disabled={isPending}
              type="submit"
              className="px-2 py-1 bg-green-500 text-white"
            >
              <Check className="h-4 w-4 text-white" />
            </Button>
            <Button
              type="button"
              className="px-2 py-1 bg-red-500 text-white"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex gap-4 w-full items-center justify-between border-b-2 py-2 border-gray py-1">
          <form action={deleteExpense}>
            <input type="hidden" name="id" value={expense.id} />
            <Button variant="ghost">
              <X className="h-4 w-4 text-red-500 text-center" />
            </Button>
          </form>
          <div className="flex justify-between w-60 ">
            <span>{expense.name}</span>
            <p className="text-left w-16">{expense.amount}</p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="self-end bg-gray"
          >
            <Pencil className="h-2 w-2 text-white " />
          </Button>
        </div>
      )}
    </li>
  );
}
