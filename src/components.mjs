export const navigation = [
  ['Research', '/research/'], ['Teaching', '/teaching/'], ['Creative Work', '/creative/'], ['About', '/about/'],
];
export const arrow = '<span aria-hidden="true">↗</span>';
export function link(href, label, className = 'text-link') { return `<a class="${className}" href="${href}">${label} ${arrow}</a>`; }
export function art(kind = 'field', className = '') {
  const shapes = {
    field: '<path fill="#a4afa0" d="M0 0h300v600H0z"/><path fill="#d9ef78" d="M110 110h380v380H110z"/><circle cx="300" cy="300" r="160" fill="#263e3b"/><path d="M300 140a160 160 0 0 1 0 320z" fill="#f0f0e6"/><g fill="none" stroke="#f0f0e6" stroke-width="1"><circle cx="300" cy="300" r="220"/><path d="M0 300h600M300 0v600"/></g><circle cx="300" cy="300" r="5" fill="#d9ef78"/>',
    space: '<g fill="none" stroke="#d9ef78" stroke-width="1.5"><path d="M100 460V180L300 65l200 115v280L300 575zM100 180l200 115 200-115M300 295v280M100 460l200-115 200 115M300 65v280"/><path d="m100 320 200-115 200 115-200 115z"/></g><circle cx="300" cy="295" r="63" fill="#d9ef78"/><circle cx="300" cy="295" r="18" fill="#25312c"/>',
    still: '<path fill="#b9b8a7" d="M0 0h600v600H0z"/><path fill="#dfded2" d="M0 0h350v600H0z"/><path fill="#72796b" d="M350 0h250v600H350z"/><path fill="#253a34" d="M150 210h300v390H150z"/><path fill="#f3f0e1" d="M150 210h115v390H150z"/><path fill="#aab197" d="m265 210 185 160v230H265z"/>',
    horizon: '<path fill="#b7c2be" d="M0 0h600v600H0z"/><path fill="#dee0d6" d="M0 0h600v330H0z"/><path fill="#677b72" d="M0 330h600v270H0z"/><path fill="#283d36" d="M0 430h600v170H0z"/><path fill="#9faa97" d="m0 405 600-35v40L0 445z"/>',
    aperture: '<path fill="#b8a899" d="M0 0h600v600H0z"/><path fill="#ddd6c9" d="M90 0h420v600H90z"/><path fill="#38453e" d="M190 120h220v480H190z"/><path fill="#929981" d="m190 120 110 120v360H190z"/><path fill="#ece7d9" d="M300 240h110v360H300z"/>',
    orbit: '<g fill="none" stroke="#c2c8bd" stroke-width="1"><circle cx="300" cy="300" r="210"/><circle cx="300" cy="300" r="145"/><path d="M0 300h600M300 0v600"/><ellipse cx="300" cy="300" rx="210" ry="75" transform="rotate(-35 300 300)"/></g><circle cx="300" cy="300" r="70" fill="#d9ef78"/><circle cx="445" cy="300" r="12" fill="#ecebe3"/>',
  };
  return `<div class="art art-${kind} ${className}" aria-hidden="true"><svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid ${kind === 'space' ? 'meet' : 'slice'}" focusable="false">${shapes[kind]}</svg></div>`;
}
export function intro(number, category, title, description) {
  return `<section class="page-intro"><p class="eyebrow"><span>${number} / ${category}</span><span class="edition">Selected notes & studies</span></p><h1>${title}</h1><p class="intro-copy">${description}</p></section>`;
}
export function sectionHead(number, title, trailing = '') { return `<div class="section-heading"><h2><span class="index">${number}</span>${title}</h2>${trailing}</div>`; }
export function figure(kind, title, detail, className = '') {
  return `<figure class="work-figure ${className}">${art(kind)}<figcaption><span>${title}</span><span>${detail}</span></figcaption></figure>`;
}
export function document(page) {
  const creative = page.path.startsWith('/creative/');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Brian Faggin Batista — multimedia creator and educator focused on XR storytelling, photography, and accessible learning experiences."><meta name="color-scheme" content="${creative ? 'dark' : 'light'}"><title>${page.title} — Brian Faggin Batista / Fieldnotes</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head><body class="${creative ? 'creative-theme' : ''}"><a class="skip-link" href="#main">Skip to content</a><div class="site-wrap"><header class="site-header"><a class="identity" href="/" ${page.path === '/' ? 'aria-current="page"' : ''}><span class="monogram" aria-hidden="true">bfb<span>↗</span></span><span>Brian Faggin Batista<span class="identity-caption">Multimedia creator & educator</span></span></a><nav aria-label="Main navigation">${navigation.map(([label, href]) => `<a href="${href}" ${page.path === href ? 'aria-current="page"' : page.path.startsWith(href) ? 'class="active-section"' : ''}>${label}</a>`).join('')}</nav></header><main id="main" tabindex="-1">${page.content}</main><footer class="site-footer"><div><a class="footer-name" href="/">Brian Faggin Batista <span aria-hidden="true">↗</span></a><p>Research, practice, and everything in between.</p></div><div class="footer-note"><span>Fieldnotes / Portfolio study 01</span><span>Sample projects · Placeholder imagery</span></div></footer></div></body></html>`;
}
