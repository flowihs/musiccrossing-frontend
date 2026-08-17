# Engineering Judgment Skill

Use this skill whenever changing, reviewing, or suggesting code in this project.

Before writing or modifying code, read this file and use it as the active coding checklist. When explicitly asked to improve repository guidance, update this file with focused lessons learned from the current codebase rather than adding generic rules.

## Core Goal

Write code that is correct, readable, maintainable, and proportionate to the problem. Prefer designs that a future maintainer can understand quickly. Avoid cleverness that hides bugs.

## Design Principles

### SOLID

- Single Responsibility: each function, component, action, route, or module should have one clear reason to change.
- Open/Closed: prefer adding new behavior through clear extension points instead of editing many unrelated places.
- Liskov Substitution: when a function accepts a shape/type, every valid implementation of that shape should behave safely.
- Interface Segregation: do not force broad prop objects, configs, or service APIs when the caller only needs a small slice.
- Dependency Inversion: high-level code should depend on small stable abstractions, not direct implementation details, when that reduces coupling.

Apply SOLID pragmatically. Do not add interfaces, factories, or layers unless they remove real complexity or protect a real boundary.

### KISS

Keep the design simple enough to reason about. If a plain function or small component solves the problem, use that. Avoid abstractions that exist only because they look architectural.

Good simple code:

- has clear names;
- has local, obvious control flow;
- avoids unnecessary state;
- validates inputs close to boundaries;
- makes failure paths visible.

### DRY

Avoid meaningful duplication, especially duplicated business rules, validation schemas, tokens, messages, and API response shapes.

Do not remove harmless duplication by creating a vague abstraction. Two similar pieces of UI can remain separate until the shared pattern is stable. Prefer duplication over a premature abstraction that makes both call sites harder to read.

### YAGNI

Do not build future features before they are needed. Leave clear extension points only when the current code naturally suggests them.

### Principle of Least Astonishment

Code should behave as the reader expects from its name and location. A component should render UI. A hook should be named `useSomething`. A server action should validate and authorize its own mutation.

## Complexity And Understanding

Understanding is more important than compactness.

Avoid both extremes:

- code that is too long, repetitive, and hard to scan;
- code that is very short but dense, clever, and fragile.

Prefer a balanced middle:

- small named helpers for repeated or non-obvious logic;
- explicit branches for important states;
- semantic types for important domain concepts;
- early returns for invalid states;
- comments only when they clarify non-obvious decisions.

When code becomes hard to understand, first improve names and structure. Add abstractions only when they reduce real cognitive load.

## Validation Loop Before Suggesting Or Writing Code

Before suggesting or applying code, mentally validate it through this loop:

1. Syntax: check imports, exports, JSX structure, TypeScript types, async/await usage, and file boundaries.
2. Runtime behavior: check null/undefined cases, loading states, race conditions, stale state, redirects, and error paths.
3. Security: check authentication, authorization, server-side validation, secrets, file uploads, and user-controlled input.
4. Data model: check whether the change fits Prisma schema constraints, unique indexes, relations, and existing migrations.
5. React/Next patterns: check server/client component boundaries, hook usage, route groups, server actions, API routes, and session updates.
6. UX: check disabled states, toasts, form feedback, mobile layout, empty/error states, and whether text fits.
7. Maintainability: check naming, duplication, coupling, hidden side effects, and whether future edits will be obvious.
8. Wider impact: check whether a narrow fix breaks another route, component, token, auth flow, or shared helper.

If code seems correct in a narrow local area, still inspect how it behaves in the wider app flow.

## Project-Specific Preferences

- Reuse existing stack and patterns: Next.js App Router, Prisma, Better Auth, React Hook Form, Zod, Sonner, Tailwind v4, Biome, and strict TypeScript.
- Validate on the server even when the client already has Zod validation.
- Keep auth-required mutations behind Better Auth server-side session and authorization checks.
- Prefer semantic app-level tokens for repeated global colors, sizes, and layout values.
- Prefer focused patches. Do not rewrite whole files when a local patch is enough.
- Prefer central wrappers for repeated behavior, such as toast messages, only when repetition is real.
- Do not call hook-like components as plain functions; make them either real components or real hooks.

## Modern TypeScript Development

- Treat `strict` TypeScript as a design tool. Model nullability, loading states, empty states, and errors explicitly.
- Avoid `any`. If input is unknown, keep it as `unknown` until validation narrows it.
- Prefer inferred local types, exported domain types for shared contracts, and Zod schemas at runtime boundaries.
- Use `import type` for type-only imports and keep type exports separate from runtime exports when it improves clarity.
- Do not use non-null assertions as a shortcut around missing checks.
- Keep discriminated unions for multi-state flows such as auth status, token validation, uploads, and async form results.
- Keep data-fetching contracts narrow: response types should reflect exactly what the UI consumes, not entire database records unless needed.
- Never import server-only modules such as Prisma into client components, client hooks, or files marked `"use client"`.

