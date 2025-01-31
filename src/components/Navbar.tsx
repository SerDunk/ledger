import {
  LayoutDashboardIcon,
  ReceiptIndianRupee,
  UserIcon,
} from "lucide-react";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex gap-2 bg-gray text-white p-4 z-50 justify-around">
      <div>
        <Link href="/dashboard">
          <LayoutDashboardIcon />
        </Link>
      </div>

      <div>
        <Link href="/members">
          <UserIcon />
        </Link>
      </div>
      <div>
        <Link href="/expenses">
          <ReceiptIndianRupee />
        </Link>
      </div>
    </div>
  );
}
