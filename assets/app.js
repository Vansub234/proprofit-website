/* ===== ProProfit — интерактив и данные (мультиязычность) ===== */

/* Язык определяется по URL: /en/ , /vi/ , /th/ , /ms/ → иначе русский (корень) */
const LANG = (function () {
  const m = location.pathname.match(/\/(en|vi|th|ms)(\/|$)/);
  return m ? m[1] : 'ru';
})();

/* --- РЕЕСТР ПРОЕКТОВ ---
   Чтобы добавить новый проект: допишите объект в начало массива (новые сверху).
   Поля tag/summary — на русском; переводы в i18n[lang]. */
const PROJECTS = [
  {
    slug: 'binibit',
    name: 'BiniBit (BINI)',
    short: 'BINI',
    logo: '/assets/logos/binibit.png',
    pinned: true,                 // 🚩 ФЛАГМАН: всегда первым вверху ленты
    refback: 5,                   // 💸 РефБек 5% (0 или убрать поле — если рефбека нет)
    tag: 'Биржа · Обзор',
    rating: 4.0,
    date: '2026-06-14',
    dateText: '14 июня 2026',
    summary: 'Биржа «powered by agents»: спот, BaiDEX, собственный Layer-1 BiniChain, launchpad, стейкинг и Telegram-приложение для майнинга. Разбираем, что внутри и на что смотреть.',
    url: 'reviews/binibit.html',
    i18n: {
      en: { tag: 'Exchange · Review', dateText: 'June 14, 2026', summary: 'A “powered by agents” exchange: spot, BaiDEX, its own Layer-1 BiniChain, launchpad, staking and a Telegram mining app. We break down what’s inside and what to watch.' }
    }
  },
  {
    slug: 'aurum',
    name: 'AURUM Foundation',
    short: 'AUR',
    logo: '/assets/logos/aurum.png',
    refback: 3,
    tag: 'AI-финтех · Обзор',
    rating: 4.5,
    date: '2026-06-16',
    dateText: '16 июня 2026',
    summary: 'Финтех-экосистема нового поколения: AI-торговые боты, токенизированное золото (XAU), Web3-необанк с картами и токен AURUM. Разбираем продукты, доходность и как всё устроено.',
    url: 'reviews/aurum.html',
    i18n: {
      en: { tag: 'AI fintech · Review', dateText: 'June 16, 2026', summary: 'A next-gen fintech ecosystem: AI trading bots, tokenized gold (XAU), a Web3 neobank with cards and the AURUM token. We break down the products and how it all works.' }
    }
  },
  {
    slug: 'pintopay',
    name: 'PinToPay',
    short: 'P2P',
    logo: '/assets/logos/pintopay.png',
    tag: 'Крипто-карта · Обзор',
    rating: 4.0,
    date: '2026-06-16',
    dateText: '16 июня 2026',
    summary: 'Предоплаченная крипто-карта Visa/Mastercard с пополнением USDT и онбордингом через Telegram-бота. Разбираем комиссии, лимиты и как платить криптой везде.',
    url: 'reviews/pintopay.html',
    i18n: {
      en: { tag: 'Crypto card · Review', dateText: 'June 16, 2026', summary: 'A prepaid Visa/Mastercard crypto card topped up with USDT and onboarded via a Telegram bot. We break down fees, limits and how to pay with crypto anywhere.' }
    }
  },
  {
    slug: 'metabox',
    name: 'MetaBox',
    short: 'MB',
    logo: '/assets/logos/metabox.png',
    refback: 10,
    tag: 'AI-обучение · Обзор',
    rating: 4.5,
    date: '2026-06-16',
    dateText: '16 июня 2026',
    summary: 'Платформа обучения нейросетям: ChatGPT, Midjourney, AI-видео, аватары и блогинг — 8 направлений в одной системе плюс партнёрская программа для заработка.',
    url: 'reviews/metabox.html',
    i18n: {
      en: { tag: 'AI learning · Review', dateText: 'June 16, 2026', summary: 'A platform for learning neural networks: ChatGPT, Midjourney, AI video, avatars and blogging — 8 tracks in one system plus an affiliate program to earn.' }
    }
  }
  // ↑ Новый проект добавляется СЮДА, сверху. pinned:true — закрепить флагманом наверху.
];

