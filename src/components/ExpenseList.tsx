import { deleteEvent } from "@/actions/actions";
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

import EditableExpense from "./EditableExpense";

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
                    <div>{event.total}</div>
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
                  return <EditableExpense key={expense.id} expense={expense} />;
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}
