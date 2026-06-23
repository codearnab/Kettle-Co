/**
 * Renders and handles detailed product specifications slide-out drawer
 */
export function openProductDetails(product, onAddToCart) {
  // Check if overlay container already exists, else create it
  let overlay = document.getElementById('product-detail-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'product-detail-overlay';
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);
  }

  // Generate color swatches html
  const swatchesHtml = product.colors ? product.colors.map((color, index) => `
    <span 
      class="swatch ${index === 0 ? 'active' : ''}" 
      style="background-color: ${color.hex};" 
      data-drawer-color="${color.name}"
      title="${color.name}"
    ></span>
  `).join('') : '';

  // Generate specifications table
  const specsRowsHtml = product.specs ? Object.entries(product.specs).map(([key, val]) => `
    <tr>
      <td>${key}</td>
      <td>${val}</td>
    </tr>
  `).join('') : '';

  // Generate features bullet list
  const featuresHtml = product.features ? product.features.map(f => `
    <li>${f}</li>
  `).join('') : '';

  // Set HTML template inside overlay
  overlay.innerHTML = `
    <div class="detail-drawer" id="detail-drawer-panel">
      
      <!-- Header -->
      <div class="drawer-header">
        <h2 class="font-display">Product Details</h2>
        <button class="close-drawer-btn" id="close-drawer-btn" aria-label="Close details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Scrollable Body -->
      <div class="drawer-body">
        
        <!-- Big image display -->
        <div class="drawer-img-container">
          <img src="${product.image}" alt="${product.name}" class="drawer-img" id="drawer-main-img">
        </div>

        <h2 class="font-display" style="margin-bottom: 6px;">${product.name}</h2>
        <div class="drawer-price">$${product.price.toFixed(2)}</div>
        <p class="drawer-description">${product.description}</p>
        
        <!-- Color Finish Swatches Selector -->
        <div class="drawer-colors-group">
          <label class="font-display">
            Selected Finish: 
            <span class="drawer-color-label-text" id="drawer-color-lbl">${product.colors ? product.colors[0].name : ''}</span>
          </label>
          <div class="product-swatches">
            ${swatchesHtml}
          </div>
        </div>

        <!-- Features list -->
        <div class="drawer-features">
          <h3 class="font-display">Key Features</h3>
          <ul class="drawer-features-list">
            ${featuresHtml}
          </ul>
        </div>

        <!-- Tech Specifications table -->
        <div class="drawer-specs">
          <h3 class="font-display">Technical Specifications</h3>
          <table class="specs-table">
            <tbody>
              ${specsRowsHtml}
            </tbody>
          </table>
        </div>

      </div>

      <!-- Action Footer -->
      <div class="drawer-footer">
        <button class="btn btn-primary drawer-add-btn" id="drawer-add-cart-btn">Add to Cart</button>
      </div>

    </div>
  `;

  // Bind close triggers
  const closeBtn = document.getElementById('close-drawer-btn');
  const closeOverlay = (e) => {
    if (e.target === overlay || e.currentTarget === closeBtn) {
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.innerHTML = '';
      }, 400); // Wait for sliding animation
    }
  };

  closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', closeOverlay);

  // Bind Swatches color selector toggle
  const swatches = overlay.querySelectorAll('[data-drawer-color]');
  const colorLabelText = document.getElementById('drawer-color-lbl');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const colorName = swatch.getAttribute('data-drawer-color');
      if (colorLabelText) colorLabelText.innerText = colorName;
    });
  });

  // Bind Add to Cart action button
  const addCartBtn = document.getElementById('drawer-add-cart-btn');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (onAddToCart) {
        onAddToCart(product.id);
      }
      // Auto close drawer upon cart addition
      overlay.classList.remove('open');
    });
  }

  // Trigger Slide Drawer visual open state
  setTimeout(() => {
    overlay.classList.add('open');
  }, 10);
}
