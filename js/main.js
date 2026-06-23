import { renderHeader } from './components/Header.js';
import { initBoilSimulator, cleanupSimulator } from './boilSimulator.js';
import { products } from './products.js';
import { renderProductCard } from './components/ProductCard.js';
import { openProductDetails } from './components/ProductDetails.js';
import { initProductPage } from './components/ProductPage.js';
import { initHomePage } from './components/HomePage.js';

// Global Application State
export const appState = {
  activeRoute: 'home',
  cart: [],
  activeProduct: null,
};

// Save cart state to LocalStorage
export function saveCartState() {
  try {
    localStorage.setItem('kettle_co_cart', JSON.stringify(appState.cart));
  } catch (e) {
    console.error('Error saving cart state', e);
  }
}

// Load cart state from LocalStorage
export function loadCartState() {
  try {
    const saved = localStorage.getItem('kettle_co_cart');
    if (saved) {
      appState.cart = JSON.parse(saved);
      appState.cartCount = appState.cart.reduce((sum, i) => sum + i.quantity, 0);
    }
  } catch (e) {
    console.error('Error loading cart state', e);
  }
}

// Sync and save cart state, updating cart badge and drawer
export function syncCartState() {
  appState.cartCount = appState.cart.reduce((sum, i) => sum + i.quantity, 0);
  saveCartState();

  const cartBadge = document.getElementById('header-cart-count');
  if (cartBadge) {
    cartBadge.innerText = appState.cartCount;
    cartBadge.style.transform = 'scale(1.3)';
    setTimeout(() => {
      cartBadge.style.transform = 'scale(1)';
    }, 200);
  }

  // Re-render Cart Drawer if it is open
  const drawerOverlay = document.getElementById('cart-drawer-overlay');
  if (drawerOverlay && drawerOverlay.classList.contains('open')) {
    import('./components/CartDrawer.js').then(module => {
      module.updateCartDrawerContent();
    });
  }
}

// Update quantity helper
export function updateCartQuantity(productId, colorName, newQty) {
  const item = appState.cart.find(i => i.id === productId && i.selectedColor === colorName);
  if (!item) return;

  if (newQty <= 0) {
    appState.cart = appState.cart.filter(i => !(i.id === productId && i.selectedColor === colorName));
  } else {
    item.quantity = newQty;
  }
  syncCartState();
}

// Remove from cart helper
export function removeFromCart(productId, colorName) {
  appState.cart = appState.cart.filter(i => !(i.id === productId && i.selectedColor === colorName));
  syncCartState();
}

// Clear cart helper
export function clearCart() {
  appState.cart = [];
  syncCartState();
}

// Initialize Application
function initApp() {
  loadCartState();
  handleNavigation(appState.activeRoute);
  renderFooter();
  setupGlobalListeners();
}

