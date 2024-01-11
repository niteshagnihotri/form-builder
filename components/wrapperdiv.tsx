import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface DivWrapperProps {
  className?: string;
  children: ReactNode;
}

function DivWrapper({ className, children }: DivWrapperProps) {
  return (
    <div
      className={cn(
        "bg-light px-4 py-2 w-full border-2 border-dark rounded-md font-medium",
        className
      )}
    >
      {children}
    </div>
  );
}

export default DivWrapper;
