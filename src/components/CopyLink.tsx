"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons";

const ShareableLink = ({ shareableLink }: { shareableLink: string }) => {
  const [copied, setCopied] = useState(false);

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
      <div className="text-neutral-400 px-2 py-2">
        <div>Want to share data with your members?</div>
        <div>Do it with this link.</div>
      </div>
      <div className="flex items-center gap-2 p-2 border rounded-lg bg-white dark:bg-gray-800">
        <input
          type="text"
          value={shareableLink}
          readOnly
          className="w-full p-2 text-sm bg-transparent border-none outline-none"
        />
        <Button onClick={copyToClipboard} size="sm" variant="outline">
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <ClipboardCopyIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ShareableLink;
