import db from "@/lib/db";

type ViewProps = {
  params: Promise<{ token: string }>;
};

export default async function memberView({ params }: ViewProps) {
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

  console.log(members);
}
