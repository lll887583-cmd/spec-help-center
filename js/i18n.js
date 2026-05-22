(function () {
  const languages = [
    ['en', 'English'],
    ['zh', '简体中文'],
    ['zh-hant', '繁體中文'],
    ['th', 'ไทย'],
    ['vi', 'Tiếng Việt'],
    ['id', 'Bahasa Indonesia'],
    ['ms', 'Bahasa Melayu'],
    ['ja', '日本語'],
    ['ko', '한국어']
  ];

  const regions = [
    ['global', 'Global'],
    ['th', 'Thailand'],
    ['vn', 'Vietnam'],
    ['id', 'Indonesia'],
    ['my', 'Malaysia'],
    ['jp', 'Japan'],
    ['kr', 'Korea']
  ];

  const dict = {
    en: {
      register: 'Register', login: 'Login', search: 'Search', searchPlaceholder: 'Search by keyword, topic, or question',
      region: 'Market', footerNote: 'HTML demo for frontend handoff. UI inherits Spec Markets; support flow references modern help centers.',
      browseTopics: 'Browse topics', searchHelp: 'Search help', articleExample: 'Article example', helpCenter: 'Help Center',
      homeEyebrow: 'Spec Markets Help Center', homeTitle: 'Answers for every step of your trading journey.',
      homeDesc: 'Search account setup, funding, platform, security, and trading questions with a support flow inspired by mature help centers.',
      popularCategories: 'Popular categories', popularCategoriesDesc: 'Reusable category cards define the information architecture that frontend can map to React routes later.',
      mostViewed: 'Most viewed', popularArticles: 'Popular articles', popularArticlesDesc: 'Article cards are shared by home, category, search, and related article sections.',
      stillNeedHelp: 'Still need help?', supportTitle: 'Reach the right support path without losing context.', supportDesc: 'Use this band as the reusable handoff component for help center escalation and support entry points.',
      category: 'Category', articlesMapped: 'help articles are mapped to this reusable category route.', noArticles: 'No articles available in this market yet', noArticlesDesc: 'This state is preserved for regional content visibility and empty future categories.',
      readArticle: 'Read article', related: 'Related', keepReading: 'Keep reading', noRelated: 'No related articles yet', noRelatedDesc: 'Related content is filtered by current language and market.',
      feedback: 'Feedback', helpful: 'Was this article helpful?', feedbackDesc: 'This captures the article feedback state pattern for final implementation.', yes: 'Yes', no: 'No', thanks: 'Thanks. Your feedback has been recorded in the demo state.',
      searchResults: 'Search results', resultFor: 'result for', resultsFor: 'results for', noResultsFor: 'No results for', noMatching: 'No matching articles', noMatchingDesc: 'Try account, deposit, password, trading hours, or browse categories.', browseAll: 'Browse all topics',
      unavailableTitle: 'This article is not available in your market', unavailableDesc: 'The content may be restricted by regional policy, product availability, or compliance review status.', backToCategory: 'Back to category', updated: 'Updated', minRead: 'min read', bestMatch: 'Best match', articlesLabel: 'articles'
    },
    zh: {
      register: '注册', login: '登录', search: '搜索', searchPlaceholder: '搜索关键词、主题或问题',
      region: '市场', footerNote: '用于前端交付的 HTML demo。UI 继承 Spec Markets，支持流程参考成熟帮助中心。',
      browseTopics: '浏览主题', searchHelp: '搜索帮助', articleExample: '文章示例', helpCenter: '帮助中心',
      homeEyebrow: 'Spec Markets 帮助中心', homeTitle: '交易旅程每一步，都有清晰答案。',
      homeDesc: '搜索开户、入金、平台、安全和交易问题，以成熟帮助中心的方式组织支持流程。',
      popularCategories: '热门分类', popularCategoriesDesc: '可复用分类卡片定义信息架构，后续前端可映射到 React 路由。',
      mostViewed: '最多查看', popularArticles: '热门文章', popularArticlesDesc: '文章卡片会复用于首页、分类页、搜索页和相关文章。',
      stillNeedHelp: '仍需要帮助？', supportTitle: '在不丢失上下文的情况下找到正确支持入口。', supportDesc: '该模块可作为帮助中心升级支持入口的复用组件。',
      category: '分类', articlesMapped: '篇帮助文章映射到该复用分类路由。', noArticles: '当前市场暂无可见文章', noArticlesDesc: '该状态用于演示地区内容可见性和空分类。',
      readArticle: '阅读文章', related: '相关', keepReading: '继续阅读', noRelated: '暂无相关文章', noRelatedDesc: '相关文章会按当前语言和市场过滤。',
      feedback: '反馈', helpful: '这篇文章有帮助吗？', feedbackDesc: '该模块用于演示文章反馈状态。', yes: '有帮助', no: '没有', thanks: '谢谢，demo 已记录你的反馈状态。',
      searchResults: '搜索结果', resultFor: '条结果：', resultsFor: '条结果：', noResultsFor: '没有结果：', noMatching: '没有匹配文章', noMatchingDesc: '可尝试搜索开户、入金、密码、交易时间，或浏览分类。', browseAll: '浏览全部主题',
      unavailableTitle: '该文章不适用于当前市场', unavailableDesc: '内容可能因地区政策、产品可用性或合规审核状态而受限。', backToCategory: '返回分类', updated: '更新于', minRead: '分钟阅读', bestMatch: '最佳匹配', articlesLabel: '篇文章'
    },
    th: {
      register: 'สมัคร', login: 'เข้าสู่ระบบ', search: 'ค้นหา', searchPlaceholder: 'ค้นหาคำสำคัญ หัวข้อ หรือคำถาม',
      region: 'ตลาด', helpCenter: 'ศูนย์ช่วยเหลือ', browseTopics: 'เรียกดูหัวข้อ', searchHelp: 'ค้นหาความช่วยเหลือ', articleExample: 'ตัวอย่างบทความ',
      homeEyebrow: 'ศูนย์ช่วยเหลือ Spec Markets', homeTitle: 'คำตอบสำหรับทุกขั้นตอนในการเทรดของคุณ',
      homeDesc: 'ค้นหาเรื่องบัญชี ฝากถอน แพลตฟอร์ม ความปลอดภัย และการเทรด',
      popularCategories: 'หมวดยอดนิยม', mostViewed: 'ยอดนิยม', popularArticles: 'บทความยอดนิยม', category: 'หมวดหมู่', readArticle: 'อ่านบทความ',
      stillNeedHelp: 'ยังต้องการความช่วยเหลือ?', supportTitle: 'ติดต่อฝ่ายสนับสนุนที่เหมาะสม', supportDesc: 'คอมโพเนนต์สำหรับทางเข้าการช่วยเหลือ',
      searchResults: 'ผลการค้นหา', noMatching: 'ไม่พบบทความ', browseAll: 'ดูหัวข้อทั้งหมด', unavailableTitle: 'บทความนี้ไม่พร้อมใช้งานในตลาดของคุณ', unavailableDesc: 'เนื้อหาอาจถูกจำกัดตามภูมิภาคหรือข้อกำกับ',
      feedback: 'ข้อเสนอแนะ', helpful: 'บทความนี้มีประโยชน์หรือไม่?', yes: 'ใช่', no: 'ไม่', thanks: 'ขอบคุณสำหรับความคิดเห็น', bestMatch: 'ตรงที่สุด', articlesLabel: 'บทความ', related: 'เกี่ยวข้อง', keepReading: 'อ่านต่อ'
    },
    ja: {
      register: '登録', login: 'ログイン', search: '検索', searchPlaceholder: 'キーワード、トピック、質問を検索',
      region: 'マーケット', helpCenter: 'ヘルプセンター', browseTopics: 'トピックを見る', searchHelp: 'ヘルプ検索', articleExample: '記事例',
      homeEyebrow: 'Spec Markets ヘルプセンター', homeTitle: '取引の各ステップに必要な答えを見つける。',
      homeDesc: '口座、入出金、プラットフォーム、セキュリティ、取引に関する質問を検索できます。',
      popularCategories: '人気カテゴリ', mostViewed: 'よく見られている記事', popularArticles: '人気記事', category: 'カテゴリ', readArticle: '記事を読む',
      stillNeedHelp: 'さらにサポートが必要ですか？', supportTitle: '適切なサポート導線へ案内します。', supportDesc: 'ヘルプセンターのサポート導線コンポーネントです。',
      searchResults: '検索結果', noMatching: '該当する記事がありません', browseAll: 'すべてのトピックを見る', unavailableTitle: 'この記事は現在のマーケットでは利用できません', unavailableDesc: '地域ポリシー、商品提供状況、またはコンプライアンス確認により制限されている可能性があります。',
      feedback: 'フィードバック', helpful: 'この記事は役に立ちましたか？', yes: 'はい', no: 'いいえ', thanks: 'フィードバックを受け付けました。', bestMatch: '最適一致', articlesLabel: '記事', related: '関連', keepReading: '続きを読む'
    }
  };

  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  function initState() {
    const lang = getParam('lang') || localStorage.getItem('specHelpLang') || 'en';
    const region = getParam('region') || localStorage.getItem('specHelpRegion') || 'global';
    const safeLang = languages.some(([code]) => code === lang) ? lang : 'en';
    const safeRegion = regions.some(([code]) => code === region) ? region : 'global';
    localStorage.setItem('specHelpLang', safeLang);
    localStorage.setItem('specHelpRegion', safeRegion);
    return { lang: safeLang, region: safeRegion };
  }

  const state = initState();

  function t(key) {
    return (dict[state.lang] && dict[state.lang][key]) || dict.en[key] || key;
  }

  function translate(item) {
    const translated = item.translations && (item.translations[state.lang] || item.translations.en);
    return { ...item, ...(translated || {}) };
  }

  function isVisible(item) {
    const visibility = item.visibility || {};
    if (visibility.hiddenIn && visibility.hiddenIn.includes(state.region)) return false;
    if (visibility.visibleIn && !visibility.visibleIn.includes('global') && !visibility.visibleIn.includes(state.region)) return false;
    return true;
  }

  function withContext(href, overrides = {}) {
    const url = new URL(href, window.location.href);
    url.searchParams.set('lang', overrides.lang || state.lang);
    url.searchParams.set('region', overrides.region || state.region);
    return `${url.pathname.split('/').pop() || 'index.html'}${url.search}`;
  }

  function currentLabel(collection, value) {
    return (collection.find(([code]) => code === value) || [value, value])[1];
  }

  window.SpecI18n = {
    languages,
    regions,
    state,
    t,
    translate,
    isVisible,
    withContext,
    currentLangLabel: () => currentLabel(languages, state.lang),
    currentRegionLabel: () => currentLabel(regions, state.region)
  };
})();
