import Occasion from "@/emails/Occasion";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "abhinavkondapalli7@gmail.com",
    subject: "Reminder for your birthday/anniversary",
    react: Occasion({ userFirstname: "Saroja" }),
  });
}
