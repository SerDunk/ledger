"use server";

import db from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Member = {
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
              className="bg-gray px-2 rounded-md  "
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-pink-red">
                  {member.firstName} {member.lastName}
                </AccordionTrigger>
                <AccordionContent className=" text-red-500">
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
