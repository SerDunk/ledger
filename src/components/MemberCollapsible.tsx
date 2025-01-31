"use client";

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
import EditableMember from "./EditableMember";
import { Switch } from "./ui/switch";
import { deleteMember, toggleMembership } from "@/actions/actions";
import { Member } from "./MemberList";
import { workSans } from "../../public/fonts";

export default function MemberCollapsible({ members }: { members: Member[] }) {
  return (
    <div>
      {members.length == 0 && (
        <div className={`text-center text-gray mt-40 ${workSans.className}`}>
          <p>No members found</p>
        </div>
      )}
      {members.map((member) => (
        <Collapsible key={member.id} className={`mb-2 ${workSans.className}`}>
          <CollapsibleTrigger className="w-full" asChild>
            <div className="flex justify-between items-center bg-gray text-white p-2 rounded-md">
              <div className="flex gap-4 items-center w-full text-left">
                <Dialog>
                  <DialogTrigger>
                    <X className="w-4 h-4 text-red-500" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. It will permanently delete
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
                      <Switch type="submit" checked={member.isMember} />
                    </form>
                  </div>
                </div>
              </div>
              <ChevronDown />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 bg-gray-100 rounded-md">
              <EditableMember member={member} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
