"use client";

import { ReceiptIndianRupee, UserIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ViewNavbar({
  token,
  hideExpense = false,
}: {
  token: string;
  hideExpense?: boolean;
}) {
  const searchParams = useSearchParams();
  const expenseView = searchParams.get("expenseView") === "true";
  console.log(expenseView);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex gap-2 bg-gray text-white p-4 z-50 justify-around">
      <div>
        <Link href={`/member-view/${token}?expenseView=${expenseView}`}>
          <UserIcon />
        </Link>
      </div>
      {!expenseView && !hideExpense && (
        <div>
          <Link href={`/event-view/${token}`}>
            <ReceiptIndianRupee />
          </Link>
        </div>
      )}
    </div>
  );
}
