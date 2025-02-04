import { GlobeIcon } from "@radix-ui/react-icons";
import { User, IndianRupeeIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Member } from "./MemberList";
import { totalSum } from "@/actions/actions";

const MEMBERSHIP_FEE: number = 1500;

export async function DashboardGrid() {
  const currUser = await auth();
  if (!currUser?.userId) return <div>Unauthorized</div>;

  const members = await db.member.findMany({
    where: {
      userId: currUser.userId,
    },
  });

  const memberships: Member[] = members.filter(
    (member) => member.isMember === true
  );
  const Budget: number = MEMBERSHIP_FEE * memberships.length;
  const Expense = await totalSum();

  const remainingBudget = Budget - Expense;

  const features = [
    {
      Icon: User,
      name: "Members",
      description: `Check your members details`,
      href: "/members",
      cta: "Learn more",
      background: (
        <div className="flex flex-col justify-center items-center w-full h-full p-6 mt-2  rounded-2xl  text-white">
          <div className="text-6xl font-extrabold ">{members.length}</div>
          <div className="uppercase text-sm font-semibold tracking-wide mt-2">
            Total Members
          </div>
        </div>
      ),
      className: "",
    },
    {
      Icon: IndianRupeeIcon,
      name: "Budget",
      description: "Analyse your event expenses.",
      href: "/expenses",
      cta: "Learn more",
      background: (
        <div className="flex flex-col justify-center items-center w-full h-full p-6  rounded-2xl  text-white">
          <div className="text-5xl font-extrabold ">
            ₹ {remainingBudget.toLocaleString()}
          </div>
          <div className="uppercase text-sm font-semibold tracking-wide mt-2">
            Remaining Budget
          </div>
        </div>
      ),
      className: "",
    },
    {
      Icon: GlobeIcon,
      name: "Share",
      description:
        "Want to share data with your members? Do it with this link.",
      href: "/",
      cta: "Learn more",
      background: <div className="absolute -right-20 -top-20 opacity-60" />,
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
