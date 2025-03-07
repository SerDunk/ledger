import ViewMember from "@/components/ViewMember";
import db from "@/lib/db";
import { workSans } from "../../../../../public/fonts";
import ViewNavbar from "@/components/ViewNavbar";

type ViewProps = {
  params: Promise<{ token: string }>;
};

export default async function MemberViewPage({ params }: ViewProps) {
  const { token } = await params;
  if (!token) return <div>Unauthorized</div>;

  const members = await db.user.findMany({
    where: { shareableToken: token },
    select: { member: true },
  });

  console.log(members[0]);

  return (
    <div className="mt-6">
      <div className={`text-3xl font-bold ${workSans.className}`}>
        Member List : 2025
      </div>
      {members.map((member) =>
        member.member.map((member) => (
          <div key={member.id}>
            <ViewMember member={member} />
          </div>
        ))
      )}
      <div>
        <ViewNavbar token={token} />
      </div>
    </div>
  );
}
