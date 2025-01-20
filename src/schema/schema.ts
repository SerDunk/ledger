import { z } from "zod";

export const memberSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    phoneNumber: z
      .string()
      .length(10, "Phone number is invalid")
      .nonempty("Phone number is required"),
    flat: z
      .string()
      .length(3, "Flat number is invalid")
      .nonempty("Flat number is required"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    anniversary: z.string().nonempty("Anniversary is required"),
    isMember: z.boolean().default(false),
  })
  .refine((member) => member.anniversary > member.dateOfBirth, {
    message: "Anniversary should be after date of birth",
    path: ["anniversary"],
  });

export const eventSchema = z.object({
  eventName: z.string().nonempty("Event name is required"),
  expenses: z.array(
    z.object({
      name: z.string().nonempty("Expense name is required"),
      amount: z.number().nonnegative("Amount should be positive"),
    })
  ),
});
