"use client";

import type { Event } from "@/app/(view-only)/event-view/[token]/page";
import { workSans } from "../../public/fonts";
import ViewEvent from "@/components/ViewEvent";
import ViewNavbar from "@/components/ViewNavbar";
import { useSearchParams } from "next/navigation";

export default function EventView({
  events,
  token,
}: {
  events: Event[];
  token: string;
}) {
  const year = new Date().getFullYear();
  const searchParams = useSearchParams();
  const expenseView = searchParams.get("expenseView") === "true";

  if (!expenseView) return null;

  return (
    <div className="mt-6">
      <div className={`text-3xl font-bold ${workSans.className}`}>
        {`Event List : ${year}`}
      </div>

      {events.length === 0 ? (
        <div
          className={`text-center mt-40 text-gray flex justify-center items-center ${workSans.className}`}
        >
          <p>No events found</p>
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id}>
            <ViewEvent event={event} />
          </div>
        ))
      )}

      <div>
        <ViewNavbar token={token} />
      </div>
    </div>
  );
}
