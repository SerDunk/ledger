"use server";

import db, { updateEventTotal } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { eventSchema, memberSchema, expenseSchema } from "@/schema/schema";

//Add member to database
export async function addMember(previousData: unknown, formData: FormData) {
  const unvalidatedData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    flat: formData.get("flat") as string,
    birthday: formData.get("birthday") as string,
    anniversary: formData.get("anniversary") as string,
  };

  const validatedData = memberSchema.safeParse(unvalidatedData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Validation errors occurred",
      fieldErrors: validatedData.error.flatten().fieldErrors,
      fieldData: unvalidatedData,
    };
  }

  const { firstName, lastName, phoneNumber, flat, birthday, anniversary } =
    validatedData.data;

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
        fieldData: validatedData.data,
      };
    }

    await db.member.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        flatNumber: flat,
        birthday: new Date(birthday),
        anniversary: new Date(anniversary),
      },
    });

    console.log("Member created");
    revalidatePath("/members");
    return { success: true, message: "Member added successfully" };
  } catch (e) {
    console.log("Failed to add member to database:", e);
    return {
      success: false,
      message: "Failed to add member. Please try again",
    };
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

  const expenses = expenseName.map((name, index) => ({
    name,
    amount: parseInt(expenseAmount[index]),
  }));

  const validatedData = eventSchema.safeParse({
    eventName,
    expenses,
  });

  if (!validatedData.success) {
    return {
      success: false,
      message: "Validation errors occurred",
      fieldErrors: validatedData.error.flatten().fieldErrors,
      fieldData: { eventName, expenses },
    };
  }

  try {
    const event = await db.event.create({
      data: {
        name: eventName,
        expenses: {
          create: expenses,
        },
      },
    });

    await updateEventTotal(event.id);
    revalidatePath("/expenses");
    return { success: true, message: "Event added successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Could not add event" };
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
    const expense = await db.expense.delete({
      where: {
        id: expenseId,
      },
    });
    await updateEventTotal(expense.eventId);
    revalidatePath("/expenses");
  } catch (e) {
    console.log(e);
  }
}

//Calculating total sum of each event from database
export async function totalSum() {
  const events = await db.event.findMany();
  const total = events.reduce((sum, event) => sum + event.total, 0);
  return total;
}

//Update the expense amount and name
export async function updateExpense(previousData: unknown, formData: FormData) {
  const newExpenseName = formData.get("name") as string;
  const newExpenseAmount = formData.get("amount") as string;
  const expenseId = formData.get("id") as string;
  const eventId = formData.get("eventId") as string;

  const validatedData = expenseSchema.safeParse({
    name: newExpenseName,
    amount: newExpenseAmount,
  });

  if (!validatedData.success) {
    return {
      success: false,
      fieldErrors: validatedData.error.flatten().fieldErrors,
      fieldData: { newExpenseName, newExpenseAmount },
    };
  }

  try {
    await db.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        name: newExpenseName,
        amount: parseInt(newExpenseAmount),
      },
    });
    await updateEventTotal(eventId);
    revalidatePath("/expenses");
    return { success: true };
  } catch (e) {
    console.log(e);
  }
}

//Update Member server action
export async function updateMember(previousData: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const newFirstName = formData.get("firstName") as string;
  const newLastName = formData.get("lastName") as string;
  const newPhoneNumber = formData.get("phoneNumber") as string;
  const newFlatNumber = formData.get("flat") as string;
  const newBirthday = formData.get("birthday") as string;
  const newAnniversary = formData.get("anniversary") as string;

  const validatedData = memberSchema.safeParse({
    id,
    firstName: newFirstName,
    lastName: newLastName,
    phoneNumber: newPhoneNumber,
    flat: newFlatNumber,
    birthday: newBirthday,
    anniversary: newAnniversary,
  });

  if (!validatedData.success) {
    return {
      success: false,
      fieldErrors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    await db.member.update({
      where: {
        id: id,
      },
      data: {
        firstName: newFirstName,
        lastName: newLastName,
        phoneNumber: newPhoneNumber,
        flatNumber: newFlatNumber,
        birthday: new Date(newBirthday),
        anniversary: new Date(newAnniversary),
      },
    });
    revalidatePath("/members");
    return { success: true };
  } catch (e) {
    console.log(e);
  }
}
