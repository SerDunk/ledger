"use client";

import { addEventAndExpense } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { FormEvent, useState } from "react";

export type Expense = {
  name: string;
  amount: number;
};

export default function EventForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<Expense[] | null>(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const addField = () => {
    if (expenses) {
      setExpenses([...expenses, { name: "", amount: 0 }]);
    } else {
      setExpenses([{ name: "", amount: 0 }]);
    }
  };

  const deleteField = (index: number) => {
    if (expenses) {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (expenses) {
      formData.append("expenses", JSON.stringify(expenses));
    }

    addEventAndExpense(formData);
  };
  return (
    <div>
      <Button onClick={handleClick}>Add</Button>
      {open && (
        <div className="fixed flex justify-center items-center mb-40 inset-0">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 bg-white p-6 rounded-md w-full max-w-sm shadow-lg transform transition-transform duration-300"
          >
            <div className="flex justify-between items-center gap-2 p-2">
              <Input
                type="text"
                name="eventName"
                id="eventName"
                placeholder="Event Name"
                className="w-full"
              />
              <div className="rounded bg-black text-center text-white p-1">
                <Plus onClick={addField} />
              </div>
            </div>

            <div>
              {expenses?.map((expense, index) => (
                <div
                  className="flex gap-2 p-2 w-full items-center justify-between"
                  key={index}
                >
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      name={`expenseName-${index}`}
                      id={`expenseName-${index}`}
                      placeholder="Name"
                      className="w-[60%]"
                    />
                    <Input
                      type="number"
                      name={`expenseAmount-${index}`}
                      id={`expenseAmount-${index}`}
                      placeholder="Amount"
                      className="w-[40%]"
                    />
                  </div>
                  <div
                    className="rounded bg-red-500 p-1 text-white cursor-pointer"
                    onClick={() => deleteField(index)}
                  >
                    <Minus />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-2">
              <Button type="submit" className="bg-green-500 text-white w-full">
                Submit
              </Button>
              <Button className="bg-red-500 text-white w-full">Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
