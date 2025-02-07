"use server";

import db from "@/lib/db";
import { type Member } from "./MemberList";
import { totalSum } from "@/actions/actions";
import { cn } from "@/lib/utils";
import { workSans } from "../../public/fonts";

export default async function Budget({ userId }: { userId: string }) {
  const members: Member[] = await db.member.findMany({
    where: {
      userId: userId,
    },
  });
  const user = await db.user.findUnique({ where: { userId: userId } });
  const MEMBERSHIP_FEE = user!.membershipFee;
  const memberships: Member[] = members.filter(
    (member) => member.isMember === true
  );
  const Budget: number = MEMBERSHIP_FEE * memberships.length;
  const Expense = await totalSum();

  const remainingBudget = Budget - Expense;

  return (
    <div className="flex justify-center items-center pt-6 pb-4">
      <div>
        <h1
          className={cn(
            `text-6xl font-bold  ${workSans.className}`,
            remainingBudget >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {remainingBudget}
        </h1>
      </div>
    </div>
  );
}
