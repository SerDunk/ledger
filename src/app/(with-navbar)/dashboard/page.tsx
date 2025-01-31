import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import db from "@/lib/db";
import { workSans } from "../../../../public/fonts";
import { redirect } from "next/navigation";

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
    await db.user.create({
      data: {
        userId: currUser.id,
        name: currUser.firstName + " " + currUser.lastName,
        email: currUser.emailAddresses[0].emailAddress,
      },
    });
  }

  return (
    <div className="flex justify-between py-6 items-center">
      <div className={`text-lg ${workSans.className} font-semibold text-gray`}>
        Welcome {currUser.fullName} !
      </div>
      <UserButton />
    </div>
  );
}
