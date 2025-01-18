"use server";

import db from "@/lib/db";
import { type Member } from "./MemberList";
import { totalSum } from "@/actions/actions";
import { cn } from "@/lib/utils";

const MEMBERSHIP_FEE: number = 1500;

export default async function Budget() {
  const members: Member[] = await db.member.findMany();
  const memberships: Member[] = members.filter(
    (member) => member.isMember === true
  );
  const Budget: number = MEMBERSHIP_FEE * memberships.length;
  const Expense = await totalSum();

  const remainingBudget = Budget - Expense;

  return (
    <div className="flex justify-center items-center p-7 border-b-2 border-slate-400">
      <div>
        <h1
          className={cn(
            "text-5xl font-bold text-green-600",
            remainingBudget >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {remainingBudget}
        </h1>
      </div>
    </div>
  );
}
