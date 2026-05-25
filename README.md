# Spec Help Center

Spec Markets help center HTML demo and handoff workspace.

This repo starts as a UI/UX demo, but it should be organized like a small component system so the frontend team can translate it into the existing Next.js / React / SCSS Modules codebase later.

## Online Preview

- GitHub Pages: [https://lll887583-cmd.github.io/spec-help-center/](https://lll887583-cmd.github.io/spec-help-center/)

## Goal

Build a help center demo based on the existing Spec Markets website UI language:

- Next implementation target: existing Spec Markets Next.js project.
- Demo format: HTML / CSS / light JavaScript.
- Delivery purpose: visual reference, interaction reference, component map, page map, and frontend handoff notes.

## Suggested Pages

- `index.html` - Help center home.
- `category.html` - Category / article listing page.
- `article.html` - Article detail page.
- `search.html` - Search results page, including empty state.

## Directory Structure

```txt
spec-help-center/
├── index.html
├── category.html
├── article.html
├── search.html
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   ├── pages.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── search.js
│   └── accordion.js
└── docs/
    ├── code-approach.md
    ├── component-map.md
    ├── page-map.md
    └── handoff-notes.md
```

## Working Principle

Even though this is an HTML demo, write it with component thinking:

- Keep class names semantic and stable.
- Centralize tokens before writing page styles.
- Separate base styles, components, pages, and responsive overrides.
- Capture every important state: default, hover, focus, active, expanded, loading, empty, submitted.
- Avoid one-off page-only blocks when a reusable component makes sense.
