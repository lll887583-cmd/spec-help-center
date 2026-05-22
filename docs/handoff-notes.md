# Handoff Notes

## Delivery Intent

This repo is an HTML demo for the Spec Markets help center. The final production implementation will likely be rebuilt inside the existing Spec Markets Next.js project.

The demo should communicate layout, component structure, interaction states, and responsive behavior. It is not expected to be copied directly as production code.

## Frontend Integration Notes

Map demo concepts to existing website concepts:

- `css/tokens.css` -> existing `src/styles/newTokens` and `src/styles/newThemes`.
- `site-header` -> existing `src/components/Header`.
- `site-footer` -> existing `src/components/Footer`.
- `btn` -> existing or future `src/components/Common/Button`.
- `js/components.js` template functions -> future React components.
- `js/data.js` mock objects -> future API/locales/CMS response shape.
- page routes -> existing `src/pages/[lang]/...` route pattern.
- static assets -> existing `public/images/...` structure.
- text content -> existing `src/locales/*.json` multi-language structure.

## Component Change Rule

When requesting future changes, use component names so the shared source can update every usage:

- `HelpSearchBar` changes update home and search pages.
- `CategoryCard` changes update the home category grid.
- `ArticleCard` changes update popular articles, category lists, search results, and related articles.
- `ContactSupportCard` changes update all support escalation bands.
- `HelpfulFeedback` changes update article feedback behavior.

Example request:

```txt
Change ArticleCard: make category a stronger pill, move read time under title, and apply everywhere.
```

## Required Demo Quality

Before handoff, the demo should include:

- desktop, tablet, and mobile layouts;
- hover and focus states;
- search result and no-result states;
- article detail page with table of contents;
- category page with article list;
- realistic help center copy instead of generic placeholder text;
- clear component and page documentation.

## Content Data Shape Suggestions

Category item:

```json
{
  "id": "account-opening",
  "title": "Account Opening",
  "description": "Registration, verification and account settings.",
  "icon": "ID",
  "articleCount": 12,
  "href": "./category.html?category=account-opening"
}
```

Article item:

```json
{
  "id": "verify-account",
  "title": "How do I verify my trading account?",
  "excerpt": "Learn which documents are required and how the verification flow works.",
  "category": "Account Opening",
  "categoryId": "account-opening",
  "updatedAt": "Updated May 21, 2026",
  "readTime": "4 min read",
  "href": "./article.html?article=verify-account"
}
```

## Rule For Future Work

When adding new code, update the related documentation if the page structure, component structure, or handoff expectation changes.

## Demo I18n And Market Visibility

The HTML demo now includes a lightweight simulation of production content rules:

- `js/i18n.js` stores current `lang` and `region`, UI labels, language options, region options, and helper methods.
- `js/data.js` stores article/category `translations` and article `visibility` rules.
- Lists, search results, related articles, and direct article pages call `SpecI18n.isVisible(article)` before rendering.
- Language and region are preserved in links and search forms through query parameters such as `?lang=zh&region=th`.
- Example restricted article: `pamm-availability` is visible in `global/th/vn/id/my` and hidden in `jp/kr`.

Production note: this is only a frontend demo simulation. Real broker content availability should be resolved by CMS/API using user market, account entity, product availability, and compliance approval status.
