import { Expense } from "./EventForm";
import { workSans } from "../../public/fonts";

export default function ViewExpense({ expense }: { expense: Expense }) {
  return (
    <li
      className={`flex justify-between px-8 p-2 text-lg w-full ${workSans.className}`}
    >
      <div className="flex gap-4 w-full items-center justify-between border-b-2 py-2 border-gray ">
        <div className="flex justify-between w-full ">
          <span>{expense.name}</span>
          <p className="text-left w-16">{expense.amount}</p>
        </div>
      </div>
    </li>
  );
}
