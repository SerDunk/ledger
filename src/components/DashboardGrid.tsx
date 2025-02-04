import { GlobeIcon } from "@radix-ui/react-icons";
import { User, DollarSignIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function DashboardGrid() {
  const currUser = await auth();
  if (!currUser?.userId) return <div>Unauthorized</div>;

  // Fetch members from the database
  const members = await db.member.findMany({
    where: {
      userId: currUser.userId,
    },
  });

  const features = [
    {
      Icon: User,
      name: "Members",
      description: `Check your members details`,
      href: "/",
      cta: "Learn more",
      background: (
        <div className="flex flex-col justify-center mt-14 items-start ml-4">
          <div className="text-7xl font-bold">{members.length}</div>
          <div className=" uppercase text-sm font-semibold">members</div>
        </div>
      ),
      className: "",
    },
    {
      Icon: DollarSignIcon,
      name: "Events",
      description: "Analyse your event expenses.",
      href: "/",
      cta: "Learn more",
      background: <div className="absolute -right-20 -top-20 opacity-60" />,
      className: "",
    },
    {
      Icon: GlobeIcon,
      name: "Share",
      description: "Want to share data to your members? Do with this link",
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
