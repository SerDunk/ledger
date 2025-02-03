"use server";

import db from "@/lib/db";
import SearchableMemberList from "./SearchableMemberList";

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  flatNumber: string;
  birthday: Date;
  anniversary: Date | null;
  isMember: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default async function MemberList({ id: userId }: { id: string }) {
  const members: Member[] = await db.member.findMany({
    where: {
      userId: userId,
    },
  });
  return <SearchableMemberList members={members} />;
}
