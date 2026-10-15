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
// Campaign ends at midnight Vietnam time after 20 October 2026.
if (Date.now() >= Date.parse('2026-10-21T00:00:00+07:00')) {
  campaign.querySelectorAll('[class*="offerGraphic"], [class*="badge"]').forEach(el => el.remove());
  const offer = campaign.querySelector('[class*="offer"] > p');if (offer) offer.textContent = 'ƯU ĐÃI ĐÃ KẾT THÚC';
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
