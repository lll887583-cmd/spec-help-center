(function () {
  const data = window.SpecHelpData;
  const ui = window.SpecHelp;
  const i18n = window.SpecI18n;
  const page = document.body.dataset.page || 'home';

  function setHtml(selector, html) {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = html;
  }

  function setText(selector, text) {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  }

  function visibleArticles() {
    return data.articles.filter(i18n.isVisible);
  }

  function visibleCategories() {
    const articles = visibleArticles();
    return data.categories.map((category) => ({
      ...category,
      articleCount: articles.filter((article) => article.categoryId === category.id).length
    }));
  }

  function renderShell() {
    document.documentElement.lang = i18n.state.lang;
    setHtml('[data-site-header]', ui.SiteHeader(page));
    setHtml('[data-site-footer]', ui.SiteFooter());
  }

  function renderHome() {
    setText('[data-home-eyebrow]', i18n.t('homeEyebrow'));
    setText('[data-home-title]', i18n.t('homeTitle'));
    setText('[data-home-desc]', i18n.t('homeDesc'));
    setText('[data-browse-topics]', i18n.t('browseTopics'));
    setText('[data-popular-categories]', i18n.t('popularCategories'));
    setText('[data-popular-categories-desc]', i18n.t('popularCategoriesDesc'));
    setText('[data-most-viewed]', i18n.t('mostViewed'));
    setText('[data-popular-articles-title]', i18n.t('popularArticles'));
    setText('[data-popular-articles-desc]', i18n.t('popularArticlesDesc'));

    setHtml('[data-home-search]', ui.HelpSearchBar({ large: true }));
    setHtml('[data-category-grid]', visibleCategories().map(ui.CategoryCard).join(''));
    setHtml('[data-popular-articles]', visibleArticles().filter((article) => article.popular).map(ui.ArticleCard).join(''));
    setHtml('[data-contact-card]', ui.ContactSupportCard());
  }

  function renderCategory() {
    const requested = ui.param('category') || 'account-opening';
    const categories = visibleCategories();
    const category = categories.find((item) => item.id === requested) || categories[0];
    const localizedCategory = i18n.translate(category);
    const articles = visibleArticles().filter((article) => article.categoryId === category.id);

    setHtml('[data-breadcrumb]', ui.Breadcrumb([
      { label: i18n.t('helpCenter'), href: './index.html' },
      { label: localizedCategory.title }
    ]));
    setHtml('[data-category-sidebar]', `
      <span class="section-eyebrow">${ui.escapeHtml(i18n.t('browseTopics'))}</span>
      ${categories.map((item) => {
        const localized = i18n.translate(item);
        return `<a class="${item.id === category.id ? 'is-active' : ''}" href="${i18n.withContext(`./category.html?category=${item.id}`)}">${ui.escapeHtml(localized.title)}</a>`;
      }).join('')}
    `);
    setHtml('[data-category-heading]', ui.SectionHeader({
      eyebrow: i18n.t('category'),
      title: localizedCategory.title,
      desc: `${localizedCategory.description} ${category.articleCount} ${i18n.t('articlesMapped')}`
    }));
    setHtml('[data-category-list]', articles.length
      ? articles.map(ui.ArticleCard).join('')
      : ui.EmptyState({ title: i18n.t('noArticles'), desc: i18n.t('noArticlesDesc') }));
    setHtml('[data-contact-card]', ui.ContactSupportCard());
  }

  function renderArticleBody(article) {
    const item = i18n.translate(article);
    const sections = item.body || [
      { title: item.title, text: item.excerpt },
      { title: i18n.t('category'), text: i18n.t('unavailableDesc') }
    ];
    return sections.map((section, index) => `
      <h2 id="article-section-${index + 1}">${ui.escapeHtml(section.title)}</h2>
      <p>${ui.escapeHtml(section.text)}</p>
      ${index === 0 ? `<div class="article-callout"><strong>Demo content rule</strong><span>${ui.escapeHtml(i18n.t('unavailableDesc'))}</span></div>` : ''}
    `).join('');
  }

  function renderArticle() {
    const requested = ui.param('article') || 'verify-account';
    const rawArticle = data.articles.find((item) => item.id === requested) || data.articles[0];
    const isAllowed = i18n.isVisible(rawArticle);
    const article = ui.normalizeArticle(rawArticle);
    const related = visibleArticles().filter((item) => item.categoryId === rawArticle.categoryId && item.id !== rawArticle.id).slice(0, 2);

    setHtml('[data-breadcrumb]', ui.Breadcrumb([
      { label: i18n.t('helpCenter'), href: './index.html' },
      { label: article.category, href: `./category.html?category=${rawArticle.categoryId}` },
      { label: isAllowed ? article.title : i18n.t('unavailableTitle') }
    ]));

    if (!isAllowed) {
      setHtml('[data-article-header]', `
        <span class="section-eyebrow">${ui.escapeHtml(i18n.currentRegionLabel())}</span>
        <h1>${ui.escapeHtml(i18n.t('unavailableTitle'))}</h1>
        <p class="article-lede">${ui.escapeHtml(i18n.t('unavailableDesc'))}</p>`);
      setHtml('[data-article-body]', ui.EmptyState({ title: i18n.t('unavailableTitle'), desc: i18n.t('unavailableDesc'), actionLabel: i18n.t('backToCategory'), actionHref: `./category.html?category=${rawArticle.categoryId}` }));
      setHtml('[data-helpful-feedback]', '');
      setHtml('[data-related-articles]', related.map((item) => ui.ArticleCard(item, { prefix: i18n.t('related') })).join(''));
      return;
    }

    setHtml('[data-article-header]', `
      <span class="section-eyebrow">${ui.escapeHtml(article.category)}</span>
      <h1>${ui.escapeHtml(article.title)}</h1>
      <p class="article-lede">${ui.escapeHtml(article.excerpt)}</p>
      <p class="article-card__meta">${ui.escapeHtml(article.updatedAt)} · ${ui.escapeHtml(article.readTime)}</p>`);
    setHtml('[data-article-body]', renderArticleBody(rawArticle));
    setHtml('[data-helpful-feedback]', ui.HelpfulFeedback());
    setText('[data-related-label]', i18n.t('related'));
    setText('[data-keep-reading]', i18n.t('keepReading'));
    setHtml('[data-related-articles]', related.length
      ? related.map((item) => ui.ArticleCard(item, { prefix: i18n.t('related') })).join('')
      : ui.EmptyState({ title: i18n.t('noRelated'), desc: i18n.t('noRelatedDesc') }));
  }

  function bindFeedback() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-feedback]');
      if (!button) return;
      const card = button.closest('[data-feedback-card]');
      card.querySelectorAll('[data-feedback]').forEach((item) => item.classList.remove('is-selected'));
      button.classList.add('is-selected');
      card.querySelector('.feedback-card__message').hidden = false;
    });
  }

  function bindMenus() {
    document.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-language-toggle], [data-region-toggle]');
      document.querySelectorAll('.language-switcher, .region-switcher').forEach((switcher) => {
        if (!toggle || !switcher.contains(toggle)) switcher.classList.remove('is-open');
      });
      if (!toggle) return;
      const switcher = toggle.closest('.language-switcher, .region-switcher');
      const isOpen = switcher.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  renderShell();
  if (page === 'home') renderHome();
  if (page === 'category') renderCategory();
  if (page === 'article') renderArticle();
  bindFeedback();
  bindMenus();
})();
