import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-fg hover:bg-accent-dim",
        outline:
          "border border-border-strong text-fg hover:border-accent/50 hover:text-accent bg-transparent",
        ghost: "text-muted hover:text-fg",
      },
      size: {
        default: "h-11 px-5 rounded-md text-sm",
        lg: "h-12 px-6 rounded-lg text-sm",
        sm: "h-9 px-3 rounded-sm text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
