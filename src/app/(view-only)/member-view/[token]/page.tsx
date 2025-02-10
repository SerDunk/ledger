import ViewMember from "@/components/ViewMember";
import db from "@/lib/db";
import { workSans } from "../../../../../public/fonts";
import ViewNavbar from "@/components/ViewNavbar";

type ViewProps = {
  params: { token: string };
};

export default async function MemberViewPage({ params }: ViewProps) {
  const { token } = params;
  if (!token) return <div>Unauthorized</div>;

  const members = await db.user.findMany({
    where: { shareableToken: token },
    select: { member: true },
  });

  return (
    <div className="mt-6">
      <div className={`text-3xl font-bold ${workSans.className}`}>
        Member List : 2025
      </div>
      {members.map((member) => (
        <div key={member.member[0].id}>
          <ViewMember member={member.member[0]} />
        </div>
      ))}
      <div>
        <ViewNavbar token={token} />
      </div>
    </div>
  );
}
