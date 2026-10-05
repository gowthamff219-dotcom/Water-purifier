// Database with Lucide icon names
        const products = [
            { id: 'pro-1000', name: 'AquaGuard Pro 1000', price: 12999, originalPrice: 14500, type: 'RO + UV', capacity: '10L', category: 'Purifiers', icon: 'droplet', stock: true, rating: 4.8, reviews: 124 },
            { id: 'elite-2000', name: 'AquaGuard Elite 2000', price: 18499, originalPrice: 20000, type: 'RO + UV + TDS', capacity: '12L', category: 'Purifiers', icon: 'gem', stock: true, rating: 4.9, reviews: 89 },
            { id: 'home-500', name: 'AquaGuard Home 500', price: 8999, originalPrice: 9999, type: 'UV + Alkaline', capacity: '7L', category: 'Purifiers', icon: 'home', stock: true, rating: 4.5, reviews: 210 },
            { id: 'premium-3000', name: 'AquaGuard Premium 3000', price: 25999, originalPrice: 28999, type: 'RO + UV + Copper', capacity: '12L', category: 'Purifiers', icon: 'crown', stock: false, rating: 5.0, reviews: 45 },
            { id: 'ro-membrane', name: 'RO Membrane (100 GPD)', price: 2499, originalPrice: 0, type: 'Filter Part', capacity: 'Standard', category: 'Filters', icon: 'layers', stock: true, rating: 4.7, reviews: 340 },
            { id: 'alkaline-filter', name: 'Alkaline Cartridge', price: 1299, originalPrice: 1500, type: 'Filter Part', capacity: 'Standard', category: 'Filters', icon: 'sparkles', stock: true, rating: 4.6, reviews: 112 },
            { id: 'metal-stand', name: 'Metal Stand (Silver)', price: 1999, originalPrice: 2200, type: 'Accessory', capacity: 'Heavy Duty', category: 'Stands', icon: 'box', stock: true, rating: 4.4, reviews: 88 },
            { id: 'sensor-tap', name: 'Sensor Tap (Auto)', price: 3999, originalPrice: 4500, type: 'Accessory', capacity: 'Motion', category: 'Taps', icon: 'mouse-pointer-click', stock: true, rating: 4.8, reviews: 56 },
            { id: 'metal-elbow-90', name: 'Metal 90° Elbow (1/4")', price: 249, originalPrice: 0, type: 'Connector', capacity: 'Brass', category: 'Elbows', icon: 'corner-down-right', stock: true, rating: 4.5, reviews: 34 }
        ];

        const testimonials = [
            { text: "Best investment for our family. Water quality improved significantly. The installation was seamless and professional.", author: "Priya Sharma", role: "Chennai Resident" },
            { text: "Service team is extremely professional. On-time maintenance and absolute transparency in pricing.", author: "Rajesh Kumar", role: "Business Owner" },
            { text: "Excellent support. Solved our water TDS problem in 24 hours. Highly recommended for apartment complexes.", author: "Sana Ahmed", role: "Apartment Manager" },
            { text: "The new RO system is completely silent and water tastes great. Best after-sales service in the city.", author: "Vikram S.", role: "Homeowner" }
        ];

        // State
        let compareList = new Set();
        let currentTimeout = null;

        // Scroll Observer
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

        function initScrollAnimations() {
            document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
        }

        // Header Scroll Shadow
        window.addEventListener('scroll', () => {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 20) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        // Dark Mode
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.dataset.theme = savedTheme;
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
        
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
            document.body.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            lucide.createIcons(); // Re-initialize icons inside button
        });

        // Toast
        function showToast(message, type = 'success') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" style="color:var(--${type})"></i>
                <span style="font-weight:500;">${message}</span>
            `;
            container.appendChild(toast);
            lucide.createIcons();
            
            requestAnimationFrame(() => toast.classList.add('show'));
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        }

        // Navigation
        function navigateTo(pageId, scrollToId = null) {
            document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
            const activeBtn = Array.from(document.querySelectorAll('nav button')).find(b => b.getAttribute('onclick').includes(pageId));
            if(activeBtn) activeBtn.classList.add('active');

            const breadcrumbs = document.getElementById('breadcrumbs');
            const pageNames = { 'home': 'Home', 'products': 'Products', 'services': 'Services', 'contact': 'Contact' };
            breadcrumbs.innerHTML = `
                <span style="cursor:pointer;" onclick="navigateTo('home')"><i data-lucide="home" style="width:16px;height:16px;margin-bottom:-3px;"></i> Home</span> 
                ${pageId !== 'home' ? ` <i data-lucide="chevron-right"></i> <span class="active">${pageNames[pageId]}</span>` : ''}
            `;
            lucide.createIcons();

            const activePage = document.querySelector('.page.active');
            if (activePage && activePage.id !== pageId) {
                activePage.style.opacity = '0';
                setTimeout(() => {
                    activePage.classList.remove('active');
                    const newPage = document.getElementById(pageId);
                    
                    newPage.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.remove('is-visible'));
                    
                    newPage.classList.add('active');
                    setTimeout(() => newPage.style.opacity = '1', 50);
                    
                    if (pageId === 'products') applyFilters();
                    
                    if (scrollToId) setTimeout(() => document.getElementById(scrollToId).scrollIntoView({behavior: 'smooth', block: 'start'}), 100);
                    else window.scrollTo({top: 0, behavior: 'smooth'});
                }, 400);
            } else if (!activePage) {
                document.getElementById(pageId).classList.add('active');
                setTimeout(() => document.getElementById(pageId).style.opacity = '1', 50);
                if (pageId === 'products') applyFilters();
            } else if (scrollToId) {
                 document.getElementById(scrollToId).scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }

        // Testimonials
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

        // Product Rendering
        function getStarsHTML(rating, count) {
            let stars = '';
            for(let i=1; i<=5; i++) stars += `<i data-lucide="star" style="fill: ${i<=Math.floor(rating)?'currentColor':'none'};"></i>`;
            return `<div class="stars">${stars} <span>(${count})</span></div>`;
        }

        function renderProducts(list) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';
            
            if(list.length === 0) {
                grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:4rem;">
                    <i data-lucide="search-x" style="width:64px;height:64px;color:var(--text-light);margin-bottom:1rem;"></i>
                    <h3 style="font-size:1.5rem;">No products found</h3>
                    <p style="color:var(--text-light); margin-top:10px;">Try adjusting your filters.</p>
                </div>`;
                lucide.createIcons();
                return;
            }

            list.forEach((p, idx) => {
                const discount = p.originalPrice > p.price ? Math.round((1 - p.price/p.originalPrice) * 100) : 0;
                
                const wrapper = document.createElement('div');
                wrapper.className = `animate-on-scroll stagger-${(idx % 4) + 1}`;
                
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="badges">
                        ${discount > 0 ? `<div class="badge discount">-${discount}% OFF</div>` : ''}
                        <div class="badge ${p.stock ? 'stock' : 'out-of-stock'}">${p.stock ? 'In Stock' : 'Out of Stock'}</div>
                    </div>
                    
                    <label class="compare-checkbox" title="Add to compare">
                        <input type="checkbox" onchange="toggleCompare('${p.id}', this.checked)" ${compareList.has(p.id)?'checked':''}> 
                        Compare
                    </label>

                    <div class="product-image" onclick="openQuickView('${p.id}')">
                        <i data-lucide="${p.icon}"></i>
                        <div class="quick-view-overlay">
                            <button class="quick-view-btn"><i data-lucide="eye" style="width:18px;"></i> Quick View</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-type">${p.category}</div>
                        <div class="product-name">${p.name}</div>
                        ${getStarsHTML(p.rating, p.reviews)}
                        <div class="product-specs">
                            <span><i data-lucide="cpu"></i> ${p.type}</span>
                            <span><i data-lucide="container"></i> ${p.capacity}</span>
                        </div>
                        <div class="product-price-wrapper">
                            <div class="product-price">₹${p.price.toLocaleString()}</div>
                            ${discount > 0 ? `<div class="product-price-original">₹${p.originalPrice.toLocaleString()}</div>` : ''}
                        </div>
                        <div class="product-actions">
                            <button class="btn-buy" onclick="openQuickView('${p.id}')">Details</button>
                            <button class="btn-visit" onclick="navigateTo('contact')">Store</button>
                        </div>
                    </div>
                `;
                wrapper.appendChild(card);
                grid.appendChild(wrapper);
                scrollObserver.observe(wrapper);
            });
            lucide.createIcons();
        }

        // Filtering
        function setFilter(cat) { document.getElementById('categoryFilter').value = cat; navigateTo('products'); }
        function resetFilters() {
            document.getElementById('categoryFilter').value = '';
            document.getElementById('priceFilter').value = 50000;
            document.getElementById('priceValue').textContent = '50000';
            document.getElementById('searchFilter').value = '';
            document.getElementById('autocompleteList').style.display = 'none';
            applyFilters();
            showToast('Filters reset');
        }

        function applyFilters() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = Array(6).fill().map(() => `
                <div class="product-card" style="padding:1.5rem; border:1px solid var(--border);">
                    <div class="skeleton" style="height:220px; border-radius:12px;"></div>
                    <div class="skeleton" style="width:40%; margin-top:1.5rem;"></div>
                    <div class="skeleton" style="width:80%;"></div>
                    <div class="skeleton" style="width:60%;"></div>
                </div>
            `).join('');

            clearTimeout(currentTimeout);
            currentTimeout = setTimeout(() => {
                const cat = document.getElementById('categoryFilter').value;
                const price = parseInt(document.getElementById('priceFilter').value);
                const search = document.getElementById('searchFilter').value.toLowerCase();

                const filtered = products.filter(p => {
                    if (cat && p.category !== cat) return false;
                    if (p.price > price) return false;
                    if (search && !p.name.toLowerCase().includes(search)) return false;
                    return true;
                });
                updateActiveFilters(cat, price, search);
                renderProducts(filtered);
            }, 500); 
        }

        function updateActiveFilters(cat, price, search) {
            const container = document.getElementById('activeFilters');
            let html = '';
            if(cat) html += `<div class="filter-pill">${cat} <button onclick="document.getElementById('categoryFilter').value=''; applyFilters()"><i data-lucide="x" style="width:14px;"></i></button></div>`;
            if(price < 50000) html += `<div class="filter-pill">Under ₹${price} <button onclick="document.getElementById('priceFilter').value=50000; document.getElementById('priceValue').textContent='50000'; applyFilters()"><i data-lucide="x" style="width:14px;"></i></button></div>`;
            if(search) html += `<div class="filter-pill">"${search}" <button onclick="document.getElementById('searchFilter').value=''; applyFilters()"><i data-lucide="x" style="width:14px;"></i></button></div>`;
            container.innerHTML = html;
            lucide.createIcons();
        }

        function handleSearch(val) {
            applyFilters();
            const list = document.getElementById('autocompleteList');
            if(!val) { list.style.display = 'none'; return; }
            
            const matches = products.filter(p => p.name.toLowerCase().includes(val.toLowerCase())).slice(0,5);
            if(matches.length > 0) {
                list.innerHTML = matches.map(m => `<div class="autocomplete-item" onclick="selectAutocomplete('${m.id}')">${m.name}</div>`).join('');
                list.style.display = 'block';
            } else { list.style.display = 'none'; }
        }
        function selectAutocomplete(id) {
            document.getElementById('searchFilter').value = products.find(p => p.id === id).name;
            document.getElementById('autocompleteList').style.display = 'none';
            applyFilters();
        }

        // Compare
        function toggleCompare(id, isChecked) {
            if(isChecked) {
                if(compareList.size >= 3) { showToast('Compare up to 3 items only', 'warning'); event.target.checked = false; return; }
                compareList.add(id);
                showToast('Added to compare');
            } else compareList.delete(id);
            updateCompareBar();
        }
        function updateCompareBar() {
            const bar = document.getElementById('compareBar');
            document.getElementById('compareCount').textContent = `${compareList.size} item${compareList.size>1?'s':''} selected`;
            bar.classList.toggle('show', compareList.size > 0);
        }
        function clearCompare() { compareList.clear(); updateCompareBar(); applyFilters(); }
        function openCompareModal() {
            if(compareList.size < 2) { showToast('Select at least 2 items', 'warning'); return; }
            const table = document.getElementById('compareTable');
            const items = Array.from(compareList).map(id => products.find(p => p.id === id));
            
            let thead = `<tr><th>Feature</th>${items.map(i => `<th><div style="text-align:center; padding:1rem;"><i data-lucide="${i.icon}" style="width:48px;height:48px;margin-bottom:1rem;color:var(--primary);"></i><div style="font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;">${i.name}</div></div></th>`).join('')}</tr>`;
            let rows = [
                { label: 'Price', key: p => `<span style="font-size:1.2rem;font-weight:700;color:var(--text);">₹${p.price.toLocaleString()}</span>` },
                { label: 'Category', key: p => p.category },
                { label: 'Type / Tech', key: p => p.type },
                { label: 'Capacity', key: p => p.capacity },
                { label: 'Rating', key: p => getStarsHTML(p.rating, p.reviews) },
                { label: 'Status', key: p => p.stock ? '<span class="badge stock" style="position:static;">In-Store</span>' : '<span class="badge out-of-stock" style="position:static;">Out of Stock</span>' }
            ];

            table.innerHTML = `<thead>${thead}</thead><tbody>${rows.map(r => `<tr><td style="font-weight:600;color:var(--text-light);">${r.label}</td>${items.map(i => `<td>${r.key(i)}</td>`).join('')}</tr>`).join('')}</tbody>`;
            document.getElementById('compareModal').classList.add('active');
            lucide.createIcons();
        }

        // Quick View
        function openQuickView(id) {
            const p = products.find(x => x.id === id);
            document.getElementById('quickViewContent').innerHTML = `
                <div style="display:flex; gap:3rem; flex-wrap:wrap; align-items:center;">
                    <div style="flex:1; min-width:280px; background:linear-gradient(135deg, var(--bg), var(--border)); border-radius:24px; display:flex; align-items:center; justify-content:center; padding:4rem;">
                        <i data-lucide="${p.icon}" style="width:120px;height:120px;color:var(--primary);"></i>
                    </div>
                    <div style="flex:1; min-width:300px;">
                        <div class="product-type" style="margin-bottom:12px;">${p.category}</div>
                        <h2 style="margin-bottom:12px; font-size:2rem; line-height:1.2;">${p.name}</h2>
                        ${getStarsHTML(p.rating, p.reviews)}
                        <div style="margin:24px 0;">
                            <span style="font-size:2.5rem; font-weight:800; color:var(--text); letter-spacing:-0.03em;">₹${p.price.toLocaleString()}</span>
                            ${p.originalPrice > p.price ? `<span style="text-decoration:line-through; color:var(--text-light); margin-left:12px; font-size:1.2rem;">₹${p.originalPrice.toLocaleString()}</span>` : ''}
                        </div>
                        <ul style="list-style:none; margin-bottom:32px; color:var(--text-light); line-height:2.2; font-size:1.05rem;">
                            <li style="display:flex;align-items:center;gap:12px;"><i data-lucide="check-circle-2" style="color:var(--success);"></i> Tech: <strong style="color:var(--text);">${p.type}</strong></li>
                            <li style="display:flex;align-items:center;gap:12px;"><i data-lucide="check-circle-2" style="color:var(--success);"></i> Capacity: <strong style="color:var(--text);">${p.capacity}</strong></li>
                            <li style="display:flex;align-items:center;gap:12px;"><i data-lucide="store" style="color:var(--primary);"></i> <strong style="color:var(--text);">Available in-store only</strong></li>
                        </ul>
                        <div style="display:flex; gap:16px;">
                            <a href="tel:+918939414842" class="btn btn-primary" style="flex:1;"><i data-lucide="phone"></i> Call to Buy</a>
                            <button class="btn btn-secondary" onclick="closeModal('quickViewModal'); navigateTo('contact')">Visit Store</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('quickViewModal').classList.add('active');
            lucide.createIcons();
        }

        function closeModal(id) { document.getElementById(id).classList.remove('active'); }

        // Store Status
        function updateStoreStatus() {
            const badge = document.getElementById('storeStatusBadge');
            if(!badge) return;
            const hour = new Date().getHours(), day = new Date().getDay();
            let isOpen = (day >= 1 && day <= 6 && hour >= 9 && hour < 22);
            
            badge.innerHTML = isOpen ? '<i data-lucide="check-circle-2" style="width:16px;"></i> OPEN NOW' : '<i data-lucide="x-circle" style="width:16px;"></i> CLOSED';
            badge.style.backgroundColor = isOpen ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
            badge.style.color = isOpen ? 'var(--success)' : 'var(--error)';
            lucide.createIcons();
        }
        
        // Init
        initScrollAnimations();
        initTestimonials();
        updateStoreStatus();
        setInterval(updateStoreStatus, 60000);
        navigateTo('home');
        
        // Footer scroll-reveal (animation-only enhancement)
        document.querySelectorAll('.footer-section').forEach((el, i) => {
            el.classList.add('footer-reveal');
            el.style.transitionDelay = `${i * 0.1}s`;
            scrollObserver.observe(el);
        });
        // Observe footer-reveal like animate-on-scroll
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.footer-reveal').forEach(el => footerObserver.observe(el));

        // Final icon init
        document.addEventListener('DOMContentLoaded', () => lucide.createIcons());
        lucide.createIcons(); // Run immediately for dynamic parts