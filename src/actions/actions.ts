"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { type Expense } from "@/components/EventForm";

//Add member to database
export async function addMember(previousData: unknown, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const flat = formData.get("flat") as string;
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const anniversary = formData.get("anniversary") as string;

  if (
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !flat ||
    !dateOfBirth ||
    !anniversary
  ) {
    return {
      success: false,
      message: "Missing fields",
      fieldData: {
        firstName,
        lastName,
        phoneNumber,
        flat,
        dateOfBirth,
        anniversary,
      },
    };
  }

  if (phoneNumber.length !== 10) {
    return {
      success: false,
      message: "Invalid phone number",
      fieldData: {
        firstName,
        lastName,
        flat,
        phoneNumber,
        dateOfBirth,
        anniversary,
      },
    };
  }
  if (flat.length !== 3) {
    return {
      success: false,
      message: "Invalid flat number",
      fieldData: {
        firstName,
        lastName,
        phoneNumber,
        flat,
        dateOfBirth,
        anniversary,
      },
    };
  }

  try {
    const existingMember = await db.member.findUnique({
      where: {
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
      },
    });
    if (existingMember) {
      return {
        success: false,
        message: "Member already exists",
        fieldData: {
          firstName,
          lastName,
          phoneNumber,
          flat,
          dateOfBirth,
          anniversary,
        },
      };
    }

    await db.member.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        flatNumber: flat,
        birthday: new Date(dateOfBirth),
        anniversary: new Date(anniversary),
      },
    });
    console.log("Member created");
    revalidatePath("/members");
    return { success: true, message: "Member added successfully" };
  } catch (e) {
    console.log("Failed to add member to database:", e);
    return { success: false, message: "Failed to add member.Please try again" };
  }
}

//Delete member from database
export async function deleteMember(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await db.member.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/members");
  } catch (e) {
    console.log(e);
  }
}

//Toggles Membership
export async function toggleMembership(formData: FormData) {
  const currentIsMember = formData.get("isMember") === "true";
  const id = formData.get("id") as string;
  const toggledIsMember = !currentIsMember;

  try {
    await db.member.update({
      where: {
        id: id,
      },
      data: {
        isMember: toggledIsMember,
      },
    });
    revalidatePath("/members");
  } catch (e) {
    console.log(e);
  }
}

//Add Event name and its expenses to database
export async function addEventAndExpense(
  previousData: unknown,
  formData: FormData
) {
  const eventName = formData.get("eventName") as string;
  const expenseName = formData.getAll("expenseName") as string[];
  const expenseAmount = formData.getAll("expenseAmount") as string[];

  const expenses: Expense[] = expenseName.map((name, index) => {
    return {
      name,
      amount: parseInt(expenseAmount[index]),
    };
  });

  try {
    await db.event.create({
      data: {
        name: eventName,
        expenses: {
          create: expenses,
        },
      },
    });

    revalidatePath("/expenses");
    return { success: true, message: "Event added" };
  } catch (e) {
    console.log(e);
    return { success: false, message: `Could not add event` };
  }
}

//Delete event with expenses from database
export async function deleteEvent(formData: FormData) {
  const eventId = formData.get("id") as string;

  try {
    await db.expense.deleteMany({
      where: {
        eventId: eventId,
      },
    });

    await db.event.delete({
      where: {
        id: eventId,
      },
    });
    revalidatePath("/expenses");
  } catch (e) {
    console.log(e);
  }
}

//Delete expenses from database
export async function deleteExpense(formData: FormData) {
  const expenseId = formData.get("id") as string;

  try {
    await db.expense.delete({
      where: {
        id: expenseId,
      },
    });

    revalidatePath("/expenses");
  } catch (e) {
    console.log(e);
  }
}

//Calculating total sum of each event from database
export async function totalSum(eventId: string) {
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      expenses: true,
    },
  });

  const total = event?.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return total;
}
