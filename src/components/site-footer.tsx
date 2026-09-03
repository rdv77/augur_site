import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-elevated py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl font-semibold text-gold">Auria</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5 text-sm text-muted">
          <Link to="/about" className="hover:text-fg">About us</Link>
          <Link to="/technologies" className="hover:text-fg">Technology</Link>
          <Link to="/products" className="hover:text-fg">Products</Link>
          <Link to="/" hash="contact" className="hover:text-fg">Contacts</Link>
          <Link to="/privacy" className="hover:text-fg">Privacy policy</Link>
          <a href="/auria-site.zip" download="auria-site.zip" className="hover:text-fg">Download project</a>
        </nav>
        <p className="text-sm text-subtle">© 2026 Auria</p>
      </div>
    </footer>
  );
}