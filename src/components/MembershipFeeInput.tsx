"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "sonner";
import { updateMembershipFee } from "@/actions/actions";
import { useFormStatus } from "react-dom";

function MembershipFeeForm({ userId }: { userId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  async function action(formData: FormData) {
    await updateMembershipFee(formData);
    toast.success("Membership fee updated successfully");
    formRef.current?.reset();
  }

  return (
    <form
      action={action}
      ref={formRef}
      className="flex text-neutral-400 gap-2 items-center"
    >
      <Input type="hidden" name="userId" value={userId} />
      <Input name="fee" placeholder="eg. 1500" />
      <Button type="submit" disabled={pending}>
        {pending ? (
          <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <ArrowRight className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
}

export default function MembershipFeeInput({ userId }: { userId: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-neutral-400">Customise your membership fee</div>
      <MembershipFeeForm userId={userId} />
    </div>
  );
}