/* --- РЕЕСТР НОВОСТЕЙ --- (новые сверху). Переводы в i18n[lang]. */
const NEWS = [
  {
    date: '2026-06-18',
    dateText: '18 июня 2026',
    title: '🚀 BiniBIT запустил Telegram Mini App и расширяет экосистему',
    image: '/assets/news/binibit-app-home.jpg',
    body: 'После запуска сети BiniChain команда BiniBIT выкатила полноценный Telegram Mini App: майнинг кристаллов, стейкинг до 160% годовых, задания, 3-уровневая рефералка, своя DEX BaiDEX и запуск собственных токенов — всё прямо внутри Telegram.',
    link: 'news/binibit-mini-app.html',
    linkText: 'Читать полностью →',
    i18n: {
      en: { dateText: 'June 18, 2026', title: '🚀 BiniBIT launched a Telegram Mini App and keeps expanding', body: 'After launching the BiniChain network, the BiniBIT team rolled out a full Telegram Mini App: crystal mining, staking up to 160% APR, tasks, a 3-level referral system, its own BaiDEX DEX and token launches — all inside Telegram.', linkText: 'Read more →' }
    }
  },
  {
    date: '2026-06-16',
    dateText: '16 июня 2026',
    title: 'Три новых обзора: AURUM, PinToPay и MetaBox',
    body: 'Добавили сразу три свежих разбора: AI-финтех экосистема AURUM Foundation, крипто-карта PinToPay и платформа обучения нейросетям MetaBox. Читайте, сравнивайте и оставляйте отзывы.',
    link: 'index.html#reviews',
    linkText: 'Смотреть обзоры →',
    i18n: {
      en: { dateText: 'June 16, 2026', title: 'Three new reviews: AURUM, PinToPay and MetaBox', body: 'We added three fresh breakdowns at once: the AURUM Foundation AI-fintech ecosystem, the PinToPay crypto card and the MetaBox neural-network learning platform. Read, compare and leave reviews.', linkText: 'See reviews →' }
    }
  },
  {
    date: '2026-06-14',
    dateText: '14 июня 2026',
    title: 'Запуск сайта ProProfit',
    body: 'Мы открыли платформу независимых обзоров криптопроектов. Первый разбор — биржа BiniBit. Дальше будет больше проектов, отзывов и аналитики на разных языках.',
    link: 'reviews/binibit.html',
    linkText: 'Читать первый обзор →',
    i18n: {
      en: { dateText: 'June 14, 2026', title: 'ProProfit website launch', body: 'We launched a platform for independent crypto project reviews. The first breakdown is the BiniBit exchange. More projects, reviews and analytics in multiple languages are coming.', linkText: 'Read the first review →' }
    }
  }
  // ↑ Новая новость добавляется СЮДА, сверху
];

/* --- Переводы интерфейса (UI-строки) --- */
const UI = {
  ru: {
    readReview: 'Читать обзор →',
    flagship: '📌 Флагман',
    refback: '💸 РефБек',
    noReviews: 'Пока нет отзывов. Будьте первым, кто поделится опытом!',
    noReviewsHub: 'Пока нет отзывов по выбранному проекту. Оставить отзыв можно на странице обзора.',
    noNews: 'Новостей пока нет.',
    allProjects: 'Все проекты',
    enterText: 'Напишите текст отзыва',
    anon: 'Аноним',
    locale: 'ru-RU'
  },
  en: {
    readReview: 'Read review →',
    flagship: '📌 Flagship',
    refback: '💸 RefBack',
    noReviews: 'No reviews yet. Be the first to share your experience!',
    noReviewsHub: 'No reviews for the selected project yet. You can leave a review on the project page.',
    noNews: 'No news yet.',
    allProjects: 'All projects',
    enterText: 'Please write your review text',
    anon: 'Anonymous',
    locale: 'en-US'
  }
};
const T = UI[LANG] || UI.ru;

/* Хелперы: вернуть переведённое поле проекта/новости с фолбэком на русский */
function pf(obj, field) {
  if (LANG !== 'ru' && obj.i18n && obj.i18n[LANG] && obj.i18n[LANG][field] != null) return obj.i18n[LANG][field];
  return obj[field];
}


