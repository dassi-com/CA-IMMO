# Branding & Theme Migration (Monabris → New Brand)

This document tracks the ongoing rebrand/migration of the `web/` Next.js frontend from the
legacy **Monabris** styling to the new semantic theme tokens.

## Why

Components previously used hardcoded, brand-specific classes (`red-*`, `border-gray-*`,
`bg-white`, `monabris-*`). Tailwind now exposes **semantic top-level tokens** so that
components express *intent* (`primary`, `surface`, `border`, `background`) instead of
*couplings* to a specific palette. Changing brand colours becomes a one-line edit in
`tailwind.config.js`.

## Token mapping

| Legacy class            | New token       | Notes                                     |
| ----------------------- | --------------- | ----------------------------------------- |
| `red-50…red-800`        | `primary-50…primary-800` | Brand action/emphasis colour      |
| `border-gray-300`       | `border-border` | Default input/dividers border colour      |
| `bg-white`              | `bg-surface`    | Cards, modals, dropdowns                  |
| `bg-gray-50`            | `bg-background` | Page/section backgrounds                  |
| `monabris-background`   | `background`    | (kept working via `monabris` alias)       |
| `text-secondary`        | `secondary`     | Secondary text / dark surfaces            |
| `success` / `warning` / `error` | —       | Status colours, available at top level    |

The `monabris.*` scale and the `red` alias are **retained in `tailwind.config.js`** for
backwards compatibility and can be removed once the migration is complete.

## What was migrated

- `tailwind.config.js` — added top-level aliases: `secondary`, `success`, `warning`,
  `error`, `border`, `background`, `surface`, `warm`, `accent`.
- `components/ui/button.tsx` — replaced invalid `h-13` with valid spacing.
- UI components: `FilterBar`, `UnlockModal`, `RoleSelector`, `NotificationBell`,
  `NotificationsPanel`.
- Pages: `post-property`, `profile`, `properties/[id]/edit`, `(dashboard)/settings`.
- Dashboard subpages (13 files): `admin/*` (`agents`, `listings`, `payments`, `settings`,
  `users`, index), `agent/*` (`listings`, `messages`, index), `tenant/*` (`alerts`,
  `messages`, `visits`, index).
- Home page: added `PropertyBuyRentRelocate` and `TrustedRealEstateAgents` sections.
- Locales: verified `en.json` / `fr.json` contain no leftover brand strings.

## Remaining scope (brand name copy)

The colour/token migration is complete. The following still reference the **Monabris brand
name** and must be updated to the final brand name (not yet specified):

- `app/layout.tsx` — metadata `title`, `description`, `applicationName`.
- `components/ui/logo.tsx` — component name `MonabrisMark`, `alt`/wordmark text.
- `components/layout/Footer.tsx` — `contact@monabris.com`, `© 2026 Monabris`.
- `components/home/MobileAppPreview.tsx` — wordmark text.
- `app/(auth)/register/page.tsx` — "Rejoignez Monabris" heading.
- `app/(dashboard)/admin/page.tsx` — "Supervision de la plateforme Monabris".
- SVG assets under `public/` (`logo-*.svg`) may embed the old wordmark.

## Verification

```bash
cd web
npm run lint
npm run build
```