# CSS and Tailwind CSS Engineering Skill

Use this skill whenever reviewing, proposing, or changing CSS or Tailwind CSS in
this project. Apply it together with the TypeScript engineering skill for React
components.

## Core Goal

Build interfaces that are readable, responsive, accessible, and easy to change.
Prefer simple layout rules and a small set of semantic design tokens over long,
fragile class lists or one-off global CSS.

## CSS Foundations

- Understand the cascade before increasing specificity. Prefer a predictable
  source order and low-specificity selectors.
- Use inheritance for typography and color when it reduces repetition.
- Treat every element as a box. Check content size, padding, border, margin,
  overflow, and `box-sizing` when diagnosing layout problems.
- Prefer normal document flow. Add absolute or fixed positioning only when the
  element must be removed from flow.
- Use Flexbox for one-dimensional alignment and Grid for two-dimensional layout.
- Set an explicit containing block for positioned elements, usually with
  `relative` on the nearest meaningful parent.
- Avoid fixed heights for content containers. Prefer `min-height`, intrinsic
  sizing, and content-driven layout.
- Remember that `min-width: auto` can prevent flex and grid children from
  shrinking. Use `min-w-0` on children that may contain long text.
- Use `overflow-hidden` only intentionally; it can clip focus rings, popovers,
  sticky elements, and shadows.

## Tailwind CSS v4 Conventions

- Keep `@import "tailwindcss";` at the top of `app/globals.css`.
- Define repeated design values in `@theme` so Tailwind generates semantic
  utilities. Use project-oriented names such as `--color-app-bg` and
  `--container-app-shell`.
- Use arbitrary values for genuinely local behavior. Promote a value to a token
  only after it has semantic meaning or repeats across the app.
- Prefer Tailwind utilities in components. Add raw CSS, `@utility`, or custom
  variants only when utilities cannot express the behavior clearly or a pattern
  repeats often.
- Put reused CSS rules and reusable global style primitives in
  `app/globals.css`. Keep one-off component styling local with Tailwind
  utilities. Do not duplicate the same stable CSS rule across components.
- Use valid Tailwind v4 theme namespaces. Examples include `--color-*`,
  `--spacing-*`, `--container-*`, `--breakpoint-*`, `--text-*`, `--font-*`,
  `--shadow-*`, `--radius-*`, and `--animate-*`.
- Give every custom token a meaningful suffix. Never create incomplete tokens
  such as `--breakpoint-`.
- Use mobile-first responsive rules: write the smallest layout first, then add
  `sm:`, `md:`, `lg:`, or project breakpoints as space becomes available.
- Keep utility order readable: layout and position, sizing, spacing, typography,
  visual styling, interaction, then responsive/state variants. Let Biome or a
  dedicated sorter handle mechanical ordering if the project adopts one.

## Project Token Pattern

Use semantic tokens for repeated app-level values:

```css
@import "tailwindcss";

@theme {
  --color-app-bg: #0a0a0a;
  --color-app-fg: #d4d4d4;
  --color-app-surface: #171717;
  --color-app-border: rgb(255 255 255 / 0.1);

  --container-app-shell: 80rem;
  --spacing-app-nav-height: 3.25rem;
  --breakpoint-app-wide: 80rem;

  --font-sans: var(--font-inter), Arial, Helvetica, sans-serif;
}
```

This enables utilities such as `bg-app-bg`, `text-app-fg`,
`max-w-app-shell`, `h-app-nav-height`, and `app-wide:grid-cols-4`.

Do not turn every raw value into a token. A unique decorative offset can remain
an arbitrary value:

```tsx
<div className="absolute left-[calc(50%_-_1rem)] top-[3.25rem]" />
```

## Layout Patterns

### Responsive application shell

```tsx
<div className="mx-auto w-full max-w-app-shell px-4 sm:px-6 lg:px-12">
  {children}
</div>
```

### Content that shrinks safely

