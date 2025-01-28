"use client";

import { Input } from "@/components/ui/input";

export default function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="border-2 border-black rounded-md w-full">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="p-4"
      />
    </div>
  );
}
