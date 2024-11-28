import { forwardRef } from "react";

const variants = {
  primary: "bg-black text-white hover:bg-gray-800 disabled:bg-black/75",
  ghost: "hover:text-gray-700",
};

const sizes = {
  default: "px-3 py-1",
  icon: "w-6 h-6 justify-center items-center",
};

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & Omit<React.ComponentProps<"button">, "className">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`text-sm flex gap-2 transition-colors rounded ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  ),
);
