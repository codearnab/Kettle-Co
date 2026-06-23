import { appState, clearCart, handleNavigation } from '../main.js';

/**
 * Initializes and renders the checkout page inside the container
 * @param {HTMLElement} container - Page main container
 */
export function initCheckoutPage(container) {
  if (appState.cart.length === 0) {
    // If cart is empty, show empty state instead of checkout details
    container.innerHTML = `
      <section class="checkout-section container">
        <div class="checkout-empty-state">
          <div class="checkout-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 class="font-display">Your Cart is Empty</h2>
          <p>You cannot proceed to checkout without adding items to your cart first.</p>
          <button class="btn btn-primary" data-route="catalog">Return to Shop</button>
        </div>
      </section>
    `;
    return;
  }

  // Calculate order totals
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 200 ? 0.00 : 15.00; // Free shipping over $200
  const estimatedTax = subtotal * 0.08; // 8% sales tax
  const total = subtotal + shipping + estimatedTax;

  // Build items summary HTML
  const summaryItemsHtml = appState.cart.map(item => `
    <div class="checkout-summary-item">
      <div class="summary-item-img-wrap">
        <img src="${item.image}" alt="${item.name}">
        <span class="summary-item-qty">${item.quantity}</span>
      </div>
      <div class="summary-item-info">
        <div class="summary-item-name">${item.name}</div>
        <div class="summary-item-color">${item.selectedColor || 'Standard'}</div>
      </div>
      <div class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <section class="checkout-section container">
      <div class="checkout-layout">
        
        <!-- Left: Forms Column -->
        <div class="checkout-forms-column">
          <form id="checkout-form-el" novalidate>
            
            <!-- Shipping Card -->
            <div class="checkout-card">
              <h2 class="font-display">Shipping Information</h2>
              <p class="checkout-card-desc">Where should we deliver your premium designer kettle?</p>
              
              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="shipping-name">Full Name</label>
                  <input type="text" id="shipping-name" placeholder="Alexander Wright" required>
                  <span class="error-feedback">Please enter your full name (minimum 3 characters).</span>
                </div>
                
                <div class="form-group half-width">
                  <label for="shipping-email">Email Address</label>
                  <input type="email" id="shipping-email" placeholder="alexander@domain.com" required>
                  <span class="error-feedback">Please enter a valid email address.</span>
                </div>
                
                <div class="form-group half-width">
                  <label for="shipping-phone">Phone Number</label>
                  <input type="tel" id="shipping-phone" placeholder="+1 (555) 019-2834" required>
                  <span class="error-feedback">Please enter a valid phone number.</span>
                </div>
                
                <div class="form-group full-width">
                  <label for="shipping-address">Delivery Address</label>
                  <input type="text" id="shipping-address" placeholder="1024 Precision Way, Suite 4B" required>
                  <span class="error-feedback">Please enter your delivery address.</span>
                </div>
                
                <div class="form-group third-width">
                  <label for="shipping-city">City</label>
                  <input type="text" id="shipping-city" placeholder="San Francisco" required>
                  <span class="error-feedback">Required field.</span>
                </div>
                
                <div class="form-group third-width">
                  <label for="shipping-zip">Zip/Postal Code</label>
                  <input type="text" id="shipping-zip" placeholder="94103" required>
                  <span class="error-feedback">Valid Zip code required (5-6 digits).</span>
                </div>
                
                <div class="form-group third-width">
                  <label for="shipping-country">Country</label>
                  <select id="shipping-country" required>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Payment Card -->
            <div class="checkout-card" style="margin-top: 32px;">
              <h2 class="font-display">Payment Details</h2>
              <p class="checkout-card-desc">Transactions are secure and fully encrypted.</p>
              
              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="payment-card-number">Card Number</label>
                  <div class="input-card-icon-wrapper">
                    <input type="text" id="payment-card-number" placeholder="4242 4242 4242 4242" maxlength="19" required>
                    <div class="card-brand-icon" id="card-brand-logo">💳</div>
                  </div>
                  <span class="error-feedback">Please enter a valid 16-digit card number.</span>
                </div>
                
                <div class="form-group half-width">
                  <label for="payment-card-expiry">Expiration Date</label>
                  <input type="text" id="payment-card-expiry" placeholder="MM/YY" maxlength="5" required>
                  <span class="error-feedback">Enter expiry date as MM/YY (valid month/future year).</span>
                </div>
                
                <div class="form-group half-width">
                  <label for="payment-card-cvv">Security Code (CVV)</label>
                  <input type="password" id="payment-card-cvv" placeholder="•••" maxlength="4" required>
                  <span class="error-feedback">Valid CVV required (3-4 digits).</span>
                </div>
              </div>
            </div>
            
            <div class="checkout-actions">
              <button type="submit" class="btn btn-primary place-order-btn" id="place-order-submit-btn">
                Place Secure Order • $${total.toFixed(2)}
              </button>
            </div>
            
          </form>
        </div>

        <!-- Right: Summary Column -->
        <div class="checkout-summary-column">
          <div class="checkout-summary-card">
            <h3 class="font-display">Order Summary</h3>
            
            <!-- Items Scroll wrapper -->
            <div class="checkout-summary-items-list">
              ${summaryItemsHtml}
            </div>
            
            <!-- Price calculations breakdown -->
            <div class="checkout-totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? '<span class="free-shipping">FREE</span>' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div class="total-row">
                <span>Estimated Tax (8%)</span>
                <span>$${estimatedTax.toFixed(2)}</span>
              </div>
              <div class="total-row grand-total">
                <span>Grand Total</span>
                <span>$${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Full-screen Loading Processing Overlay -->
    <div class="payment-processing-overlay" id="payment-processing-loader">
      <div class="processing-card">
        <div class="premium-spinner"></div>
        <h3 class="font-display">Authorizing Transaction</h3>
        <p>Please do not refresh or close this browser window. Securing payment gateway...</p>
      </div>
    </div>
  `;

  // Bind validations & event listeners
  bindCheckoutValidation();
}

/**
 * Handles validations and formatting on form fields
 */
function bindCheckoutValidation() {
  const form = document.getElementById('checkout-form-el');
  const cardInput = document.getElementById('payment-card-number');
  const expiryInput = document.getElementById('payment-card-expiry');
  const cvvInput = document.getElementById('payment-card-cvv');
  const nameInput = document.getElementById('shipping-name');
  const emailInput = document.getElementById('shipping-email');
  const phoneInput = document.getElementById('shipping-phone');
  const addressInput = document.getElementById('shipping-address');
  const cityInput = document.getElementById('shipping-city');
  const zipInput = document.getElementById('shipping-zip');

  if (!form) return;

  // Auto-format credit card number input with spacing
  cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    e.target.value = formattedValue;

    // Detect brand (Visa starts with 4, Mastercard with 5, Amex with 3)
    const logoEl = document.getElementById('card-brand-logo');
    if (value.startsWith('4')) {
      logoEl.innerText = '💳 Visa';
      logoEl.style.color = '#3A86FF';
    } else if (value.startsWith('5')) {
      logoEl.innerText = '💳 MC';
      logoEl.style.color = '#FFBE0B';
    } else if (value.startsWith('3')) {
      logoEl.innerText = '💳 Amex';
      logoEl.style.color = '#D4AF37';
    } else {
      logoEl.innerText = '💳';
      logoEl.style.color = 'inherit';
    }
  });

  // Auto-format expiration date input with slash
  expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
      e.target.value = value;
    }
  });

  // Prevent alphabetic keys on CVV
  cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  });

  // Basic validation checkers
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // Basic digit checking
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  };

  const validateExpiry = (expiry) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [m, y] = expiry.split('/').map(num => parseInt(num));
    if (m < 1 || m > 12) return false;
    
    // Check if date is in past
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // last 2 digits
    const currentMonth = now.getMonth() + 1; // 1-indexed

    if (y < currentYear) return false;
    if (y === currentYear && m < currentMonth) return false;
    
    return true;
  };

  const checkFieldValidity = (input, validatorFn) => {
    const formGroup = input.closest('.form-group');
    const isValid = validatorFn ? validatorFn(input.value.trim()) : input.checkValidity();
    
    if (isValid) {
      formGroup.classList.remove('has-error');
      formGroup.classList.add('has-success');
      return true;
    } else {
      formGroup.classList.remove('has-success');
      formGroup.classList.add('has-error');
      return false;
    }
  };

  // Add blur listener validations for interactive UX
  nameInput.addEventListener('blur', () => checkFieldValidity(nameInput, val => val.length >= 3));
  emailInput.addEventListener('blur', () => checkFieldValidity(emailInput, validateEmail));
  phoneInput.addEventListener('blur', () => checkFieldValidity(phoneInput, validatePhone));
  addressInput.addEventListener('blur', () => checkFieldValidity(addressInput, val => val.length >= 5));
  cityInput.addEventListener('blur', () => checkFieldValidity(cityInput));
  zipInput.addEventListener('blur', () => checkFieldValidity(zipInput, val => /^\d{5,6}$/.test(val)));
  cardInput.addEventListener('blur', () => checkFieldValidity(cardInput, val => val.replace(/\s+/g, '').length === 16));
  expiryInput.addEventListener('blur', () => checkFieldValidity(expiryInput, validateExpiry));
  cvvInput.addEventListener('blur', () => checkFieldValidity(cvvInput, val => val.length >= 3));

  // Form Submit Action
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Run validation checks on all fields
    const isNameVal = checkFieldValidity(nameInput, val => val.length >= 3);
    const isEmailVal = checkFieldValidity(emailInput, validateEmail);
    const isPhoneVal = checkFieldValidity(phoneInput, validatePhone);
    const isAddressVal = checkFieldValidity(addressInput, val => val.length >= 5);
    const isCityVal = checkFieldValidity(cityInput);
    const isZipVal = checkFieldValidity(zipInput, val => /^\d{5,6}$/.test(val));
    const isCardVal = checkFieldValidity(cardInput, val => val.replace(/\s+/g, '').length === 16);
    const isExpiryVal = checkFieldValidity(expiryInput, validateExpiry);
    const isCvvVal = checkFieldValidity(cvvInput, val => val.length >= 3);

    const isAllValid = isNameVal && isEmailVal && isPhoneVal && isAddressVal && isCityVal && isZipVal && isCardVal && isExpiryVal && isCvvVal;

    if (!isAllValid) {
      // Find first error group and scroll to it
      const firstError = form.querySelector('.form-group.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Trigger payment processing simulated loading state
    const loader = document.getElementById('payment-processing-loader');
    if (loader) {
      loader.classList.add('active');
    }

    // Capture User details
    const userName = nameInput.value.trim();
    const userEmail = emailInput.value.trim();

    // After 2.5 seconds, clear cart and show confirmation success view
    setTimeout(() => {
      // Clear Cart state
      clearCart();

      // Renders order confirmation
      renderOrderSuccess(userName, userEmail);
    }, 2500);
  });
}

