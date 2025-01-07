import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Playfair_Display, Work_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-5">
      <div>
        <h1
          className={`text-5xl font-bold uppercase text-pink-red ${playfairDisplay.className}`}
        >
          Lady Ledger
        </h1>
      </div>
      <div>
        <p className={`text-xl text-pink-red ${workSans.className}`}>
          Official NSV Ladies Club Ledger
        </p>
      </div>
      <div>
        <Link href="/dashboard">
          <Button
            className={`p-6 bg-pink-red hover:bg-white hover:text-pink-red hover:duration-200 hover:ease-in ${workSans.className}`}
          >
            Welcome Saroja Laxmi
          </Button>
        </Link>
      </div>
    </div>
  );
}
