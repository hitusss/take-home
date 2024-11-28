import { useState } from "react";

const variants = {
  active: "bg-black text-white hover:bg-gray-700",
  inactive: "bg-gray-200 text-black hover:bg-gray-300",
};

type ToggleButtonProps = {
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  children: React.ReactNode;
};

/*
 * Example tests:
 * - Throw error when one of active and onActiveChange is defined and the other is undefined
 * - Handle activity state change when component is controlled and uncontrolled
 * - Handle keyboard interactions
 */

export function ToggleButton({
  active,
  onActiveChange,
  children,
}: ToggleButtonProps) {
  if (
    (active !== undefined && onActiveChange === undefined) ||
    (active === undefined && onActiveChange !== undefined)
  ) {
    throw new Error(
      "ToggleButton: active and onActiveChange must be both defined or both undefined",
    );
  }

  const [activeState, setActiveState] = useState(false);

  const isActive = active !== undefined ? active : activeState;
  const handleToggle = () => {
    if (onActiveChange === undefined) {
      setActiveState((prev) => !prev);
    } else {
      onActiveChange(!active);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleToggle();
        }
      }}
      className={`text-sm flex gap-2 rounded transition-all p-2 disabled:opacity-50 ${variants[isActive ? "active" : "inactive"]}`}
    >
      {children}
    </button>
  );
}
