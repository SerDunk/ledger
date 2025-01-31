import MemberList from "@/components/MemberList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MemberPage() {
  const user = await auth();
  if (!user.userId) {
    redirect("/sign-in");
  }
  return (
    <div className="pt-7">
      <MemberList id={user.userId} />
    </div>
  );
}
