import { ChevronDown } from "lucide-react";
import { type Member } from "./MemberList";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { workSans } from "../../public/fonts";

export default function ViewMember({ member }: { member: Member }) {
  return (
    <div className="w-full mt-3">
      <Collapsible key={member.id} className={`mb-2 ${workSans.className}`}>
        <CollapsibleTrigger className="w-full" asChild>
          <div className="flex justify-between items-center bg-gray text-white p-2 rounded-md">
            <div className="flex justify-between w-full items-center">
              <div className="w-[80%]">
                <h1 className="text-lg">
                  {member.firstName} {member.lastName}
                </h1>
                <span className="text-sm">Flat: {member.flatNumber}</span>
              </div>
              <ChevronDown />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-gray-100 rounded-md">
            <div className="flex justify-between w-full gap-6 text-[16px]">
              <div className="flex flex-col gap-4 justify-between w-full">
                <div className="flex gap-2 border-b-2 py-1">
                  <span className="font-semibold">Name :</span>
                  <div className="flex gap-1 ">
                    <span>{member.firstName}</span>
                    <span>{member.lastName}</span>
                  </div>
                </div>
                <div className="border-b-2 py-1">
                  <span className="font-semibold">Phone Number : </span>
                  <span>{member.phoneNumber}</span>
                </div>
                <div className="border-b-2 py-1">
                  <span className="font-semibold">Flat Number : </span>
                  <span>{member.flatNumber}</span>
                </div>
                <div className="border-b-2 py-1">
                  <span className="font-semibold">Birthday : </span>
                  <span>{member.birthday.toDateString()}</span>
                </div>
                {member.anniversary && (
                  <div className="border-b-2 py-1">
                    <span className="font-semibold">Anniversary : </span>
                    <span>{member.anniversary.toDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
