import db from "@/lib/db";

export default async function memberView({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  if (!token) return <div>Unauthorized</div>;
  const members = db.user.findMany({
    where: {
      shareableToken: token,
    },
    select: {
      member: true,
    },
  });

  console.log(members);
}
