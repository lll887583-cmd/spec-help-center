(function () {
  const body = document.body;
  const page = body.dataset.page || '';
  const lang = body.dataset.lang || 'en-us';
  const prefix = body.dataset.prefix || './';

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function asset(path) {
    return prefix + path.replace(/^\.\//, '');
  }

  function helpPath(path) {
    return `${prefix}${lang}/help-center${path}`;
  }

  function searchPath(query) {
    return `${helpPath('/search/')}${query ? `?q=${encodeURIComponent(query)}` : ''}`;
  }

  function categoryPath(categoryId) {
    return helpPath(`/category/${categoryId}/`);
  }

  function articlePath(articleId) {
    return helpPath(`/article/${articleId}/`);
  }

  function queryValue() {
    return new URLSearchParams(window.location.search).get('q') || '';
  }

  function getText(translations, currentLang) {
    return translations[currentLang] || translations['en-us'] || Object.values(translations)[0];
  }

  function getCategoryById(data, id) {
    return data.categories.find((category) => category.id === id);
  }

  function getCategoryForArticle(data, article) {
    return getCategoryById(data, article.categoryId);
  }

  function getArticleHierarchy(data, article) {
    const category = getCategoryForArticle(data, article);
    const section = category?.sections.find((item) => item.id === article.sectionId);
    const topic = section?.topics.find((item) => item.id === article.topicId);
    return { category, section, topic };
  }

  function normalizeSearchText(article, data) {
    const articleText = getText(article.translations, lang);
    const { category, section, topic } = getArticleHierarchy(data, article);
    const categoryText = category ? getText(category.translations, lang) : null;
    const bodyText = (articleText.body || []).map((block) => `${block.title} ${block.text}`).join(' ');
    return {
      articleText,
      category,
      categoryText,
      section,
      topic,
      haystack: [
        articleText.title,
        articleText.excerpt,
        bodyText,
        categoryText?.title,
        categoryText?.description,
        section?.title,
        topic?.title
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
    };
  }

  function highlight(text, keyword) {
    const source = String(text || '');
    const normalizedKeyword = keyword.trim();
    if (!normalizedKeyword) return escapeHtml(source);

    const matcher = new RegExp(`(${normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return source
      .split(matcher)
      .map((part) =>
        part.toLowerCase() === normalizedKeyword.toLowerCase()
          ? `<mark class="searchHighlight">${escapeHtml(part)}</mark>`
          : escapeHtml(part)
      )
      .join('');
  }

  function renderSearchResults(data) {
    const heading = document.querySelector('[data-search-heading]');
    const resultsRoot = document.querySelector('[data-search-results]');
    const categoriesRoot = document.querySelector('[data-empty-categories]');
    if (!resultsRoot || !heading || !categoriesRoot) return;

    const keyword = queryValue().trim();
    heading.innerHTML = keyword ? `Results for "${escapeHtml(keyword)}"` : 'Search the Help Center';

    const results = data.articles.filter((article) => {
      if (!keyword) return true;
      return normalizeSearchText(article, data).haystack.includes(keyword.toLowerCase());
    });

    if (!results.length) {
      categoriesRoot.innerHTML = data.categories
        .slice(0, 3)
        .map((category) => {
          const text = getText(category.translations, lang);
          return `<a href="${categoryPath(category.id)}">${escapeHtml(text.title)}</a>`;
        })
        .join('');

      resultsRoot.innerHTML = `
        <div class="emptyCard">
          <h2>No matching articles yet</h2>
          <p>Try a broader keyword, or browse one of the top categories below.</p>
          <div class="quickLinks">${categoriesRoot.innerHTML}</div>
        </div>
      `;
      return;
    }

    resultsRoot.innerHTML = results
      .map((article) => {
        const normalized = normalizeSearchText(article, data);
        const blocks = normalized.articleText.body?.length
          ? normalized.articleText.body
          : [
              {
                title: 'Overview',
                text:
                  normalized.articleText.excerpt ||
                  'This article gives a concise answer and points users to the next best support step.'
              }
            ];

        return `
          <article class="searchResultCard">
            <div class="searchResultMeta">
              ${normalized.categoryText ? `<span>${highlight(normalized.categoryText.title, keyword)}</span>` : ''}
              ${normalized.section ? `<span>${highlight(normalized.section.title, keyword)}</span>` : ''}
            </div>
            <h2 class="articleTitle"><a href="${articlePath(article.id)}">${highlight(normalized.articleText.title, keyword)}</a></h2>
            <div class="searchResultBody">
              ${blocks
                .map(
                  (block) => `
                    <section class="searchResultBlock">
                      <h3>${highlight(block.title, keyword)}</h3>
                      <p>${highlight(block.text, keyword)}</p>
                    </section>
                  `
                )
                .join('')}
            </div>
          </article>
        `;
      })
      .join('');
  }

  function bindAccordions() {
    document.querySelectorAll('[data-faq-question]').forEach((button) => {
      button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-faq-question');
        const item = this.closest('.categoryFaqItem');
        const answer = document.getElementById(targetId);
        const willOpen = this.getAttribute('aria-expanded') !== 'true';

        document.querySelectorAll('.categoryFaqItem').forEach((node) => node.classList.remove('categoryFaqItemOpen'));
        document.querySelectorAll('[data-faq-question]').forEach((node) => node.setAttribute('aria-expanded', 'false'));
        document.querySelectorAll('[data-faq-answer]').forEach((node) => node.hidden = true);

        if (willOpen && item && answer) {
          item.classList.add('categoryFaqItemOpen');
          this.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }

  function syncSearchInput() {
    const value = queryValue();
    document.querySelectorAll('input[name="q"]').forEach((input) => {
      if (!input.value) input.value = value;
    });
  }

  async function initSearchPage() {
    const response = await fetch(asset('assets/help-center-data.json'));
    const data = await response.json();
    renderSearchResults(data);
  }

  syncSearchInput();
  bindAccordions();

  if (page === 'search') {
    initSearchPage().catch((error) => {
      const root = document.querySelector('[data-search-results]');
      if (root) {
        root.innerHTML = `<div class="emptyCard"><h2>Search is unavailable</h2><p>${escapeHtml(error.message)}</p></div>`;
      }
    });
  }

  document.querySelectorAll('[data-search-form]').forEach((form) => {
    form.addEventListener('submit', function (event) {
      const input = this.querySelector('input[name="q"]');
      if (!(input instanceof HTMLInputElement)) return;
      event.preventDefault();
      window.location.href = searchPath(input.value.trim());
    });
  });
})();
