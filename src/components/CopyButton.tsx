import React, { useEffect, useState } from "react";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
interface Props {
  text: string;
}
const CopyButton: React.FC<Props> = ({ text }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  useEffect(() => {
    // if copied is true then set it to false after 2 seconds
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);
  return (
    <Button
      onClick={copyToClipboard}
      className={
        "btn text-xs " +
        `${copied ? "bg-[#00ba94] text-white" : "bg-transparent text-[#00ba94] px-2"}`
      }
    >
      {copied ? (
        <>
          <CheckIcon />
        </>
      ) : (
        <>
          <CopyIcon />
        </>
      )}
    </Button>
  );
};

export default CopyButton;
