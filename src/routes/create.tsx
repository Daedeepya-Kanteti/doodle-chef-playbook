import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { actions } from "@/lib/recipes";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create a Recipe — DoodleChef" },
      { name: "description", content: "Add your own recipe to the DoodleChef cookbook." },
      { property: "og:title", content: "Create a Recipe — DoodleChef" },
      { property: "og:description", content: "Write down your own recipe card." },
    ],
  }),
  component: Create,
});

const field = "w-full rounded-xl border-2 bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function Create() {
  const navigate = useNavigate();
  const [f, setF] = useState({ title: "", description: "", prep: "5", cook: "10", serves: "1", cuisine: "", course: "", ingredients: "", steps: "" });
  const up = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `mine-${Date.now()}`;
    actions.addRecipe({
      id, title: f.title.trim(), description: f.description.trim(),
      prep: Number(f.prep) || 0, cook: Number(f.cook) || 0, serves: Number(f.serves) || 1,
      cuisine: f.cuisine || "Homemade", course: f.course || "Anytime", custom: true,
      ingredients: f.ingredients.split("\n").filter(Boolean).map((l) => {
        const [name, ...qty] = l.split(",");
        return { name: (name ?? "").trim(), qty: qty.join(",").trim() };
      }),
      steps: f.steps.split("\n").map((x) => x.trim()).filter(Boolean),
    });
    navigate({ to: "/recipe/$id", params: { id } });
  };

  return (
    <Shell>
      <h1 className="font-display text-5xl">Create a Recipe</h1>
      <form onSubmit={submit} className="doodle-card mt-8 p-6 grid gap-4 max-w-2xl">
        <span className="tape" />
        <input required placeholder="Recipe title" value={f.title} onChange={up("title")} className={field} />
        <input placeholder="One-line description" value={f.description} onChange={up("description")} className={field} />
        <div className="grid grid-cols-3 gap-3">
          <label className="text-xs font-bold">Prep (min)<input type="number" value={f.prep} onChange={up("prep")} className={field} /></label>
          <label className="text-xs font-bold">Cook (min)<input type="number" value={f.cook} onChange={up("cook")} className={field} /></label>
          <label className="text-xs font-bold">Serves<input type="number" value={f.serves} onChange={up("serves")} className={field} /></label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Cuisine" value={f.cuisine} onChange={up("cuisine")} className={field} />
          <input placeholder="Course" value={f.course} onChange={up("course")} className={field} />
        </div>
        <textarea required rows={4} placeholder={"Ingredients, one per line: name, amount\nEgg, 2 piece"} value={f.ingredients} onChange={up("ingredients")} className={field} />
        <textarea required rows={5} placeholder="Steps, one per line" value={f.steps} onChange={up("steps")} className={field} />
        <button className="btn-doodle bg-primary justify-self-start">Save recipe</button>
      </form>
    </Shell>
  );
}
