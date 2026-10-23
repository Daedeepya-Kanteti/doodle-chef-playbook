import { useSyncExternalStore } from "react";

export type Ingredient = { name: string; qty: string };
export type Recipe = {
  id: string;
  title: string;
  description: string;
  prep: number;
  cook: number;
  serves: number;
  cuisine: string;
  course: string;
  ingredients: Ingredient[];
  steps: string[];
  custom?: boolean;
};

const r = (
  id: string, title: string, description: string, prep: number, cook: number, serves: number,
  cuisine: string, course: string, ingredients: [string, string][], steps: string[],
): Recipe => ({ id, title, description, prep, cook, serves, cuisine, course,
  ingredients: ingredients.map(([name, qty]) => ({ name, qty })), steps });

export const SEED: Recipe[] = [
  r("golden-onion-scramble", "Golden Onion Scramble", "A sunny breakfast built on sweet, slow-cooked onions.", 5, 15, 1, "French", "Breakfast",
    [["Onion", "1 piece"], ["Butter", "1 tbsp"], ["Egg", "2 piece"]],
    ["Slice the onion into thin ribbons.", "Melt the butter over low heat.", "Cook the onion until soft and golden.", "Add the eggs and stir through the onion.", "Scramble to your liking and serve warm."]),
  r("grilled-cheese-triangle", "Grilled Cheese Triangle", "Crisp outside, melty middle, cut corner to corner.", 3, 6, 2, "American", "Lunch",
    [["Bread", "4 slice"], ["Butter", "2 tbsp"], ["Cheese", "4 slice"]],
    ["Butter one side of each slice.", "Layer cheese between unbuttered sides.", "Toast in a pan until golden on both sides.", "Cut into triangles."]),
  r("midnight-cheese-toastie", "Midnight Cheese Toastie", "The two-minute fix for a late-night craving.", 2, 5, 1, "American", "Snack",
    [["Bread", "2 slice"], ["Butter", "1 tbsp"], ["Cheese", "2 slice"]],
    ["Butter the outsides of the bread.", "Fill with cheese.", "Press in a hot pan until crisp and melted."]),
  r("sunny-side-sunrise", "Sunny Side Sunrise", "A fried egg on buttered toast, simply seasoned.", 3, 10, 1, "American", "Breakfast",
    [["Egg", "1 piece"], ["Butter", "1 tsp"], ["Bread", "1 slice"], ["Salt", "pinch"], ["Black Pepper", "pinch"]],
    ["Toast the bread.", "Fry the egg in butter until the white sets.", "Slide onto the toast and season."]),
  r("buttered-veggie-toast", "Simple Buttered Veggie Toast", "Crunchy fresh slices on warm buttered bread.", 5, 2, 1, "Rustic", "Snack",
    [["Bread", "2 slice"], ["Butter", "1 tbsp"], ["Tomato", "1 piece"], ["Cucumber", "½ piece"]],
    ["Toast and butter the bread.", "Slice the tomato and cucumber.", "Layer on top and eat right away."]),
  r("honey-pb-toast", "Honey Peanut Butter Toast", "Sweet, salty and sticky in the best way.", 2, 3, 1, "American", "Breakfast",
    [["Bread", "1 slice"], ["Peanut Butter", "2 tbsp"], ["Honey", "1 tsp"]],
    ["Toast the bread.", "Spread peanut butter.", "Drizzle honey over the top."]),
  r("tomato-pasta", "Five-Ingredient Tomato Pasta", "A quick pan sauce clinging to every strand.", 5, 15, 2, "Italian", "Dinner",
    [["Pasta", "200 g"], ["Tomato", "3 piece"], ["Garlic", "2 clove"], ["Olive Oil", "2 tbsp"], ["Salt", "pinch"]],
    ["Boil the pasta in salted water.", "Warm oil and gently fry sliced garlic.", "Add chopped tomato and cook down.", "Toss with the drained pasta."]),
  r("garlic-rice", "Garlic Fried Rice", "Leftover rice turned toasty and fragrant.", 3, 8, 2, "Filipino", "Side",
    [["Rice", "2 cup"], ["Garlic", "4 clove"], ["Oil", "1 tbsp"], ["Salt", "pinch"]],
    ["Fry minced garlic in oil until golden.", "Add rice and break up clumps.", "Season and fry until hot."]),
  r("egg-fried-rice", "Egg Fried Rice", "The weeknight hero with soy and scallion.", 5, 10, 2, "Chinese", "Dinner",
    [["Rice", "2 cup"], ["Egg", "2 piece"], ["Soy Sauce", "1 tbsp"], ["Oil", "1 tbsp"], ["Spring Onion", "2 stalk"]],
    ["Scramble eggs in oil and set aside.", "Fry the rice until hot.", "Return eggs, add soy sauce.", "Finish with sliced spring onion."]),
  r("banana-pancakes", "Two-Ingredient Banana Pancakes", "Naturally sweet, no flour required.", 5, 8, 1, "Modern", "Breakfast",
    [["Banana", "1 piece"], ["Egg", "2 piece"]],
    ["Mash the banana.", "Whisk in the eggs.", "Cook small rounds in a pan, flipping once."]),
  r("cheese-omelette", "Fluffy Cheese Omelette", "Soft folds with a melted centre.", 3, 5, 1, "French", "Breakfast",
    [["Egg", "3 piece"], ["Butter", "1 tsp"], ["Cheese", "30 g"]],
    ["Whisk the eggs well.", "Pour into foaming butter and swirl.", "Scatter cheese, fold and slide out."]),
  r("tomato-cucumber-salad", "Crunchy Tomato Cucumber Salad", "Bright, cold and done in minutes.", 8, 0, 2, "Mediterranean", "Side",
    [["Tomato", "2 piece"], ["Cucumber", "1 piece"], ["Onion", "½ piece"], ["Olive Oil", "1 tbsp"], ["Salt", "pinch"]],
    ["Chop everything into bite-size pieces.", "Toss with oil and salt.", "Rest five minutes before serving."]),
  r("potato-wedges", "Crispy Potato Wedges", "Golden edges, fluffy middles.", 5, 30, 2, "American", "Side",
    [["Potato", "3 piece"], ["Oil", "2 tbsp"], ["Salt", "pinch"]],
    ["Cut potatoes into wedges.", "Toss with oil and salt.", "Roast at 220°C until crisp, turning once."]),
  r("french-toast", "Cinnamon French Toast", "Custardy slices with a warm spice.", 5, 8, 2, "French", "Breakfast",
    [["Bread", "4 slice"], ["Egg", "2 piece"], ["Milk", "½ cup"], ["Butter", "1 tbsp"], ["Cinnamon", "½ tsp"]],
    ["Whisk egg, milk and cinnamon.", "Soak each slice briefly.", "Fry in butter until golden on both sides."]),
  r("masala-omelette", "Masala Omelette", "Spiced with onion, tomato and chilli.", 5, 5, 1, "Indian", "Breakfast",
    [["Egg", "2 piece"], ["Onion", "¼ piece"], ["Tomato", "¼ piece"], ["Green Chilli", "1 piece"], ["Oil", "1 tsp"]],
    ["Finely chop onion, tomato and chilli.", "Beat into the eggs.", "Cook in oil, flip and serve."]),
  r("buttered-noodles", "Buttery Garlic Noodles", "Comfort in a bowl, ready fast.", 2, 10, 1, "Fusion", "Dinner",
    [["Noodles", "1 pack"], ["Butter", "1 tbsp"], ["Garlic", "2 clove"], ["Soy Sauce", "1 tsp"]],
    ["Cook the noodles.", "Melt butter with minced garlic.", "Toss noodles in garlic butter and soy."]),
  r("banana-smoothie", "Banana Milk Smoothie", "Thick, creamy and lightly sweet.", 3, 0, 1, "Modern", "Drink",
    [["Banana", "1 piece"], ["Milk", "1 cup"], ["Honey", "1 tsp"]],
    ["Add everything to a blender.", "Blend until smooth.", "Pour and drink cold."]),
  r("cheesy-potato", "Cheesy Mashed Potato", "Fluffy mash with a stretchy finish.", 5, 20, 2, "American", "Side",
    [["Potato", "3 piece"], ["Butter", "2 tbsp"], ["Milk", "¼ cup"], ["Cheese", "50 g"]],
    ["Boil potatoes until tender.", "Mash with butter and milk.", "Stir in cheese until melted."]),
  r("tomato-soup", "Simple Tomato Soup", "Silky and warming with garlic.", 5, 20, 2, "Rustic", "Lunch",
    [["Tomato", "5 piece"], ["Onion", "1 piece"], ["Garlic", "2 clove"], ["Butter", "1 tbsp"], ["Water", "2 cup"]],
    ["Soften onion and garlic in butter.", "Add tomato and water; simmer 15 min.", "Blend until smooth."]),
  r("egg-toast-cup", "Egg-in-a-Hole", "A fried egg nested inside toast.", 2, 5, 1, "American", "Breakfast",
    [["Bread", "1 slice"], ["Egg", "1 piece"], ["Butter", "1 tsp"]],
    ["Cut a hole in the bread.", "Fry in butter and crack the egg into the hole.", "Flip once and serve."]),
  r("rice-pudding", "Stovetop Rice Pudding", "Slow-stirred and cosy.", 2, 30, 2, "British", "Dessert",
    [["Rice", "½ cup"], ["Milk", "3 cup"], ["Sugar", "3 tbsp"]],
    ["Combine everything in a pot.", "Simmer gently, stirring often.", "Cook until thick and creamy."]),
  r("cucumber-sandwich", "Cool Cucumber Sandwich", "Thin, crisp and tidy.", 5, 0, 1, "British", "Snack",
    [["Bread", "2 slice"], ["Butter", "1 tbsp"], ["Cucumber", "½ piece"]],
    ["Butter the bread.", "Layer thin cucumber slices.", "Close, trim and cut."]),
];

