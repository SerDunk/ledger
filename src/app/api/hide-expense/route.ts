import { auth } from "@clerk/nextjs/server";
import { setHideExpense } from "@/actions/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { value } = await req.json();
  await setHideExpense(userId, value);
  return NextResponse.json({ success: true });
}
