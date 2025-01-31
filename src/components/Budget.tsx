"use server";

import db from "@/lib/db";
import { type Member } from "./MemberList";
import { totalSum } from "@/app/(actions)/actions";
import { cn } from "@/lib/utils";
import { workSans } from "../../public/fonts";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MEMBERSHIP_FEE: number = 1500;

export default async function Budget() {
  const user = await auth();
  if (!user.userId) redirect("/sign-in");
  const members: Member[] = await db.member.findMany({
    where: {
      userId: user.userId,
    },
  });
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
