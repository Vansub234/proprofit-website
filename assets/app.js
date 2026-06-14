/* ===== ProProfit — интерактив и данные ===== */

/* --- РЕЕСТР ПРОЕКТОВ ---
   Чтобы добавить новый проект: допишите объект в начало массива (новые сверху).
   slug — должен совпадать с именем html-файла в /reviews/ и с data-review-project. */
const PROJECTS = [
  {
    slug: 'binibit',
    name: 'BiniBit (BINI)',
    short: 'BINI',
    tag: 'Биржа · Обзор',
    rating: 4.0,
    date: '2026-06-14',
    dateText: '14 июня 2026',
    summary: 'Биржа «powered by agents»: спот, BaiDEX, собственный Layer-1 BiniChain, launchpad, стейкинг и Telegram-приложение для майнинга. Разбираем, что внутри и на что смотреть.',
    url: 'reviews/binibit.html'
  }
  // ↑ Новый проект добавляется СЮДА, сверху
];

/* --- РЕЕСТР НОВОСТЕЙ ---
   Чтобы добавить новость: допишите объект в начало массива (новые сверху). */
const NEWS = [
  {
    date: '2026-06-14',
    dateText: '14 июня 2026',
    title: 'Запуск сайта ProProfit',
    body: 'Мы открыли платформу независимых обзоров криптопроектов. Первый разбор — биржа BiniBit. Дальше будет больше проектов, отзывов и аналитики на разных языках.',
    link: 'reviews/binibit.html',
    linkText: 'Читать первый обзор →'
  }
  // ↑ Новая новость добавляется СЮДА, сверху
];

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
        <strong>${escapeHtml(r.name || 'Аноним')}</strong>
        <span class="rv-stars">${starStr(r.rating)}</span>
        ${proj}
        <span class="rv-date">${new Date(r.ts).toLocaleDateString('ru-RU')}</span>
      </div>
      <p class="rv-text">${escapeHtml(r.text)}</p>
      ${r.photo ? `<img class="rv-photo" src="${escapeHtml(r.photo)}" alt="фото к отзыву" loading="lazy">` : ''}
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
      : '<p class="rv-empty">Пока нет отзывов. Будьте первым, кто поделится опытом!</p>';
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form);
    const text = (fd.get('text') || '').toString().trim();
    if (!text) { alert('Напишите текст отзыва'); return; }
    const r = {
      name: (fd.get('name') || '').toString().trim().slice(0, 60) || 'Аноним',
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
  const sorted = [...PROJECTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  feed.innerHTML = sorted.map(p => `
    <a class="feed-item" href="${p.url}">
      <div class="feed-thumb">${escapeHtml(p.short)}</div>
      <div class="feed-body">
        <span class="card-tag">${escapeHtml(p.tag)}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="feed-date">🗓️ ${escapeHtml(p.dateText)} · ★ ${p.rating.toFixed(1)} / 5</div>
        <p>${escapeHtml(p.summary)}</p>
        <span class="card-link">Читать обзор →</span>
      </div>
    </a>`).join('');
}

// --- Лента новостей (страница news.html) ---
function initNews() {
  const out = document.getElementById('newsList');
  if (!out) return;
  const sorted = [...NEWS].sort((a, b) => new Date(b.date) - new Date(a.date));
  out.innerHTML = sorted.length ? sorted.map(n => `
    <article class="news-item">
      <div class="news-date">🗓️ ${escapeHtml(n.dateText)}</div>
      <h3>${escapeHtml(n.title)}</h3>
      <p>${escapeHtml(n.body)}</p>
      ${n.link ? `<a class="card-link" href="${escapeHtml(n.link)}">${escapeHtml(n.linkText || 'Подробнее →')}</a>` : ''}
    </article>`).join('') : '<p class="rv-empty">Новостей пока нет.</p>';
}

// --- Хаб отзывов (страница otzyvy.html): выбор проекта + все отзывы ---
function initReviewsHub() {
  const tabs = document.getElementById('projectTabs');
  const out = document.getElementById('hubReviews');
  if (!tabs || !out) return;

  // вкладки: Все + каждый проект
  const tabsData = [{ slug: '__all__', name: 'Все проекты' }].concat(PROJECTS.map(p => ({ slug: p.slug, name: p.name })));
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
      try { return await fetchReviewsCloud(slug); } catch (e) { /* fallback */ }
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
      : '<p class="rv-empty">Пока нет отзывов по выбранному проекту. Оставить отзыв можно на странице обзора.</p>';
  }

  renderTabs();
  renderReviews();
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

document.addEventListener('DOMContentLoaded', () => {
  initDrawer();
  initFeed();
  initNews();
  initReviewsHub();
  initTicketForm();
  const rc = document.body.getAttribute('data-review-project');
  if (rc) initReviewForm(rc);
});
