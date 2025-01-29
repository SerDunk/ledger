import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import db from "@/lib/db";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) return <div>Unauthorized</div>;
  console.log(userId);

  const currUser = await currentUser();
  if (!currUser) return <div>Unauthorized</div>;

  const existingUser = await db.user.findUnique({
    where: {
      userId: currUser?.id,
    },
  });

  if (!existingUser) {
    const newMember = await db.member.create({
      data: {
        firstName: currUser.firstName ?? "",
        lastName: currUser.lastName ?? "",
        phoneNumber: "NA",
        flatNumber: "NA",
        birthday: new Date(),
        anniversary: new Date(),
        isMember: false,
        admin: true,
      },
    });

    await db.user.create({
      data: {
        userId: currUser.id,
        name: newMember.firstName + " " + newMember.lastName,
        memberId: newMember.id,
        email: currUser.emailAddresses[0].emailAddress,
      },
    });
  }

  return (
    <div className="flex justify-between py-6 items-center">
      <div>Dashboard</div>
      <UserButton />
    </div>
  );
}
