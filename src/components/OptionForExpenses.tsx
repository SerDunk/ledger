import { Switch } from "./ui/switch";

export default function OptionForExpenses() {
  return (
    <div className="flex p-2 px-4 items-center justify-between border-slate-200 border-2 rounded-md">
      <div>
        <p className="text-slate-300">Show expenses to your members</p>
      </div>
      <div className="mt-1.5">
        <Switch />
      </div>
    </div>
  );
}
