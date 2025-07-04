"use client";

import React from "react";
import ShareableLink from "@/components/CopyLink";
import MembershipFeeInput from "@/components/MembershipFeeInput";
import { OptionForExpenses } from "@/components/OptionForExpenses";

export default function ShareModal({
  token,
  hideExpense,
  userId,
}: {
  token: string;
  hideExpense: boolean;
  userId: string;
}) {
  return (
    <div className="w-full bg-gray rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-slate-200 text-white ">
      <div className="text-xl font-semibold text-white">Share with Members</div>
      <ShareableLink shareableToken={token} />
      <MembershipFeeInput userId={userId} />
      <OptionForExpenses initialValue={hideExpense} />
    </div>
  );
}
