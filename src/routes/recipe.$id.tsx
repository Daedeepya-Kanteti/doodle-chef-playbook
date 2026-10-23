import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, CookingPot, Flame, Plus, Star, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { actions, allRecipes, has, missing, useStore } from "@/lib/recipes";

export const Route = createFileRoute("/recipe/$id")({
  head: () => ({
    meta: [
      { title: "Recipe card — DoodleChef" },
      { name: "description", content: "Ingredients and step-by-step method on a DoodleChef recipe card." },
      { property: "og:title", content: "Recipe card — DoodleChef" },
      { property: "og:description", content: "What you need and how it goes." },
    ],
  }),
  component: RecipePage,
});

function RecipePage() {
  const { id } = Route.useParams();
  const s = useStore();
  const navigate = useNavigate();
  const [done, setDone] = useState<number[]>([]);
  const rec = allRecipes(s).find((r) => r.id === id);

  if (!rec) return <Shell><p>Recipe not found. <Link to="/cookbook" className="underline">Back to the cookbook</Link></p></Shell>;
  const miss = missing(rec, s.tray);
  const pinned = s.stash.includes(rec.id);

  return (
    <Shell>
      <div className="flex justify-between gap-2 mb-6">
        <Link to="/cookbook" className="btn-doodle"><ArrowLeft className="size-4" />The Cookbook</Link>
        <div className="flex gap-2">
          <button onClick={() => actions.toggleStash(rec.id)} className={`btn-doodle ${pinned ? "bg-primary" : ""}`}><Star className="size-4" />{pinned ? "Pinned" : "Pin to My Stash"}</button>
          <button onClick={() => { actions.deleteRecipe(rec.id); navigate({ to: "/cookbook" }); }} className="btn-doodle bg-destructive text-destructive-foreground"><Trash2 className="size-4" />Delete</button>
        </div>
      </div>
      <article className="doodle-card overflow-hidden">
        <div className="grid md:grid-cols-[280px_1fr] border-b-2">
          <div className="grid place-items-center bg-secondary min-h-48 md:border-r-2"><CookingPot className="size-16" strokeWidth={1.5} /></div>
          <div className="p-6">
            <h1 className="font-display text-4xl md:text-5xl">{rec.title}</h1>
            <p className="mt-2 font-script text-xl text-muted-foreground">{rec.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="chip bg-primary"><Clock className="size-3" />prep {rec.prep}m</span>
              <span className="chip bg-primary"><Flame className="size-3" />cook {rec.cook}m</span>
              <span className="chip"><Users className="size-3" />serves {rec.serves}</span>
              <span className="chip">{rec.cuisine}</span>
              <span className="chip bg-muted">{rec.course}</span>
              {rec.custom && <span className="chip bg-destructive text-destructive-foreground">your own recipe</span>}
            </div>
            <p className="mt-3 font-script text-lg text-muted-foreground">about {rec.prep + rec.cook} minutes from cold start to plate</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-extrabold text-lg">What you need</h2>
              {miss.length > 0 && <span className="stamp-missing">Missing: {miss.join(" & ")}</span>}
            </div>
            <ul className="space-y-2">
              {rec.ingredients.map((i) => (
                <li key={i.name} className="flex items-center justify-between rounded-xl border-2 border-border/20 p-3">
                  <span><b>{i.name}</b> <span className="ml-1 text-xs tracking-wider text-muted-foreground">{i.qty}</span></span>
                  {has(s.tray, i.name) ? (
                    <span className="btn-doodle bg-success text-success-foreground"><Check className="size-3.5" />in my kitchen</span>
                  ) : (
                    <button onClick={() => actions.addToTray(i.name)} className="btn-doodle"><Plus className="size-3.5" />I have this</button>
                  )}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-extrabold text-lg">How it goes</h2>
            <p className="font-script text-muted-foreground mb-3">tap a step to scratch it off as you go</p>
            <ol className="space-y-4">
              {rec.steps.map((st, n) => {
                const d = done.includes(n);
                return (
                  <li key={n}>
                    <button onClick={() => setDone(d ? done.filter((x) => x !== n) : [...done, n])} className="flex gap-3 text-left">
                      <span className={`grid place-items-center size-7 shrink-0 rounded-lg border-2 ${d ? "bg-success text-success-foreground" : ""}`}>{d && <Check className="size-4" />}</span>
                      <span className={d ? "line-through text-muted-foreground" : ""}><b className="text-destructive">{n + 1}.</b> {st}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </article>
    </Shell>
  );
}
