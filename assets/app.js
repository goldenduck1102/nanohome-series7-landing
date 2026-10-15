'use strict';
const destination = 'https://nanohome.vn/products?q=Series+7+ash';
const campaign = document.querySelector('[data-testid="lpe-series-seven"]');
const storageKey = 'nanohome-series7-saved';
let saved;
try { saved = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch { saved = new Set(); }
const saveButtons = [...document.querySelectorAll('[data-testid^="lpe-save-"]')];
function refreshSaved() {
  saveButtons.forEach(button => {
    const active = saved.has(button.dataset.testid);
    button.setAttribute('aria-pressed', String(active));
    button.style.color = active ? '#8a1f2d' : '';
    button.querySelector('svg')?.setAttribute('fill', active ? 'currentColor' : 'none');
  });
}
saveButtons.forEach(button => button.addEventListener('click', () => {
  saved.has(button.dataset.testid) ? saved.delete(button.dataset.testid) : saved.add(button.dataset.testid);
  try { localStorage.setItem(storageKey, JSON.stringify([...saved])); } catch { /* Still works in memory when storage is unavailable. */ }
  refreshSaved();
}));
refreshSaved();
const galleryDialog = campaign.querySelector('dialog');
document.querySelectorAll('[data-testid="lpe-lifestyle-gallery"] button').forEach((button, index) => button.addEventListener('click', () => {
  const image = galleryDialog.querySelector('img');
  image.src = button.querySelector('img').dataset.fullSrc || button.querySelector('img').src;
  image.loading = 'eager';
  image.alt = `Series 7 lifestyle ${index + 1}`;
  galleryDialog.setAttribute('aria-label', image.alt);
  galleryDialog.showModal();
}));
galleryDialog.querySelector('button').addEventListener('click', () => galleryDialog.close());
galleryDialog.addEventListener('click', event => { if (event.target === galleryDialog) galleryDialog.close(); });

function menu(title, links) {
  const dialog = document.createElement('dialog');
  dialog.className = 'standalone-menu';
  dialog.setAttribute('aria-label', title);
  const close = document.createElement('button');close.textContent = 'Đóng ×';close.addEventListener('click', () => dialog.close());
  dialog.append(close);
  const heading = document.createElement('h2');heading.textContent = title;dialog.append(heading);
  links.forEach(([label, href]) => { const a = document.createElement('a');a.textContent = label;a.href = href;dialog.append(a); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.body.append(dialog);return dialog;
}
const navigation = menu('nanoHome', [['Sản phẩm',destination],['Thương hiệu','https://nanohome.vn/brands'],['Showrooms','https://nanohome.vn/showrooms'],['Về nanoHome','https://nanohome.vn/about'],['Liên hệ','https://nanohome.vn/contact']]);
document.querySelector('[aria-label="Mở menu điều hướng"]')?.addEventListener('click', () => navigation.showModal());
document.querySelectorAll('button').forEach(button => {
  if (button.textContent.trim() === 'SHOWROOMS') button.addEventListener('click', () => { location.href = 'https://nanohome.vn/showrooms'; });
  if (button.getAttribute('aria-label') === 'Yêu thích') button.addEventListener('click', () => {
    const links = saveButtons.filter(b => saved.has(b.dataset.testid)).map(b => [b.getAttribute('aria-label').replace('Lưu sản phẩm: ', ''), destination]);
    const dialog = menu(links.length ? 'Sản phẩm đã lưu' : 'Chưa có sản phẩm đã lưu', links);
    dialog.addEventListener('close', () => dialog.remove(), { once: true });dialog.showModal();
  });
});
// Campaign ends at midnight Vietnam time after 30 October 2026.
if (Date.now() >= Date.parse('2026-10-31T00:00:00+07:00')) {
  campaign.querySelectorAll('[class*="offerGraphic"], [class*="badge"], [class*="saleNote"]').forEach(el => el.remove());
  const offer = campaign.querySelector('[class*="offer"] > p');if (offer) offer.textContent = 'ƯU ĐÃI ĐÃ KẾT THÚC';
  document.querySelectorAll('[data-testid="campaign-prices"]').forEach(prices => {
    const original = prices.querySelector('del');
    if (original) { prices.querySelector('strong').textContent = original.textContent; original.remove(); }
  });
  document.title = 'Series 7 Colour Ash · nanoHome';
}
const header = document.querySelector('header');
if (header) {
  const resizeHeader = () => {
    const height = `${Math.round(header.getBoundingClientRect().height)}px`;
    document.documentElement.style.setProperty('--header-height', height);
    document.documentElement.style.setProperty('--header-spacer-height', height);
  };
  new ResizeObserver(resizeHeader).observe(header);
  resizeHeader();
}

// Keep large editorial photos out of the hero's initial network queue.
const editorialObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target: image, isIntersecting }) => {
    if (!isIntersecting) return;
    image.loading = 'eager';
    if (image.dataset.deferredSrcset) image.srcset = image.dataset.deferredSrcset;
    image.src = image.dataset.deferredSrc;
    editorialObserver.unobserve(image);
  });
}, { rootMargin: '0px' });
document.querySelectorAll('img[data-deferred-src]').forEach(image => editorialObserver.observe(image));

