"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { workSans } from "../../../public/fonts";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  main: ReactNode;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  description,
  href,
  cta,
  main,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group  col-span-1 flex flex-col justify-between overflow-hidden",

      // light styles
      "bg-gray [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div className="z-10 flex flex-col gap-4 p-4 h-full justify-around">
      <h3
        className={`text-3xl font-bold text-white dark:text-neutral-300 ${workSans.className}`}
      >
        {name}
      </h3>
      <div>{main}</div>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div className="flex w-full p-4">
      <Button variant="ghost" asChild size="sm">
        <a href={href} className="text-white">
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
