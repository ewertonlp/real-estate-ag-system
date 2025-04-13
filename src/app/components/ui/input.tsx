import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const input = tv({
  base: "w-full rounded-sm border p-3 text-text text-sm font-light focus:outline-indigo-500 placeholder:font-light placeholder:text-md placeholder:text-[var(--text)]",
  variants: {
    error: {
      true: "border-red-500",
    },
  },
});

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: string }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={input({ class: className, error: !!error })}
    {...props}
  />
));

Input.displayName = "Input";
