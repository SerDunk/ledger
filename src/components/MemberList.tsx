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

import { deleteMember } from "@/actions/actions";
import { X } from "lucide-react";

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  flatNumber: string;
  birthday: Date;
  anniversary: Date;
  createdAt: Date;
  updatedAt: Date;
};

export default async function MemberList() {
  const members: Member[] = await db.member.findMany();
  console.log(members);

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
                {/* Dialog for Delete Confirmation */}

                <AccordionTrigger className="text-white flex-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        aria-label={`Delete ${member.firstName}`}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
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
                      <div className="flex justify-end gap-2 mt-4">
                        <button className="px-4 py-2 text-gray-500 border rounded-md">
                          Cancel
                        </button>
                        <form action={deleteMember}>
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-red-500 rounded-md"
                            name="memberId"
                            value={member.id}
                          >
                            Confirm
                          </button>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="flex items-center justify-start w-full">
                    <div>
                      {member.firstName} {member.lastName}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-red-500">
                  <div>Phone: {member.phoneNumber}</div>
                  <div>Flat: {member.flatNumber}</div>
                  <div>Birthday: {member.birthday.toDateString()}</div>
                  <div>Anniversary: {member.anniversary.toDateString()}</div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
