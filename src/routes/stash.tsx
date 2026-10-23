import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { RecipeCard } from "@/components/RecipeCard";
import { allRecipes, useStore } from "@/lib/recipes";

export const Route = createFileRoute("/stash")({
  head: () => ({
    meta: [
      { title: "My Stash — DoodleChef" },
      { name: "description", content: "Your pinned DoodleChef recipes." },
      { property: "og:title", content: "My Stash — DoodleChef" },
      { property: "og:description", content: "Recipes you pinned for later." },
    ],
  }),
  component: Stash,
});

function Stash() {
  const s = useStore();
  const list = allRecipes(s).filter((r) => s.stash.includes(r.id));
  return (
    <Shell>
      <h1 className="font-display text-5xl">My Stash</h1>
      {list.length === 0 ? (
        <p className="mt-6 text-muted-foreground">Nothing pinned yet. Open any recipe and hit "Pin to My Stash". <Link to="/cookbook" className="underline">Browse the cookbook</Link></p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((r) => <RecipeCard key={r.id} recipe={r} tray={s.tray} />)}</div>
      )}
    </Shell>
  );
}
