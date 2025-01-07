"use server";

import db from "@/lib/db";

//Add member to database
export async function addMember(previousData: unknown, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const flat = formData.get("flat") as string;
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const anniversary = formData.get("anniversary") as string;

  try {
    const newMember = await db.member.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        flatNumber: flat,
        birthday: new Date(dateOfBirth),
        anniversary: new Date(anniversary),
      },
    });
    console.log("Member created : ", newMember);
    return true;
  } catch (e) {
    console.log("Failed to add member to database:", e);
    return false;
  }
}
