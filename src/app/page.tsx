import { Button } from "@/components/ui/button";
import Link from "next/link";
import { playfairDisplay, workSans } from "../../public/fonts";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-5">
      <div>
        <h1
          className={`text-5xl font-black uppercase text-gray ${playfairDisplay.className}`}
        >
          Ledger
        </h1>
      </div>
      <div>
        <p className={`text-xl text-black ${workSans.className}`}>
          Your easy-to-use record keeper
        </p>
      </div>
      <div>
        <Link href="/dashboard">
          <Button
            className={`p-6 bg-gray hover:bg-white hover:text-gray hover:duration-200 hover:ease-in hover:border-2 ${workSans.className}`}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
