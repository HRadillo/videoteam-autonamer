# Video Team Autonamer

A React and Vite application that generates standardized names for video-team production assets. The naming rules are deterministic business logic: changes to generated output should be reviewed and approved before implementation.

## Local development

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

## Verification

```sh
npm run check
npm run preview
```

`npm run check` runs the TypeScript check followed by the production build. The generated static site is written to `dist/`.

## Code map

- `App.tsx`: application state, mode-specific forms, and the lexicon modal.
- `utils.ts`: business-critical filename generation, formatting, and product ordering rules.
- `constants.ts`: file types, product codes, scene codes, and select options.
- `lexiconData.ts`: user-facing lexicon and concept-theme reference content.
- `components/UI.tsx`: reusable form controls and layout components.
- `types.ts`: shared form and file-type definitions.
- `vite.config.ts`: Vite configuration, including the relative base path used for GitHub Pages compatibility.

## GitHub Pages

The Vite `base` setting is intentionally `./`. This keeps built scripts, the favicon, and other assets relative to the deployed page, allowing the app to load from a repository subpath. Do not change the base path or public asset paths without validating a production build from a subdirectory.

## Form-state behavior

Form values are scoped to the sidebar groups: Production, Social, Assets, AI, Audio, and Premiere. Switching tools within a group preserves shared inputs, while switching to another group uses that group's independent values. Date inputs and filename date segments use UTC calendar fields consistently.

## Protected behavior

Treat `utils.ts`, naming-related state transitions in `App.tsx`, and the code dictionaries in `constants.ts` as protected surfaces. In particular, preserve VO video-ID formatting, product hierarchy, AI no-visible-product behavior, asset-source product inclusion, naming segment order, and existing defaults.