```tsx
<div className="flex min-w-0 items-center gap-3">
  <div className="min-w-0 flex-1">
    <p className="truncate text-sm font-medium">{title}</p>
    <p className="break-words text-xs text-neutral-500">{description}</p>
  </div>
</div>
```

### Responsive grid

```tsx
<section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  {items.map((item) => (
    <article key={item.id} className="rounded-xl border border-white/10 p-5">
      {item.content}
    </article>
  ))}
</section>
```

### Full-height page without fragile `100vh`

```tsx
<div className="flex min-h-dvh flex-col">
  <header className="shrink-0">...</header>
  <main className="min-w-0 flex-1">...</main>
  <footer className="shrink-0">...</footer>
</div>
```

Use `dvh` for viewport-driven mobile layouts. Use `min-h-screen` only when the
older viewport behavior is intentionally acceptable.

## Interactive State Pattern

Every interactive element needs visible hover, focus, disabled, and when
relevant loading/selected states:

```tsx
<button
  type="button"
  disabled={isPending}
  className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg disabled:cursor-not-allowed disabled:opacity-50"
>
  {isPending ? "Saving..." : "Save changes"}
</button>
```

Prefer `focus-visible` for keyboard focus. Do not remove outlines unless a clear
replacement is present.

## Dynamic Class Pattern

Tailwind must be able to discover complete class names at build time. Choose
between complete strings rather than constructing fragments:

```tsx
const toneClass = isActive
  ? "border-white/20 bg-white/10 text-white"
  : "border-transparent text-neutral-500 hover:text-white";

return <button className={`rounded-lg border px-3 py-2 ${toneClass}`} />;
```

Avoid patterns such as `` `text-${color}-500` ``. Use a typed lookup table when
there are several variants.

## Responsive and Accessible UI Checklist

- Start at narrow mobile widths and expand progressively.
- Check long names, email addresses, translated text, empty values, and error
  messages for overflow.
- Ensure fixed headers and footers do not cover content or anchors.
- Keep touch targets large enough, normally at least 40 by 40 CSS pixels.
- Use semantic elements before adding ARIA. Buttons perform actions; links
  navigate.
- Associate every form control with a label using `htmlFor` and `id`.
- Do not rely on color alone for validation or selected state.
- Preserve sufficient text contrast against dark translucent backgrounds.
- Mark decorative backgrounds, icons, SVGs, and canvas effects `aria-hidden`
  when they provide no information.
- Respect reduced motion for non-essential animation with
  `motion-reduce:transition-none` and `motion-reduce:animate-none` where needed.
- Check keyboard navigation, focus order, modal focus containment, and Escape
  behavior for overlays.

## Maintainability Rules

- Extract a component when markup and behavior repeat, not merely because a
  class string is long.
- Extract a reusable class or `@utility` only when the same visual contract is
  stable across several call sites.
- Prefer semantic component props such as `tone="danger"` over accepting an
  unrestricted class name for business-level variants.
- Avoid inline styles for values Tailwind can express. Inline styles are useful
  for truly runtime values, CSS custom properties, or values produced by a
  visualization.
- Keep third-party or generated visual primitives isolated from app-specific
  section composition.
- Do not mix multiple spacing systems in one component without a clear reason.
- Avoid large negative margins and fixed pixel offsets used to compensate for
  an incorrect parent layout.

## Review Checklist

Before proposing or changing styles, verify:

1. The layout works in normal flow before adding positioning.
2. Flex/grid children can shrink and long content does not overflow.
3. The smallest viewport is usable without horizontal scrolling.
4. Focus, hover, disabled, loading, error, and empty states are visible.
5. Repeated values use valid semantic Tailwind v4 tokens.
6. One-off values remain local and understandable.
7. Client-side animation is justified and does not harm readability.
8. Decorative layers do not capture pointer events or hide content.
9. Class names are statically discoverable by Tailwind.
10. The change does not create an unnecessary Client Component boundary.

When reviewing UI, explain the layout model and the reason for each proposed
change. Prefer a focused patch over a broad restyle.
