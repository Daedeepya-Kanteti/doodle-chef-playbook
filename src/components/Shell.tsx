import { Link } from "@tanstack/react-router";
import { BookOpen, ChefHat, PencilLine, Star, Utensils } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Empty My Fridge", icon: Utensils },
  { to: "/cookbook", label: "The Cookbook", icon: BookOpen },
  { to: "/create", label: "Create a Recipe", icon: PencilLine },
  { to: "/stash", label: "My Stash", icon: Star },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 bg-background/90">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center size-11 rounded-xl border-2 bg-primary shadow-[2px_3px_0_var(--color-border)]">
              <ChefHat className="size-5" />
            </span>
            <span>
              <span className="block font-display text-2xl leading-none">DoodleChef</span>
              <span className="block font-script text-sm text-muted-foreground">recipes for what you actually have</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-2">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className="btn-doodle" activeOptions={{ exact: true }} activeProps={{ className: "bg-primary" }}>
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t-2 py-6 text-center font-script text-lg text-muted-foreground">
        No phantom salt. No imaginary butter. DoodleChef only counts what you put in the tray.
      </footer>
    </div>
  );
}
