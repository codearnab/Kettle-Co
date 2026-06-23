import { appState, updateCartQuantity, removeFromCart, handleNavigation } from '../main.js';

/**
 * Opens the shopping cart drawer
 */
export function openCartDrawer() {
  let overlay = document.getElementById('cart-drawer-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cart-drawer-overlay';
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);
    
    // Bind overlay click to close drawer
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeCartDrawer();
      }
    });
  }

  // Populate drawer
  updateCartDrawerContent();

  // Trigger visual open state
  setTimeout(() => {
    overlay.classList.add('open');
  }, 10);
}

/**
 * Closes the shopping cart drawer
 */
export function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('open');
  }
}

/**
 * Updates/renders the contents of the cart drawer
 */
export function updateCartDrawerContent() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (!overlay) return;

  const cart = appState.cart;
  const isCartEmpty = cart.length === 0;

  let bodyContentHtml = '';
  let footerHtml = '';

  if (isCartEmpty) {
    bodyContentHtml = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h3>Your cart is empty</h3>
        <p>Explore our premium collections and discover the perfect kettle for your brewing ritual.</p>
        <button class="btn btn-primary cart-empty-cta-btn" id="cart-browse-btn">Browse Collection</button>
      </div>
    `;
    footerHtml = '';
  } else {
    // Render list of items
    const itemsHtml = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      return `
        <div class="cart-item" data-product-id="${item.id}" data-color-name="${item.selectedColor}">
          <div class="cart-item-img-container">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          </div>
          
          <div class="cart-item-details">
            <div class="cart-item-header">
              <h4 class="cart-item-name">${item.name}</h4>
              <button class="cart-item-remove-btn" data-action="remove" aria-label="Remove item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
            
            <div class="cart-item-color">${item.selectedColor || 'Standard'}</div>
            
            <div class="cart-item-price-quantity">
              <div class="cart-quantity-selector">
                <button class="qty-btn minus" data-action="decrease" aria-label="Decrease quantity">−</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn plus" data-action="increase" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    bodyContentHtml = `
      <div class="cart-items-list">
        ${itemsHtml}
      </div>
    `;

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    footerHtml = `
      <div class="cart-subtotal-row">
        <span>Subtotal</span>
        <span class="cart-subtotal-val">$${subtotal.toFixed(2)}</span>
      </div>
      <p class="cart-footer-note">Shipping & taxes calculated at checkout.</p>
      <button class="btn btn-primary cart-checkout-btn" id="cart-checkout-btn">Proceed to Checkout</button>
    `;
  }

  overlay.innerHTML = `
    <div class="cart-drawer" id="cart-drawer-panel">
      <!-- Header -->
      <div class="drawer-header">
        <h2 class="font-display">Shopping Cart (${appState.cartCount})</h2>
        <button class="close-drawer-btn" id="close-cart-btn" aria-label="Close cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="drawer-body">
        ${bodyContentHtml}
      </div>

      <!-- Footer -->
      ${!isCartEmpty ? `<div class="drawer-footer">${footerHtml}</div>` : ''}
    </div>
  `;

  // Bind Close Button click
  const closeBtn = document.getElementById('close-cart-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCartDrawer);
  }

  // Bind Browse Collection click (for empty state)
  const browseBtn = document.getElementById('cart-browse-btn');
  if (browseBtn) {
    browseBtn.addEventListener('click', () => {
      closeCartDrawer();
      handleNavigation('catalog');
    });
  }

  // Bind Proceed to Checkout button
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCartDrawer();
      handleNavigation('checkout');
    });
  }

  // Bind Quantity adjustment and deletion click events
  const itemsContainer = overlay.querySelector('.cart-items-list');
  if (itemsContainer) {
    itemsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const cartItem = btn.closest('.cart-item');
      if (!cartItem) return;

      const productId = cartItem.getAttribute('data-product-id');
      const colorName = cartItem.getAttribute('data-color-name');
      const action = btn.getAttribute('data-action');

      const currentItem = cart.find(i => i.id === productId && i.selectedColor === colorName);
      if (!currentItem) return;

      if (action === 'increase') {
        updateCartQuantity(productId, colorName, currentItem.quantity + 1);
      } else if (action === 'decrease') {
        updateCartQuantity(productId, colorName, currentItem.quantity - 1);
      } else if (action === 'remove') {
        // Implement slide-out or fade-out animation before removal
        cartItem.style.transition = 'all 0.3s ease';
        cartItem.style.transform = 'translateX(50px)';
        cartItem.style.opacity = '0';
        setTimeout(() => {
          removeFromCart(productId, colorName);
        }, 300);
      }
    });
  }
}
