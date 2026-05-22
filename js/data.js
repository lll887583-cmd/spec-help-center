window.SpecHelpData = {
  categories: [
    {
      id: 'account-opening', icon: 'ID', articleCount: 12, href: './category.html?category=account-opening',
      translations: {
        en: { title: 'Account Opening', description: 'Registration, verification, profile settings, and account types.' },
        zh: { title: '开户与认证', description: '注册、身份认证、资料设置和账户类型。' },
        th: { title: 'การเปิดบัญชี', description: 'การลงทะเบียน การยืนยันตัวตน การตั้งค่าโปรไฟล์ และประเภทบัญชี' },
        ja: { title: '口座開設', description: '登録、本人確認、プロフィール設定、口座タイプ。' }
      }
    },
    {
      id: 'funds', icon: 'FX', articleCount: 9, href: './category.html?category=funds',
      translations: {
        en: { title: 'Funds', description: 'Deposits, withdrawals, payment methods, processing time, and fees.' },
        zh: { title: '资金', description: '入金、出金、支付方式、处理时间和费用。' },
        th: { title: 'เงินทุน', description: 'การฝาก ถอน วิธีชำระเงิน ระยะเวลาดำเนินการ และค่าธรรมเนียม' },
        ja: { title: '資金', description: '入金、出金、支払方法、処理時間、手数料。' }
      }
    },
    {
      id: 'trading', icon: 'MT', articleCount: 15, href: './category.html?category=trading',
      translations: {
        en: { title: 'Trading', description: 'Platforms, products, spreads, commissions, swap rates, and trading hours.' },
        zh: { title: '交易', description: '平台、产品、点差、佣金、隔夜利息和交易时间。' },
        th: { title: 'การเทรด', description: 'แพลตฟอร์ม ผลิตภัณฑ์ สเปรด คอมมิชชั่น สวอป และเวลาเทรด' },
        ja: { title: '取引', description: 'プラットフォーム、商品、スプレッド、手数料、スワップ、取引時間。' }
      }
    },
    {
      id: 'security', icon: '2FA', articleCount: 7, href: './category.html?category=security',
      translations: {
        en: { title: 'Security', description: 'Password, two-factor authentication, account protection, and login alerts.' },
        zh: { title: '安全', description: '密码、双重认证、账户保护和登录提醒。' },
        th: { title: 'ความปลอดภัย', description: 'รหัสผ่าน การยืนยันสองขั้นตอน การป้องกันบัญชี และการแจ้งเตือนเข้าสู่ระบบ' },
        ja: { title: 'セキュリティ', description: 'パスワード、二要素認証、口座保護、ログイン通知。' }
      }
    },
    {
      id: 'platforms', icon: 'APP', articleCount: 10, href: './category.html?category=platforms',
      translations: {
        en: { title: 'Platforms', description: 'Web terminal, mobile app, desktop setup, charts, and order operations.' },
        zh: { title: '平台', description: '网页终端、移动应用、桌面端设置、图表和订单操作。' },
        th: { title: 'แพลตฟอร์ม', description: 'เว็บเทอร์มินัล แอปมือถือ เดสก์ท็อป กราฟ และคำสั่งซื้อขาย' },
        ja: { title: 'プラットフォーム', description: 'Web端末、モバイルアプリ、デスクトップ設定、チャート、注文操作。' }
      }
    },
    {
      id: 'partnership', icon: 'IB', articleCount: 6, href: './category.html?category=partnership',
      translations: {
        en: { title: 'Partnership', description: 'Introducing broker tools, reports, client links, and commission questions.' },
        zh: { title: '合作伙伴', description: 'IB 工具、报表、客户链接和佣金问题。' },
        th: { title: 'พาร์ทเนอร์', description: 'เครื่องมือ IB รายงาน ลิงก์ลูกค้า และคำถามเกี่ยวกับค่าคอมมิชชั่น' },
        ja: { title: 'パートナーシップ', description: 'IBツール、レポート、顧客リンク、コミッションに関する質問。' }
      }
    }
  ],
  articles: [
    {
      id: 'verify-account', categoryId: 'account-opening', readMinutes: 4, updatedAt: 'May 21, 2026', href: './article.html?article=verify-account', popular: true,
      visibility: { visibleIn: ['global', 'th', 'vn', 'id', 'my', 'jp', 'kr'] },
      translations: {
        en: { title: 'How do I verify my trading account?', excerpt: 'Learn which documents are required and how the verification flow works from upload to approval.', body: [{ title: 'Required documents', text: 'Prepare a valid identity document and proof of residential address. Use clear images and make sure all corners, dates, names, and document numbers are visible.' }, { title: 'Verification process', text: 'After upload, the account review flow should clearly explain pending, approved, and rejected states.' }, { title: 'Review time', text: 'Most reviews should show an expected processing window and where users can check the latest account status.' }] },
        zh: { title: '如何验证我的交易账户？', excerpt: '了解需要哪些文件，以及从上传到审核通过的认证流程。', body: [{ title: '所需文件', text: '请准备有效身份证明和居住地址证明。图片需要清晰，确保四角、日期、姓名和证件号码可见。' }, { title: '认证流程', text: '上传后，账户审核流程应清楚展示待审核、已通过和被拒绝状态。' }, { title: '审核时间', text: '文章应说明预计处理时间，以及用户在哪里查看最新账户状态。' }] },
        th: { title: 'ยืนยันบัญชีเทรดอย่างไร?', excerpt: 'ดูเอกสารที่ต้องใช้และขั้นตอนตั้งแต่อัปโหลดจนถึงอนุมัติ' },
        ja: { title: '取引口座を認証するには？', excerpt: '必要書類とアップロードから承認までの流れを確認します。' }
      }
    },
    {
      id: 'choose-account-type', categoryId: 'account-opening', readMinutes: 3, updatedAt: 'May 18, 2026', href: './article.html?article=choose-account-type', popular: true,
      visibility: { visibleIn: ['global', 'th', 'vn', 'id', 'my', 'jp', 'kr'] },
      translations: { en: { title: 'Which account type should I choose?', excerpt: 'Compare available account types and the trading scenarios they support before opening an account.' }, zh: { title: '我应该选择哪种账户类型？', excerpt: '开户前比较不同账户类型及其适用交易场景。' }, th: { title: 'ควรเลือกประเภทบัญชีใด?', excerpt: 'เปรียบเทียบประเภทบัญชีและสถานการณ์ที่เหมาะสม' }, ja: { title: 'どの口座タイプを選ぶべきですか？', excerpt: '口座開設前に利用可能な口座タイプを比較します。' } }
    },
    {
      id: 'deposit-processing-time', categoryId: 'funds', readMinutes: 3, updatedAt: 'May 16, 2026', href: './article.html?article=deposit-processing-time', popular: true,
      visibility: { visibleIn: ['global', 'th', 'vn', 'id', 'my', 'jp', 'kr'] },
      translations: { en: { title: 'How long does a deposit take to arrive?', excerpt: 'See common payment processing windows and what to check if your deposit is still pending.' }, zh: { title: '入金多久到账？', excerpt: '查看常见支付处理时间，以及入金仍待处理时应检查什么。' }, th: { title: 'ฝากเงินใช้เวลานานแค่ไหน?', excerpt: 'ดูเวลาประมวลผลและสิ่งที่ควรตรวจสอบหากยังรอดำเนินการ' }, ja: { title: '入金反映にはどれくらいかかりますか？', excerpt: '一般的な処理時間と保留中に確認すべき内容。' } }
    },
    {
      id: 'withdrawal-review', categoryId: 'funds', readMinutes: 5, updatedAt: 'May 12, 2026', href: './article.html?article=withdrawal-review',
      visibility: { visibleIn: ['global', 'th', 'vn', 'id', 'my', 'jp', 'kr'] },
      translations: { en: { title: 'Why is my withdrawal under review?', excerpt: 'Understand withdrawal review checks, security holds, and the documents that may be requested.' }, zh: { title: '为什么我的出金正在审核？', excerpt: '了解出金审核、安全暂缓以及可能需要补充的文件。' } }
    },
    {
      id: 'trading-hours', categoryId: 'trading', readMinutes: 2, updatedAt: 'May 10, 2026', href: './article.html?article=trading-hours',
      visibility: { visibleIn: ['global', 'th', 'vn', 'id', 'my', 'jp', 'kr'] },
      translations: { en: { title: 'Where can I find product trading hours?', excerpt: 'Check session times, holiday schedules, and symbol-specific trading breaks before placing orders.' }, zh: { title: '在哪里查看产品交易时间？', excerpt: '下单前查看交易时段、假期安排和品种休市时间。' } }
    },
    {
      id: 'pamm-availability', categoryId: 'partnership', readMinutes: 4, updatedAt: 'May 9, 2026', href: './article.html?article=pamm-availability', popular: true,
      visibility: { visibleIn: ['global', 'th', 'vn', 'id', 'my'], hiddenIn: ['jp', 'kr'] },
      translations: { en: { title: 'Is PAMM available in my market?', excerpt: 'PAMM availability depends on your market, account entity, and local policy requirements.', body: [{ title: 'Market availability', text: 'Some investment and copy-management features may be limited by region. The help center should only show this article where the service is available.' }, { title: 'What to do next', text: 'If the feature is unavailable, users should see an alternative support path instead of a restricted setup guide.' }] }, zh: { title: '我的市场可以使用 PAMM 吗？', excerpt: 'PAMM 可用性取决于你的市场、账户实体和当地政策要求。' }, th: { title: 'PAMM ใช้ได้ในตลาดของฉันหรือไม่?', excerpt: 'ความพร้อมใช้งานของ PAMM ขึ้นอยู่กับตลาดและข้อกำหนดในพื้นที่' }, ja: { title: 'PAMM は私のマーケットで利用できますか？', excerpt: 'PAMM の利用可否は地域、口座エンティティ、現地ポリシーにより異なります。' } }
    },
    {
      id: 'reset-password', categoryId: 'security', readMinutes: 3, updatedAt: 'May 8, 2026', href: './article.html?article=reset-password',
      visibility: { visibleIn: ['global', 'th', 'vn', 'id', 'my', 'jp', 'kr'] },
      translations: { en: { title: 'How do I reset my password securely?', excerpt: 'Reset your password, protect your email, and enable extra login protection for your account.' }, zh: { title: '如何安全重置密码？', excerpt: '重置密码、保护邮箱，并为账户启用额外登录保护。' } }
    }
  ],
  supportChannels: [
    { translations: { en: { label: 'Live chat', detail: 'Fastest for login, funding, and urgent account questions.' }, zh: { label: '在线客服', detail: '适合登录、资金和紧急账户问题。' } } },
    { translations: { en: { label: 'Ticket support', detail: 'Best for document review, account changes, and detailed requests.' }, zh: { label: '工单支持', detail: '适合文件审核、账户变更和详细请求。' } } },
    { translations: { en: { label: 'Help center', detail: 'Use search first to find policy and platform answers instantly.' }, zh: { label: '帮助中心', detail: '优先使用搜索快速找到政策和平台答案。' } } }
  ]
};
