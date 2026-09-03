import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy policy – Auguria" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="page-enter pt-16">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold">Privacy policy</h1>
        <p className="mt-6 leading-relaxed text-muted">
          By filling in the request form on the website, you provide your name and contact details. We use them solely to respond to your inquiry and do not share them with third parties.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          The data is stored in a secure environment. Upon request, we will delete your submission. For any questions, please use the form on the home page.
        </p>
      </article>
    </main>
  );
}