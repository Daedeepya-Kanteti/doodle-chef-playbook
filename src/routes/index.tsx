import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, ShoppingCart, Sparkles, WandSparkles, X } from "lucide-react";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { RecipeCard } from "@/components/RecipeCard";
import { actions, allRecipes, inventRecipe, missing, useStore } from "@/lib/recipes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Empty My Fridge — DoodleChef" },
      { name: "description", content: "Tell DoodleChef what's in your kitchen and get honest recipe matches." },
      { property: "og:title", content: "Empty My Fridge — DoodleChef" },
      { property: "og:description", content: "Pure matches and near misses from exactly what you have." },
    ],
  }),
  component: Fridge,
});

function Fridge() {
  const s = useStore();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const recipes = allRecipes(s);
  const scored = recipes.map((r) => ({ r, m: missing(r, s.tray).length }));
  const pure = scored.filter((x) => x.m === 0).map((x) => x.r);
  const near = scored.filter((x) => x.m > 0 && x.m <= 2).sort((a, b) => a.m - b.m).map((x) => x.r);

  const add = () => { actions.addToTray(text); setText(""); };
  const whip = () => {
    const rec = inventRecipe(s.tray);
    if (!rec) return;
    actions.addRecipe(rec);
    navigate({ to: "/recipe/$id", params: { id: rec.id } });
  };

  return (
    <Shell>
      <p className="font-script text-xl text-destructive">ultra-strict • zero assumptions</p>
      <h1 className="font-display text-5xl md:text-6xl">Empty My Fridge</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Tell DoodleChef exactly what is in your kitchen and it answers honestly — the pure matches you can cook right now, and the near misses stamped with the exact items you still have to buy.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[340px_1fr]">
        <section className="doodle-card p-5 self-start">
          <span className="tape" />
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-extrabold text-lg"><ShoppingCart className="size-4 text-destructive" />In My Kitchen</h2>
            <span className="font-script text-muted-foreground">{s.tray.length} stickers on the shelf</span>
          </div>
          <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); add(); }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type what you really have"
              className="min-w-0 flex-1 rounded-xl border-2 bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button className="btn-doodle bg-primary"><Plus className="size-4" />Add to tray</button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.tray.map((t) => (
              <span key={t} className="btn-doodle">
                {t}
                <button aria-label={`Remove ${t}`} onClick={() => actions.removeFromTray(t)}><X className="size-3.5" /></button>
              </span>
            ))}
          </div>
          <p className="mt-4 flex gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-4 shrink-0 text-primary" />
            Zero-assumption rule: salt, pepper, oil, butter, soy sauce, garlic and even water only count if you add them yourself.
          </p>
        </section>

        <div className="space-y-6">
          <section className="doodle-card p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <span className="tape" />
            <div>
              <h2 className="flex items-center gap-2 font-extrabold text-lg"><Sparkles className="size-4 text-primary" />Whip something up</h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-lg">
                Nothing on the shelf fits? DoodleChef will invent a brand new dish from your tray alone — it will not sneak in a single ingredient you do not have.
              </p>
            </div>
            <button onClick={whip} disabled={!s.tray.length} className="btn-doodle bg-primary disabled:opacity-50"><WandSparkles className="size-4" />Whip up a recipe</button>
          </section>

          <div className="flex flex-wrap items-center gap-3 font-script text-lg">
            <span className="rounded-lg border-2 border-dashed border-success px-2 text-success">{pure.length} pure matches</span>
            <span className="rounded-lg border-2 border-dashed border-destructive px-2 text-destructive">{near.length} almost there</span>
            <span className="text-muted-foreground">checked against {recipes.length} recipes</span>
          </div>

          {pure.length > 0 ? (
            <section>
              <h2 className="font-extrabold text-lg mb-4">Cook Right Now — 100% Pure Matches</h2>
              <div className="grid gap-6 md:grid-cols-2">{pure.map((r) => <RecipeCard key={r.id} recipe={r} tray={s.tray} />)}</div>
            </section>
          ) : (
            <div className="rounded-2xl border-2 border-dashed p-4 text-sm text-muted-foreground flex gap-2">
              <Sparkles className="size-4 shrink-0 text-primary" />
              No 100% pure match yet — not one recipe is fully covered by this tray. The near misses below are the closest you've got.
            </div>
          )}

          {near.length > 0 && (
            <section>
              <h2 className="font-extrabold text-lg mb-4">Almost There — Missing 1-2 Items <span className="font-script font-normal text-muted-foreground">buy exactly these, and you are cooking</span></h2>
              <div className="grid gap-6 md:grid-cols-2">{near.map((r) => <RecipeCard key={r.id} recipe={r} tray={s.tray} />)}</div>
            </section>
          )}
        </div>
      </div>
    </Shell>
  );
}
