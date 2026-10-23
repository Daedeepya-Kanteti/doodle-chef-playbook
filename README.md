# 🍳 DoodleChef

> *Recipes for what you actually have.*

DoodleChef is a kitchen helper with a hand-drawn look. You tell it what is on your shelf, and it answers honestly: the dishes you can cook **right now**, and the ones you're a purchase or two away from. It never quietly assumes you own salt, butter, oil or water — if it isn't in your tray, it doesn't count.

---

## ✨ What it does

| Feature | Details |
| --- | --- |
| **In My Kitchen tray** | Add and remove ingredients by name. Stickers stay on the shelf between visits. |
| **Pure matches** | Recipes whose ingredient list your tray covers 100%. |
| **Almost there** | Recipes missing 1–2 items, stamped with exactly what to buy. |
| **Whip up a recipe** | Invents a brand-new dish from your tray alone — nothing sneaked in. |
| **The Cookbook** | Browse and search all recipes by title, cuisine or ingredient. |
| **Create a Recipe** | Write your own recipe card and keep it in the same cookbook. |
| **My Stash** | Pin recipes for later, unpin when you're done. |
| **Recipe card** | Ingredient checklist, "I have this" quick-adds, and steps you scratch off as you cook. |
| **Delete** | Remove any recipe you don't want in rotation. |

### The zero-assumption rule

Salt, pepper, oil, butter, soy sauce, garlic and even water **only count if you add them yourself**. That single rule is what makes the match list trustworthy — no recipe ever shows up as "you can cook this" because the app guessed you had pantry staples.

---

## 🧭 Pages

| Route | Screen |
| --- | --- |
| `/` | **Empty My Fridge** — tray, matches, near misses, whip-up button |
| `/cookbook` | **The Cookbook** — searchable grid of every recipe |
| `/create` | **Create a Recipe** — recipe card form |
| `/stash` | **My Stash** — recipes you pinned |
| `/recipe/$id` | **Recipe card** — ingredients, method, pin and delete |

---

## 🧱 Built with

- [TanStack Start](https://tanstack.com/start) v1 — React 19 full-stack framework (file-based routing, SSR/SSG)
- [TanStack Router](https://tanstack.com/router) — type-safe routing
- [TanStack Query](https://tanstack.com/query) — data layer
- [Tailwind CSS](https://tailwindcss.com) v4 — styling, configured through `src/styles.css` theme tokens
- [Radix UI](https://www.radix-ui.com) + shadcn/ui conventions — accessible primitives
- [lucide-react](https://lucide.dev) — icons
- [Vite](https://vite.dev) 8 — build tool and dev server
- [Vitest](https://vitest.dev) + React Testing Library — tests
- TypeScript — strict mode

No backend service is required to run it: your tray, your own recipes and your pins live in your browser's `localStorage` under the key `doodlechef-v1`.

---

## 🚀 Getting started

You need [Node.js](https://nodejs.org) (LTS) and npm.

```sh
git clone <this-repository-url>
cd doodlechef
npm install
npm run dev
```

Open the URL the dev server prints (usually `http://localhost:8080`).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the project |
| `npm run format` | Prettier write |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |

---

## 📁 Project layout

```text
src/
├── components/
│   ├── Shell.tsx          # header, nav, footer — the app chrome
│   └── RecipeCard.tsx     # recipe tile used across every page
├── lib/
│   ├── recipes.ts         # types, seed recipes, localStorage store, matching logic
│   └── utils.ts           # cn() class-name helper
├── routes/
│   ├── __root.tsx         # document shell, fonts, toasts
│   ├── index.tsx          # /          — Empty My Fridge
│   ├── cookbook.tsx       # /cookbook  — The Cookbook
│   ├── create.tsx         # /create    — Create a Recipe
│   ├── stash.tsx          # /stash     — My Stash
│   └── recipe.$id.tsx     # /recipe/$id— Recipe card
├── styles.css             # Tailwind v4 theme tokens + doodle utilities
├── router.tsx             # router setup
├── server.ts              # server entry
├── start.ts               # client start + middleware
└── test/                  # Vitest setup and tests
```

---

## 🍽️ The recipe data

`src/lib/recipes.ts` holds 22 built-in recipes as a plain typed array — easy to edit or replace with your own. Each recipe is:

```ts
{
  id: "tomato-pasta",
  title: "Five-Ingredient Tomato Pasta",
  description: "A quick pan sauce clinging to every strand.",
  prep: 5,          // minutes
  cook: 15,         // minutes
  serves: 2,
  cuisine: "Italian",
  course: "Dinner",
  ingredients: [{ name: "Pasta", qty: "200 g" }, /* ... */],
  steps: ["Boil the pasta in salted water.", /* ... */],
}
```

Recipes you write yourself are stored alongside these and marked `custom: true`, so they show a "your own recipe" stamp and are never lost when the seed list changes.

---

## ⚠️ Known limitations

- **Browser-only saving.** Tray, own recipes and pins are per-device and per-browser. Clearing site data clears them, and they don't sync between phone and laptop.
- **No accounts.** There is no sign-in, so nothing is shared or backed up.
- **"Whip up a recipe" is rule-based, not AI.** It composes a plausible dish from your tray items using a small set of styles — it doesn't invent genuinely new cooking.
- **Search is simple substring matching** across title, cuisine and ingredient names.

---

## 📄 License

Open source — do what you like with it.
