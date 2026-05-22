(function () {
  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const param = (key) => new URLSearchParams(window.location.search).get(key);
  const i18n = window.SpecI18n;

  function SiteHeader(active = '') {
    const middle = active === 'article'
      ? `<div class="site-header__search">${HelpSearchBar({ buttonLabel: i18n.t('search') })}</div>`
      : '<div class="site-header__spacer" aria-hidden="true"></div>';

    return `
      <header class="site-header">
        <div class="help-container site-header__inner">
          <a class="site-logo" href="${i18n.withContext('./index.html')}" aria-label="Spec Markets Help home">
            <img src="./assets/logos/logo-dark.png" alt="Spec Markets Help Center" />
          </a>
          ${middle}
          <div class="site-actions" aria-label="Account actions">
            ${LanguageSwitcher()}
            ${RegionSwitcher()}
            <a class="btn btn--register" href="${i18n.withContext('./search.html')}">${escapeHtml(i18n.t('register'))}</a>
            <a class="btn btn--login" href="${i18n.withContext('./search.html')}">${escapeHtml(i18n.t('login'))}</a>
          </div>
        </div>
      </header>`;
  }

  function LanguageSwitcher() {
    return `
      <div class="language-switcher">
        <button class="site-language" type="button" aria-label="Language selector" aria-expanded="false" data-language-toggle>
          <span aria-hidden="true">◎</span>
        </button>
        <div class="language-menu" data-language-menu>
          ${i18n.languages.map(([code, label]) => `<a class="${i18n.state.lang === code ? 'is-active' : ''}" href="${i18n.withContext(window.location.href, { lang: code })}" lang="${code}">${label}</a>`).join('')}
        </div>
      </div>`;
  }

  function RegionSwitcher() {
    return `
      <div class="region-switcher">
        <button class="region-toggle" type="button" aria-expanded="false" data-region-toggle>
          <span>${escapeHtml(i18n.t('region'))}: ${escapeHtml(i18n.currentRegionLabel())}</span>
        </button>
        <div class="region-menu" data-region-menu>
          ${i18n.regions.map(([code, label]) => `<a class="${i18n.state.region === code ? 'is-active' : ''}" href="${i18n.withContext(window.location.href, { region: code })}">${escapeHtml(label)}</a>`).join('')}
        </div>
      </div>`;
  }

  function SiteFooter() {
    return `
      <footer class="site-footer">
        <div class="help-container site-footer__inner">
          <div>
            <a class="site-logo" href="${i18n.withContext('./index.html')}"><span class="site-logo__mark">S</span><span>Spec Markets</span></a>
            <p class="site-footer__note">${escapeHtml(i18n.t('footerNote'))}</p>
          </div>
          <div class="site-footer__links">
            <a href="${i18n.withContext('./category.html')}">${escapeHtml(i18n.t('browseTopics'))}</a>
            <a href="${i18n.withContext('./search.html')}">${escapeHtml(i18n.t('searchHelp'))}</a>
            <a href="${i18n.withContext('./article.html')}">${escapeHtml(i18n.t('articleExample'))}</a>
          </div>
        </div>
      </footer>`;
  }

  function HelpSearchBar(options = {}) {
    const value = escapeHtml(options.value || param('q') || '');
    const label = escapeHtml(options.buttonLabel || i18n.t('search'));
    const modifier = options.large ? ' help-search--large' : '';

    return `
      <form class="help-search${modifier}" action="./search.html" role="search">
        <span class="help-search__icon" aria-hidden="true"></span>
        <input type="hidden" name="lang" value="${escapeHtml(i18n.state.lang)}" />
        <input type="hidden" name="region" value="${escapeHtml(i18n.state.region)}" />
        <input class="help-search__input" name="q" value="${value}" placeholder="${escapeHtml(i18n.t('searchPlaceholder'))}" autocomplete="off" />
        <button class="btn" type="submit">${label}</button>
      </form>`;
  }

  function Breadcrumb(items) {
    return `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        ${items.map((item, index) => item.href
          ? `<a href="${i18n.withContext(item.href)}">${escapeHtml(item.label)}</a>${index < items.length - 1 ? '<span>/</span>' : ''}`
          : `<span>${escapeHtml(item.label)}</span>`).join('')}
      </nav>`;
  }

  function SectionHeader({ eyebrow, title, desc, align = 'left' }) {
    return `
      <div class="section-header ${align === 'center' ? 'section-header--center' : ''}">
        ${eyebrow ? `<span class="section-eyebrow">${escapeHtml(eyebrow)}</span>` : ''}
        <h2 class="section-title">${escapeHtml(title)}</h2>
        ${desc ? `<p class="section-desc">${escapeHtml(desc)}</p>` : ''}
      </div>`;
  }

  function CategoryCard(category) {
    const item = i18n.translate(category);
    return `
      <a class="category-card" href="${i18n.withContext(category.href)}">
        <span class="category-card__icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
        <span class="category-card__count">${item.articleCount} ${escapeHtml(i18n.t('articlesLabel'))}</span>
        <h3 class="category-card__title">${escapeHtml(item.title)}</h3>
        <p class="category-card__desc">${escapeHtml(item.description)}</p>
      </a>`;
  }

  function normalizeArticle(article) {
    const item = i18n.translate(article);
    const category = window.SpecHelpData.categories.find((cat) => cat.id === article.categoryId);
    const localizedCategory = category ? i18n.translate(category).title : item.category;
    return {
      ...item,
      category: localizedCategory,
      href: i18n.withContext(article.href),
      updatedAt: `${i18n.t('updated')} ${article.updatedAt}`,
      readTime: `${article.readMinutes} ${i18n.t('minRead')}`
    };
  }

  function ArticleCard(article, options = {}) {
    const item = normalizeArticle(article);
    const prefix = options.prefix ? `${escapeHtml(options.prefix)} · ` : '';
    return `
      <a class="article-card" href="${item.href}">
        <span class="article-card__meta">${prefix}${escapeHtml(item.category)} · ${escapeHtml(item.updatedAt)} · ${escapeHtml(item.readTime)}</span>
        <h3 class="article-card__title">${escapeHtml(item.title)}</h3>
        <p class="article-card__excerpt">${escapeHtml(item.excerpt)}</p>
        <span class="article-card__arrow" aria-hidden="true">${escapeHtml(i18n.t('readArticle'))}</span>
      </a>`;
  }

  function ContactSupportCard() {
    const channels = window.SpecHelpData.supportChannels.map(i18n.translate);
    return `
      <section class="contact-card">
        <div>
          <span class="section-eyebrow">${escapeHtml(i18n.t('stillNeedHelp'))}</span>
          <h2 class="contact-card__title">${escapeHtml(i18n.t('supportTitle'))}</h2>
          <p class="contact-card__desc">${escapeHtml(i18n.t('supportDesc'))}</p>
        </div>
        <div class="support-channel-grid">
          ${channels.map((item) => `
            <div class="support-channel">
              <strong>${escapeHtml(item.label)}</strong>
              <span>${escapeHtml(item.detail)}</span>
            </div>`).join('')}
        </div>
      </section>`;
  }

  function EmptyState({ title, desc, actionLabel, actionHref = './category.html' } = {}) {
    return `
      <section class="empty-state">
        <span class="empty-state__mark" aria-hidden="true"></span>
        <h2>${escapeHtml(title || i18n.t('noMatching'))}</h2>
        <p>${escapeHtml(desc || i18n.t('noMatchingDesc'))}</p>
        <a class="btn btn--outline" href="${i18n.withContext(actionHref)}">${escapeHtml(actionLabel || i18n.t('browseAll'))}</a>
      </section>`;
  }

  function HelpfulFeedback() {
    return `
      <section class="feedback-card" data-feedback-card>
        <div>
          <span class="section-eyebrow">${escapeHtml(i18n.t('feedback'))}</span>
          <h2 class="feedback-card__title">${escapeHtml(i18n.t('helpful'))}</h2>
          <p class="feedback-card__desc">${escapeHtml(i18n.t('feedbackDesc'))}</p>
        </div>
        <div class="feedback-card__actions">
          <button class="btn btn--outline" type="button" data-feedback="yes">${escapeHtml(i18n.t('yes'))}</button>
          <button class="btn btn--outline" type="button" data-feedback="no">${escapeHtml(i18n.t('no'))}</button>
        </div>
        <p class="feedback-card__message" hidden>${escapeHtml(i18n.t('thanks'))}</p>
      </section>`;
  }

  window.SpecHelp = {
    escapeHtml,
    param,
    SiteHeader,
    SiteFooter,
    HelpSearchBar,
    Breadcrumb,
    SectionHeader,
    CategoryCard,
    ArticleCard,
    ContactSupportCard,
    EmptyState,
    HelpfulFeedback,
    normalizeArticle
  };
})();
