import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import db from "@/lib/db";
import { workSans } from "../../../../public/fonts";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { DashboardGrid } from "@/components/DashboardGrid";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const currUser = await currentUser();
  if (!currUser) return <div>Unauthorized</div>;

  const existingUser = await db.user.findUnique({
    where: {
      userId: currUser?.id,
    },
  });

  if (!existingUser) {
    const shareableToken = crypto.randomBytes(16).toString("hex");
    await db.user.create({
      data: {
        userId: currUser.id,
        name: currUser.firstName + " " + currUser.lastName,
        email: currUser.emailAddresses[0].emailAddress,
        shareableToken,
      },
    });
  }

  return (
    <div className="flex flex-col py-6 items-center">
      <div className="flex w-full justify-between">
        <div
          className={`text-lg ${workSans.className} font-semibold text-gray`}
        >
          Welcome {currUser.fullName} !
        </div>
        <div>
          <UserButton />
        </div>
      </div>

      <div className="py-4">
        <DashboardGrid />
      </div>
    </div>
  );
}
