import db from "@/lib/db";
import SearchableMemberList from "./SearchableMemberList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const user = await auth();

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  flatNumber: string;
  birthday: Date;
  anniversary: Date;
  isMember: boolean;
  createdAt: Date;
  updatedAt: Date;
};

if (!user.userId) {
  redirect("/sign-in");
}

export default async function MemberList() {
  if (!user.userId) redirect("/sign-in");
  const members: Member[] = await db.member.findMany({
    where: {
      userId: user.userId,
    },
  });
  return <SearchableMemberList members={members} />;
}
