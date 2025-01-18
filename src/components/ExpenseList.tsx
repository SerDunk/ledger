import { deleteEvent, deleteExpense } from "@/actions/actions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import db from "@/lib/db";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { totalSum } from "@/actions/actions";

export default async function ExpenseList() {
  const events = await db.event.findMany({
    include: {
      expenses: true,
    },
  });

  return (
    <div>
      {events.map((event) => {
        return (
          <Collapsible key={event.id}>
            <CollapsibleTrigger className="w-full mt-2" asChild>
              <div className="flex justify-between items-center bg-slate-400 text-white p-2">
                <div className="flex gap-4 items-center w-full  text-left">
                  <Dialog>
                    <DialogTrigger>
                      <span>
                        <X className="w-4 h-4 text-red-500" />
                      </span>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. It will permanently
                          delete event
                          <strong> {event.name}</strong>
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <form
                          action={deleteEvent}
                          className="flex justify-center items-center"
                        >
                          <input type="hidden" name="id" value={event.id} />
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-red-500 rounded-md"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex justify-around items-center w-full">
                    <h1 className="text-2xl w-40">{event.name}</h1>
                    <div>{totalSum(event.id)}</div>
                  </div>
                </div>
                <div>
                  <ChevronDown />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="flex flex-col">
                {event.expenses.map((expense) => {
                  return (
                    <li key={expense.id}>
                      <div className="flex justify-between px-8 p-2 bg-red-200 text-lg">
                        <div className="flex gap-4 justify-center items-center ">
                          <form action={deleteExpense}>
                            <input type="hidden" name="id" value={expense.id} />
                            <Button variant={"ghost"}>
                              <X className="h-4 w-4 text-red-500 text-center" />
                            </Button>
                          </form>
                          <h3>{expense.name}</h3>
                        </div>
                        <p className="text-left w-16">{expense.amount}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}
