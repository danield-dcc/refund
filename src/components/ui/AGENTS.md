# UI Component Patterns

Reference for creating and maintaining components in this directory.
All components must follow these patterns consistently.

---

## Stack

| Tool | Purpose |
|---|---|
| `tailwind-variants` (`tv`) | Variant-based class composition |
| `tailwind-merge` (`twMerge`) | Manual class merging when `tv()` is not used |
| Tailwind CSS v4 | Utility classes |

SVGs in `src/assets/icons/` are imported as React components via `vite-plugin-svgr`:
```ts
import MyIcon from "../../assets/icons/my-icon.svg?react";
```

---

## Color tokens

Defined in `src/index.css`. Always use these — never raw hex values.

| Token | Hex | Usage |
|---|---|---|
| `gray-100` | `#1f2523` | Dark text, headings |
| `gray-200` | `#4d5c57` | Labels, secondary text, borders |
| `gray-300` | `#cdd5d2` | Input borders |
| `gray-400` | `#e4ece9` | Dividers, subtle borders |
| `gray-500` | `#f9fbfa` | Light backgrounds |
| `green-100` | `#1f8459` | Primary buttons, active states |
| `green-200` | `#2cb178` | Hover states, accent text |
| `white` | `#ffffff` | Icon fill on dark backgrounds |

---

## Anatomy of a component

Every component follows this three-part structure:

### 1. Variants (exported `tv()` calls)
Defined at the module level, before the component. Always exported so other components can reuse or compose them.

```ts
export const myVariants = tv({
  base: "...",          // classes always applied
  variants: {
    variant: {
      primary: "...",
    },
    size: {
      md: "...",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false,
  },
});
```

### 2. Props interface
Extends the native HTML element props. Use `Omit` to remove props that are controlled internally or redefined.

```ts
interface MyComponentProps
  extends VariantProps<typeof myVariants>,
    Omit<ComponentProps<"button">, "size" | "disabled"> {
  // extra props here
}
```

Rules:
- Omit `size` and `disabled` when they are redefined as variant props (avoids type conflicts).
- Omit `type` when it is hardcoded inside the component.
- Omit `id` only if the component generates it internally (rare).
- For wrappers around third-party components (e.g. `NavLink`), omit `className` from the base type and re-add it as `string | undefined`.

### 3. Component function
Destructure all variant props explicitly. Pass `...props` (the native element spread) last.

```ts
export default function MyComponent({
  variant,
  size,
  disabled,
  className,
  children,
  ...props
}: MyComponentProps) {
  return (
    <button
      className={myVariants({ variant, size, disabled, className })}
      disabled={disabled as boolean}
      {...props}
    >
      {children}
    </button>
  );
}
```

Note: `disabled as boolean` is needed because `VariantProps` types it as `boolean | undefined`.

---

## Form field pattern (label + wrapper + element)

Used by `InputText`, `Select`, and `UploadInput`. All three share this three-layer structure:

```
<div>                   ← container: flex-col gap-1, focus-promotion via CSS selector
  <label>               ← text-gray-200 text-[10px], linked via htmlFor + id
  <div>                 ← wrapper: border, rounded, flex items-center
    <element />         ← input / select / custom content
  </div>
  {error && <Text>}     ← optional error below (body-sm, text-green-200)
</div>
```

The container uses a CSS parent selector to promote the label style on focus:
```ts
"[&:has(input:focus)>label]:text-green-100 [&:has(input:focus)>label]:font-bold"
```

The variants from `InputText` are exported and reused by other field components:
```ts
import {
  inputTextContainerVariants,
  inputTextWrapperVariants,
  inputTextVariants,
} from "./input-text";
```

### Overriding wrapper padding for compound fields
When a field has an interactive element flush against the border edge (e.g. `UploadInput`'s upload button), pass `className` directly to the variant call to let `tailwind-merge` resolve the conflict:
```ts
className={inputTextWrapperVariants({ className: "pr-0" })}
// Result: p-3 is overridden on the right side only → pl-3 pb-3 pt-3 pr-0
```

---

## Disabled state

Always apply via a `disabled` variant in `tv()`:
```ts
disabled: {
  true: "opacity-50 pointer-events-none",
}
```
Cast to `boolean` when forwarding to the native element: `disabled={disabled as boolean}`.

---

## `className` override

All components accept `className` and pass it into their root `tv()` call. `tailwind-variants` uses `tailwind-merge` internally, so the consumer's classes always win over defaults.

```ts
// Consumer
<Button className="w-full" />

// Inside Button — className merges correctly:
buttonVariants({ variant, size, disabled, className }) // → "... w-full"
```

Do not use raw string concatenation (e.g. `cls + " extra"`). Always go through `tv()` or `twMerge()`.

---

## Icon usage

SVG icons are rendered via the `Icon` component for standard use:
```tsx
import Icon from "./icon";
import SearchIcon from "../../assets/icons/search.svg?react";

<Icon svg={SearchIcon} className="w-4 h-4 fill-green-100" />
// animate prop adds animate-spin:
<Icon svg={SearchIcon} animate={isLoading} />
```

For icons inside buttons, pass the SVG component directly to `ButtonIcon`:
```tsx
<ButtonIcon icon={SearchIcon} iconClassName="w-4 h-4" />
```

For one-off inline SVG use (e.g. inside a compound component), import and render the SVG component directly without `Icon`:
```tsx
<CloudIcon className="w-5 h-5 fill-white" />
```

---

## Composing components

Internal components compose other UI primitives rather than raw HTML where possible:
- `Button` renders a `Text` component internally for its label.
- `ButtonIcon` renders an `Icon` component internally.
- New components should follow the same composition pattern.

---

## Checklist for new components

- [ ] Variants defined with `tv()` and exported at module level
- [ ] Props interface extends native HTML element props with `Omit` for redefined props
- [ ] `className` accepted and passed into `tv()` call (not concatenated)
- [ ] `disabled` handled via variant + cast to `boolean` on native element
- [ ] Field components (label + input-like) follow the three-layer structure
- [ ] SVG icons imported with `?react` suffix
- [ ] No raw hex values — only color tokens from `src/index.css`
- [ ] TypeScript strict: no unused locals or parameters
