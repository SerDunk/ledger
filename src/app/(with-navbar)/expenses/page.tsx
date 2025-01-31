"use server";
import Budget from "@/components/Budget";
import ExpenseList from "@/components/ExpenseList";
import EventForm from "@/components/EventForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Expenses() {
  const user = await auth();
  if (!user.userId) redirect("/sign-in");
  return (
    <div className="relative">
      <div>
        <Budget userId={user.userId} />
      </div>
      <div>
        <EventForm />
      </div>
      <div>
        <ExpenseList userId={user.userId} />
      </div>
    </div>
  );
}
