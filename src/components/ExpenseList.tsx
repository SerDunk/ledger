import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function ExpenseList() {
  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger className="w-full mt-2">
          <div className="flex justify-between items-center bg-red-400 text-white p-2">
            <h1 className="text-2xl">Diwali</h1>
            <div>
              <ChevronDown />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="flex flex-col">
            <li>
              <div className="flex justify-between p-2 text-lg">
                <h3>Gifts</h3>
                <p>5000</p>
              </div>
            </li>
            <li>
              <div className="flex justify-between p-2 text-lg">
                <h3>Food</h3>
                <p>17000</p>
              </div>
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
