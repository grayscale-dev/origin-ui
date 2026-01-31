import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { fieldStyles } from "./Input";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        fieldStyles,
        "pr-9 appearance-none bg-[var(--color-surface)] bg-[length:10px_6px] bg-[right_0.75rem_center] bg-no-repeat",
        "[background-image:linear-gradient(45deg,transparent_50%,currentColor_50%),linear-gradient(135deg,currentColor_50%,transparent_50%),linear-gradient(to_right,currentColor,currentColor)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
