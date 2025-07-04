import {
  LayoutDashboardIcon,
  ReceiptIndianRupee,
  UserIcon,
} from "lucide-react";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed left-0 right-0 bottom-0 flex gap-2 bg-gray text-white p-2  z-50 justify-around sm:relative">
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
