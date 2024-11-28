import { createContext, useContext, useState } from "react";
import { Button } from "./Button";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CollapsibleProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type CollapsibleContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(
  undefined,
);

function useCollapsibleContext() {
  const context = useContext(CollapsibleContext);
  if (context === undefined) {
    throw new Error("useCollapsibleContext must be used within a Collapsible");
  }
  return context;
}

/*
 * Example tests:
 * - Throw error when one of open and onOpenChange is defined and the other is undefined
 * - Handle open state change when component is controlled and uncontrolled
 */

export function Collapsible({
  children,
  open,
  onOpenChange,
}: CollapsibleProps) {
  const [openState, setOpenState] = useState(false);

  if (
    (open !== undefined && onOpenChange === undefined) ||
    (open === undefined && onOpenChange !== undefined)
  ) {
    throw new Error(
      "Collapsible: open and onOpenChange must be both defined or both undefined",
    );
  }

  return (
    <CollapsibleContext.Provider
      value={{
        open: open ?? openState,
        onOpenChange: onOpenChange ?? setOpenState,
      }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleButton() {
  const { open, onOpenChange } = useCollapsibleContext();

  return (
    <Button onClick={() => onOpenChange(!open)} variant="ghost" size="icon">
      {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
      <span className="sr-only">{open ? "Hide" : "Show"}</span>
    </Button>
  );
}

export function CollapsibleContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useCollapsibleContext();

  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out`}
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      aria-hidden={!open}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