// ---------- tiny localStorage store ----------
type State = { tray: string[]; custom: Recipe[]; deleted: string[]; stash: string[] };
const KEY = "doodlechef-v1";
const initial: State = { tray: ["Butter", "Bread", "Egg"], custom: [], deleted: [], stash: [] };
let state: State = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch { /* ignore */ }
}
function set(fn: (s: State) => State) {
  load();
  state = fn(state);
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}
export function useStore() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => { load(); return state; },
    () => initial,
  );
}

const norm = (s: string) => s.trim().toLowerCase();
export const has = (tray: string[], name: string) => tray.some((t) => norm(t) === norm(name));

export const actions = {
  addToTray: (name: string) => set((s) => (!name.trim() || has(s.tray, name) ? s : { ...s, tray: [...s.tray, name.trim()] })),
  removeFromTray: (name: string) => set((s) => ({ ...s, tray: s.tray.filter((t) => norm(t) !== norm(name)) })),
  toggleStash: (id: string) => set((s) => ({ ...s, stash: s.stash.includes(id) ? s.stash.filter((x) => x !== id) : [...s.stash, id] })),
  addRecipe: (rec: Recipe) => set((s) => ({ ...s, custom: [rec, ...s.custom] })),
  deleteRecipe: (id: string) => set((s) => ({ ...s, custom: s.custom.filter((c) => c.id !== id), deleted: [...s.deleted, id], stash: s.stash.filter((x) => x !== id) })),
};

