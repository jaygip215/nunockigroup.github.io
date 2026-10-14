/* ============================================================
   SITE SETTINGS — fill these in and the site updates itself.
   Anything left blank stays hidden, so nothing shows up broken.
   ============================================================ */
const SITE = {
  // Fan sign-up page on Laylo, e.g. 'https://laylo.com/jaygip'
  laylo: '',

  // Booking / business email
  email: '',

  // Social
  instagram: 'https://www.instagram.com/gplay215/',

  // Streaming profiles
  spotify: '',
  appleMusic: '',
  youtube: '',

  // Latest releases, newest first. Add a link to show a Listen button.
  releases: [
    { title: 'Finish',    detail: 'Single, July 31, 2026', link: '' },
    { title: 'Disappear', detail: 'Single, July 31, 2026', link: '' },
    { title: 'Fling',     detail: 'Single, July 31, 2026', link: '' },
  ],

  // Music videos. Add the YouTube video ID (the part after watch?v=).
  // Example: { title: 'Song Name (Official Video)', youtubeId: 'dQw4w9WgXcQ' }
  videos: [
  ],
};

/* ---------------- rendering below — no need to edit ---------------- */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Links driven by settings: <a data-site="laylo"> gets href, hidden if blank
  $$('[data-site]').forEach(a => {
    const v = SITE[a.dataset.site];
    if (!v) { a.hidden = true; return; }
    a.href = a.dataset.site === 'email' ? 'mailto:' + v : v;
    if (a.dataset.show === 'value') a.textContent = v;
  });
  // Whole blocks that need a setting: <div data-needs="laylo">
  $$('[data-needs]').forEach(el => {
    const keys = el.dataset.needs.split(' ');
    if (!keys.some(k => SITE[k] && (!Array.isArray(SITE[k]) || SITE[k].length))) el.hidden = true;
  });
  // Nav links pointing to hidden sections
  $$('.navlinks a[href^="#"]').forEach(a => {
    const t = document.getElementById(a.getAttribute('href').slice(1));
    if (t && t.hidden) a.hidden = true;
  });

  // Releases
  const rel = $('#releaseList');
  if (rel) rel.innerHTML = SITE.releases.map(r => `
    <div class="release">
      <h3 class="display">${esc(r.title)}</h3>
      <p class="meta">Jay Gip. ${esc(r.detail)}</p>
      ${r.link ? `<a class="btn line" href="${esc(r.link)}" target="_blank" rel="noopener">Listen to ${esc(r.title)}</a>` : ''}
    </div>`).join('');

  // Videos: show a thumbnail, load the player only when tapped
  const vid = $('#videoList');
  if (vid) vid.innerHTML = SITE.videos.map(v => `
    <div class="video">
      <button type="button" data-id="${esc(v.youtubeId)}" aria-label="Play ${esc(v.title)}"
        style="background-image:url('https://i.ytimg.com/vi/${esc(v.youtubeId)}/hqdefault.jpg')"></button>
      <h3>${esc(v.title)}</h3>
    </div>`).join('');
  $$('.video button').forEach(b => b.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.id}?autoplay=1`;
    f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
    f.title = b.getAttribute('aria-label').replace('Play ', '');
    b.replaceWith(f);
  }));

  // Mobile menu
  const mb = $('.menu-btn'), nl = $('.navlinks');
  if (mb) {
    mb.addEventListener('click', () => {
      const open = nl.classList.toggle('open');
      mb.setAttribute('aria-expanded', open);
      mb.textContent = open ? 'Close' : 'Menu';
    });
    $$('a', nl).forEach(a => a.addEventListener('click', () => {
      nl.classList.remove('open'); mb.setAttribute('aria-expanded', false); mb.textContent = 'Menu';
    }));
  }

  // Shirt colorways
  const main = $('#teeMain'), label = $('#teeColor');
  $$('.swatch').forEach(b => b.addEventListener('click', () => {
    $$('.swatch').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
    b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
    main.src = b.dataset.img;
    main.alt = 'Black Nu Nocki Group tee with ' + b.dataset.name.toLowerCase() + ' rocket logo';
    label.textContent = b.dataset.name;
  }));

  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
