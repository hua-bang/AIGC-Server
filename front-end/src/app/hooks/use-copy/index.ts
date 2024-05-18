import { copyToClipboard as copyToClipboardOrigin } from "@/app/utils";
import { sleep } from "@/app/utils/sleep";
import { useState } from "react";

export const useCopy = () => {
  const [isCopy, setIsCopy] = useState(false);

  const copyToClipboard = async (str: string) => {
    await copyToClipboardOrigin(str);
    setIsCopy(true);

    await sleep(2000);
    setIsCopy(false);
  };

  return {
    stateText: isCopy ? "copied" : "copy",
    copyToClipboard,
  };
};
