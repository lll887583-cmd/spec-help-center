(function () {
  const data = window.SpecHelpData;
  const ui = window.SpecHelp;
  const i18n = window.SpecI18n;
  const page = document.body.dataset.page || 'search';

  function setHtml(selector, html) {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = html;
  }

  function renderSearch() {
    document.documentElement.lang = i18n.state.lang;
    const query = (ui.param('q') || 'verification').trim();
    const lowerQuery = query.toLowerCase();
    const results = data.articles
      .filter(i18n.isVisible)
      .filter((article) => {
        const item = ui.normalizeArticle(article);
        return [item.title, item.excerpt, item.category].join(' ').toLowerCase().includes(lowerQuery);
      });

    setHtml('[data-site-header]', ui.SiteHeader(page));
    setHtml('[data-site-footer]', ui.SiteFooter());
    setHtml('[data-search-form]', ui.HelpSearchBar({ value: query }));
    setHtml('[data-search-summary]', `
      <span class="section-eyebrow">${ui.escapeHtml(i18n.t('search'))}</span>
      <h1 class="section-title">${ui.escapeHtml(i18n.t('searchResults'))}</h1>
      <p class="section-desc">${results.length ? `${results.length} ${ui.escapeHtml(results.length > 1 ? i18n.t('resultsFor') : i18n.t('resultFor'))} "${ui.escapeHtml(query)}".` : `${ui.escapeHtml(i18n.t('noResultsFor'))} "${ui.escapeHtml(query)}".`}</p>`);
    setHtml('[data-search-results]', results.length
      ? results.map((article) => ui.ArticleCard(article, { prefix: i18n.t('bestMatch') })).join('')
      : ui.EmptyState({
        title: i18n.t('noMatching'),
        desc: i18n.t('noMatchingDesc'),
        actionLabel: i18n.t('browseAll'),
        actionHref: './category.html'
      }));
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

  renderSearch();
  bindMenus();
})();
