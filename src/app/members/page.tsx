/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { addMember } from "@/actions/actions";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useActionState } from "react";

export default function Members() {
  const [open, setOpen] = useState(false);

  const [data, action, isPending] = useActionState(addMember, undefined);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (data) {
      setOpen(false);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center gap-2 py-4 relative">
      <div>
        <h1>Members List</h1>
      </div>
      <div className="absolute left-0 right-0">
        {open && (
          <form
            action={action}
            className="flex flex-col gap-4 bg-white p-6 rounded-md"
          >
            <div>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
            </div>
            <div>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </div>
            <div>
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <Input
                type="number"
                name="flat"
                id="flat"
                placeholder="Flat Number"
              />
            </div>
            <div>
              <Input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                placeholder="Date Of Birth"
              />
            </div>
            <div>
              <Input
                type="date"
                name="anniversary"
                id="anniversary"
                placeholder="Anniversary"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-500 text-white">
                Submit
              </Button>
              <Button
                onClick={() => setOpen(false)}
                className="bg-red-500 text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
      <div className="flex gap-4">
        <SearchBar />
        <Button onClick={handleClick}>
          <PlusIcon className="text-white" />
        </Button>
      </div>
    </div>
  );
}
