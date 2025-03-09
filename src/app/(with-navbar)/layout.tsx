"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full">
      <Button
        onClick={async () => {
          console.log("mail sent");
          fetch("/api/email", { method: "POST" });
        }}
      >
        Send Email
      </Button>
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
