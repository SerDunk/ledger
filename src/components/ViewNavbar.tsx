import { ReceiptIndianRupee, UserIcon } from "lucide-react";
import Link from "next/link";

export default async function ViewNavbar({ token }: { token: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex gap-2 bg-gray text-white p-4 z-50 justify-around">
      <div>
        <Link href={`/member-view/${token}`}>
          <UserIcon />
        </Link>
      </div>
      <div>
        <Link href={`/event-view/${token}`}>
          <ReceiptIndianRupee />
        </Link>
      </div>
    </div>
  );
}
