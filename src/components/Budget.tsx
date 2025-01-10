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
    <div>
      <div>
        <h1 className="text-xl font-bold text-pink-red mb-2">
          Total Budget: {Budget}
        </h1>
      </div>
    </div>
  );
}
