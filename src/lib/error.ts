import { ZodError } from "zod";
import { StringMap } from "./types";

// Function to convert Zod errors into a StringMap
export default function convertZodError(error: ZodError): StringMap {
  return error.issues.reduce((acc: StringMap, issue) => {
    const field = issue.path[0]; // Extract the field name (assuming single-field validation)

    // If there is an existing error for this field, concatenate new errors
    if (acc[field]) {
      acc[field] += `, ${issue.message}`;
    } else {
      acc[field] = issue.message;
    }

    return acc;
  }, {});
}