export function allRecipes(s: State): Recipe[] {
  return [...s.custom, ...SEED.filter((x) => !s.deleted.includes(x.id))];
}
export function missing(rec: Recipe, tray: string[]) {
  return rec.ingredients.filter((i) => !has(tray, i.name)).map((i) => i.name);
}

/** Invent a dish using ONLY tray items. */
export function inventRecipe(tray: string[]): Recipe | null {
  if (tray.length === 0) return null;
  const items = tray.slice(0, 5);
  const styles = ["Skillet", "Tray Bake", "Stack", "Toss", "Hash"];
  const style = styles[items.join("").length % styles.length];
  return {
    id: `invented-${Date.now()}`,
    title: `${items.slice(0, 2).join(" & ")} ${style}`,
    description: `Invented from your tray alone — nothing sneaked in.`,
    prep: 5, cook: 10, serves: 1, cuisine: "Improvised", course: "Anytime", custom: true,
    ingredients: items.map((name) => ({ name, qty: "to taste" })),
    steps: [
      `Prep the ${items.join(", ")} into bite-size pieces.`,
      `Warm a pan and add whatever cooks longest first.`,
      `Add the rest and cook until everything is hot and tender.`,
      `Plate it up and enjoy — only what you have, nothing more.`,
    ],
  };
}
