"use server";

import db from "@/lib/db";
import { type Member } from "./MemberList";

const MEMBERSHIP_FEE: number = 1500;

export default async function Budget() {
  const members: Member[] = await db.member.findMany();
  const memberships: Member[] = members.filter(
    (member) => member.isMember === true
  );
  const Budget: number = MEMBERSHIP_FEE * memberships.length;

  return (
    <div className="flex justify-center items-center mt-5 p-7 border-b-2 border-slate-400">
      <div>
        <h1 className="text-5xl font-bold text-green-600">{Budget}</h1>
      </div>
    </div>
  );
}
