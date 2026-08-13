<!-- BEGIN:nextjs-agent-rules -->

# Next.js 16 + React 19 — Production-Grade Agent Rules

# Version: 2.0 — Updated for this repository

This is Next.js **16.3.0** with React **19.2.8** and the React Compiler (`reactCompiler: true`).
APIs, conventions, and file structure differ significantly from your training data.

> Always read `node_modules/next/dist/docs/` before writing any code.

---

## Critical Breaking Changes from Next.js 15

### Tailwind CSS v4 (CSS-only config)
- **NO** `tailwind.config.js` — configuration lives entirely in CSS via `@theme inline {}`
- Import is `@import 'tailwindcss'` (not `@tailwind base/components/utilities`)
- Custom tokens are CSS variables: `--color-cyan: #00ffc2` inside `@theme inline {}`
- PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss`)

### React 19 Compiler
- `reactCompiler: true` is set in `next.config.ts`
- **Do NOT** add manual `useMemo`, `useCallback`, or `React.memo` — the compiler handles memoization
- Only add `useCallback` when you need a stable identity for `useEffect` deps

### LayoutProps Generic
- Root layout uses `LayoutProps<"/">` generic (Next.js 16 typed route params)
- Example: `export default function RootLayout({ children }: LayoutProps<"/">)`

### Route Handlers
- Use `Response.json()` (not `NextResponse.json()`) for plain JSON
- `headers()` and `cookies()` from `next/headers` are **async** — always `await` them
- `params` in dynamic routes is a `Promise<{...}>` — always `await` it
- `force-static` on GET handlers opts into edge caching

### Server vs Client Components
- Default: all files in `app/` are **Server Components**
- Add `'use client'` only when you need: state, effects, event handlers, browser APIs
- Never import server-only modules in Client Components
- Context providers must be Client Components wrapping Server Component children

---

## Repository Architecture

```
src/
├── app/                    # Next.js App Router (routes + API handlers)
│   ├── api/                # Route handlers (server-only)
│   ├── admin/              # Protected admin panel
│   ├── login/              # Firebase auth page
│   ├── globals.css         # Tailwind v4 @theme config + global styles
│   ├── layout.tsx          # Root layout (Server Component)
│   └── page.tsx            # Portfolio home (Client — uses BootScreen state)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Page sections (Hero, Projects, etc.)
│   └── ui/                 # Reusable primitives (Terminal, SlideOver, etc.)
├── context/                # React context providers (Client Components)
├── data/                   # Static seed data (projects, skills, systems)
├── hooks/                  # Custom React hooks
├── lib/                    # Shared utilities and SDK wrappers
└── types/                  # TypeScript interfaces
```

---

## Coding Standards

### TypeScript
- Strict mode enabled — no `any`, no unchecked assertions
- Use `type` for data shapes, `interface` for extensible contracts
- All API route request/response bodies must be typed
- Prefer `unknown` over `any` for external data

### Components
- One component per file; filename matches component name exactly
- Server Components: no `'use client'`, no state/effects, can be `async`
- Client Components: `'use client'` at top of file above all imports
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes (clsx + twMerge)

### Styling
- Use Tailwind v4 utilities exclusively; no inline `style={}` for layout
- Use inline `style={}` for dynamic CSS variable references (e.g. `style={{ color: "var(--color-cyan)" }}`)
- Design tokens: always reference `var(--color-*)`, `var(--font-*)` from `@theme inline`
- Glassmorphism: use `.glass` or `.glass-cyan` utility classes

### Firebase
- Always check `isFirebaseConfigured()` before calling Firebase
- `db` and `auth` exports from `@/lib/firebase` are nullable — handle `null` case
- Server-side Firebase operations use Admin SDK (not client SDK)

### Gemini AI
- `queryGemini()` from `@/lib/gemini` is server-only — only call from route handlers
- Mock response is returned automatically when `GEMINI_API_KEY` is absent

### Performance
- Prefer Server Components for static/data-fetch-heavy content
- Use `use cache` directive (Next.js 16) instead of `React.cache` or manual ISR
- Add `export const dynamic = 'force-static'` to GET route handlers that don't need runtime data
- Images should use `next/image` with explicit `width` and `height`

### Animations
- All animations via Framer Motion (`motion/react` in Next.js 16 or `framer-motion`)
- Use `useInView` with `once: true` for scroll-triggered animations
- `AnimatePresence` wraps conditional renders for enter/exit transitions
- Prefer `transition: { type: "spring" }` over duration-based for interactive elements

### Lucide Icons Standard (CRITICAL)
- **ONLY** use verified production constants from `lucide-react`.
- **NEVER** import removed brand icon names such as `Github`, `Linkedin`, `Chrome`, `Twitter`, `Facebook`.
- **ALWAYS** use standard Lucide alternatives:
  - `GitBranch` instead of `Github`
  - `Globe` instead of `Linkedin` / `Chrome`
  - `Share2` / `MessageSquare` instead of social icons
  - `Terminal`, `Mail`, `Zap`, `Layers`, `Activity`, `Menu`, `X`, `ChevronRight`, `ArrowRight`

---

## File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Pages | lowercase | `page.tsx`, `layout.tsx` |
| Components | PascalCase | `HeroSection.tsx`, `GlowButton.tsx` |
| Hooks | camelCase with `use` prefix | `useScrollSpy.ts` |
| Utilities | camelCase | `utils.ts`, `firebase.ts` |
| Types | `index.ts` in `types/` | `types/index.ts` |
| Data | camelCase plural | `projects.ts`, `skills.ts` |

---

## Environment Variables

| Variable | Scope | Required |
|---|---|---|
| `GEMINI_API_KEY` | Server-only | No (mock fallback) |
| `NEXT_PUBLIC_FIREBASE_*` | Client + Server | No (mock fallback) |

Never use `NEXT_PUBLIC_` for secrets. `GEMINI_API_KEY` is intentionally server-only.

<!-- END:nextjs-agent-rules -->
