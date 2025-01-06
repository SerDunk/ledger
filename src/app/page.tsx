import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-5">
      <div>
        <h1 className="text-5xl font-bold uppercase text-pink-red">
          Lady Ledger
        </h1>
      </div>
      <div>
        <p className="text-xl font-semibold text-pink-red">
          Official NSV Ladies Club Ledger
        </p>
      </div>
      <div>
        <Link href="/dashboard">
          <Button className="p-6 bg-pink-red hover:bg-white hover:text-pink-red hover:duration-200 hover:ease-in">
            Welcome Saroja Laxmi
          </Button>
        </Link>
      </div>
    </div>
  );
}
