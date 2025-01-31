import Budget from "@/(components)/Budget";
import ExpenseList from "@/(components)/ExpenseList";
import EventForm from "@/(components)/EventForm";

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
