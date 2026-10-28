/* R+P — composants partagés (nav, footer), rendu des données JSON, formulaires. Aucune dépendance. */
(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s);
const h = (tag, props, ...kids) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  kids.flat().forEach(c => { if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(c)); });
  return el;
};
const icon = cls => h('i', { class: cls, 'aria-hidden': 'true' });
const cache = {};
const load = n => (cache[n] ??= fetch(`data/${n}.json`).then(r => { if (!r.ok) throw new Error(n + ' ' + r.status); return r.json(); }));
const short = n => n.replace('R+P~', '');

/* ---------- Header : tiroir mobile, lien actif, barre de progression ---------- */
const LINKS = [['index.html','Accueil'],['joueur.html','Joueurs'],['results.html','Résultats'],['news.html','Actus'],['about.html','À propos'],['contact.html','Contact']];
const page = location.pathname.split('/').pop() || 'index.html';
const active = page === 'player-detail.html' ? 'joueur.html' : page;

function buildHeader() {
  const burger = h('button', { class: 'burger', type: 'button', 'aria-label': 'Ouvrir le menu', 'aria-expanded': 'false', 'aria-controls': 'nav-menu' }, h('span'), h('span'), h('span'));
  const nav = h('nav', { id: 'nav-menu', class: 'nav-links', 'aria-label': 'Navigation principale' },
    LINKS.map(([href, label]) => h('a', { href, 'aria-current': href === active ? 'page' : null }, label)),
    h('a', { class: 'btn btn-primary btn-sm nav-cta', href: 'inscription.html' }, 'Rejoindre la team'));
  const bar = h('div', { class: 'progress' });
  const backdrop = h('div', { class: 'backdrop' });
  const set = open => {
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  burger.addEventListener('click', () => set(!document.body.classList.contains('nav-open')));
  backdrop.addEventListener('click', () => set(false));
  nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  matchMedia('(min-width:1081px)').addEventListener('change', () => set(false));
  $('#site-header').replaceWith(h('header', { class: 'site-header' }, bar,
    h('div', { class: 'container nav' },
      h('a', { class: 'brand', href: 'index.html', 'aria-label': 'R+P Rest in Peace, accueil' }, h('span', { class: 'brand-mark' }, 'R+P'), h('span', { class: 'brand-name' }, 'Rest in Peace')),
      burger, nav)));
  document.body.append(backdrop);
  const top = h('button', { class: 'to-top', type: 'button', 'aria-label': 'Retour en haut', onclick: () => scrollTo({ top: 0, behavior: 'smooth' }) }, icon('fa-solid fa-arrow-up'));
  document.body.append(top);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    top.classList.toggle('show', scrollY > innerHeight * .6);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}

/* ---------- Footer ---------- */
async function buildFooter() {
  const site = await load('site');
  $('#site-footer').replaceWith(h('footer', { class: 'site-footer' }, h('div', { class: 'container' },
    h('div', { class: 'foot' },
      h('div', {}, h('a', { class: 'brand', href: 'index.html' }, h('span', { class: 'brand-mark' }, 'R+P'), h('span', { class: 'brand-name' }, site.team.name)),
        h('p', { class: 'muted', style: 'margin-top:1rem' }, 'Team PUBG Mobile compétitive basée à ' + site.team.city + '.')),
      h('div', {}, h('h4', {}, 'Navigation'), h('ul', {}, LINKS.concat([['inscription.html', 'Rejoindre la team']]).map(([href, l]) => h('li', {}, h('a', { href }, l))))),
      h('div', {}, h('h4', {}, 'Suivre la team'), h('div', { class: 'socials' }, site.socials.map(s => h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': s.label, title: s.label }, icon(s.icon)))))),
    h('p', { class: 'copy' }, `© ${new Date().getFullYear()} ${site.team.name} (R+P). Tous droits réservés. Développé par josoavj.`))));
}

/* ---------- Rendu des données ---------- */
const reveal = el => (el.classList.add('reveal'), el);
const TIER = { win: ['gold', 'Victoire'], top4: ['blue', 'Top 4'], top8: ['grey', 'Top 8'] };
const CATS = { tournament: 'Tournoi', announcement: 'Annonce', player: 'Joueur', update: 'Mise à jour' };

const playerCard = p => reveal(h('a', { class: 'card cut player', href: `player-detail.html?id=${p.id}` },
  h('div', { class: 'avatar', 'aria-hidden': 'true' }, short(p.name).slice(0, 2).toUpperCase()),
  h('span', { class: 'chip' }, p.position), h('h3', {}, short(p.name)), h('p', { class: 'muted' }, p.role),
  h('dl', { class: 'mini' }, h('div', {}, h('dt', {}, 'Win rate'), h('dd', {}, p.stats.winRate)), h('div', {}, h('dt', {}, 'Kills moy.'), h('dd', {}, p.stats.avgKill)))));

const tournamentRow = t => { const [cls, label] = TIER[t.tier];
  return reveal(h('article', { class: 'card cut t-row' },
    h('div', { class: `badge ${cls}` }, h('div', {}, t.place, h('small', {}, label))),
    h('div', {}, h('h3', {}, t.name), h('p', { class: 'meta' }, h('span', {}, t.date), h('span', {}, t.meta), h('span', {}, t.teams), h('span', {}, t.rounds)), h('p', { class: 'muted', style: 'margin-top:.5rem' }, t.desc)),
    h('div', { class: 'prize' }, t.prize))); };

const newsCard = n => reveal(h('article', { class: 'card cut news-card' },
  h('p', { class: 'meta' }, h('span', { class: 'chip' }, CATS[n.cat]), h('time', {}, n.date)), h('h3', {}, n.title), h('p', { class: 'muted' }, n.excerpt),
  n.body && h('details', {}, h('summary', {}, "Lire l'article"), h('p', {}, n.body))));

const matchCard = m => { const w = m.hs > m.as; return reveal(h('article', { class: 'card cut' },
  h('div', { class: 'match' }, h('div', { class: 'team' }, h('b', {}, m.home), h('span', { class: 'score ' + (w ? 'win' : '') }, m.hs)), h('span', { class: 'vs' }, 'VS'), h('div', { class: 'team' }, h('b', {}, m.away), h('span', { class: 'score ' + (!w ? 'win' : '') }, m.as))),
  h('p', { class: 'meta center', style: 'justify-content:center;margin-top:.8rem' }, h('span', {}, m.date + ' · ' + m.type), h('span', {}, m.note)))); };

function withFilters(box, items, defs, test, draw) {
  const list = h('div', { class: box.dataset.layout || 'grid wide' });
  let cur = 'all';
  const show = () => list.replaceChildren(...items.filter(i => test(i, cur)).map(draw));
  const bar = h('div', { class: 'filters', role: 'group', 'aria-label': 'Filtres' }, defs.map(([v, l]) => h('button', { type: 'button', 'aria-pressed': v === cur, onclick: e => { cur = v; bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === e.currentTarget)); show(); watch(); } }, l)));
  box.replaceChildren(bar, list); show();
}

const R = {
  async stats(box) { (await load('site')).stats.forEach(([v, l]) => box.append(h('div', { class: 'stat' }, h('b', {}, v), h('span', {}, l)))); },
  async players(box) { const { players } = await load('players-data'); players.slice(0, +box.dataset.limit || 99).forEach(p => box.append(playerCard(p))); },
  async results(box) {
    const { tournaments } = await load('results'); const lim = +box.dataset.limit;
    if (lim) return box.replaceChildren(...tournaments.slice(0, lim).map(tournamentRow));
    withFilters(box, tournaments, [['all', 'Tous'], ['2025', '2025'], ['2024', '2024'], ['2023', '2023'], ['win', 'Victoires']], (t, f) => f === 'all' || f === 'win' ? f === 'all' || t.tier === 'win' : String(t.year) === f, tournamentRow);
  },
  async socials(box) { (await load('site')).socials.forEach(x => box.append(h('a', { href: x.url, target: '_blank', rel: 'noopener noreferrer' }, icon(x.icon), x.label))); },
  async matches(box) { (await load('results')).matches.forEach(m => box.append(matchCard(m))); },
  async news(box) {
    const { news } = await load('news'); const lim = +box.dataset.limit;
    if (lim) return box.replaceChildren(...news.slice(0, lim).map(newsCard));
    withFilters(box, news, [['all', 'Tous'], ...Object.entries(CATS)], (n, f) => f === 'all' || n.cat === f, newsCard);
  },
  async latest(box) { const t = (await load('results')).tournaments[0]; const [cls, label] = TIER[t.tier];
    box.append(h('p', { class: 'eyebrow' }, 'Dernier tournoi'), h('div', { class: `badge ${cls}`, style: 'width:110px;margin-bottom:1rem' }, h('div', {}, t.place, h('small', {}, label))), h('h3', {}, t.name), h('p', { class: 'meta', style: 'margin:.5rem 0' }, h('span', {}, t.date), h('span', {}, t.meta)), h('p', { class: 'muted' }, t.desc), h('a', { class: 'link-more', href: 'results.html', style: 'display:inline-block;margin-top:1rem' }, 'Tous les résultats')); },
  async player(box) {
    const id = +new URLSearchParams(location.search).get('id') || 1;
    const p = (await load('players-data')).players.find(x => x.id === id);
    if (!p) return box.append(h('p', {}, 'Joueur introuvable. '), h('a', { href: 'joueur.html' }, 'Retour au roster'));
    document.title = `${short(p.name)} — R+P Rest in Peace`;
    const st = [['Matchs', p.stats.totalMatches], ['Victoires', p.stats.wins], ['Win rate', p.stats.winRate], ['Top 4', p.stats.top4], ['Kills moy.', p.stats.avgKill], ['Dégâts moy.', p.stats.avgDamage]];
    box.append(h('div', { class: 'profile' }, h('div', { class: 'avatar', 'aria-hidden': 'true' }, short(p.name).slice(0, 2).toUpperCase()),
      h('div', {}, h('span', { class: 'chip' }, p.position), h('h1', {}, short(p.name)), h('p', { class: 'lead muted' }, p.role), h('p', { style: 'margin-top:1rem' }, p.bio),
        h('p', { class: 'muted', style: 'margin-top:.8rem' }, 'Dans la team depuis le ' + new Date(p.joinDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })))),
      h('div', { class: 'stats' }, st.map(([l, v]) => h('div', { class: 'stat' }, h('b', {}, v), h('span', {}, l)))),
      h('div', { class: 'grid wide', style: 'margin-top:2rem' },
        h('div', { class: 'card cut' }, h('h3', {}, 'Points forts'), h('ul', { class: 'list-check', style: 'margin-top:1rem' }, p.strengths.map(s => h('li', {}, s)))),
        h('div', { class: 'card cut' }, h('h3', {}, 'Palmarès'), h('ul', { class: 'list-check', style: 'margin-top:1rem' }, p.achievements.map(s => h('li', {}, s))))));
  }
};

/* ---------- Animation d'apparition ---------- */
let io; const watch = () => { io ??= new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el)); };

