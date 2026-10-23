import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { RecipeCard } from "@/components/RecipeCard";
import { allRecipes, useStore } from "@/lib/recipes";

export const Route = createFileRoute("/cookbook")({
  head: () => ({
    meta: [
      { title: "The Cookbook — DoodleChef" },
      { name: "description", content: "Browse every recipe in the DoodleChef cookbook." },
      { property: "og:title", content: "The Cookbook — DoodleChef" },
      { property: "og:description", content: "Every DoodleChef recipe in one place." },
    ],
  }),
  component: Cookbook,
});

function Cookbook() {
  const s = useStore();
  const [q, setQ] = useState("");
  const list = allRecipes(s).filter((r) =>
    (r.title + r.cuisine + r.ingredients.map((i) => i.name).join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <Shell>
      <h1 className="font-display text-5xl">The Cookbook</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search recipes, cuisines, ingredients"
        className="mt-4 w-full max-w-md rounded-xl border-2 bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => <RecipeCard key={r.id} recipe={r} tray={s.tray} />)}
      </div>
    </Shell>
  );
}
