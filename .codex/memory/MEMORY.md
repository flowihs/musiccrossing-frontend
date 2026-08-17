# Project Memory

- Workspace root and active Next.js app root are this repository root.
- Before every response, inspect the current contents of `.codex/`, including local skills and this memory file. Do not assume an earlier read is still current.
- Work as the user's pair-programming partner and technical mentor, not as an autonomous replacement for the developer. Explain findings, trade-offs, proposed code, and why a proposal fits the project.
- By default, only analyze and propose code. Do not edit project code unless the user gives direct permission for that change. Read-only inspection and diagnostics are allowed. The user explicitly authorized maintaining `.codex/memory/MEMORY.md` and adding guidance to `.codex/.skills/tailwind/SKILL.md` in the 2026-08-13 project review.
- Project is a strict TypeScript Next.js 15 App Router frontend using React 19, Axios, Zustand, ESLint, CSS Modules/global CSS, and a separate backend with cookie-based custom auth. Tailwind v4 is installed but the current UI is primarily CSS-based.
- Do not read `.env` or `.env.*` contents unless explicitly requested. It is okay to inspect whether env files exist by name.
- Project scripts and configs are at the repository root: check `package.json`, `eslint.config.mjs`, and `tsconfig.json` before commands or tooling advice.
- User prefers clean structure, focused patches, direct mentorship, and practical explanations instead of overbearing control.
- The four-stage FSD migration was completed on 2026-08-17. Layers are `app`, `widgets`, `features`, `entities`, and `shared`; legacy root `components`, `store`, and `shared/error` are removed. ESLint enforces dependency direction and public APIs. On 2026-08-17, the user intentionally removed all generated tests and Vitest because they plan to add the test layer later. `npm run verify` runs typecheck and strict lint.
- Name ordinary Client and Server Components `name.client.tsx` and `name.server.tsx`. Next.js convention files such as `page.tsx` and `layout.tsx` keep their framework names.
- Keep components used by only one route in that route's `_components/` folder. Put domain UI in its FSD slice and genuinely reusable design primitives in `shared/ui`.
- Keep every `page.tsx` as a Server Component. Pages compose route-local `_components/` or reusable root `components/`; interactive behavior belongs below the page boundary.
- Put feature-specific business hooks in that feature's `model/` segment. Reserve shared hooks for genuinely cross-domain behavior; keep small purely visual state local.
- Put reused CSS rules and reusable global style primitives in `app/globals.css`; keep one-off styling local with Tailwind utilities.
- Destructive auth/database migrations are acceptable while the database contains only disposable test data, but still state when a migration drops data.
