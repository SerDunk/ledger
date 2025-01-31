"use client";

import { addEventAndExpense } from "@/(actions)/actions";
import { Button } from "@/(components)/ui/button";
import { Input } from "@/(components)/ui/input";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Toaster, toast } from "sonner";
import { workSans } from "../../public/fonts";

export type Expense = {
  name: string;
  amount: number;
};

export default function EventForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [data, action, isPending] = useActionState(
    addEventAndExpense,
    undefined
  );

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

  const closeForm = () => {
    setOpen(false);
    setExpenses(null);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    if (data) {
      if (data.success) {
        setOpen(false);
        toast.success(data.message);
        setExpenses(null);
      } else {
        toast.error(data.message);
      }
    }
  }, [data]);

  return (
    <div className={`${workSans.className}`}>
      <Toaster />
      <Button
        onClick={handleClick}
        className="w-full bg-black rounded-md font-semibold"
      >
        Add Event
      </Button>
      {open && (
        <div className="fixed flex justify-center items-center mb-40 inset-0 bg-opacity-50 bg-black h-full">
          <form
            action={action}
            className="flex flex-col gap-2 bg-white p-6 border-2 border-gray rounded-md w-full max-w-sm shadow-lg transform transition-transform duration-300"
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
            {data?.fieldErrors?.["eventName"] && (
              <div className="text-red-500 text-sm px-2">
                {data.fieldErrors?.["eventName"]}
              </div>
            )}

            <div>
              {expenses?.map((expense, index) => (
                <div
                  className="flex gap-2 p-2 w-full items-center justify-between"
                  key={index}
                >
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      name={`expenseName`}
                      id={`expenseName`}
                      placeholder="Name"
                      className="w-[60%]"
                    />
                    <Input
                      type="number"
                      name={`expenseAmount`}
                      id={`expenseAmount`}
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
              {data?.fieldErrors &&
                expenses?.map((_, index: number) => (
                  <div key={index}>
                    {data?.fieldErrors?.expenses?.[index] && (
                      <div className="text-red-500 text-sm">
                        {data?.fieldErrors?.expenses?.[index]}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex gap-2 p-2">
              <Button
                type="submit"
                className="bg-green-500 text-white w-full"
                disabled={isPending}
              >
                Submit
              </Button>
              <Button
                onClick={closeForm}
                className="bg-red-500 text-white w-full"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
