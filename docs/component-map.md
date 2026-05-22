# Component Map

This file tracks reusable components in the HTML demo and their expected frontend translation.

## Component Source Rule

Shared demo components now live in `js/components.js`. Shared content data lives in `js/data.js`.

When a repeated pattern changes, update the component source first instead of editing each page manually. Current shared render targets:

- `data-site-header` -> `SiteHeader()`
- `data-site-footer` -> `SiteFooter()`
- `data-home-search`, `data-search-form` -> `HelpSearchBar()`
- `data-category-grid` -> `CategoryCard()` list
- `data-popular-articles`, `data-category-list`, `data-search-results`, `data-related-articles` -> `ArticleCard()` list
- `data-contact-card` -> `ContactSupportCard()`
- `data-helpful-feedback` -> `HelpfulFeedback()`

## Global

### SiteHeader

- Demo source: `SiteHeader()` in `js/components.js`
- Demo classes: `site-header`, `site-header__inner`, `site-logo`, `site-actions`, `site-header__search`
- Assets: `assets/logos/logo-dark.png` for dark header, `assets/logos/logo-light.png` for light backgrounds
- Future source: likely reuse existing website `Header` component shell.
- States: default header without main nav, article header with centered search box, mobile wrapped article search.

### LanguageSwitcher

- Demo source: `languages` array and header markup in `js/components.js`
- Demo classes: `language-switcher`, `site-language`, `language-menu`
- Languages: English, 简体中文, 繁體中文, ไทย, Tiếng Việt, Bahasa Indonesia, Bahasa Melayu, 日本語, 한국어
- Behavior: hover/focus/click opens the 9-language menu beside Register/Login.
- Future source: map to existing website language selector and localized `src/pages/[lang]/...` routes.

### SiteFooter

- Demo source: `SiteFooter()` in `js/components.js`
- Demo classes: `site-footer`, `site-footer__inner`, `site-footer__links`
- Future source: likely reuse existing website `Footer` component.

### Button

- Demo classes: `btn`, `btn--outline`, `btn--small`, `is-selected`
- Fields: label, href/action, variant, disabled state.
- States: default, hover, active/selected, disabled, loading.

### Breadcrumb

- Demo source: `Breadcrumb(items)` in `js/components.js`
- Demo class: `breadcrumb`
- Fields: label, href, current item.
- Usage: category and article pages.

## Help Center

### HelpSearchBar

- Demo source: `HelpSearchBar(options)` in `js/components.js`
- Demo classes: `help-search`, `help-search--large`, `help-search__input`, `help-search__icon`
- Fields: placeholder, query, submit label.
- Usage: home hero and search page.
- States: default, focus, typed query, empty query.

### CategoryCard

- Demo source: `CategoryCard(category)` in `js/components.js`
- Demo data: `categories` in `js/data.js`
- Demo classes: `category-card`, `category-card__icon`, `category-card__count`, `category-card__title`, `category-card__desc`
- Fields: icon, title, description, articleCount, href.
- Usage: home page category grid.
- States: default, hover, active route candidate.

### ArticleCard

- Demo source: `ArticleCard(article, options)` in `js/components.js`
- Demo data: `articles` in `js/data.js`
- Demo classes: `article-card`, `article-card__meta`, `article-card__title`, `article-card__excerpt`, `article-card__arrow`
- Fields: title, excerpt, category, updatedAt, readTime, href, optional prefix.
- Usage: home popular articles, category page, search results, related articles.
- States: default, hover, highlighted search snippet candidate.

### ContactSupportCard

- Demo source: `ContactSupportCard()` in `js/components.js`
- Demo data: `supportChannels` in `js/data.js`
- Demo classes: `contact-card`, `support-channel-grid`, `support-channel`
- Usage: home and category page support escalation.

### EmptyState

- Demo source: `EmptyState(options)` in `js/components.js`
- Demo classes: `empty-state`, `empty-state__mark`
- Usage: search no results, category no articles, missing related articles.

## Article

### ArticleLayout

- Demo classes: `article-layout`, `article-content`, `article-body`, `article-toc`
- Usage: article detail page.
- Responsive: two-column desktop, single-column tablet/mobile.

### ArticleToc

- Demo classes: `article-toc`, `is-active`
- Fields: anchor label, anchor id, active state.
- Behavior: sticky on desktop, static on tablet/mobile.

### HelpfulFeedback

- Demo source: `HelpfulFeedback()` in `js/components.js`
- Demo classes: `feedback-card`, `feedback-card__actions`, `feedback-card__message`
- Fields: question, yes label, no label, submitted message.
- States: default, yes selected, no selected, submitted.

## Future React Translation Example

```tsx
<ArticleCard
  title="How do I verify my trading account?"
  excerpt="Learn which documents are required and how the verification flow works from upload to approval."
  category="Account Opening"
  updatedAt="Updated May 21, 2026"
  readTime="4 min read"
  href="/[lang]/help-center/account-opening/verify-account"
/>
```

## I18n / Region Visibility Layer

### SpecI18n

- Demo source: `js/i18n.js`
- Responsibilities: language state, region state, UI dictionary, translated item selection, visibility filtering, context-preserving links.
- State query example: `?lang=zh&region=th`
- Production translation target: Next.js locale route or existing project i18n layer.

### MarketVisibility

- Demo source: article `visibility` fields in `js/data.js`
- Fields: `visibleIn`, `hiddenIn`
- Used by: home popular articles, category lists, search results, related articles, and article detail availability state.
- Production target: CMS/API should filter unavailable content before frontend render.
