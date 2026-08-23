import { siteConfig } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="font-mono text-xs text-muted">
          © {year} {siteConfig.name}. Built with Next.js.
        </p>
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">status:</span> open to opportunities
        </p>
      </div>
    </footer>
  );
}
