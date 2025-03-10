import { NextResponse } from "next/server";
import db from "@/lib/db";
import { Resend } from "resend";
import Occasion from "@/emails/Occasion";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  console.log("Cron job started");

  try {
    // Get today's date
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // Months are 0-indexed in JavaScript
    const todayDay = today.getDate();

    // Query the database for members with birthdays or anniversaries today
    const members = await db.member.findMany({
      where: {
        OR: [
          {
            birthday: {
              equals: new Date(today.getFullYear(), todayMonth - 1, todayDay),
            },
          },
          {
            anniversary: {
              not: null,
              equals: new Date(today.getFullYear(), todayMonth - 1, todayDay),
            },
          },
        ],
      },
    });

    if (members.length > 0) {
      // If there are members with birthdays or anniversaries today, send an email
      for (const member of members) {
        const occasionType = member.birthday ? "birthday" : "anniversary";
        const occasionDate = member.birthday
          ? member.birthday
          : member.anniversary;

        await resend.emails.send({
          from: "abhinavkondapalli7@gmail.com",
          to: "sarojagoutham@yahoo.co.in",
          subject: `Reminder: ${member.firstName}'s ${occasionType}`,
          react: Occasion({
            userFirstname: "Saroja",
            occasionType,
            occasionDate,
          }),
        });

        console.log(`Email sent for ${member.firstName}'s ${occasionType}`);
      }
    } else {
      console.log("No birthdays or anniversaries today.");
    }

    return new NextResponse(
      "Cron job ran successfully: it checked for birthdays",
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in cron job:", error);
    return new NextResponse("Cron job failed", { status: 500 });
  }
}
