/**
 * Renders the brand navigation header
 * @param {string} activeRoute - The active navigation link
 * @param {number} cartCount - Number of items currently in the cart
 */
export function renderHeader(activeRoute = 'home', cartCount = 0) {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <div class="container header-container">
      <a href="#" class="logo" data-route="home">
        <svg class="logo-icon" viewBox="0 0 64 64" width="28" height="28" fill="none">
          <path d="M18 22 C18 18, 22 14, 32 14 C42 14, 46 18, 46 22 L46 40 C46 48, 40 54, 32 54 C24 54, 18 48, 18 40 Z" fill="currentColor"/>
          <path d="M46 26 C54 26, 56 30, 56 34 C56 38, 54 42, 46 42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M18 28 L12 22 L10 18" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="24" y="11" width="16" height="4" rx="2" fill="currentColor"/>
          <circle cx="32" cy="9" r="2.5" fill="currentColor"/>
          <path d="M26 5 C26 3, 28 1, 28 -1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
          <path d="M32 4 C32 2, 34 0, 34 -2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
          <path d="M38 5 C38 3, 36 1, 36 -1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
        </svg>
        Kettle <span>& Co.</span>
      </a>
      
      <nav>
        <ul class="nav-menu" id="nav-menu">
          <li>
            <a href="#" class="nav-link ${activeRoute === 'home' ? 'active' : ''}" data-route="home">Home</a>
          </li>
          <li>
            <a href="#" class="nav-link ${activeRoute === 'catalog' ? 'active' : ''}" data-route="catalog">Shop Kettles</a>
          </li>
          <li>
            <a href="#" class="nav-link ${activeRoute === 'simulator' ? 'active' : ''}" data-route="simulator">Boil Simulator</a>
          </li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <button class="cart-toggle" id="cart-toggle-btn">
          <svg class="cart-icon-svg" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Cart
          <span class="cart-badge" id="header-cart-count">${cartCount}</span>
        </button>
        
        <button class="menu-toggle" id="mobile-menu-btn" aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  `;
}
