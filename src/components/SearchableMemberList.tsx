"use client";

import { useState } from "react";
import MemberCollapsible from "./MemberCollapsible";
import SearchBar from "@/components/SearchBar";
import MemberForm from "./MemberForm";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  flatNumber: string;
  birthday: Date;
  anniversary: Date;
  isMember: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function SearchableMemberList({
  members,
}: {
  members: Member[];
}) {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const memberships = filteredMembers.filter(
    (member) => member.isMember === true
  );

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold text-pink-red mb-4">
          Total Memberships: {memberships.length}
        </h1>
      </div>
      <div>
        <MemberForm open={open} setOpen={setOpen} />
      </div>
      <div className="flex gap-4 mb-4 justify-center items-center">
        <SearchBar search={search} setSearch={setSearch} />
        <div>
          <Button onClick={handleClick}>
            <PlusIcon className="text-white" />
          </Button>
        </div>
      </div>
      <MemberCollapsible members={filteredMembers} />
    </div>
  );
}
