import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Member } from "./MemberList";
import { totalSum } from "@/actions/actions";
import ShareableLink from "./CopyLink";
import MembershipFeeInput from "./MembershipFeeInput";
import { OptionForExpenses } from "./OptionForExpenses";

export async function DashboardGrid() {
  const currUser = await auth();
  if (!currUser?.userId) return <div>Unauthorized</div>;

  const members = await db.member.findMany({
    where: {
      userId: currUser.userId,
    },
  });

  const userMembershipFee = await db.user.findUnique({
    where: {
      userId: currUser.userId,
    },
    select: {
      membershipFee: true,
      hideExpense: true,
    },
  });

  const memberships: Member[] = members.filter(
    (member) => member.isMember === true
  );
  const Budget: number = userMembershipFee!.membershipFee * memberships.length;
  const Expense = await totalSum();

  const token = await db.user.findUnique({
    where: {
      userId: currUser.userId,
    },
    select: {
      shareableToken: true,
    },
  });

  const remainingBudget = Budget - Expense;

  const features = [
    {
      name: "Members",
      description: `Check your members details`,
      href: "/members",
      cta: "Learn more",
      main: (
        <div className="h-full w-full flex flex-col">
          <div className="text-4xl font-extrabold text-white">
            {members.length}
          </div>
        </div>
      ),

      className: "",
    },
    {
      name: "Budget",
      description: "Analyse your event expenses.",
      href: "/expenses",
      cta: "Learn more",
      main: (
        <div className="h-full w-full flex flex-col">
          <div className="text-white text-3xl font-extrabold">
            ₹ {remainingBudget.toLocaleString()}
          </div>
        </div>
      ),
      className: "",
    },
    {
      name: "Share",
      description: "",
      href: "/",
      cta: "",
      main: (
        <div className="flex flex-col gap-4">
          <ShareableLink shareableToken={token!.shareableToken!} />
          <MembershipFeeInput />
          <OptionForExpenses initialValue={userMembershipFee!.hideExpense} />
        </div>
      ),
      className: "col-span-2",
    },
  ];

  return (
    <BentoGrid className="grid-cols-2">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
