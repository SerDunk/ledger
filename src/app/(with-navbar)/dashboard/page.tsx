import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import db from "@/lib/db";
import { workSans } from "../../../../public/fonts";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { totalSum } from "@/actions/actions";
import MembersModal from "@/components/dashboard/MembersModal";
import BudgetModal from "@/components/dashboard/BudgetModal";
import ShareModal from "@/components/dashboard/ShareModal";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const currUser = await currentUser();
  if (!currUser) return <div>Unauthorized</div>;

  let existingUser = await db.user.findUnique({
    where: {
      userId: currUser?.id,
    },
  });

  if (!existingUser) {
    const shareableToken = crypto.randomBytes(16).toString("hex");
    existingUser = await db.user.create({
      data: {
        userId: currUser.id,
        name: currUser.firstName + " " + currUser.lastName,
        email: currUser.emailAddresses[0].emailAddress,
        shareableToken,
      },
    });
  }

  const members = await db.member.findMany({
    where: {
      userId: currUser.id,
    },
  });
  const userMembershipFee = await db.user.findUnique({
    where: {
      userId: currUser.id,
    },
    select: {
      membershipFee: true,
      hideExpense: true,
    },
  });
  const memberships = members.filter((member) => member.isMember === true);
  const Budget = (userMembershipFee?.membershipFee || 0) * memberships.length;
  const Expense = await totalSum();
  const token = existingUser.shareableToken;
  const remainingBudget = Budget - Expense;

  return (
    <div className="flex flex-col py-4 px-2 sm:px-0 items-center min-h-screen">
      <div className="flex w-full max-w-2xl justify-between items-center mb-2">
        <div
          className={`text-xl sm:text-3xl ${workSans.className} font-bold text-gray`}
        >
          Welcome {currUser.fullName}!
        </div>
        <UserButton />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <MembersModal count={members.length} />
        <BudgetModal remainingBudget={remainingBudget} />
        <ShareModal
          token={token}
          hideExpense={userMembershipFee?.hideExpense || false}
          userId={currUser.id}
        />
      </div>
    </div>
  );
}
