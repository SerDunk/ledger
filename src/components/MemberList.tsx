"use server";

import db from "@/lib/db";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, ChevronDown } from "lucide-react";

import { deleteMember, toggleMembership } from "@/actions/actions";
import { Toggle } from "./ui/toggle";

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

export default async function MemberList() {
  const members: Member[] = await db.member.findMany();
  const memberships = members.filter((member) => member.isMember === true);

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold text-pink-red mb-4">
          Total Memberships: {memberships.length}
        </h1>
      </div>
      <div>
        {members.map((member) => (
          <Collapsible key={member.id} className="mb-2">
            <CollapsibleTrigger className="w-full" asChild>
              <div className="flex justify-between items-center bg-slate-400 text-white p-2 rounded-md">
                <div className="flex gap-4 items-center w-full text-left">
                  <Dialog>
                    <DialogTrigger>
                      <X className="w-4 h-4 text-red-500" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. It will permanently
                          delete
                          <strong>
                            {" "}
                            {member.firstName} {member.lastName}
                          </strong>
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        action={deleteMember}
                        className="flex justify-center items-center"
                      >
                        <input type="hidden" name="id" value={member.id} />
                        <button
                          type="submit"
                          className="px-4 py-2 text-white bg-red-500 rounded-md"
                        >
                          Delete
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <div className="flex justify-between w-full items-center">
                    <div className="w-[80%]">
                      <h1 className="text-lg">
                        {member.firstName} {member.lastName}
                      </h1>
                      <span className="text-sm">Flat: {member.flatNumber}</span>
                    </div>
                    <div className="px-4">
                      <form action={toggleMembership}>
                        <input
                          type="hidden"
                          name="isMember"
                          value={member.isMember.toString()}
                        />
                        <input type="hidden" name="id" value={member.id} />
                        <Toggle type="submit" pressed={member.isMember}>
                          {member.isMember ? "Member" : "Not Member"}
                        </Toggle>
                      </form>
                    </div>
                  </div>
                </div>
                <ChevronDown />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 bg-gray-100 rounded-md">
                <div className="text-sm">
                  <div>Phone: {member.phoneNumber}</div>
                  <div>Birthday: {member.birthday.toDateString()}</div>
                  <div>Anniversary: {member.anniversary.toDateString()}</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
