"use client";

import { useEffect, useState } from "react";
import { updateMember } from "@/actions/actions";
import { X, Pencil, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useActionState } from "react";

type Member = {
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

export default function EditableMember({ member }: { member: Member }) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, action, isPending] = useActionState(updateMember, undefined);

  useEffect(() => {
    if (data) {
      if (data.success) {
        setIsEditing(false);
      }
    }
  }, [data]);

  return (
    <li className="flex justify-between p-2 bg-blue-200 text-lg w-full">
      {isEditing ? (
        <form
          action={action}
          className="flex flex-col gap-4 w-full items-center"
        >
          <div className="flex flex-col gap-2 justify-between w-full">
            <input type="hidden" name="id" value={member.id} />
            <div className="flex gap-2">
              <span className="font-semibold">Name :</span>
              <div className="flex gap-1">
                <input
                  type="text"
                  defaultValue={member.firstName}
                  name="firstName"
                  className="border rounded px-2 py-1 w-24"
                />
                <input
                  type="text"
                  defaultValue={member.lastName}
                  name="lastName"
                  className="border rounded px-2 py-1 w-36"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Phone Number : </span>
              <input
                type="text"
                defaultValue={member.phoneNumber}
                name="phoneNumber"
                className="border rounded px-2 py-1 w-36"
              />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Flat Number : </span>
              <input
                type="text"
                defaultValue={member.flatNumber}
                name="flatNumber"
                className="border rounded px-2 py-1 w-36"
              />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Birthday : </span>
              <input
                type="date"
                defaultValue={member.birthday.toISOString().split("T")[0]}
                name="birthday"
                className="border rounded px-2 py-1 w-36"
              />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Anniversary : </span>
              <input
                type="date"
                defaultValue={member.anniversary.toISOString().split("T")[0]}
                name="anniversary"
                className="border rounded px-2 py-1 w-36"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={isPending}
              type="submit"
              className="px-2 py-1 bg-green-500 text-white"
            >
              <Check className="h-4 w-4 text-white" />
            </Button>
            <Button
              type="button"
              className="px-2 py-1 bg-red-500 text-white"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-4 justify-between w-full">
            <div className="flex gap-2">
              <span className="font-semibold">Name :</span>
              <div className="flex gap-1">
                <span>{member.firstName}</span>
                <span>{member.lastName}</span>
              </div>
            </div>
            <div>
              <span className="font-semibold">Phone Number : </span>
              <span>{member.phoneNumber}</span>
            </div>
            <div>
              <span className="font-semibold">Flat Number : </span>
              <span>{member.flatNumber}</span>
            </div>
            <div>
              <span className="font-semibold">Birthday : </span>
              <span>{member.birthday.toDateString()}</span>
            </div>
            <div>
              <span className="font-semibold">Anniversary : </span>
              <span>{member.anniversary.toDateString()}</span>
            </div>
          </div>
          <div className="self-center">
            <Button
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="self-end"
            >
              <Pencil className="h-4 w-4 text-blue-500" />
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}
