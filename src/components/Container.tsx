import { type ReactNode } from "react";

export default function Container({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-[450px] px-4 sm:justify-center sm:items-center h-full sm:mx-auto   bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
