import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-screen place-items-center px-6 pt-16">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-surface p-8">
        <div>
          <p className="font-serif text-2xl text-gold">Auria</p>
          <h1 className="mt-2 text-xl font-semibold">Вход</h1>
          <p className="mt-1 text-sm text-muted">Для управления материалами.</p>
        </div>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
            >
              Продолжить с {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted">Вход отключён.</p>
        )}
        <Link to="/" className="block text-center text-sm text-muted hover:text-fg">
          На главную
        </Link>
      </div>
    </main>
  );
}
