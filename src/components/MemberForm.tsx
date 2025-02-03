"use client";

import { addMember } from "@/actions/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Toaster, toast } from "sonner";

export default function MemberForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [data, action, isPending] = useActionState(addMember, undefined);
  const [errors, setErrors] = useState<
    | {
        firstName?: string[] | undefined;
        lastName?: string[] | undefined;
        phoneNumber?: string[] | undefined;
        flat?: string[] | undefined;
        birthday?: string[] | undefined;
        anniversary?: string[] | undefined;
      }
    | undefined
  >(undefined);

  const handleClose = () => {
    setOpen(false);
    setErrors(undefined);
  };

  useEffect(() => {
    if (data) {
      if (data.success) {
        setOpen(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setErrors(data.fieldErrors);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  console.log(errors);

  return (
    <div className="flex flex-col items-center gap-2 py-2 relative">
      <Toaster />
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        />
      )}

      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <form
          action={action}
          className="flex flex-col gap-4 bg-white p-6 rounded-md w-full max-w-sm shadow-xl transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              defaultValue={data?.fieldData?.firstName}
              className="w-full"
            />
            {errors?.firstName && (
              <div className="text-red-500 text-sm">{errors.firstName}</div>
            )}
          </div>

          <div>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              defaultValue={data?.fieldData?.lastName}
              className="w-full"
            />
            {errors?.lastName && (
              <div className="text-red-500 text-sm">{errors.lastName}</div>
            )}
          </div>

          <div>
            <Input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              defaultValue={data?.fieldData?.phoneNumber}
              className="w-full"
            />

            {errors?.phoneNumber && (
              <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
            )}
          </div>

          <div>
            <Input
              type="number"
              name="flat"
              id="flat"
              placeholder="Flat Number"
              defaultValue={data?.fieldData?.flat}
              className="w-full"
            />
            {errors?.flat && (
              <div className="text-red-500 text-sm">{errors.flat}</div>
            )}
          </div>

          <div>
            <label htmlFor="birthday" className="text-sm text-slate-400 ml-1">
              Date of Birth
            </label>
            <Input
              type="date"
              name="birthday"
              id="birthday"
              placeholder="Date Of Birth"
              defaultValue={data?.fieldData?.birthday?.toString()}
              className="w-full"
            />
            {errors?.birthday && (
              <div className="text-red-500 text-sm">{errors.birthday}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="anniversary"
              className="text-sm text-slate-400 ml-1"
            >
              Date of Anniversary
            </label>
            <Input
              type="date"
              name="anniversary"
              id="anniversary"
              placeholder="Anniversary"
              defaultValue={data?.fieldData?.anniversary?.toString()}
              className="w-full"
            />
            {errors?.anniversary && (
              <div className="text-red-500 text-sm">{errors.anniversary}</div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-green-500 text-white w-full"
              disabled={isPending}
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => handleClose()}
              className="bg-red-500 text-white w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
