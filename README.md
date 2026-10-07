# @gravity-ui/components &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/components)](https://www.npmjs.com/package/@gravity-ui/components) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/components/.github/workflows/ci.yml?label=CI&logo=github)](https://github.com/gravity-ui/components/actions/workflows/ci.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.gravity-ui.com/components/)

A set of complex React components built on top of [`@gravity-ui/uikit`](https://github.com/gravity-ui/uikit). Part of the [Gravity UI](https://gravity-ui.com) design system.

## Install

```shell
npm install @gravity-ui/components
```

## Usage

`@gravity-ui/uikit` is a peer dependency: install it, import its styles once at the app entry point, and wrap the app in `ThemeProvider`. The components in this package render unstyled without that setup.

```tsx
import {ThemeProvider, TextInput} from '@gravity-ui/uikit';
import {FormRow} from '@gravity-ui/components';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export function App() {
  return (
    <ThemeProvider theme="light">
      <FormRow label="Name" fieldId="name">
        <TextInput id="name" name="name" />
      </FormRow>
    </ThemeProvider>
  );
}
```

### Confirmation dialog

```tsx
import {ConfirmDialog} from '@gravity-ui/components';

<ConfirmDialog
  open={open}
  title="Delete the project?"
  message="This cannot be undone."
  textButtonApply="Delete"
  textButtonCancel="Cancel"
  onClickButtonApply={handleDelete}
  onClickButtonCancel={() => setOpen(false)}
  onClose={() => setOpen(false)}
/>;
```

### More examples

Every component has a README next to its source with props and examples — see `src/components/<Component>/README.md`. Live demos: [Storybook](https://preview.gravity-ui.com/components/).

## Development

```shell
git clone git@github.com:gravity-ui/components.git
cd components
npm ci
npm run start   # launches Storybook at http://localhost:7009
```

Other useful commands:

```shell
npm test              # run unit tests
npm run lint          # lint JS and SCSS
npm run typecheck     # TypeScript type-check
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## For AI agents

The composite-component layer of Gravity UI — ready-made form rows, confirmation dialogs, adaptive tabs, notifications, stories, galleries and similar product-level widgets assembled from `@gravity-ui/uikit` primitives, so you do not rebuild them by hand.

### When to use

- Form layout: `FormRow` (label + field + description) instead of a hand-made label/input wrapper.
- Confirmation flows: `ConfirmDialog` instead of composing `Dialog` with two buttons yourself.
- Tabs that must survive narrow containers: `AdaptiveTabs` (overflow collapses into a select).
- Product widgets: `Notifications`, `Stories` / `StoriesGroup`, `ChangelogDialog`, `OnboardingMenu`, `PromoSheet`, `CookieConsent`, `Reactions`, `SharePopover`, `StoreBadge`.
- Data helpers: `InfiniteScroll`, `ItemSelector`, `DelayedTextInput`, `TokenizedInput`, `Gallery`.

### When not to use

- Basic controls, overlays, layout and theming — use [`@gravity-ui/uikit`](https://github.com/gravity-ui/uikit) directly; this package only adds composites on top of it.
- Data grids — use [`@gravity-ui/table`](https://github.com/gravity-ui/table); there is no table here.
- Date pickers and calendars — use [`@gravity-ui/date-components`](https://github.com/gravity-ui/date-components).
- Application navigation shells (aside header, footer) — use [`@gravity-ui/navigation`](https://github.com/gravity-ui/navigation).
- Schema-driven forms — use [`@gravity-ui/dynamic-forms`](https://github.com/gravity-ui/dynamic-forms); `FormRow` is only a layout row.

### Common pitfalls

- **Nothing is styled without uikit setup.** Install `@gravity-ui/uikit`, import `@gravity-ui/uikit/styles/styles.css` (plus `fonts.css`) once, and wrap the app in `ThemeProvider` — this package ships no global styles of its own.
- **`FormRow` does not render the input.** Pass the control as `children` and link it with `fieldId` matching the control's `id`; the `label` prop is the label text, not a `<label>` element.
- **`ConfirmDialog` has no `onConfirm` / `onCancel`.** The handlers are `onClickButtonApply` and `onClickButtonCancel`, and `textButtonApply` / `textButtonCancel` are required.
- **`AdaptiveTabs` takes `items` + `activeTab` + `onSelectTab`,** not uikit `Tabs` children; the `size` values are `m | l | xl`.
- **Hallucinated imports.** Everything is exported from the package root: `import {FormRow} from '@gravity-ui/components'`. There are no subpath imports like `@gravity-ui/components/FormRow`.

## Documentation for AI agents

Agent-readable documentation for the installed version is located in `node_modules/@gravity-ui/components/build/docs/INDEX.md`.
