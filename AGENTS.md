# Repository Guidelines

## Project Structure & Module Organization

This repository is a Docusaurus documentation site. Main documentation content lives in `docs/` as `.mdx` files; nested folders map closely to site URLs and sidebars. Custom pages are in `src/pages/`; React theme components, helpers, and Sass live in `src/`. Static files copied into the built site belong in `static/`. API sources and bundles are under `openapi/` and `openrpc/`. Localization files are in `i18n/`, meeting notes are in `meeting-notes/`, and deployment nginx configuration is in `nginx/`.

## Build, Test, and Development Commands

Use Node `v24` from `.nvmrc` and Yarn 1.

- `yarn install --frozen-lockfile`: install dependencies without changing `yarn.lock`.
- `yarn start`: run the local Docusaurus dev server.
- `yarn build`: build the production site and refresh generated route output checked by CI.
- `yarn check:mdx`: check Markdown/MDX formatting.
- `yarn format:mdx`: format docs, pages, and meeting notes with Prettier.
- `yarn lint`: lint custom JS/TS/React files under `src/`.
- `yarn api`: clean, bundle, and regenerate OpenAPI docs.
- `yarn rpcspec:validate`: build and validate the Stellar RPC OpenRPC spec.

## Coding Style & Naming Conventions

Write documentation in MDX with clear headings, front matter where needed, and dash-separated filenames such as `resource-limits-fees.mdx`; avoid spaces and underscores. Prefer existing site components registered through `src/theme/MDXComponents.ts` before adding imports. JS/TS/TSX follows the Docusaurus ESLint config and `.prettierrc.js`; run relevant format and lint commands before opening a PR.

## Testing Guidelines

There is no standalone unit test suite. Treat formatting, linting, spec validation. For content-only changes, run `yarn check:mdx` and `yarn build`. For `src/` changes, also run `yarn lint`. For API spec changes, run `yarn api` or `yarn rpcspec:validate`.

Do not build and/or serve the site after making code changes or create additional background processes after the task is complete. This takes too long and slows down the development process.

## Commit & Pull Request Guidelines

Recent commits use short imperative summaries, often with issue or PR references, for example `Fix typo: SURVIVOR_KEYS -> SURVEYOR_KEYS (#2376)`. Keep commits focused and include generated files such as `routes.txt` when a build changes them. PRs should explain the user-facing change, link related issues, call out generated API or route updates, and include screenshots for layout, styling, navigation, or React changes.

## Security & Configuration Tips

Do not commit secrets, local credentials, or Crowdin tokens. Keep generated API bundles and localization updates reproducible through the checked-in Yarn scripts, and avoid editing `build/` artifacts directly.
