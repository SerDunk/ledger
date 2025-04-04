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

  const year = new Date().getFullYear();

  return (
    <div className="mt-6">
      <div className={`text-3xl font-bold ${workSans.className}`}>
        {`Member List : ${year}`}
      </div>
      {members.length == 0 && (
        <div
          className={`text-center mt-40 text-gray flex justify-center items-center ${workSans.className}`}
        >
          <p>No Members found</p>
        </div>
      )}
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
