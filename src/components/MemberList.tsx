import db from "@/lib/db";
import MemberCollapsible from "./MemberCollapsible";

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
  const memberships = members.filter((member) => member.isMember === true);

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold text-pink-red mb-4">
          Total Memberships: {memberships.length}
        </h1>
      </div>
      <MemberCollapsible members={members} />
    </div>
  );
}
