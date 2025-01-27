import db from "@/lib/db";
import SearchableMemberList from "./SearchableMemberList";

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

export default async function MemberList() {
  const members: Member[] = await db.member.findMany();
  return <SearchableMemberList members={members} />;
}
