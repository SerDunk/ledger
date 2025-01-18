import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function updateEventTotal(eventId: string) {
  const total = await db.expense.aggregate({
    where: {
      eventId: eventId,
    },
    _sum: { amount: true },
  });

  await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      total: total._sum.amount !== null ? total._sum.amount : undefined,
    },
  });
}

export { updateEventTotal };

export default db;
