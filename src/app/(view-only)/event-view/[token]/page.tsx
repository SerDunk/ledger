import db from "@/lib/db";

import ViewEvent from "@/components/ViewEvent";

type ViewProps = {
  params: Promise<{ token: string }>;
};

export default async function memberViewPage({ params }: ViewProps) {
  const { token } = await params;

  if (!token) {
    return <div>Unauthorized</div>;
  } else {
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
    console.log(userEvents);
    const events = userEvents[0].events;
    console.log(events);
    return (
      <div>
        {/* {events.length == 0 && (
          <div
            className={`text-center mt-40 text-gray flex justify-center items-center ${workSans.className}`}
          >
            <p>No events found</p>
          </div>
        )} */}
        {events.map((event) => {
          return (
            <div key={event.id}>
              <ViewEvent event={event} />
            </div>
          );
        })}
      </div>
    );
  }
}
