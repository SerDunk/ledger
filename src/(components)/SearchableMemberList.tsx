"use client";

import { useState } from "react";
import MemberCollapsible from "./MemberCollapsible";
import SearchBar from "@/(components)/SearchBar";
import MemberForm from "./MemberForm";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { workSans } from "../../public/fonts";

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
        <h1 className={`text-3xl font-bold text-gray  ${workSans.className}`}>
          Memberships : {memberships.length}
        </h1>
      </div>
      <div>
        <MemberForm open={open} setOpen={setOpen} />
      </div>
      <div className="flex justify-between mb-4 gap-4 py-2 w-full">
        <SearchBar search={search} setSearch={setSearch} />
        <div className="self-center">
          <Button className="bg-black" onClick={handleClick}>
            <PlusIcon className="text-white" />
          </Button>
        </div>
      </div>
      <MemberCollapsible members={filteredMembers} />
    </div>
  );
}