## Next.js App Router Skill

- Default to Server Components. Use Client Components only for state, effects, browser APIs, event handlers, client-only libraries, and interactive animation.
- Name ordinary Client and Server Component files `name.client.tsx` and `name.server.tsx`. Keep Next.js convention filenames such as `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, and `error.tsx` unchanged.
- Every `page.tsx` is a Server Component. It should compose route-local components from the route's `_components/` folder or reusable components from the root `components/` folder.
- Keep a component used by only one route in that route's `_components/` folder. Promote it to root `components/` only when it is genuinely reused across routes.
- Move React-hook logic that coordinates business data, requests, mutations, or domain state into a named custom hook under the root `hooks/` folder. Small presentational state may remain local.
- Static rendering is not the opposite of Server Components. A server-rendered page can be static if it avoids request-time data.
- Mark intentionally static marketing pages with `dynamic = "error"` when accidental dynamic APIs should fail loudly.
- Use route handlers for HTTP APIs and external boundaries. Use server actions for internal mutations and form-style workflows.
- Keep route-private components in `app/**/_components`; use top-level `components/` only for reusable UI.
- Prefer colocated server data helpers in `lib/data` and mutation actions in `lib/actions`.

## Better Auth Skill

- Better Auth is the sole user and authentication manager. Do not add Clerk or Auth0 packages, APIs, components, schema fields, or middleware.
- Use Better Auth server APIs in Server Components, layouts, route handlers, proxy, and server actions.
- Use the Better Auth React client and its hooks only in Client Components.
- Enforce protected route access at a boundary such as `proxy.ts` or a route-group layout instead of duplicating checks in many pages.
- When enabling a Better Auth plugin, update the Prisma schema with every field required by that plugin, then create/apply a Prisma migration and regenerate the client before exercising the flow.
- During migration, remove stale Clerk, Auth0, NextAuth, and custom-auth assumptions before relying on auth behavior.

## Biome And Tooling Skill

- Read `my-app/package.json` before running scripts.
- Read `my-app/biome.json` before formatting/linting advice; Biome is configured with strict TypeScript, React, a11y, and no-`any` rules.
- Read `my-app/tsconfig.json` before diagnosing type behavior; strict mode and `@/*` path aliases are enabled.
- If the editor cannot find Biome, first verify the workspace root and local binary path under `my-app/node_modules/.bin/biome`.

## Reference-Driven UI Work

When using another repository as inspiration, first inspect its instructions, app entry points, global styles, package/config files, and any local skills or registry metadata. Extract durable patterns; do not copy architecture wholesale unless this project has the same problem.

Useful Magic UI patterns to apply selectively:

- Keep marketing/docs route groups mostly static for SEO and CDN caching. Avoid `auth()`, `cookies()`, `headers()`, and request-dependent redirects in pages that should be pre-rendered.
- Treat `robots.ts`, `sitemap.ts`, metadata helpers, and public LLM/docs files as part of the discoverability system, not as afterthoughts.
- Prefer Tailwind v4 tokens in `@theme` for reusable design values. Use local Tailwind utilities and arbitrary values for one-off layout behavior; add raw CSS, `@utility`, or custom variants only when the pattern is repeated or cannot be expressed clearly in classes.
- Keep global CSS organized by responsibility: tokens first, base behavior next, reusable utilities after that, then component-level styling for generated or content-heavy areas.
- For animated UI, use one primary motion idea per viewport and make supporting effects quiet. Decorative SVG/canvas/background effects should be `aria-hidden`, non-interactive, and should not reduce text contrast.
- For registry-style components, keep a clear separation between primitives, examples, metadata, generated output, and docs. Component metadata should declare extra dependencies, registry dependencies, CSS variables, and keyframes so installation stays reproducible.
- Prefer wrapping generated/third-party UI in local section components instead of heavily editing upstream-style component internals.
- When adding motion-heavy or responsive UI, explicitly check keyboard accessibility, mobile overflow, reduced readability from visual effects, and client-component cost.

## When Reviewing Code

Prioritize:

1. correctness bugs;
2. security and data integrity risks;
3. broken user flows;
4. maintainability problems;
5. style and naming issues.

Be direct about weak design decisions, but explain the reason and the safer alternative.
