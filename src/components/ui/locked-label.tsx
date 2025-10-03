import * as React from "react";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock } from "lucide-react";

export type LockedLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  locked?: boolean;
  tooltip?: string;
  className?: string;
};

export function LockedLabel({
  htmlFor,
  children,
  locked = false,
  tooltip = "Upgrade to Launch to unlock this feature",
  className = "",
}: LockedLabelProps) {
  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      <Label htmlFor={htmlFor} className={locked ? "text-gray-400" : undefined}>{children}</Label>
      {locked && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Lock className="w-3.5 h-3.5 text-red-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-900 text-white rounded-md border-black">{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export function LockedSection({
    locked,
    children,
    className = "",
  }: {
    locked?: boolean;
    children: React.ReactNode;
    className?: string;
  }) {
    const disabledClass = locked ? "opacity-50 pointer-events-none" : "";
    return <div className={[disabledClass, className].join(" ")}>{children}</div>;
  }