"use server";

import db from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toggle } from "./ui/toggle";

import { deleteMember, toggleMembership } from "@/actions/actions";
import { X } from "lucide-react";

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

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold text-pink-red mb-2">
          Total Members: {members.length}
        </h1>
      </div>
      <div className="flex flex-col gap-1">
        {members.map((member) => (
          <div key={member.id}>
            <Accordion
              type="single"
              collapsible
              className="bg-black px-2 rounded-md"
            >
              <AccordionItem value={`item-${member.id}`}>
                <div className="flex items-center justify-between w-full px-2">
                  <Dialog>
                    <DialogTrigger>
                      <span>
                        <X className="w-4 h-4 text-red-500" />
                      </span>
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
                      <div>
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
                      </div>
                    </DialogContent>
                  </Dialog>

                  <AccordionTrigger className="text-white w-[290px]">
                    <div className="flex gap-1 mr-36 ">
                      <div>{member.firstName}</div>
                      <div>{member.lastName} </div>
                    </div>
                  </AccordionTrigger>
                </div>

                <AccordionContent className="text-red-500 flex flex-col gap-2">
                  <div>Phone: {member.phoneNumber}</div>
                  <div>Flat: {member.flatNumber}</div>
                  <div>Birthday: {member.birthday.toDateString()}</div>
                  <div>Anniversary: {member.anniversary.toDateString()}</div>
                  <div>
                    <form action={toggleMembership}>
                      <input
                        type="hidden"
                        name="isMember"
                        value={member.isMember.toString()}
                      ></input>
                      <input type="hidden" name="id" value={member.id}></input>
                      <Toggle type="submit" pressed={member.isMember}>
                        {member.isMember ? "Member" : "Not member"}
                      </Toggle>
                    </form>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