// Native film playback: conserve mobile data and pause outside the viewport.
const film = campaign.querySelector('video');
if (film) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const conserve = connection?.saveData || ['2g', 'slow-2g'].includes(connection?.effectiveType);
  let manualPause = false, visible = true;
  film.muted = true;
  const groups = [...campaign.querySelectorAll('[class$="__filmControls"]')];
  const refresh = () => groups.forEach(group => {
    const [play, sound] = group.querySelectorAll('button');
    play.setAttribute('aria-label', film.paused ? 'Phát video' : 'Tạm dừng video');
    play.querySelector('path').setAttribute('d', film.paused ? 'm7 4 14 8-14 8Z' : 'M8 5v14M16 5v14');
    sound.setAttribute('aria-label', film.muted ? 'Bật âm thanh' : 'Tắt âm thanh');
    sound.querySelectorAll('path')[1].setAttribute('d', film.muted ? 'm16 9 6 6m0-6-6 6' : 'M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14');
  });
  groups.forEach(group => {const [play,sound]=group.querySelectorAll('button');play.addEventListener('click',()=>{if(film.paused){manualPause=false;film.play().catch(refresh);}else{manualPause=true;film.pause();}});sound.addEventListener('click',()=>{film.muted=!film.muted;refresh();});});
  const sync=()=>{if(!visible||document.hidden||motion.matches||conserve||manualPause)film.pause();else film.play().catch(refresh);};
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.15}).observe(film);
  document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);film.addEventListener('play',refresh);film.addEventListener('pause',refresh);refresh();sync();
}
const rail = campaign.querySelector('[data-testid="lpe-spaces"]');
if(rail){const dots=[...campaign.querySelectorAll('[class$="__spacePagination"] button')];const cards=[...rail.children];const update=()=>{const distances=cards.map(c=>Math.abs(c.offsetLeft-cards[0].offsetLeft-rail.scrollLeft));const active=distances.indexOf(Math.min(...distances));dots.forEach((d,i)=>d.setAttribute('aria-pressed',String(i===active)));};dots.forEach((dot,i)=>dot.addEventListener('click',()=>rail.scrollTo({left:cards[i].offsetLeft-cards[0].offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));rail.addEventListener('scroll',update,{passive:true});update();}
if(Date.now()>=Date.parse('2026-10-31T00:00:00+07:00'))campaign.querySelector('[class$="__videoOffer"]')?.remove();

// A failed responsive thumbnail can retry its original packaged photo once.
document.querySelectorAll('[data-testid="lpe-lifestyle-gallery"] img').forEach(image => {
  const fallback = () => {
    const original = image.dataset.fullSrc;
    if (!original || image.dataset.originalRetried) return;
    image.dataset.originalRetried = 'true';
    image.removeAttribute('srcset');
    image.removeAttribute('data-deferred-srcset');
    image.dataset.deferredSrc = original;
    image.src = original;
  };
  image.addEventListener('error', fallback);
  if (image.complete && !image.naturalWidth) fallback();
});
