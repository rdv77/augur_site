import { readFileSync } from "node:fs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/download-project")({
  server: {
    handlers: {
      GET: () => {
        const buf = readFileSync("/workspace/public/auria-site.zip");
        return new Response(buf, {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": 'attachment; filename="auria-site.zip"',
            "Content-Length": String(buf.length),
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
