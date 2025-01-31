import Budget from "@/app/(components)/Budget";
import ExpenseList from "@/app/(components)/ExpenseList";
import EventForm from "@/app/(components)/EventForm";

export default function Expenses() {
  return (
    <div className="relative">
      <div>
        <Budget />
      </div>
      <div>
        <EventForm />
      </div>
      <div>
        <ExpenseList />
      </div>
    </div>
  );
}
