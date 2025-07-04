"use client";

import React from "react";

export default function MembersModal({ count }: { count: number }) {
  return (
    <div className="w-full bg-gray rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white">
      <div className="text-4xl font-extrabold text-white mb-2">{count}</div>
      <div className="text-lg text-white font-medium tracking-wide">
        Members
      </div>
    </div>
  );
}
