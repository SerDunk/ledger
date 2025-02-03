import ViewMember from "@/components/ViewMember";
import db from "@/lib/db";
import { workSans } from "../../../../../public/fonts";

type ViewProps = {
  params: Promise<{ token: string }>;
};

export default async function memberViewPage({ params }: ViewProps) {
  const { token } = await params;
  if (!token) return <div>Unauthorized</div>;
  const members = await db.user.findMany({
    where: {
      shareableToken: token,
    },
    select: {
      member: true,
    },
  });

  return (
    <div className="mt-6">
      <div className={`text-3xl font-bold ${workSans.className}`}>
        Member List : 2025
      </div>
      {members.map((member) => {
        return (
          <div key={member.member[0].id}>
            <ViewMember member={member.member[0]} />
          </div>
        );
      })}
    </div>
  );
}
