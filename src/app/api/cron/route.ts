import { NextResponse } from "next/server";
import { sendMessage } from "../../../../services/whatsappClient";
import { getEvents } from "../../../../services/eventService";

export async function GET() {
  try {
    console.log("Checking for events");
    const { upcomingBirthdays, upcomingAnniversaries } = await getEvents();

    if (upcomingBirthdays.length > 0) {
      const names = upcomingBirthdays.map(
        (member) => `${member.firstName} ${member.lastName}`
      );
      const message = `🎉 Reminder: Tomorrow is the birthday of ${names}.`;
      await sendMessage(message);
    }

    if (upcomingAnniversaries.length > 0) {
      const names = upcomingAnniversaries.map(
        (member) => `${member.firstName} ${member.lastName}`
      );
      const message = `🎉 Reminder: Tomorrow is the anniversary of ${names}.`;
      await sendMessage(message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to run cron job" });
    console.log(error);
  }
}
