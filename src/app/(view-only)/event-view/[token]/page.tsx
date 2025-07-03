import db from "@/lib/db";
import EventView from "@/components/EventView";
export interface Event {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  total: number;
  expenses: {
    id: string;
    name: string;
    amount: number;
    eventId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

type ViewProps = {
  params: Promise<{ token: string }>;
};

export default async function eventViewPage({ params }: ViewProps) {
  const { token } = await params;

  if (!token) {
    return <div>Unauthorized</div>;
  }

  const userEvents = await db.user.findMany({
    where: {
      shareableToken: token,
    },
    include: {
      events: {
        include: {
          expenses: true,
        },
      },
    },
  });

  const events = userEvents[0]?.events ?? [];
  const hideExpense = userEvents[0]?.hideExpense ?? false;

  return <EventView events={events} token={token} hideExpense={hideExpense} />;
}
