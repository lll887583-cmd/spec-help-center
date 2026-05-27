import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  helpCenterArticleAliases,
  helpCenterArticles,
  helpCenterCategoryAliases,
  helpCenterCategories,
  helpCenterLangs,
  type HelpCenterArticle,
  type HelpCenterText
} from '../../specmarkets/src/components/HelpCenter/data.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const projectRoot = path.resolve(repoRoot, '..');
const specmarketsRoot = path.resolve(projectRoot, 'specmarkets');

const keepRootEntries = new Set(['.git', 'package.json', 'README.md', 'scripts', 'src']);

const pageCopy = {
  title: 'Help Center',
  description:
    'Are you new to forex trading and not familiar with all the trading jargon? Have no fear. Forexpedia, the original online forex glossary, is here.',
  popularCategories: 'Find answers by category',
  searchPlaceholder: 'Type your question here',
  search: 'Search',
  popularSearch: 'Popular searches',
  previewBadge: 'Static Preview',
  previewNote:
    'This standalone site is generated from the current Help Center data in specmarkets and published separately for stakeholder review.'
};

const quickSearches = ['Leverage', 'Trading hours', 'Swap', 'Deposit'];

const supportChannels = [
  {
    label: 'Live chat',
    detail: 'Fastest for login, funding, and urgent account questions.'
  },
  {
    label: 'Ticket support',
    detail: 'Best for document review, account changes, and detailed requests.'
  },
  {
    label: 'Help center',
    detail: 'Use search first to find policy and platform answers instantly.'
  }
];

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getText(translations: Record<string, HelpCenterText>, lang: string) {
  return translations[lang] || translations['en-us'] || Object.values(translations)[0];
}

function getCategoryById(id?: string) {
  return helpCenterCategories.find((category) => category.id === id);
}

function getArticleById(id?: string) {
  return helpCenterArticles.find((article) => article.id === id);
}

function getCategoryForArticle(article: HelpCenterArticle) {
  return getCategoryById(article.categoryId);
}

function getArticleHierarchy(article: HelpCenterArticle) {
  const category = getCategoryForArticle(article);
  const section = category?.sections.find((item) => item.id === article.sectionId);
  const topic = section?.topics.find((item) => item.id === article.topicId);
  return { category, section, topic };
}

function prefixFromDepth(depth: number) {
  return depth === 0 ? './' : '../'.repeat(depth);
}

function routeForPath(...segments: string[]) {
  return path.join(repoRoot, ...segments, 'index.html');
}

function ensureDir(targetPath: string) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
}

function writeFile(targetPath: string, content: string) {
  ensureDir(targetPath);
  fs.writeFileSync(targetPath, content);
}

function clearRootOutput() {
  for (const entry of fs.readdirSync(repoRoot)) {
    if (keepRootEntries.has(entry)) continue;
    fs.rmSync(path.join(repoRoot, entry), { recursive: true, force: true });
  }
}

function copyAsset(from: string, to: string) {
  ensureDir(to);
  fs.copyFileSync(from, to);
}

function buildHelpCenterHref(prefix: string, lang: string, suffix = '') {
  const normalized = suffix.startsWith('/') ? suffix : `/${suffix}`;
  return `${prefix}${lang}/help-center${suffix ? normalized : '/'}`;
}

function renderSearchIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7.25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></circle>
      <path d="m16.15 16.15 4.35 4.35" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
    </svg>
  `;
}

function renderCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case 'getting-started':
      return `
        <svg class="cardIconSvgSmall" viewBox="0 0 14 14" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="m6.547 10.263l-2.81-2.81c.309-.517.617-1.052.922-1.584c1.016-1.766 2.008-3.49 2.938-4.387c2.524-2.524 5.981-1.06 5.981-1.06s1.464 3.457-1.06 5.981c-.89.922-2.587 1.9-4.34 2.908c-.546.315-1.097.632-1.631.952m2.14-6.532a1.582 1.582 0 1 1 3.164 0a1.582 1.582 0 0 1-3.163 0m-4.09-.232C3.18 3.122 1.849 3.82.668 4.903a.48.48 0 0 0 .089.765l1.905 1.148l.002-.004c.275-.46.582-.993.894-1.533c.355-.617.716-1.243 1.04-1.78m2.587 7.84l1.148 1.905a.48.48 0 0 0 .765.088c1.083-1.18 1.782-2.512 1.404-3.93c-.522.314-1.07.63-1.613.943l-.083.048c-.548.316-1.091.628-1.616.943zM2.622 9.343a2 2 0 0 1 1.402 3.46c-.222.212-.569.379-.89.506a11 11 0 0 1-1.1.358c-.367.1-.717.18-.982.233a6 6 0 0 1-.336.059q-.066.009-.133.013a.5.5 0 0 1-.198-.022a.5.5 0 0 1-.241-.156a.5.5 0 0 1-.11-.22a.6.6 0 0 1-.012-.176c.003-.04.009-.086.015-.128c.013-.088.033-.203.06-.334c.053-.264.135-.612.235-.977c.1-.364.222-.754.359-1.095c.128-.321.294-.667.506-.888a2 2 0 0 1 1.425-.633"></path>
        </svg>
      `;
    case 'accounts':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v.75A1.25 1.25 0 0 0 5.25 21h13.5A1.25 1.25 0 0 0 20 19.75V19c0-2.76-3.58-5-8-5Z"></path></svg>';
    case 'funding':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7.75A2.75 2.75 0 0 1 5.75 5h12.5A2.75 2.75 0 0 1 21 7.75v.5H3v-.5Zm0 2.5h18v6A2.75 2.75 0 0 1 18.25 19H5.75A2.75 2.75 0 0 1 3 16.25v-6Zm13.75 3.25a1.25 1.25 0 1 0 0 2.5h1a1.25 1.25 0 1 0 0-2.5h-1Z"></path></svg>';
    case 'markets-and-products':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="4" height="11" rx="1.5"></rect><rect x="10" y="4" width="4" height="16" rx="1.5"></rect><rect x="16" y="12" width="4" height="8" rx="1.5"></rect></svg>';
    case 'trading-conditions':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 4A2.5 2.5 0 0 0 3 6.5v2A2.5 2.5 0 0 0 5.5 11h13A2.5 2.5 0 0 0 21 8.5v-2A2.5 2.5 0 0 0 18.5 4h-13Zm0 9A2.5 2.5 0 0 0 3 15.5v2A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-2a2.5 2.5 0 0 0-2.5-2.5h-13Zm2-6.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm9 9a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"></path></svg>';
    case 'trading-services':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.75 3h4.5A1.75 1.75 0 0 1 11 4.75v4.5A1.75 1.75 0 0 1 9.25 11h-4.5A1.75 1.75 0 0 1 3 9.25v-4.5A1.75 1.75 0 0 1 4.75 3Zm10 0h4.5A1.75 1.75 0 0 1 21 4.75v4.5A1.75 1.75 0 0 1 19.25 11h-4.5A1.75 1.75 0 0 1 13 9.25v-4.5A1.75 1.75 0 0 1 14.75 3Zm-10 10h4.5A1.75 1.75 0 0 1 11 14.75v4.5A1.75 1.75 0 0 1 9.25 21h-4.5A1.75 1.75 0 0 1 3 19.25v-4.5A1.75 1.75 0 0 1 4.75 13Zm10 0h4.5A1.75 1.75 0 0 1 21 14.75v4.5A1.75 1.75 0 0 1 19.25 21h-4.5A1.75 1.75 0 0 1 13 19.25v-4.5A1.75 1.75 0 0 1 14.75 13Z"></path></svg>';
    case 'platform-and-tools':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.75 4A2.75 2.75 0 0 0 2 6.75v7.5A2.75 2.75 0 0 0 4.75 17h5.75v2H8.75a1 1 0 1 0 0 2h6.5a1 1 0 1 0 0-2H13.5v-2h5.75A2.75 2.75 0 0 0 22 14.25v-7.5A2.75 2.75 0 0 0 19.25 4H4.75Zm11.78 3.47a.75.75 0 0 1 0 1.06L14.06 11l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"></path></svg>';
    case 'bonuses-and-promotions':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12H4v8a2 2 0 0 0 2 2h5V12H5zm13 0h-5v10h5a2 2 0 0 0 2-2v-8h-2zm.791-5A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2C6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H2v4h9V9h2v2h9V7h-3.209zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM15.5 4c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.477c.51-1.576 1.251-3 1.977-3z"></path></svg>';
    case 'partners':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6.5-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM9 13c-3.31 0-6 1.8-6 4v1.25A1.75 1.75 0 0 0 4.75 20h8.5A1.75 1.75 0 0 0 15 18.25V17c0-2.2-2.69-4-6-4Zm7.5.25c-.74 0-1.45.13-2.08.36A4.43 4.43 0 0 1 17 17v1.25c0 .65-.2 1.25-.53 1.75h2.78A1.75 1.75 0 0 0 21 18.25V17c0-2.07-2.01-3.75-4.5-3.75Z"></path></svg>';
    case 'community-and-education':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.17 3.28a2 2 0 0 1 1.66 0l8.5 3.86a1 1 0 0 1 0 1.82l-8.5 3.86a2 2 0 0 1-1.66 0l-8.5-3.86a1 1 0 0 1 0-1.82l8.5-3.86ZM5.5 11.6l5.05 2.3a3.5 3.5 0 0 0 2.9 0l5.05-2.3v3.25c0 2.35-2.91 4.25-6.5 4.25s-6.5-1.9-6.5-4.25V11.6ZM20 11.16l1-.46v6.8a1 1 0 1 1-2 0v-5.89l1-.45Z"></path></svg>';
    case 'security-and-compliance':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.3 2.3a2 2 0 0 1 1.4 0l6.5 2.42A2 2 0 0 1 20.5 6.6v4.9c0 4.63-2.98 8.73-7.39 10.15a3.6 3.6 0 0 1-2.22 0A10.7 10.7 0 0 1 3.5 11.5V6.6a2 2 0 0 1 1.3-1.88l6.5-2.42Zm4.73 7.23a1 1 0 1 0-1.41-1.41L11 11.73l-1.62-1.61a1 1 0 0 0-1.41 1.41l2.32 2.32a1 1 0 0 0 1.42 0l4.32-4.32Z"></path></svg>';
    case 'troubleshooting':
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 3.3a5.5 5.5 0 0 0-6.83 6.83l-4.86 4.86a3 3 0 0 0 4.24 4.24l4.86-4.86a5.5 5.5 0 0 0 6.83-6.83 1 1 0 0 0-1.64-.36l-2.53 2.53-2.12-.35-.35-2.12 2.53-2.53a1 1 0 0 0-.13-1.41ZM5.12 17.12a1 1 0 1 1 1.41 1.41 1 1 0 0 1-1.41-1.41Z"></path></svg>';
    default:
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 4A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 18.5 4h-13ZM7 8.75A.75.75 0 0 1 7.75 8h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 7 8.75Zm0 3.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 7 12Zm0 3.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 7 15.25Z"></path></svg>';
  }
}

function renderSearchForm(prefix: string, lang: string, query = '') {
  return `
    <form class="searchBox" data-search-form action="${buildHelpCenterHref(prefix, lang, '/search/')}" role="search">
      <input class="searchInput" name="q" value="${escapeHtml(query)}" placeholder="${escapeHtml(pageCopy.searchPlaceholder)}" aria-label="${escapeHtml(pageCopy.searchPlaceholder)}" autocomplete="off" />
      <button class="searchButton" type="submit" aria-label="${escapeHtml(pageCopy.search)}">
        ${renderSearchIcon()}
        <span class="srOnly">${escapeHtml(pageCopy.search)}</span>
      </button>
    </form>
  `;
}

function renderHeader(prefix: string, lang: string) {
  return `
    <header class="siteHeader">
      <div class="siteHeader__inner">
        <a class="brand" href="${buildHelpCenterHref(prefix, lang)}">
          <img src="${prefix}assets/logos/logo-dark.png" alt="Spec Markets Help Center" />
        </a>
        <nav class="siteNav" aria-label="Help Center navigation">
          <a href="${buildHelpCenterHref(prefix, lang)}">Home</a>
          <a href="${buildHelpCenterHref(prefix, lang, '/search/')}">Search</a>
          <span class="siteBadge">${escapeHtml(pageCopy.previewBadge)}</span>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter(prefix: string, lang: string) {
  return `
    <footer class="siteFooter">
      <div class="helpContainer">
        <div class="siteFooter__inner">
          <div class="siteFooter__copy">
            <a class="brand" href="${buildHelpCenterHref(prefix, lang)}">
              <img src="${prefix}assets/logos/logo-dark.png" alt="Spec Markets Help Center" />
            </a>
            <p>${escapeHtml(pageCopy.previewNote)}</p>
          </div>
          <div class="siteFooter__links">
            <a href="${buildHelpCenterHref(prefix, lang)}">Help Center Home</a>
            <a href="${buildHelpCenterHref(prefix, lang, '/search/')}">Search Articles</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function renderContactCard() {
  return `
    <section class="contactCard">
      <div>
        <h2 class="contactCard__title">Need more help?</h2>
        <p class="contactCard__desc">This preview keeps the support entry points visible while removing backend dependencies from the standalone deployment.</p>
      </div>
      <div class="contactList">
        ${supportChannels
          .map(
            (item) => `
              <div class="contactItem">
                <strong>${escapeHtml(item.label)}</strong>
                <p>${escapeHtml(item.detail)}</p>
              </div>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderDocument({
  title,
  lang,
  depth,
  page,
  body
}: {
  title: string;
  lang: string;
  depth: number;
  page: string;
  body: string;
}) {
  const prefix = prefixFromDepth(depth);
  return `<!doctype html>
<html lang="${escapeHtml(lang)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${prefix}assets/help-center.css" />
  </head>
  <body data-page="${escapeHtml(page)}" data-lang="${escapeHtml(lang)}" data-prefix="${escapeHtml(prefix)}">
    ${renderHeader(prefix, lang)}
    ${body}
    ${renderFooter(prefix, lang)}
    <script src="${prefix}assets/help-center.js" defer></script>
  </body>
</html>
`;
}

function renderHomePage(lang: string) {
  const categoryCards = helpCenterCategories
    .map((category) => {
      const text = getText(category.translations, lang);
      return `
        <a class="card" href="${buildHelpCenterHref('../../', lang, `/category/${category.id}/`)}">
          <span class="cardIcon">${renderCategoryIcon(category.id)}</span>
          <h3 class="cardTitle">${escapeHtml(text.title)}</h3>
          <ul class="cardList">
            ${category.sections.map((section) => `<li>${escapeHtml(section.title)}</li>`).join('')}
          </ul>
        </a>
      `;
    })
    .join('');

  return renderDocument({
    title: 'Help Center',
    lang,
    depth: 2,
    page: 'home',
    body: `
      <main class="helpCenter">
        <section class="hero homeHero heroImage">
          <div class="container">
            <div class="homeHeroContent">
              <h1 class="title">${escapeHtml(pageCopy.title)}</h1>
              <p class="description">${escapeHtml(pageCopy.description)}</p>
              <div class="searchPanel searchHeroPanel">
                ${renderSearchForm('../../', lang)}
                <div class="quickLinks" aria-label="Popular searches">
                  <span>${escapeHtml(pageCopy.popularSearch)}</span>
                  ${quickSearches
                    .map(
                      (keyword) =>
                        `<a href="${buildHelpCenterHref('../../', lang, `/search/?q=${encodeURIComponent(keyword)}`)}">${escapeHtml(keyword)}</a>`
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="container">
            <div class="sectionHeader">
              <h2 class="sectionTitle">${escapeHtml(pageCopy.popularCategories)}</h2>
            </div>
            <div class="categoryGrid">${categoryCards}</div>
          </div>
        </section>

        <section class="section">
          <div class="container">
            ${renderContactCard()}
          </div>
        </section>
      </main>
    `
  });
}

function renderCategoryPage(lang: string, categoryId: string) {
  const category = getCategoryById(categoryId) || helpCenterCategories[0];
  const categoryText = getText(category.translations, lang);
  let articleCounter = 0;

  return renderDocument({
    title: `${categoryText.title} | Help Center`,
    lang,
    depth: 4,
    page: 'category',
    body: `
      <main class="helpCenter">
        <section class="hero categoryHero heroImage">
          <div class="container">
            <nav class="breadcrumbs" aria-label="Breadcrumb">
              <a href="${buildHelpCenterHref('../../../../', lang)}">Help Center</a>
              <span>/</span>
              <span>${escapeHtml(categoryText.title)}</span>
            </nav>
            <h1 class="title">${escapeHtml(categoryText.title)}</h1>
          </div>
        </section>

        <section class="section">
          <div class="container categoryFaqLayout">
            <div class="categoryContent">
              ${category.sections
                .map((section) => {
                  const sectionArticles = section.topics.flatMap((topic) =>
                    topic.articleIds.map((articleId) => {
                      const article = getArticleById(articleId);
                      return article ? { article, topic } : null;
                    })
                  );

                  return `
                    <section class="levelSection" id="${escapeHtml(section.id)}">
                      <h2>${escapeHtml(section.title)}</h2>
                      <div class="categoryFaqList">
                        ${sectionArticles
                          .filter(Boolean)
                          .map(({ article, topic }) => {
                            articleCounter += 1;
                            const articleText = getText(article.translations, lang);
                            const isOpen = articleCounter === 1;
                            const answerId = `faq-${article.id}`;
                            const body = articleText.body?.length
                              ? articleText.body
                              : [
                                  {
                                    title: topic.title,
                                    text:
                                      articleText.excerpt ||
                                      'This article gives a concise answer and points users to the next best support step.'
                                  }
                                ];

                            return `
                              <article class="categoryFaqItem${isOpen ? ' categoryFaqItemOpen' : ''}">
                                <button class="categoryFaqQuestion" type="button" data-faq-question="${escapeHtml(answerId)}" aria-expanded="${isOpen ? 'true' : 'false'}">
                                  ${escapeHtml(articleText.title)}
                                </button>
                                <div class="categoryFaqAnswer" id="${escapeHtml(answerId)}" data-faq-answer ${isOpen ? '' : 'hidden'}>
                                  ${body
                                    .map(
                                      (block) => `
                                        <div class="categoryFaqAnswerBlock">
                                          ${block.title ? `<h3>${escapeHtml(block.title)}</h3>` : ''}
                                          <p>${escapeHtml(block.text)}</p>
                                        </div>
                                      `
                                    )
                                    .join('')}
                                </div>
                              </article>
                            `;
                          })
                          .join('')}
                      </div>
                    </section>
                  `;
                })
                .join('')}
            </div>
          </div>
        </section>
      </main>
    `
  });
}

function renderArticlePage(lang: string, articleId: string) {
  const article = getArticleById(articleId) || helpCenterArticles[0];
  const articleText = getText(article.translations, lang);
  const { category, section, topic } = getArticleHierarchy(article);
  const categoryText = category ? getText(category.translations, lang) : undefined;
  const relatedArticles = helpCenterArticles.filter((item) => item.topicId === article.topicId && item.id !== article.id).slice(0, 3);
  const body = articleText.body?.length
    ? articleText.body
    : [
        {
          title: topic?.title || 'Overview',
          text: articleText.excerpt || 'This article gives a concise answer and points users to the next best support step.'
        }
      ];

  return renderDocument({
    title: `${articleText.title} | Help Center`,
    lang,
    depth: 4,
    page: 'article',
    body: `
      <main class="helpCenter">
        <section class="hero articleHero">
          <div class="container">
            <nav class="breadcrumbs" aria-label="Breadcrumb">
              <a href="${buildHelpCenterHref('../../../../', lang)}">Help Center</a>
              <span>/</span>
              ${category ? `<a href="${buildHelpCenterHref('../../../../', lang, `/category/${category.id}/`)}">${escapeHtml(categoryText?.title || '')}</a><span>/</span>` : ''}
              ${section ? `<span>${escapeHtml(section.title)}</span><span>/</span>` : ''}
              ${topic ? `<span>${escapeHtml(topic.title)}</span><span>/</span>` : ''}
              <span>${escapeHtml(articleText.title)}</span>
            </nav>
            <div class="quickLinks" aria-label="Article metadata">
              ${categoryText ? `<span class="metaPill">${escapeHtml(categoryText.title)}</span>` : ''}
              ${section ? `<span class="metaPill">${escapeHtml(section.title)}</span>` : ''}
              ${topic ? `<span class="metaPill">${escapeHtml(topic.title)}</span>` : ''}
              <span class="metaPill">${escapeHtml(article.updatedAt)}</span>
              <span class="metaPill">${escapeHtml(`${article.readMinutes} min read`)}</span>
            </div>
            <h1 class="title">${escapeHtml(articleText.title)}</h1>
            <p class="description">${escapeHtml(articleText.excerpt || '')}</p>
          </div>
        </section>

        <section class="section">
          <div class="container articleLayout">
            <article class="articleBody">
              ${body
                .map(
                  (block) => `
                    <section>
                      <h2>${escapeHtml(block.title)}</h2>
                      <p>${escapeHtml(block.text)}</p>
                    </section>
                  `
                )
                .join('')}
            </article>
            <aside class="sideCard">
              <h2>Related articles</h2>
              <p>Continue exploring answers in the same support topic.</p>
              <div class="quickLinks">
                ${relatedArticles
                  .map((item) => {
                    const text = getText(item.translations, lang);
                    return `<a href="${buildHelpCenterHref('../../../../', lang, `/article/${item.id}/`)}">${escapeHtml(text.title)}</a>`;
                  })
                  .join('')}
              </div>
            </aside>
          </div>
        </section>
      </main>
    `
  });
}

function renderSearchPage(lang: string) {
  return renderDocument({
    title: 'Search Help Center',
    lang,
    depth: 3,
    page: 'search',
    body: `
      <main class="helpCenter">
        <section class="hero searchHero heroImage">
          <div class="container">
            <div class="searchHeroContent">
              <nav class="breadcrumbs" aria-label="Breadcrumb">
                <a href="${buildHelpCenterHref('../../../', lang)}">Help Center</a>
                <span>/</span>
                <span>Search</span>
              </nav>
              <div>
                <h1 class="title" data-search-heading>Search the Help Center</h1>
              </div>
              <div class="searchPanel searchHeroPanel">
                ${renderSearchForm('../../../', lang)}
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="container">
            <div class="searchResults" data-search-results></div>
            <div data-empty-categories hidden></div>
          </div>
        </section>
      </main>
    `
  });
}

function renderRedirectPage(target: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirecting</title>
  </head>
  <body>
    <p>Redirecting to <a href="${target}">${target}</a>...</p>
  </body>
</html>
`;
}

function compileStyles() {
  const sassBinary = path.join(specmarketsRoot, 'node_modules', '.bin', 'sass');
  execFileSync(sassBinary, ['src/styles/help-center.scss', 'assets/help-center.css', '--no-source-map'], {
    cwd: repoRoot,
    stdio: 'inherit'
  });
}

function copyRuntimeAndAssets() {
  copyAsset(path.join(repoRoot, 'src', 'runtime', 'app.js'), path.join(repoRoot, 'assets', 'help-center.js'));

  const assetPairs = [
    ['public/images/help-center/logo-dark.png', 'assets/logos/logo-dark.png'],
    ['public/images/help-center/logo-light.png', 'assets/logos/logo-light.png'],
    ['public/images/banner/help-center.webp', 'assets/images/banner/help-center.webp'],
    ['public/images/banner/search.webp', 'assets/images/banner/search.webp'],
    ['public/images/banner/category.webp', 'assets/images/banner/category.webp']
  ] as const;

  for (const [from, to] of assetPairs) {
    copyAsset(path.join(specmarketsRoot, from), path.join(repoRoot, to));
  }
}

function buildDataJson() {
  const payload = {
    langs: helpCenterLangs,
    categories: helpCenterCategories,
    articles: helpCenterArticles
  };
  writeFile(path.join(repoRoot, 'assets', 'help-center-data.json'), JSON.stringify(payload));
}

function buildPages() {
  writeFile(path.join(repoRoot, '.nojekyll'), '');
  writeFile(path.join(repoRoot, 'index.html'), renderRedirectPage('./en-us/help-center/'));
  writeFile(path.join(repoRoot, '404.html'), renderRedirectPage('./en-us/help-center/'));

  for (const lang of helpCenterLangs) {
    writeFile(routeForPath(lang, 'help-center'), renderHomePage(lang));
    writeFile(routeForPath(lang, 'help-center', 'search'), renderSearchPage(lang));

    for (const category of helpCenterCategories) {
      writeFile(routeForPath(lang, 'help-center', 'category', category.id), renderCategoryPage(lang, category.id));
    }

    for (const [alias, categoryId] of Object.entries(helpCenterCategoryAliases)) {
      writeFile(routeForPath(lang, 'help-center', 'category', alias), renderCategoryPage(lang, categoryId));
    }

    for (const article of helpCenterArticles) {
      writeFile(routeForPath(lang, 'help-center', 'article', article.id), renderArticlePage(lang, article.id));
    }

    for (const [alias, articleId] of Object.entries(helpCenterArticleAliases)) {
      writeFile(routeForPath(lang, 'help-center', 'article', alias), renderArticlePage(lang, articleId));
    }
  }
}

clearRootOutput();
copyRuntimeAndAssets();
compileStyles();
buildDataJson();
buildPages();
