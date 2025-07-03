"use client";

import type { Event } from "@/app/(view-only)/event-view/[token]/page";
import { workSans } from "../../public/fonts";
import ViewEvent from "@/components/ViewEvent";
import ViewNavbar from "@/components/ViewNavbar";

export default function EventView({
  events,
  token,
  hideExpense,
}: {
  events: Event[];
  token: string;
  hideExpense: boolean;
}) {
  const year = new Date().getFullYear();
  if (hideExpense) {
    return (
      <div className="mt-6">
        <div
          className={`text-3xl font-bold ${workSans.className}`}
        >{`Event List : ${year}`}</div>
        <div>
          <ViewNavbar token={token} hideExpense={true} />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-6">
      <div
        className={`text-3xl font-bold ${workSans.className}`}
      >{`Event List : ${year}`}</div>
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
        <ViewNavbar token={token} hideExpense={false} />
      </div>
    </div>
  );
}
