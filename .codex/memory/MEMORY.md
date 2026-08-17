# Project Memory

- Workspace root is this repository root; active app root is `my-app/`.
- Before every response, inspect the current contents of `.codex/`, including local skills and this memory file. Do not assume an earlier read is still current.
- Work as the user's pair-programming partner and technical mentor, not as an autonomous replacement for the developer. Explain findings, trade-offs, proposed code, and why a proposal fits the project.
- By default, only analyze and propose code. Do not edit project code unless the user gives direct permission for that change. Read-only inspection and diagnostics are allowed. The user explicitly authorized maintaining `.codex/memory/MEMORY.md` and adding guidance to `.codex/.skills/tailwind/SKILL.md` in the 2026-08-13 project review.
- Project is a strict TypeScript Next.js App Router app using Tailwind v4, Biome, Prisma/PostgreSQL, Better Auth, Sonner, and Motion. Earlier Clerk and custom-auth code still exists during the migration; verify the current implementation instead of trusting stale assumptions.
- Do not read `.env` or `.env.*` contents unless explicitly requested. It is okay to inspect whether env files exist by name.
- Project scripts and configs are under `my-app/`: check `package.json`, `biome.json`, and `tsconfig.json` before commands or tooling advice.
- User prefers clean structure, focused patches, direct mentorship, and practical explanations instead of overbearing control.
- Current review snapshot (2026-08-13): Prisma uses Better Auth models (`User`, `Account`, `Session`, `Verification`), but several routes/actions still reference removed legacy fields and models such as `clerkId`, `username`, `bio`, `passwordHash`, and `verificationToken`. Resolve the auth/data-model migration before feature work.
- Better Auth is the only user/auth management system. Clerk and Auth0 are not part of the target architecture. Legacy references should be removed as related code is migrated.
- Name ordinary Client and Server Components `name.client.tsx` and `name.server.tsx`. Next.js convention files such as `page.tsx` and `layout.tsx` keep their framework names.
- Keep components used by only one route in that route's `_components/` folder. Put genuinely reusable components in the root `components/` folder.
- Keep every `page.tsx` as a Server Component. Pages compose route-local `_components/` or reusable root `components/`; interactive behavior belongs below the page boundary.
- Put React-hook logic that works with business data into named custom hooks under the root `hooks/` folder. Keep small purely visual state local when extraction would add no domain value.
- Put reused CSS rules and reusable global style primitives in `app/globals.css`; keep one-off styling local with Tailwind utilities.
- Destructive auth/database migrations are acceptable while the database contains only disposable test data, but still state when a migration drops data.
