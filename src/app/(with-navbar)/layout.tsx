"use client";

import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between">
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
