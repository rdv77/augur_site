import { cn } from "@/lib/utils";

export function BlendImage({
  src,
  alt,
  className,
  side = "left",
}: {
  src: string;
  alt: string;
  className?: string;
  side?: "left" | "right";
}) {
  return (
    <div className={cn("relative min-h-64 overflow-hidden rounded-xl", className)}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 w-1/3",
          side === "left"
            ? "left-0 bg-gradient-to-r from-bg to-transparent"
            : "right-0 bg-gradient-to-l from-bg to-transparent",
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
    </div>
  );
}
