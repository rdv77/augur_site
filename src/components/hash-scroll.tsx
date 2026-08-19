import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function HashScroll() {
  const href = useRouterState({ select: (s) => s.location.href });
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    const raw = (hash || (typeof window !== "undefined" ? window.location.hash : "")).replace(
      /^#/,
      "",
    );
    if (!raw) return;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      const el = document.getElementById(raw);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const a = requestAnimationFrame(run);
    const t = window.setTimeout(run, 280);
    return () => {
      cancelled = true;
      cancelAnimationFrame(a);
      window.clearTimeout(t);
    };
  }, [href, hash]);

  return null;
}
