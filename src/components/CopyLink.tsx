"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { useExpenseContext } from "@/app/context";

const ShareableLink = ({ shareableToken }: { shareableToken: string }) => {
  const [copied, setCopied] = useState(false);
  const { expenseView } = useExpenseContext();

  const shareableLink = `${process.env.NEXT_PUBLIC_APP_URL}/member-view/${shareableToken}?expenseView=${expenseView}`;
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div>
      <div className="text-neutral-400 py-2">
        <div>Want to share data with your members?</div>
        <div>Do it with this link.</div>
      </div>
      <div className="flex items-center gap-2 p-2 border rounded-lg bg-white dark:bg-gray-800">
        <input
          type="text"
          value={shareableLink}
          readOnly
          className="w-full p-2 text-sm text-gray border-none outline-none"
        />
        <Button onClick={copyToClipboard} size="sm" variant="outline">
          {copied ? (
            <CheckIcon className="w-4 h-4 text-gray" />
          ) : (
            <ClipboardCopyIcon className="w-4 h-4 text-gray" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ShareableLink;
