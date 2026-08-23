import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  loader: () => {
    throw redirect({ to: "/products/socio", replace: true });
  },
  component: () => null,
});