/* ---------- Formulaires (sans backend : endpoint externe ou mailto) ---------- */
const age = d => { const b = new Date(d), t = new Date(); let a = t.getFullYear() - b.getFullYear(); if (t < new Date(t.getFullYear(), b.getMonth(), b.getDate())) a--; return a; };
const CHECKS = {
  contact: d => !d.full_name?.trim() ? 'Indique ton nom.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '') ? 'Adresse email invalide.' : !d.message?.trim() ? 'Écris un message.' : '',
  apply: d => (d.pubgm_pseudo || '').trim().length < 3 ? 'Le pseudo PUBG doit contenir au moins 3 caractères.' : !/^\d{10}$/.test(d.pubgm_id || '') ? "L'ID PUBG doit contenir exactement 10 chiffres." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '') ? 'Adresse email invalide.' : !d.birth_date || age(d.birth_date) < 13 ? 'Il faut avoir au moins 13 ans pour postuler.' : ''
};
async function forms() {
  const site = await load('site');
  document.querySelectorAll('form[data-form]').forEach(form => {
    const out = h('div', { class: 'alert', role: 'status', hidden: true }); form.append(out);
    const say = (msg, err) => { out.hidden = false; out.className = 'alert' + (err ? ' error' : ''); out.textContent = msg; out.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form); if (fd.get('website')) return; // honeypot anti-spam
      const d = Object.fromEntries(fd); d.roles = fd.getAll('roles').join(', ');
      const err = CHECKS[form.dataset.form](d); if (err) return say(err, true);
      const subject = form.dataset.form === 'apply' ? `Candidature R+P — ${d.pubgm_pseudo}` : `Contact R+P — ${d.subject || 'Message'}`;
      if (site.formEndpoint) {
        try { const r = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ subject, ...d }) });
          if (!r.ok) throw 0; form.reset(); return say('Merci ! Ton message a bien été envoyé.'); } catch { return say("L'envoi a échoué. Réessaie ou écris-nous à " + site.team.email, true); }
      }
      const body = Object.entries(d).filter(([k, v]) => v && k !== 'website').map(([k, v]) => `${k}: ${v}`).join('\n');
      location.href = `mailto:${site.team.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say('Ton application mail va s\'ouvrir avec le message pré-rempli. Il te suffit de l\'envoyer.');
    });
  });
}

/* ---------- Démarrage ---------- */
buildHeader();
buildFooter().catch(console.error);
Promise.all([...document.querySelectorAll('[data-render]')].map(b => R[b.dataset.render]?.(b)))
  .catch(e => console.error('Chargement des données impossible (utilise un serveur local, pas file://) :', e))
  .finally(watch);
forms().catch(console.error);

})();