/**
 * Renders the order success landing inside the main-content view
 */
function renderOrderSuccess(userName, userEmail) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  // Generate random order number
  const orderNo = 'KC-' + Math.floor(100000 + Math.random() * 900000);
  
  // Calculate delivery date estimation (approx 4 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const dateOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', dateOptions);

  mainContent.innerHTML = `
    <section class="checkout-success-section container">
      <div class="success-card">
        
        <!-- Animated Check Ring -->
        <div class="success-icon-wrap">
          <svg class="checkmark-svg" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 class="font-display">Order Confirmed</h1>
        <p class="success-thankyou">Thank you for choosing Kettle & Co., ${userName}. Your premium brewing experience will arrive shortly.</p>
        
        <div class="success-details-grid">
          <div class="detail-tile">
            <span class="tile-label">Order Number</span>
            <span class="tile-val font-display" style="color: var(--color-primary);">${orderNo}</span>
          </div>
          
          <div class="detail-tile">
            <span class="tile-label">Estimated Delivery</span>
            <span class="tile-val font-display">${formattedDeliveryDate}</span>
          </div>
          
          <div class="detail-tile full-tile">
            <span class="tile-label">Status Notifications</span>
            <span class="tile-val">A tracking number and order statement have been sent to <strong>${userEmail}</strong>.</span>
          </div>
        </div>

        <div class="success-actions">
          <button class="btn btn-primary" id="success-return-btn">Continue Shopping</button>
        </div>

      </div>
    </section>
  `;

  // Bind return button click action
  const returnBtn = document.getElementById('success-return-btn');
  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      handleNavigation('home');
    });
  }
}
