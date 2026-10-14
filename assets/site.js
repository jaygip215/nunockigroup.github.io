/* ============================================================
   SITE SETTINGS — fill these in and the site updates itself.
   Anything left blank stays hidden, so nothing shows up broken.
   ============================================================ */
const SITE = {
  // Fan sign-up page on Laylo, e.g. 'https://laylo.com/jaygip'
  laylo: '',

  // Booking / business email
  email: 'nunocki@gmail.com',

  // Social
  instagram: 'https://www.instagram.com/gplay215/',

  // Streaming profiles
  spotify: 'https://open.spotify.com/artist/4a6RHRdcEw9HMRd12uxAtY',
  appleMusic: 'https://music.apple.com/us/artist/jay-gip/481744237',
  youtube: 'https://youtu.be/ITtZr5sXMdo',

  // Releases, newest first. The first three show big; the rest show
  // in the catalog list underneath. Add a link to show a Listen button.
  releases: [
    { title: 'Disappear', detail: 'Nu Nocki Group Presents. Single, July 31, 2026', link: 'https://music.apple.com/us/album/nu-nocki-group-presents-disappear-single/6793273386' },
    { title: 'Finish', detail: 'Single, 2025', link: 'https://music.apple.com/us/album/finish-single/1828082868' },
    { title: 'Fling', detail: 'Single, 2024', link: 'https://music.apple.com/us/album/fling-single/1775321315' },
    { title: "Don't Understand", detail: '2024', link: 'https://music.apple.com/us/album/dont-understand-single/1766421367' },
    { title: 'Grand Slams', detail: '2024', link: 'https://music.apple.com/us/album/grand-slams-single/1755010755' },
    { title: 'Heart Back', detail: '2024', link: 'https://music.apple.com/us/album/heart-back-single/1750701175' },
    { title: 'Save Yourself', detail: '2023', link: 'https://music.apple.com/us/album/save-yourself/1677205429?i=1677205431' },
    { title: 'Dreamers Distraction', detail: '2023', link: 'https://music.apple.com/us/album/dreamers-distraction/1674958639?i=1674958641' },
    { title: 'Bop Like Dat', detail: '2021', link: 'https://music.apple.com/us/album/bop-like-dat/1557331358?i=1557331359' },
    { title: 'Resilient', detail: '2021', link: 'https://music.apple.com/us/album/resilient/1547557379?i=1547557380' },
    { title: 'Pro Hop', detail: '2020', link: 'https://music.apple.com/us/album/pro-hop/1543261023?i=1543261024' },
  ],

  // Music videos. Add the YouTube video ID (the part after watch?v=).
  // Example: { title: 'Song Name (Official Video)', youtubeId: 'dQw4w9WgXcQ' }
  videos: [
    { title: 'Jay Gip - Finish (Official Video)', youtubeId: 'ITtZr5sXMdo' },
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

  // Releases: newest three big, the rest as a catalog list
  const rel = $('#releaseList');
  if (rel) {
    const big = SITE.releases.slice(0, 3), rest = SITE.releases.slice(3);
    rel.innerHTML = big.map(r => `
    <div class="release">
      <h3 class="display">${esc(r.title)}</h3>
      <p class="meta">Jay Gip. ${esc(r.detail)}</p>
      ${r.link ? `<a class="btn line" href="${esc(r.link)}" target="_blank" rel="noopener">Listen to ${esc(r.title)}</a>` : ''}
    </div>`).join('') + (rest.length ? `
    <h3 class="catalog-head">More from the catalog</h3>
    <ul class="catalog">${rest.map(r => `
      <li>${r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener">${esc(r.title)}</a>` : esc(r.title)}<span>${esc(r.detail)}</span></li>`).join('')}
    </ul>` : '');
  }

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
