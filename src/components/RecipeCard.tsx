import { Link } from "@tanstack/react-router";
import { Check, Clock, CookingPot, Users, X } from "lucide-react";
import { has, missing, type Recipe } from "@/lib/recipes";

export function RecipeCard({ recipe, tray }: { recipe: Recipe; tray: string[] }) {
  const miss = missing(recipe, tray);
  return (
    <div className="doodle-card p-4">
      <span className="tape" />
      <div className="flex gap-3">
        <span className="grid place-items-center size-14 shrink-0 rounded-xl border-2 bg-secondary">
          <CookingPot className="size-6" />
        </span>
        <div>
          <h3 className="font-extrabold text-lg">{recipe.title}</h3>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="chip bg-primary"><Clock className="size-3" />{recipe.prep + recipe.cook} min</span>
            <span className="chip"><Users className="size-3" />serves {recipe.serves}</span>
            <span className="chip">{recipe.cuisine}</span>
          </div>
        </div>
      </div>
      {miss.length > 0 && <div className="mt-3"><span className="stamp-missing">Missing: {miss.join(" & ")}</span></div>}
      <div className="mt-3 flex flex-wrap gap-1">
        {recipe.ingredients.map((i) =>
          has(tray, i.name) ? (
            <span key={i.name} className="chip border-success text-success"><Check className="size-3" />{i.name}</span>
          ) : (
            <span key={i.name} className="chip border-dashed border-destructive text-destructive"><X className="size-3" />{i.name}</span>
          ),
        )}
      </div>
      <Link to="/recipe/$id" params={{ id: recipe.id }} className="btn-doodle mt-4">Open the recipe card</Link>
    </div>
  );
}
