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
    <li className="flex justify-between p-6 text-[16px] w-full">
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
                {data?.fieldErrors?.firstName && (
                  <p className="text-red-500">{data.fieldErrors.firstName}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Phone Number : </span>
              <div className="flex flex-col">
                <input
                  type="text"
                  defaultValue={member.phoneNumber}
                  name="phoneNumber"
                  className="border rounded px-2 py-1 w-36"
                />
                {data?.fieldErrors?.phoneNumber && (
                  <p className="text-red-500">{data.fieldErrors.phoneNumber}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Flat Number : </span>
              <div className="flex flex-col">
                <input
                  defaultValue={member.flatNumber}
                  name="flat"
                  className="border rounded px-2 py-1 w-36"
                />
                {data?.fieldErrors?.flat && (
                  <p className="text-red-500">{data.fieldErrors.flat}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Birthday : </span>
              <div className="flex flex-col">
                <input
                  type="date"
                  defaultValue={member.birthday.toISOString().split("T")[0]}
                  name="birthday"
                  className="border rounded px-2 py-1 w-36"
                />
                {data?.fieldErrors?.birthday && (
                  <p className="text-red-500">{data.fieldErrors.birthday}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Anniversary : </span>
              <div className="flex flex-col">
                <input
                  type="date"
                  defaultValue={member.anniversary.toISOString().split("T")[0]}
                  name="anniversary"
                  className="border rounded px-2 py-1 w-36"
                />
                {data?.fieldErrors?.anniversary && (
                  <p className="text-red-500">{data.fieldErrors.anniversary}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              disabled={isPending}
              type="submit"
              className="px-5 py-1 bg-green-500 text-white"
            >
              <Check className="h-4 w-4 text-white" />
            </Button>
            <Button
              type="button"
              className="px-5 py-1 bg-red-500 text-white"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        </form>
      ) : (
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
          <div className="self-center">
            <Button
              onClick={() => setIsEditing(true)}
              className="self-end bg-gray"
            >
              <Pencil className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}
