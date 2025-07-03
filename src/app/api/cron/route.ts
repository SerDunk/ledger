import { NextResponse } from "next/server";
import db from "@/lib/db";
import { Resend } from "resend";
import Occasion from "@/emails/Occasion";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  console.log("Cron job started");

  try {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

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
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (members.length > 0) {
      // If there are members with birthdays or anniversaries today, send an email
      for (const member of members) {
        const occasionType = member.birthday ? "birthday" : "anniversary";
        const occasionDate = member.birthday
          ? member.birthday
          : member.anniversary;
        const toEmail = member.user?.email;
        const userFirstname = member.user?.name || "User";
        if (!toEmail) continue;

        await resend.emails.send({
          from: "abhinavkondapalli7@gmail.com",
          to: toEmail,
          subject: `Reminder: ${member.firstName}'s ${occasionType}`,
          react: Occasion({
            userFirstname,
            occasionType,
            occasionDate,
          }),
        });

        console.log(
          `Email sent to ${toEmail} for ${member.firstName}'s ${occasionType}`
        );
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
