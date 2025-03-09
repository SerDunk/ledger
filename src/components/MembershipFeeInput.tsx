import { auth } from "@clerk/nextjs/server";
import { Input } from "./ui/input";
import { updateMembershipFee } from "@/actions/actions";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default async function MembershipFeeInput() {
  const user = await auth();
  if (!user.userId) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="text-neutral-400">Customise your membership fee</div>
      <form action={updateMembershipFee} className="flex text-neutral-400">
        <Input type="hidden" name="userId" value={user.userId} />
        <Input name="fee" placeholder="eg. 1500" />
        <Button type="submit">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
