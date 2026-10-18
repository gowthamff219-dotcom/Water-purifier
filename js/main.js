const testimonials = [
            { text: "Best investment for our family. Water quality improved significantly. The installation was seamless and professional.", author: "Priya Sharma", role: "Chennai Resident" },
            { text: "Service team is extremely professional. On-time maintenance and absolute transparency in pricing.", author: "Rajesh Kumar", role: "Business Owner" },
            { text: "Excellent support. Solved our water TDS problem in 24 hours. Highly recommended for apartment complexes.", author: "Sana Ahmed", role: "Apartment Manager" },
            { text: "The new RO system is completely silent and water tastes great. Best after-sales service in the city.", author: "Vikram S.", role: "Homeowner" }
        ];
function initTestimonials() {
            const track = document.getElementById('testimonialTrack');
            const html = testimonials.map(t => `
                <div class="testimonial">
                    <i data-lucide="quote" class="testimonial-icon"></i>
                    <div class="stars" style="margin-bottom:1rem;">
                        <i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i>
                    </div>
                    <div class="testimonial-text">"${t.text}"</div>
                    <div class="testimonial-author">${t.author}</div>
                    <div class="testimonial-role">${t.role}</div>
                </div>
            `).join('');
            track.innerHTML = html + html; 
        }
initTestimonials();
const products = productCatalog;
const galleryPositions = new Map();
let lastModalTrigger = null;
let activeProductId = null;
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const icons = () => window.lucide?.createIcons();
// A missing photo should leave a useful card rather than a broken image icon.
document.addEventListener('error', event => {
  const image = event.target;
  if (!image.matches?.('.gallery-image')) return;
  image.hidden = true;
  if (!image.parentElement.querySelector('.gallery-unavailable')) {
    const note = document.createElement('p');
    note.className = 'gallery-unavailable';
    note.textContent = 'Photo available on request. Call us for details.';
    image.parentElement.appendChild(note);
  }
}, true);
document.addEventListener('load', event => {
  const image = event.target;
  if (!image.matches?.('.gallery-image')) return;
  image.hidden = false;
  image.parentElement.querySelector('.gallery-unavailable')?.remove();
}, true);
const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: 0.05 });
function initScrollAnimations() {
  document.querySelectorAll('.animate-on-scroll, .footer-section').forEach(element => scrollObserver.observe(element));
}
window.addEventListener('scroll', () => document.getElementById('mainHeader').classList.toggle('scrolled', window.scrollY > 20));
const themeToggle = document.getElementById('themeToggle');
let savedTheme = 'light';
try { savedTheme = localStorage.getItem('theme') || 'light'; } catch (_) { /* Storage may be disabled. */ }
function setTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  icons();
}
setTheme(savedTheme);
themeToggle.addEventListener('click', () => {
  const theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('theme', theme); } catch (_) { /* Theme still works for this visit. */ }
});
function navigateTo(pageId) {
  if (!document.getElementById(pageId)?.classList.contains('page')) return;
  document.querySelectorAll('.page').forEach(page => page.classList.toggle('active', page.id === pageId));
  if (pageId === 'contact') requestAnimationFrame(() => {
    const map = document.querySelector('.store-map iframe');
    if (!map.dataset.initialized) {
      // Start loading after the formerly hidden section has been laid out.
      map.getBoundingClientRect();
      map.loading = 'eager';
      map.src = map.getAttribute('src');
      map.dataset.initialized = 'true';
    }
  });
  document.querySelectorAll('nav button').forEach(button => {
    const active = button.getAttribute('onclick')?.includes(`'${pageId}'`);
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  });
  const names = { home: 'Home', products: 'Products', services: 'Services', contact: 'Contact' };
  document.getElementById('breadcrumbs').innerHTML = `<button class="breadcrumb-home" onclick="navigateTo('home')">Home</button>${pageId === 'home' ? '' : ` <span aria-hidden="true"> / </span><span class="active">${names[pageId]}</span>`}`;
  if (pageId === 'products') applyFilters();
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  icons();
}
function priceHTML(product) {
  if (product.hidePrice) return '';
  return `<p class="product-price">${product.price == null ? 'Call for price' : `${product.startingPrice ? '<span class="price-prefix">From </span>' : ''}${money(product.price)}`}</p>`;
}
function galleryHTML(product, context) {
  const key = `${context}-${product.id}`;
  const position = galleryPositions.get(key) || 0;
  return `<section class="product-gallery" data-gallery="${key}" data-product="${product.id}" aria-label="${escapeHTML(product.name)} photos" tabindex="0">
    <div class="gallery-stage"><img class="gallery-image" src="${product.images[position]}" alt="${escapeHTML(product.name)} — photo ${position + 1} of ${product.images.length}" loading="${context === 'detail' ? 'eager' : 'lazy'}" width="900" height="900">
      ${context === 'card' ? `<button class="gallery-expand" data-open="${product.id}" aria-label="Enlarge ${escapeHTML(product.name)} photos"><i data-lucide="expand"></i></button>` : ''}
      ${product.images.length > 1 ? `<button class="gallery-arrow gallery-previous" data-step="-1" aria-label="Previous ${escapeHTML(product.name)} photo">&#10094;</button><button class="gallery-arrow gallery-next" data-step="1" aria-label="Next ${escapeHTML(product.name)} photo">&#10095;</button>` : ''}</div>
    ${product.images.length > 1 ? `<div class="gallery-toolbar"><div class="gallery-dots">${product.images.map((_, index) => `<button data-slide="${index}" class="gallery-dot ${index === position ? 'selected' : ''}" aria-label="Show photo ${index + 1}" aria-pressed="${index === position}"></button>`).join('')}</div><span class="gallery-count" aria-live="polite">${position + 1} / ${product.images.length}</span></div>` : ''}</section>`;
}
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = list.length ? list.map(product => `<article class="product-card">${galleryHTML(product, 'card')}
    <div class="product-info"><div class="product-type">${product.category === 'Purifiers' ? 'Water purifier' : product.category === 'Filters' ? 'Filter accessory' : 'Tap accessory'}</div>
      <h3 class="product-name"><button class="product-title-button" data-open="${product.id}">${escapeHTML(product.name)}</button></h3>
      <ul class="catalog-specs">${product.specs.map(spec => `<li>${escapeHTML(spec)}</li>`).join('')}</ul>${priceHTML(product)}
      <div class="product-actions"><a href="tel:+918939414842" class="btn btn-primary">Call for Details</a><button class="btn btn-secondary" data-open="${product.id}">View Details</button></div></div></article>`).join('') : '<div class="catalog-empty"><h3>No products found</h3><p>Try another search or reset the filters.</p><button class="btn btn-secondary" onclick="resetFilters()">Reset Filters</button></div>';
  document.getElementById('catalogCount').textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
  icons();
}
function setFilter(category) {
  document.getElementById('categoryFilter').value = category;
  document.getElementById('searchFilter').value = '';
  document.getElementById('priceFilter').value = document.getElementById('priceFilter').max;
  navigateTo('products');
}
function resetFilters() {
  document.getElementById('categoryFilter').value = '';
  document.getElementById('priceFilter').value = document.getElementById('priceFilter').max;
  document.getElementById('searchFilter').value = '';
  document.getElementById('autocompleteList').hidden = true;
  applyFilters();
}
function applyFilters() {
  const category = document.getElementById('categoryFilter').value;
  const maximum = Number(document.getElementById('priceFilter').value);
  const search = document.getElementById('searchFilter').value.trim().toLowerCase();
  document.getElementById('priceValue').textContent = maximum.toLocaleString('en-IN');
  const filtered = products.filter(product => (!category || product.category === category) && (product.hidePrice || product.price == null || product.price <= maximum) && `${product.name} ${product.category} ${product.specs.join(' ')}`.toLowerCase().includes(search));
  renderProducts(filtered.filter(p => p.category !== 'Taps').concat(filtered.filter(p => p.category === 'Taps')));
  const container = document.getElementById('activeFilters'); container.replaceChildren();
  [category, maximum < Number(document.getElementById('priceFilter').max) ? `Up to ${money(maximum)}` : '', search ? `Search: ${search}` : ''].filter(Boolean).forEach(label => {
    const pill = document.createElement('span'); pill.className = 'filter-pill'; pill.textContent = label; container.appendChild(pill);
  });
}
function handleSearch(value) {
  applyFilters();
  const list = document.getElementById('autocompleteList');
  const matches = value.trim() ? products.filter(product => product.name.toLowerCase().includes(value.trim().toLowerCase())).slice(0, 5) : [];
  list.hidden = !matches.length;
  list.innerHTML = matches.map(product => `<button class="autocomplete-item" data-select="${product.id}">${escapeHTML(product.name)}</button>`).join('');
}
function selectAutocomplete(id) {
  document.getElementById('searchFilter').value = products.find(product => product.id === id).name;
  document.getElementById('autocompleteList').hidden = true; applyFilters();
}
function changeSlide(gallery, position) {
  const product = products.find(item => item.id === gallery.dataset.product);
  const index = (position + product.images.length) % product.images.length;
  galleryPositions.set(gallery.dataset.gallery, index);
  const image = gallery.querySelector('img'); image.src = product.images[index]; image.alt = `${product.name} — photo ${index + 1} of ${product.images.length}`;
  gallery.querySelectorAll('[data-slide]').forEach(button => {
    const selected = Number(button.dataset.slide) === index; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', selected);
  });
  const count = gallery.querySelector('.gallery-count'); if (count) count.textContent = `${index + 1} / ${product.images.length}`;
}
function openQuickView(id, trigger = document.activeElement) {
  const product = products.find(item => item.id === id); if (!product) return;
  lastModalTrigger = trigger; activeProductId = id;
  galleryPositions.set(`detail-${id}`, galleryPositions.get(`card-${id}`) || 0);
  document.getElementById('quickViewContent').innerHTML = `<div class="product-detail-layout">${galleryHTML(product, 'detail')}
    <div class="product-detail-info"><div class="product-type">${escapeHTML(product.category)}</div><h2 id="quickViewTitle">${escapeHTML(product.name)}</h2>${priceHTML(product)}
    <ul class="catalog-specs">${product.specs.map(spec => `<li>${escapeHTML(spec)}</li>`).join('')}</ul>
    <p class="enquiry-note">Interested in this ${product.category === 'Purifiers' ? 'purifier' : 'product'}? Call us for details, availability, and installation.</p>
    <div class="detail-actions"><a href="tel:+918939414842" class="btn btn-primary">Call for Details</a><a href="https://maps.app.goo.gl/SrXHkBFPTP9MQxqv8?g_st=aw" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Get Directions</a></div></div></div>`;
  const modal = document.getElementById('quickViewModal'); modal.hidden = false; modal.classList.add('active'); document.body.classList.add('modal-open');
  icons(); modal.querySelector('.modal-close').focus();
}
function closeModal(id = 'quickViewModal') {
  const modal = document.getElementById(id); modal.classList.remove('active'); modal.hidden = true; document.body.classList.remove('modal-open'); activeProductId = null;
  if (lastModalTrigger?.isConnected) lastModalTrigger.focus();
}
document.addEventListener('click', event => {
  const open = event.target.closest('[data-open]'); if (open) { openQuickView(open.dataset.open, open); return; }
  const select = event.target.closest('[data-select]'); if (select) { selectAutocomplete(select.dataset.select); return; }
  const control = event.target.closest('[data-step], [data-slide]');
  if (control) { const gallery = control.closest('[data-gallery]'); changeSlide(gallery, control.hasAttribute('data-slide') ? Number(control.dataset.slide) : (galleryPositions.get(gallery.dataset.gallery) || 0) + Number(control.dataset.step)); }
  if (!event.target.closest('.autocomplete-wrapper')) document.getElementById('autocompleteList').hidden = true;
});
document.addEventListener('keydown', event => {
  const modal = document.getElementById('quickViewModal');
  if (event.key === 'Escape') { if (activeProductId) closeModal(); document.getElementById('autocompleteList').hidden = true; return; }
  if (activeProductId && event.key === 'Tab') {
    const focusable = [...modal.querySelectorAll('button, a[href], [tabindex="0"]')].filter(element => !element.hidden);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  const gallery = event.target.closest('[data-gallery]') || (activeProductId ? modal.querySelector('[data-gallery]') : null);
  if (gallery && ['ArrowLeft', 'ArrowRight'].includes(event.key) && !event.target.matches('input, select')) { event.preventDefault(); changeSlide(gallery, (galleryPositions.get(gallery.dataset.gallery) || 0) + (event.key === 'ArrowRight' ? 1 : -1)); }
});
let touchStart = null;
document.addEventListener('touchstart', event => {
  const gallery = event.target.closest('[data-gallery]'); touchStart = gallery ? { gallery, x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
document.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x, dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) changeSlide(touchStart.gallery, (galleryPositions.get(touchStart.gallery.dataset.gallery) || 0) + (dx < 0 ? 1 : -1)); touchStart = null;
}, { passive: true });
function updateStoreStatus() {
  const badge = document.getElementById('storeStatusBadge');
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const hour = Number(parts.find(part => part.type === 'hour').value), day = parts.find(part => part.type === 'weekday').value;
  const open = day !== 'Sun' && hour >= 9 && hour < 22; badge.textContent = open ? 'OPEN NOW' : 'CLOSED'; badge.style.color = open ? 'var(--success)' : 'var(--error)';
}
const categoryLabels = { Purifiers: 'Water Purifiers', Filters: 'Filters & Accessories', Taps: 'Taps' };
document.getElementById('categoryFilter').innerHTML = '<option value="">All Categories</option>' + [...new Set(products.map(product => product.category))].map(category => `<option value="${category}">${categoryLabels[category]}</option>`).join('');
const priceFilter = document.getElementById('priceFilter'); priceFilter.max = Math.ceil(Math.max(...products.map(product => product.price || 0)) / 500) * 500; priceFilter.value = priceFilter.max;
applyFilters(); initScrollAnimations(); updateStoreStatus(); setInterval(updateStoreStatus, 60000); navigateTo('home'); icons();
