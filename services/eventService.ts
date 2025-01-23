import db from "@/lib/db";

export async function getEvents() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const upcomingBirthdays = await db.member.findMany({
    where: {
      birthday: {
        gte: today,
        lte: tomorrow,
      },
    },
  });

  const upcomingAnniversaries = await db.member.findMany({
    where: {
      anniversary: {
        gte: today,
        lte: tomorrow,
      },
    },
  });

  return { upcomingBirthdays, upcomingAnniversaries };
}
