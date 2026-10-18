// Product messages verified on 16 October 2026. Relative URLs support GitHub Pages.
const productCatalog = [
  { id: 'dolphin', name: 'Dolphin', category: 'Purifiers', price: 5999, startingPrice: true, specs: ['5 purification filters', 'RO purification'], imageCount: 3 },
  { id: 'mars', name: 'MARS', category: 'Purifiers', price: 6999, specs: ['5 purification filters', '9 litre tank'], imageCount: 3 },
  { id: 'roma', name: 'Roma', category: 'Purifiers', price: 8999, startingPrice: true, specs: ['5 purification filters', 'RO + UF', 'Alkaline, mineral and copper filters', 'UV light'], imageCount: 6 },
  { id: 'purosis', name: 'Purosis', category: 'Purifiers', price: 9499, startingPrice: true, specs: ['5 purification filters', '9 litre storage tank', 'RO + UF', 'Alkaline and copper filters, UV light and minerals'], imageCount: 3 },
  { id: 'glory', name: 'Glory', category: 'Purifiers', price: 8999, startingPrice: true, specs: ['5 purification filters', '15 litre tank', 'RO + UF', 'Alkaline and copper filters, UV light and minerals'], imageCount: 3 },
  { id: 'emerald', name: 'Emerald', category: 'Purifiers', price: 8999, startingPrice: true, specs: ['5 purification filters', '13 litre storage tank', 'RO + UF', 'Alkaline and copper filters, UV light and minerals'], imageCount: 2 },
  { id: 'jade', name: 'JADE', category: 'Purifiers', price: 7499, startingPrice: true, specs: ['5 purification filters', 'RO + UF', 'Alkaline and copper filters, UV light and minerals'], imageCount: 4 },
  { id: 'water-lilli', name: 'Water Lilli', category: 'Purifiers', price: 7999, specs: ['5 purification filters', '11 litre tank'], imageCount: 5 },
  { id: 'alica', name: 'ALICA', category: 'Purifiers', price: 8499, specs: ['5 purification filters', '10 litre tank'], imageCount: 1 },
  { id: 'lx-one-titanium', name: 'LX ONE Titanium', category: 'Purifiers', price: 7499, startingPrice: true, specs: ['5 purification filters', '9 litre storage tank', 'RO + UF', 'Alkaline, mineral and copper filters', 'UV light'], imageCount: 1 },
  { id: 'aqua-touch', name: 'AQUA Touch', category: 'Purifiers', price: null, specs: ['5 purification filters', '9 litre tank', 'RO + UF', 'Alkaline and copper filters, UV light and minerals'], imageCount: 1 },
  { id: 'pre-filter-housing', name: 'Pre-filter Housing Bowl', category: 'Filters', price: 500, specs: ['10 inch housing bowl'], imageCount: 1 },
  { id: 'spun-filter', name: 'Spun Filter', category: 'Filters', price: 100, specs: [], imageCount: 1 },
  { id: 'purifier-taps', name: 'Water Purifier Taps', category: 'Taps', hidePrice: true, specs: ['Browse the available tap designs', 'Call to check compatibility with your purifier'], imageCount: 4 }
].map(product => ({ ...product, images: Array.from({ length: product.imageCount }, (_, index) => `assets/catalog/${product.id}/display/${String(index + 1).padStart(2, '0')}.${product.id === 'purosis' ? 'svg' : 'jpg'}`) }));
