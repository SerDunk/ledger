import db from "@/lib/db";
import { workSans } from "../../../../../public/fonts";
import ViewEvent from "@/components/ViewEvent";
import ViewNavbar from "@/components/ViewNavbar";

type ViewProps = {
  params: Promise<{ token: string }>;
};

export default async function eventViewPage({ params }: ViewProps) {
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

    const events = userEvents[0].events;
    const year = new Date().getFullYear();
    return (
      <div className="mt-6">
        <div className={`text-3xl font-bold ${workSans.className}`}>
          {`Event List : ${year}`}
        </div>
        <div>
          {events.length == 0 && (
            <div
              className={`text-center mt-40 text-gray flex justify-center items-center ${workSans.className}`}
            >
              <p>No events found</p>
            </div>
          )}
          {events.map((event) => {
            return (
              <div key={event.id}>
                <ViewEvent event={event} />
              </div>
            );
          })}
        </div>
        <div>
          <ViewNavbar token={token} />
        </div>
      </div>
    );
  }
}
