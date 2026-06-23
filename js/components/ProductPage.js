import { products } from '../products.js';

/**
 * Renders the full Product Details page inside the main content container.
 * @param {HTMLElement} container - The #main-content element
 * @param {Object} product - The product object to display
 * @param {Function} addToCart - Cart add callback
 * @param {Function} onNavigate - Navigation callback (route, productId?)
 */
export function initProductPage(container, product, addToCart, onNavigate) {
  // Generate star rating
  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const starsHtml = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);

  // Generate color swatches
  const swatchesHtml = product.colors ? product.colors.map((color, index) => `
    <button
      class="pd-swatch ${index === 0 ? 'active' : ''}"
      style="background-color: ${color.hex};"
      data-pd-color="${color.name}"
      title="${color.name}"
      aria-label="${color.name}"
    ></button>
  `).join('') : '';

  // Generate feature list
  const featuresHtml = product.features ? product.features.map(f => `
    <li class="pd-feature-item">
      <span class="pd-feature-check">✓</span>
      ${f}
    </li>
  `).join('') : '';

  // Generate specs table
  const specsHtml = product.specs ? Object.entries(product.specs).map(([key, val]) => `
    <tr class="pd-spec-row">
      <td class="pd-spec-key">${key}</td>
      <td class="pd-spec-val">${val}</td>
    </tr>
  `).join('') : '';

  // Get related products (same category, excluding current)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If fewer than 2 related, pull from other categories
  const extraRelated = related.length < 2
    ? products.filter(p => p.id !== product.id).slice(0, 4 - related.length)
    : [];

  const allRelated = [...related, ...extraRelated].slice(0, 4);

  const relatedCardsHtml = allRelated.map(rp => {
    const rStars = '★'.repeat(Math.floor(rp.rating)) + '☆'.repeat(5 - Math.floor(rp.rating));
    return `
      <article class="pd-related-card" data-related-trigger="${rp.id}">
        <div class="pd-related-img-wrap">
          <img src="${rp.image}" alt="${rp.name}" class="pd-related-img" loading="lazy">
        </div>
        <div class="pd-related-info">
          <h4 class="pd-related-name">${rp.name}</h4>
          <div class="pd-related-rating">${rStars} <span>(${rp.reviews})</span></div>
          <p class="pd-related-tagline">${rp.tagline}</p>
          <div class="pd-related-footer">
            <span class="pd-related-price">$${rp.price.toFixed(2)}</span>
            <button class="btn btn-secondary pd-related-btn" data-related-trigger="${rp.id}">View Details</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  const categoryLabel = {
    smart: 'Smart Kettle',
    gooseneck: 'Gooseneck',
    travel: 'Travel',
    traditional: 'Traditional'
  }[product.category] || product.category;

  container.innerHTML = `
    <div class="pd-page">

      <!-- Breadcrumb -->
      <div class="pd-breadcrumb container">
        <button class="pd-breadcrumb-link" data-route="home">Home</button>
        <span class="pd-breadcrumb-sep">›</span>
        <button class="pd-breadcrumb-link" data-route="catalog">Collection</button>
        <span class="pd-breadcrumb-sep">›</span>
        <span class="pd-breadcrumb-current">${product.name}</span>
      </div>

      <!-- Main product section -->
      <section class="pd-main container">

        <!-- Left: Product Image Gallery -->
        <div class="pd-gallery">
          <div class="pd-main-img-wrap">
            <div class="pd-img-glow"></div>
            <img
              src="${product.image}"
              alt="${product.name}"
              class="pd-main-img"
              id="pd-main-img"
            >
          </div>
          <div class="pd-thumbs">
            <button class="pd-thumb active" data-src="${product.image}">
              <img src="${product.image}" alt="${product.name}">
            </button>
            <!-- Additional thumbs could be added here -->
          </div>
        </div>

        <!-- Right: Product Details -->
        <div class="pd-details">

          <div class="pd-category-badge">${categoryLabel}</div>

          <h1 class="pd-product-name">${product.name}</h1>

          <div class="pd-rating-row">
            <span class="pd-stars">${starsHtml}</span>
            <span class="pd-reviews">${product.reviews} verified reviews</span>
          </div>

          <div class="pd-price-row">
            <span class="pd-price">$${product.price.toFixed(2)}</span>
            <span class="pd-price-note">Free shipping on orders over $150</span>
          </div>

          <p class="pd-tagline">${product.tagline}</p>
          <p class="pd-description">${product.description}</p>

          <!-- Color Picker -->
          <div class="pd-color-section">
            <div class="pd-color-label">
              Finish: <span id="pd-selected-color">${product.colors?.[0]?.name || ''}</span>
            </div>
            <div class="pd-swatches-row" id="pd-swatches-container">
              ${swatchesHtml}
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="pd-cta-group">
            <button class="btn btn-primary pd-add-cart-btn" id="pd-add-cart-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Add to Cart
            </button>
            <button class="btn btn-secondary pd-back-btn" data-route="catalog">
              ← Back to Collection
            </button>
          </div>

          <!-- Trust badges -->
          <div class="pd-trust-row">
            <div class="pd-trust-item">
              <span class="pd-trust-icon">🛡️</span>
              <span>2-Year Warranty</span>
            </div>
            <div class="pd-trust-item">
              <span class="pd-trust-icon">🚚</span>
              <span>Free Returns</span>
            </div>
            <div class="pd-trust-item">
              <span class="pd-trust-icon">⚡</span>
              <span>Ships in 24hrs</span>
            </div>
          </div>

        </div>
      </section>

      <!-- Features & Specs Tabs -->
      <section class="pd-tabs-section container">
        <div class="pd-tabs-nav" id="pd-tabs-nav">
          <button class="pd-tab active" data-tab="features">Key Features</button>
          <button class="pd-tab" data-tab="specs">Technical Specs</button>
        </div>
        <div class="pd-tabs-content">
          <div class="pd-tab-panel active" id="pd-panel-features">
            <ul class="pd-features-list">
              ${featuresHtml}
            </ul>
          </div>
          <div class="pd-tab-panel" id="pd-panel-specs">
            <table class="pd-specs-table">
              <tbody>
                ${specsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      ${allRelated.length > 0 ? `
      <section class="pd-related-section">
        <div class="container">
          <div class="pd-related-header">
            <h2 class="pd-related-title">You May Also Like</h2>
            <button class="btn btn-secondary pd-view-all-btn" data-route="catalog">View All</button>
          </div>
          <div class="pd-related-grid" id="pd-related-grid">
            ${relatedCardsHtml}
          </div>
        </div>
      </section>
      ` : ''}

    </div>
  `;

  // --- Bind interactions ---

  // Color swatch selector
  const swatchContainer = document.getElementById('pd-swatches-container');
  const selectedColorLabel = document.getElementById('pd-selected-color');
  if (swatchContainer) {
    swatchContainer.addEventListener('click', (e) => {
      const swatch = e.target.closest('[data-pd-color]');
      if (!swatch) return;
      swatchContainer.querySelectorAll('.pd-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      if (selectedColorLabel) selectedColorLabel.textContent = swatch.getAttribute('data-pd-color');
    });
  }

  // Tab navigation
  const tabsNav = document.getElementById('pd-tabs-nav');
  if (tabsNav) {
    tabsNav.addEventListener('click', (e) => {
      const tab = e.target.closest('.pd-tab');
      if (!tab) return;
      const targetTab = tab.getAttribute('data-tab');
      tabsNav.querySelectorAll('.pd-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.pd-tab-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(`pd-panel-${targetTab}`);
      if (panel) panel.classList.add('active');
    });
  }

  // Add to cart
  const addCartBtn = document.getElementById('pd-add-cart-btn');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      // Get selected color from page swatch
      const activeSwatch = swatchContainer?.querySelector('.pd-swatch.active');
      if (activeSwatch) {
        // Store color context so addToCart can read it
        addCartBtn.setAttribute('data-selected-color', activeSwatch.getAttribute('data-pd-color'));
      }
      addToCart(product.id);
    });
  }

  // Related product navigation
  const relatedGrid = document.getElementById('pd-related-grid');
  if (relatedGrid) {
    relatedGrid.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-related-trigger]');
      if (!trigger) return;
      const relId = trigger.getAttribute('data-related-trigger');
      if (onNavigate) onNavigate('product', relId);
    });
  }

  // Scroll to top when page loads
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
