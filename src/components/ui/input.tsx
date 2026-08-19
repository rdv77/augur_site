import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-accent/50",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-accent/50 resize-none",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn("mb-1.5 block text-sm text-muted", className)} {...props} />
  );
}
