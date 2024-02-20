import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <span className="inline-flex items-center	gap-[4px] text-[16px]">
      <Loader2 className="animate-spin-slow" size={16} rotate={90} /> Loading
    </span>
  );
};

export default Loading;
