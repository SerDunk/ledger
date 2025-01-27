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
    <div className=" border-2 border-black rounded-md">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="w-full"
      />
    </div>
  );
}
