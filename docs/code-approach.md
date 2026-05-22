# Spec Help Center Code Approach

This document records the agreed working approach for building the `spec-help-center` demo on top of the existing Spec Markets website UI/UX foundation.

## 1. Existing Website Code Reading

The current Spec Markets website is not a traditional HTML project. It is a Next.js / React / TypeScript project with SCSS Modules.

Important source locations in the existing website:

- `src/pages` - Next.js pages router. File paths map to routes.
- `src/pages/_app.tsx` - global app wrapper and global style imports.
- `src/pages/_document.tsx` - HTML shell: `<Html>`, `<Head>`, `<Main>`, `<NextScript>`.
- `src/pages/[lang]/index.tsx` - localized home page entry.
- `src/components` - reusable React components.
- `src/components/NewHome` - new home page sections.
- `src/components/Common` - shared UI components such as Button, Card, tables, FAQ/search blocks.
- `src/styles/globals.scss` - global reset and shared base classes.
- `src/styles/newTokens` - design tokens: colors, spacing, typography, radius, breakpoints.
- `src/styles/newThemes` - CSS variables generated from token values.
- `src/locales` - multi-language JSON content.
- `public/images` - static assets referenced from `/images/...`.

Key lesson: do not search for source `.html` files in the production website. Read `src/pages` for pages, `src/components` for page sections, `src/styles` for base style rules, and `public/images` for assets.

## 2. Demo Positioning

`spec-help-center` is an HTML/CSS/JS demo, but it is organized like a small component system.

The final implementation will likely be translated by frontend into the existing Next.js / React / SCSS Modules codebase. Therefore, the demo communicates:

- page structure;
- reusable component boundaries;
- component states;
- responsive behavior;
- token usage;
- data fields;
- handoff notes for frontend integration.

## 3. Current Componentization Approach

The demo now uses a lightweight component source layer:

- `js/data.js` - mock categories, articles, and support channel data.
- `js/components.js` - shared HTML template functions such as `SiteHeader`, `HelpSearchBar`, `CategoryCard`, and `ArticleCard`.
- `js/main.js` - page rendering for home, category, and article pages.
- `js/search.js` - search result filtering and empty-state rendering.
- `js/article.js` - article-only interaction hooks.

Rule: repeated UI should be changed at the component source first. For example, changing `ArticleCard()` updates home popular articles, category lists, search results, and related articles together.

## 4. Main Build Principle

Use HTML as the delivery format, but use frontend component architecture as the thinking model.

Do:

- use semantic class names;
- centralize design tokens;
- separate base, component, page, and responsive styles;
- keep repeated UI patterns consistent;
- document every component and page;
- include common states: default, hover, focus, active, expanded, loading, empty, submitted;
- keep the visual language close to the existing Spec Markets website.

Avoid:

- one giant `style.css`;
- random class names such as `box1`, `left2`, `blue-card`;
- page-only duplicated blocks where a reusable component makes sense;
- hard-coded visual values everywhere;
- delivering only screenshots or isolated static pages without component notes.

## 5. Visual Direction

Follow the existing Spec Markets direction:

- deep navy / blue as the trust foundation;
- mint and sky blue as energetic support colors;
- pink as a limited accent;
- white and soft blue page backgrounds;
- generous rounded cards;
- section-based landing page composition;
- 1200px-ish safe container;
- clear responsive behavior.

Current demo tokens live in:

- `css/tokens.css`

These should later map to the website token system in `src/styles/newTokens` and `src/styles/newThemes`.

## 6. Development Order

Follow this order for future coding:

1. Confirm page map and information architecture.
2. Define or update tokens.
3. Build base components first.
4. Compose full pages from components.
5. Add interaction states.
6. Add responsive behavior.
7. Update docs after each structural change.
8. Keep demo handoff-friendly rather than overly clever.
