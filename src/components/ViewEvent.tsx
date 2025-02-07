import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { workSans } from "../../public/fonts";
import ViewExpense from "./ViewExpense";

type Expense = {
  id: string;
  name: string;
  amount: number;
  eventId: string;
};

type Event = {
  id: string;
  name: string;
  userId: string;
  total: number;
  expenses: Expense[];
};

export default function ViewEvent({ event }: { event: Event }) {
  return (
    <Collapsible key={event.id}>
      <CollapsibleTrigger className="w-full mt-2 bg-gray" asChild>
        <div className="flex justify-between items-center bg-gray-800 rounded-md text-white p-2 cursor-pointer">
          <div className="flex justify-around items-center font-semibold w-full">
            <h1 className={`text-lg w-40 ${workSans.className}`}>
              {event.name}
            </h1>
            <div className={`text-lg ${workSans.className}`}>
              ₹{event.total}
            </div>
          </div>
          <ChevronDown className="ml-2" />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="pl-4 pt-2">
        <ul className="flex flex-col gap-2">
          {event.expenses.map((expense) => (
            <div key={expense.id}>
              <ViewExpense expense={expense} />
            </div>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