// --- Бургер-меню (выдвижное) ---
function initDrawer() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  if (!burger || !drawer || !overlay) return;
  function open() { burger.classList.add('open'); drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { burger.classList.remove('open'); drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
  burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// --- Утилиты отзывов ---
// Слой хранения: если настроен Supabase — пишем/читаем из общей базы (видно всем),
// иначе fallback на localStorage (видно только локально, для прототипа).
const CFG = window.PROPROFIT_CONFIG || {};
const USE_CLOUD = !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY);

function sbHeaders() {
  return {
    'apikey': CFG.SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + CFG.SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

function reviewsStorageKey(slug) { return 'proprofit_reviews_' + slug; }
function loadReviewsLocal(slug) { try { return JSON.parse(localStorage.getItem(reviewsStorageKey(slug))) || []; } catch { return []; } }
function saveReviewsLocal(slug, arr) { localStorage.setItem(reviewsStorageKey(slug), JSON.stringify(arr)); }

// Облачная загрузка отзывов (один проект или все). Возвращает массив с полем ts.
async function fetchReviewsCloud(slug) {
  let url = CFG.SUPABASE_URL + '/rest/v1/reviews?select=*&order=created_at.desc';
  if (slug && slug !== '__all__') url += '&project=eq.' + encodeURIComponent(slug);
  const res = await fetch(url, { headers: sbHeaders() });
  if (!res.ok) throw new Error('supabase fetch failed');
  const rows = await res.json();
  return rows.map(r => ({ name: r.name, rating: r.rating, text: r.text, photo: r.photo, video: r.video, ts: new Date(r.created_at).getTime(), _project: r.project }));
}
async function insertReviewCloud(slug, r) {
  const res = await fetch(CFG.SUPABASE_URL + '/rest/v1/reviews', {
    method: 'POST', headers: sbHeaders(),
    body: JSON.stringify({ project: slug, name: r.name, rating: r.rating, text: r.text, photo: r.photo, video: r.video })
  });
  if (!res.ok) throw new Error('supabase insert failed');
  return res.json();
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
function starStr(n) { n = Math.round(n); return '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n); }
function ytEmbed(url) {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (!m) return '';
  return `<div class="rv-video"><iframe src="https://www.youtube.com/embed/${m[1]}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
}
function reviewCardHTML(r, opts) {
  opts = opts || {};
  const proj = opts.showProject && r._projectName ? `<span class="rv-proj">${escapeHtml(r._projectName)}</span>` : '';
  return `
    <div class="rv-item">
      <div class="rv-head">
        <strong>${escapeHtml(r.name || T.anon)}</strong>
        <span class="rv-stars">${starStr(r.rating)}</span>
        ${proj}
        <span class="rv-date">${new Date(r.ts).toLocaleDateString(T.locale)}</span>
      </div>
      <p class="rv-text">${escapeHtml(r.text)}</p>
      ${r.photo ? `<img class="rv-photo" src="${escapeHtml(r.photo)}" alt="review photo" loading="lazy">` : ''}
      ${ytEmbed(r.video)}
    </div>`;
}

// --- Отзывы на странице обзора (форма + лента по этому проекту) ---
function initReviewForm(slug) {
  const form = document.getElementById('reviewForm');
  const list = document.getElementById('reviewsList');
  if (!form || !list) return;
  async function render() {
    let items;
    try {
      items = USE_CLOUD ? await fetchReviewsCloud(slug) : loadReviewsLocal(slug);
    } catch (e) { items = loadReviewsLocal(slug); }
    items.sort((a, b) => b.ts - a.ts);
    const countEl = document.getElementById('reviewsCount');
    if (countEl) countEl.textContent = items.length;
    list.innerHTML = items.length
      ? items.map(r => reviewCardHTML(r)).join('')
      : `<p class="rv-empty">${T.noReviews}</p>`;
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form);
    const text = (fd.get('text') || '').toString().trim();
    if (!text) { alert(T.enterText); return; }
    const r = {
      name: (fd.get('name') || '').toString().trim().slice(0, 60) || T.anon,
      rating: parseInt(fd.get('rating')) || 5,
      text: text.slice(0, 2000),
      photo: (fd.get('photo') || '').toString().trim(),
      video: (fd.get('video') || '').toString().trim()
    };
    try {
      if (USE_CLOUD) { await insertReviewCloud(slug, r); }
      else { const a = loadReviewsLocal(slug); a.push({ ...r, ts: Date.now() }); saveReviewsLocal(slug, a); }
    } catch (err) {
      const a = loadReviewsLocal(slug); a.push({ ...r, ts: Date.now() }); saveReviewsLocal(slug, a);
    }
    form.reset();
    await render();
    const ok = document.getElementById('reviewOk');
    if (ok) { ok.style.display = 'block'; setTimeout(() => ok.style.display = 'none', 3000); }
  });
  render();
}

// --- Лента обзоров на главной (строится из PROJECTS) ---
function initFeed() {
  const feed = document.getElementById('feed');
  if (!feed) return;
  // Сортировка: сначала закреплённый флагман (pinned), затем по дате (новые сверху)
  const sorted = [...PROJECTS].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (b.pinned && !a.pinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });
  feed.innerHTML = sorted.map(p => {
    const thumb = p.logo
      ? `<div class="feed-thumb"><img src="${p.logo}" alt="${escapeHtml(p.name)}" loading="lazy"></div>`
      : `<div class="feed-thumb">${escapeHtml(p.short)}</div>`;
    const pin = p.pinned ? `<span class="pin-badge">${T.flagship}</span>` : '';
    const rb = p.refback ? `<span class="rb-badge">${T.refback} ${p.refback}%</span>` : '';
    return `
    <a class="feed-item${p.pinned ? ' feed-pinned' : ''}" href="${p.url}">
      ${thumb}
      <div class="feed-body">
        <div class="feed-tags">
          <span class="card-tag">${escapeHtml(pf(p, 'tag'))}</span>
          ${pin}
          ${rb}
        </div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="feed-date">🗓️ ${escapeHtml(pf(p, 'dateText'))} · ★ ${p.rating.toFixed(1)} / 5</div>
        <p>${escapeHtml(pf(p, 'summary'))}</p>
        <span class="card-link">${T.readReview}</span>
      </div>
    </a>`;
  }).join('');
}

// --- Лента новостей (страница news.html) ---
function initNews() {
  const out = document.getElementById('newsList');
  if (!out) return;
  const sorted = [...NEWS].sort((a, b) => new Date(b.date) - new Date(a.date));
  out.innerHTML = sorted.length ? sorted.map(n => `
    <article class="news-item${n.image ? ' news-item-media' : ''}">
      ${n.image ? `<a class="news-thumb" href="${escapeHtml(n.link || '#')}"><img src="${escapeHtml(n.image)}" alt="${escapeHtml(pf(n, 'title'))}" loading="lazy"></a>` : ''}
      <div class="news-body">
        <div class="news-date">🗓️ ${escapeHtml(pf(n, 'dateText'))}</div>
        <h3>${escapeHtml(pf(n, 'title'))}</h3>
        <p>${escapeHtml(pf(n, 'body'))}</p>
        ${n.link ? `<a class="card-link" href="${escapeHtml(n.link)}">${escapeHtml(pf(n, 'linkText') || 'Подробнее →')}</a>` : ''}
      </div>
    </article>`).join('') : `<p class="rv-empty">${T.noNews}</p>`;
}

// --- Хаб отзывов (страница otzyvy.html): выбор проекта + все отзывы ---
function initReviewsHub() {
  const tabs = document.getElementById('projectTabs');
  const out = document.getElementById('hubReviews');
  if (!tabs || !out) return;

  // вкладки: Все + каждый проект
  const tabsData = [{ slug: '__all__', name: T.allProjects }].concat(PROJECTS.map(p => ({ slug: p.slug, name: p.name })));
  let active = '__all__';

  function countFor(slug) { return loadReviewsLocal(slug).length; }

  function renderTabs(counts) {
    tabs.innerHTML = tabsData.map(t => {
      let c;
      if (counts) {
        c = t.slug === '__all__' ? Object.values(counts).reduce((s, n) => s + n, 0) : (counts[t.slug] || 0);
      } else {
        c = t.slug === '__all__' ? PROJECTS.reduce((s, p) => s + countFor(p.slug), 0) : countFor(t.slug);
      }
      return `<button class="proj-tab ${t.slug === active ? 'active' : ''}" data-slug="${t.slug}">${escapeHtml(t.name)} <span class="tab-count">${c}</span></button>`;
    }).join('');
    tabs.querySelectorAll('.proj-tab').forEach(b => b.addEventListener('click', () => { active = b.getAttribute('data-slug'); renderTabs(counts); renderReviews(); }));
  }

  async function getItems(slug) {
    if (USE_CLOUD) {
      try {
        const rows = await fetchReviewsCloud(slug);
        // прячем служебные/тестовые записи неизвестных проектов в общем списке
        return slug === '__all__' ? rows.filter(r => PROJECTS.some(p => p.slug === r._project)) : rows;
      } catch (e) { /* fallback */ }
    }
    if (slug === '__all__') {
      let all = [];
      PROJECTS.forEach(p => loadReviewsLocal(p.slug).forEach(r => { r._project = p.slug; all.push(r); }));
      return all;
    }
    return loadReviewsLocal(slug).map(r => ({ ...r, _project: slug }));
  }

  function projName(slug) { const p = PROJECTS.find(x => x.slug === slug); return p ? p.name : slug; }

  async function renderReviews() {
    let items = await getItems(active);
    items.forEach(r => { r._projectName = projName(r._project || active); });
    items.sort((a, b) => b.ts - a.ts);
    out.innerHTML = items.length
      ? items.map(r => reviewCardHTML(r, { showProject: true })).join('')
      : `<p class="rv-empty">${T.noReviewsHub}</p>`;
  }

  // Подсчёт счётчиков на вкладках: из облака (если доступно) или из localStorage
  const KNOWN = PROJECTS.map(p => p.slug);
  async function loadCounts() {
    if (USE_CLOUD) {
      try {
        const all = await fetchReviewsCloud('__all__');
        const counts = {};
        all.forEach(r => { const s = r._project; if (s && KNOWN.includes(s)) counts[s] = (counts[s] || 0) + 1; });
        return counts;
      } catch (e) { /* fallback ниже */ }
    }
    const counts = {};
    PROJECTS.forEach(p => { counts[p.slug] = countFor(p.slug); });
    return counts;
  }

  // первичный рендер (мгновенно из localStorage), затем уточняем счётчики из облака
  renderTabs();
  renderReviews();
  loadCounts().then(counts => renderTabs(counts));
}

// --- Форма тикета (страница contacts.html) ---
function initTicketForm() {
  const form = document.getElementById('ticketForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form);
    const ticket = {
      name: (fd.get('name') || '').toString().trim(),
      contact: (fd.get('contact') || '').toString().trim(),
      topic: (fd.get('topic') || '').toString(),
      message: (fd.get('message') || '').toString().trim()
    };
    let saved = false;
    if (USE_CLOUD) {
      try {
        const res = await fetch(CFG.SUPABASE_URL + '/rest/v1/tickets', {
          method: 'POST', headers: sbHeaders(), body: JSON.stringify(ticket)
        });
        saved = res.ok;
      } catch (err) { saved = false; }
    }
    if (!saved) {
      const tickets = JSON.parse(localStorage.getItem('proprofit_tickets') || '[]');
      tickets.push({ ...ticket, ts: Date.now() });
      localStorage.setItem('proprofit_tickets', JSON.stringify(tickets));
    }
    form.reset();
    const ok = document.getElementById('ticketOk');
    if (ok) { ok.style.display = 'block'; setTimeout(() => ok.style.display = 'none', 5000); }
  });
}

// --- Метрика (Яндекс.Метрика / GA4) — включается через config.js ---
function initAnalytics() {
  const ymId = CFG.YANDEX_METRIKA_ID;
  const gaId = CFG.GA4_ID;

  // Яндекс.Метрика
  if (ymId) {
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
    ym(ymId, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
  }

  // Google Analytics 4
  if (gaId) {
    const s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', gaId);
  }
}

// --- Переключатель языков ---
// Строит ссылки на ту же страницу на других языках.
// RU — в корне (/...), остальные — в /<lang>/...
function initLangSwitch() {
  const box = document.getElementById('langSwitch');
  if (!box) return;
  const LANGS = [
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇬🇧' }
  ];
  // путь без языкового префикса
  let path = location.pathname;
  path = path.replace(/^\/(en|vi|th|ms)(\/|$)/, '/');
  if (!path.startsWith('/')) path = '/' + path;

  function urlFor(code) {
    return code === 'ru' ? path : ('/' + code + path);
  }
  const cur = LANGS.find(l => l.code === LANG) || LANGS[0];
  box.innerHTML = `
    <button class="lang-btn" id="langBtn" aria-label="Язык">${cur.flag} ${cur.label} ▾</button>
    <div class="lang-menu" id="langMenu">
      ${LANGS.map(l => `<a href="${urlFor(l.code)}"${l.code === LANG ? ' class="active"' : ''}>${l.flag} ${l.label}</a>`).join('')}
    </div>`;
  const btn = box.querySelector('#langBtn');
  const menu = box.querySelector('#langMenu');
  btn.addEventListener('click', e => { e.stopPropagation(); menu.classList.toggle('open'); });
  document.addEventListener('click', () => menu.classList.remove('open'));
}

document.addEventListener('DOMContentLoaded', () => {
  initAnalytics();
  initLangSwitch();
  initDrawer();
  initFeed();
  initNews();
  initReviewsHub();
  initTicketForm();
  const rc = document.body.getAttribute('data-review-project');
  if (rc) initReviewForm(rc);
});