// Renders the global footer
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container footer-grid">
      <!-- Brand Column -->
      <div class="footer-brand">
        <div class="footer-logo">
          <svg class="footer-logo-icon" viewBox="0 0 64 64" width="32" height="32" fill="none">
            <path d="M18 22 C18 18, 22 14, 32 14 C42 14, 46 18, 46 22 L46 40 C46 48, 40 54, 32 54 C24 54, 18 48, 18 40 Z" fill="currentColor"/>
            <path d="M46 26 C54 26, 56 30, 56 34 C56 38, 54 42, 46 42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M18 28 L12 22 L10 18" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="24" y="11" width="16" height="4" rx="2" fill="currentColor"/>
            <circle cx="32" cy="9" r="2.5" fill="currentColor"/>
            <path d="M26 5 C26 3, 28 1, 28 -1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
            <path d="M32 4 C32 2, 34 0, 34 -2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
            <path d="M38 5 C38 3, 36 1, 36 -1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
          </svg>
          <span class="footer-logo-text">Kettle <em>& Co.</em></span>
        </div>
        <p class="footer-tagline">Precision-engineered kettles for the modern kitchen. Crafting the perfect pour since 2024.</p>
      </div>

      <!-- Navigation Column -->
      <div class="footer-col">
        <h4 class="footer-col-title">Navigation</h4>
        <ul class="footer-links">
          <li><a href="#" data-route="home">Home</a></li>
          <li><a href="#" data-route="catalog">Shop Kettles</a></li>
          <li><a href="#" data-route="simulator">Boil Simulator</a></li>
          <li><a href="#" data-route="checkout">Checkout</a></li>
        </ul>
      </div>

      <!-- Connect Column -->
      <div class="footer-col">
        <h4 class="footer-col-title">Connect</h4>
        <ul class="footer-links">
          <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          <li><a href="mailto:hello@kettleco.com">Email ↗</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>Copyright &copy; ${new Date().getFullYear()} | All Rights Reserved.</p>
        <p>Designed & developed by <a href="https://arnabsspace.in/" target="_blank" rel="noopener noreferrer">Arnab's Space</a></p>
      </div>
    </div>
  `;
}

// Global Event Listeners & Router Dispatcher
function setupGlobalListeners() {
  // Navigation Routing handler
  document.addEventListener('click', (event) => {
    // Find closest route trigger
    const routeTrigger = event.target.closest('[data-route]');
    if (routeTrigger) {
      event.preventDefault();
      const newRoute = routeTrigger.getAttribute('data-route');
      handleNavigation(newRoute);
      return;
    }

    // Mobile Menu Toggle Button
    const mobileBtn = event.target.closest('#mobile-menu-btn');
    if (mobileBtn) {
      const menu = document.getElementById('nav-menu');
      if (menu) {
        menu.classList.toggle('open');
      }
      return;
    }

    // Quick Action Buttons on Home
    const viewCatalogBtn = event.target.closest('#view-catalog-btn');
    if (viewCatalogBtn) {
      handleNavigation('catalog');
      return;
    }

    const viewSimBtn = event.target.closest('#view-simulator-btn');
    if (viewSimBtn) {
      handleNavigation('simulator');
      return;
    }

    // Cart Toggle Listener
    const cartToggle = event.target.closest('#cart-toggle-btn');
    if (cartToggle) {
      event.preventDefault();
      import('./components/CartDrawer.js').then(module => {
        module.openCartDrawer();
      });
      return;
    }
  });
}

// Router Manager
export function handleNavigation(route) {
  // Clear any active simulation loops when changing views
  cleanupSimulator();

  appState.activeRoute = route;

  // Re-render Header to update active styles
  renderHeader(appState.activeRoute, appState.cartCount);

  // Close mobile menu if open
  const menu = document.getElementById('nav-menu');
  if (menu && menu.classList.contains('open')) {
    menu.classList.remove('open');
  }

  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  switch (route) {
    case 'home':
      initHomePage(mainContent, addToCart, (route, prodId) => {
        if (route === 'product' && prodId) {
          appState.activeProduct = prodId;
        }
        handleNavigation(route);
      });
      break;

    case 'catalog':
      initCatalogPage(mainContent);
      break;

    case 'product':
      {
        const productId = appState.activeProduct;
        const product = products.find(p => p.id === productId);
        if (product) {
          initProductPage(mainContent, product, addToCart, (route, prodId) => {
            if (route === 'product' && prodId) {
              appState.activeProduct = prodId;
              handleNavigation('product');
            } else {
              handleNavigation(route);
            }
          });
        } else {
          handleNavigation('catalog');
        }
      }
      break;

    case 'simulator':
      initBoilSimulator();
      break;

    case 'checkout':
      import('./components/Checkout.js').then(module => {
        module.initCheckoutPage(mainContent);
      });
      break;

    default:
      mainContent.innerHTML = `
        <section class="welcome-section container">
          <div class="welcome-card">
            <h1>404</h1>
            <p>Page not found.</p>
            <button class="btn btn-primary" data-route="home">Go Home</button>
          </div>
        </section>
      `;
  }
}

// Simple Toast Alert Notification Utility
function showToast(message) {
  // Check if toast container already exists
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '24px';
    toastContainer.style.right = '24px';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.pointerEvents = 'none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.background = 'var(--color-surface-elevated, #1C1C24)';
  toast.style.color = 'var(--color-text-primary, #FFF)';
  toast.style.border = '1px solid var(--color-primary, #D4AF37)';
  toast.style.padding = '14px 24px';
  toast.style.borderRadius = '8px';
  toast.style.marginBottom = '12px';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
  toast.style.fontSize = '0.9rem';
  toast.style.fontFamily = 'var(--font-display)';
  toast.style.transform = 'translateY(100px)';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  toastContainer.appendChild(toast);

  // Trigger slide-up animation
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  // Fade out and remove
  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

/**
 * Adds selected product to active cart state
 * @param {string} productId - Product ID string
 */
export function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  // Retrieve selected color name from UI swatch selection
  let selectedColor = '';

  // First, check active card swatches
  const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
  if (card) {
    const activeSwatch = card.querySelector('.swatch.active');
    if (activeSwatch) {
      selectedColor = activeSwatch.getAttribute('data-color-name');
    }
  }

  // Next, check active product specs drawer swatches
  const specOverlay = document.getElementById('product-detail-overlay');
  if (specOverlay && specOverlay.classList.contains('open')) {
    const activeSwatch = specOverlay.querySelector('[data-drawer-color].active');
    if (activeSwatch) {
      selectedColor = activeSwatch.getAttribute('data-drawer-color');
    }
  }

  // Check product detail page swatches
  const pdSwatchContainer = document.getElementById('pd-swatches-container');
  if (pdSwatchContainer) {
    const activePdSwatch = pdSwatchContainer.querySelector('.pd-swatch.active');
    if (activePdSwatch) {
      selectedColor = activePdSwatch.getAttribute('data-pd-color');
    }
  }

  // Fallback to default active product color if none was interactive
  if (!selectedColor && item.colors) {
    const defaultColor = item.colors.find(c => c.active) || item.colors[0];
    if (defaultColor) {
      selectedColor = defaultColor.name;
    }
  }

  const existing = appState.cart.find(i => i.id === productId && i.selectedColor === selectedColor);
  if (existing) {
    existing.quantity += 1;
  } else {
    appState.cart.push({ ...item, quantity: 1, selectedColor: selectedColor });
  }

  syncCartState();
  showToast(`${item.name} (${selectedColor || 'Standard'}) added to cart.`);

  // Auto-open the Cart Drawer to show items
  import('./components/CartDrawer.js').then(module => {
    module.openCartDrawer();
  });
}

/**
 * Initializes and manages catalog filter actions
 * @param {HTMLElement} container - Catalog page container
 */
function initCatalogPage(container) {
  let catalogState = {
    searchQuery: '',
    category: 'all',
    sort: 'featured'
  };

  container.innerHTML = `
    <section class="catalog-section container">
      <!-- Toolbar Filter Options -->
      <div class="catalog-toolbar">
        
        <!-- Search bar input -->
        <div class="search-wrapper">
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" class="search-input" id="catalog-search-input" placeholder="Search premium kettles...">
        </div>

        <!-- Categories tabs -->
        <div class="filter-tabs" id="catalog-category-tabs">
          <button class="filter-tab active" data-category="all">All Collection</button>
          <button class="filter-tab" data-category="smart">Smart</button>
          <button class="filter-tab" data-category="gooseneck">Gooseneck</button>
          <button class="filter-tab" data-category="travel">Travel</button>
          <button class="filter-tab" data-category="traditional">Traditional</button>
        </div>

        <!-- Sorting Selector -->
        <div class="sort-wrapper">
          <span class="sort-label">Sort by:</span>
          <select class="sort-select" id="catalog-sort-select">
            <option value="featured">Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Connoisseur Rating</option>
          </select>
        </div>

      </div>

      <!-- Products Grid -->
      <div class="products-grid" id="catalog-products-grid">
        <!-- Dynamic cards load here -->
      </div>
    </section>
  `;

  const searchInput = document.getElementById('catalog-search-input');
  const sortSelect = document.getElementById('catalog-sort-select');
  const tabsContainer = document.getElementById('catalog-category-tabs');
  const productsGrid = document.getElementById('catalog-products-grid');

  function renderGrid() {
    let filtered = [...products];

    // Search query match
    if (catalogState.searchQuery) {
      const q = catalogState.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter match
    if (catalogState.category !== 'all') {
      filtered = filtered.filter(p => p.category === catalogState.category);
    }

    // Sort options
    if (catalogState.sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (catalogState.sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (catalogState.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Handle empty results
    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="welcome-card" style="grid-column: 1 / -1; max-width: 500px; margin: 40px auto; padding: 40px;">
          <h3>No Kettles Found</h3>
          <p style="margin: 12px 0 24px;">Adjust your filtering keywords or switch categories to locate our other premium models.</p>
          <button class="btn btn-primary" id="reset-catalog-filters-btn">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-catalog-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          catalogState.searchQuery = '';
          catalogState.category = 'all';
          catalogState.sort = 'featured';
          searchInput.value = '';
          sortSelect.value = 'featured';
          tabsContainer.querySelectorAll('.filter-tab').forEach(t => {
            if (t.getAttribute('data-category') === 'all') {
              t.classList.add('active');
            } else {
              t.classList.remove('active');
            }
          });
          renderGrid();
        });
      }
      return;
    }

    // Inject cards
    productsGrid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }

  // Listeners
  searchInput.addEventListener('input', (e) => {
    catalogState.searchQuery = e.target.value.trim();
    renderGrid();
  });

  sortSelect.addEventListener('change', (e) => {
    catalogState.sort = e.target.value;
    renderGrid();
  });

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;

    tabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    catalogState.category = tab.getAttribute('data-category');
    renderGrid();
  });

  // Grid element click delegation (View Specs & Add to Cart)
  productsGrid.addEventListener('click', (e) => {
    const detailTrigger = e.target.closest('[data-detail-trigger]');
    if (detailTrigger) {
      const prodId = detailTrigger.getAttribute('data-detail-trigger');
      if (prodId) {
        appState.activeProduct = prodId;
        handleNavigation('product');
      }
      return;
    }

    const cartAddTrigger = e.target.closest('[data-cart-add]');
    if (cartAddTrigger) {
      const prodId = cartAddTrigger.getAttribute('data-cart-add');
      addToCart(prodId);
      return;
    }

    // Swatches selection visual indicator
    const swatchTrigger = e.target.closest('[data-color-name]');
    if (swatchTrigger) {
      const card = swatchTrigger.closest('.product-card');
      if (card) {
        card.querySelectorAll('[data-color-name]').forEach(s => s.classList.remove('active'));
        swatchTrigger.classList.add('active');
      }
    }
  });

  // Run initial render
  renderGrid();
}

// Run init on load
window.addEventListener('DOMContentLoaded', initApp);
