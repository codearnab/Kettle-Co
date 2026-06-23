/**
 * Generates HTML string representing a single product card
 * @param {Object} product - The product object
 * @returns {string} - HTML content
 */
export function renderProductCard(product) {
  // Generate star rating string
  const fullStars = Math.floor(product.rating);
  const starsStr = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

  // Generate color swatches
  const swatchesHtml = product.colors ? product.colors.map((color, index) => `
    <span 
      class="swatch ${index === 0 ? 'active' : ''}" 
      style="background-color: ${color.hex};" 
      data-color-name="${color.name}"
      title="${color.name}"
    ></span>
  `).join('') : '';

  // Generate badge if rating is high
  const badgeHtml = product.rating >= 4.9 ? '<span class="product-badge">Top Rated</span>' : '';

  return `
    <article class="product-card" data-product-id="${product.id}">
      ${badgeHtml}
      
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy"${product.imageFilter ? ` style="filter: ${product.imageFilter};"` : ''}>
      </div>
      
      <div class="product-info">
        <div class="product-header">
          <h3 class="product-name" data-detail-trigger="${product.id}">${product.name}</h3>
          <span class="product-price">$${product.price.toFixed(2)}</span>
        </div>
        
        <div class="product-rating">
          <span class="stars">${starsStr}</span>
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>
        
        <p class="product-tagline">${product.tagline}</p>
        
        <div class="product-swatches">
          ${swatchesHtml}
        </div>
        
        <div class="product-actions">
          <button class="btn btn-secondary" data-detail-trigger="${product.id}">View Specs</button>
          <button class="btn btn-primary add-to-cart-btn" data-cart-add="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}
