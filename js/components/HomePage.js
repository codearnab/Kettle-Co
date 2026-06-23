import { products } from '../products.js';
import { renderProductCard } from './ProductCard.js';

/**
 * Customer review data
 */
const reviews = [
  {
    name: 'Sarah M.',
    title: 'Worth Every Penny',
    text: 'The Apex Smart Kettle completely changed my morning routine. The precision temperature control means my pour-over coffee is perfect every single time. The build quality is absolutely stunning.',
    rating: 5,
    product: 'The Apex Smart Kettle',
    avatar: 'S',
    date: 'Nov 2024'
  },
  {
    name: 'James K.',
    title: 'A True Work of Art',
    text: 'I bought the Heritage Cast Iron as a gift for my wife, and we both fell in love with it. The craftsmanship from the Nambu foundry is extraordinary — it\'s functional art that elevates every tea ceremony.',
    rating: 5,
    product: 'The Heritage Cast Iron',
    avatar: 'J',
    date: 'Oct 2024'
  },
  {
    name: 'Priya R.',
    title: 'Perfect for Travel',
    text: 'As a digital nomad, the Voyager Flask is my most essential piece of gear. USB-C charging, lightweight titanium, and it keeps water hot for hours. I use it on flights, trains, and at co-working spaces.',
    rating: 5,
    product: 'The Voyager Smart Flask',
    avatar: 'P',
    date: 'Dec 2024'
  },
  {
    name: 'Daniel W.',
    title: 'Pour-Over Perfection',
    text: 'The gooseneck spout on the Aero is the best I\'ve ever used. The counterbalanced handle makes long pour sessions effortless. I\'ve retired my old kettle permanently.',
    rating: 4,
    product: 'The Aero Precision Gooseneck',
    avatar: 'D',
    date: 'Jan 2025'
  }
];

/**
 * FAQ data
 */
const faqs = [
  {
    question: 'What makes Kettle & Co. kettles different from regular kettles?',
    answer: 'Our kettles are precision-engineered with medical-grade materials, smart connectivity, and micro-degree temperature control. Each model is designed for a specific brewing philosophy — from pour-over artistry to rugged travel performance.'
  },
  {
    question: 'Do your smart kettles require a subscription?',
    answer: 'No. The companion app is completely free with no subscriptions, hidden fees, or paywalls. All firmware updates are delivered over-the-air at no cost for the lifetime of the product.'
  },
  {
    question: 'What is your warranty and return policy?',
    answer: 'Every Kettle & Co. product comes with a 2-year comprehensive warranty covering manufacturing defects and component failures. We also offer a 30-day no-questions-asked return policy with free return shipping.'
  },
  {
    question: 'Are your kettles compatible with induction stovetops?',
    answer: 'Compatibility varies by model. The Neo Traditionalist and Bamboo Flow are induction-compatible. The Heritage Cast Iron is not. Smart kettles use their own electric bases. Check the Technical Specs tab on each product page for full compatibility details.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping is free on orders over $150 and arrives in 3-5 business days. Express shipping (1-2 business days) is available at checkout for a flat fee of $12. All orders ship with tracking and insurance.'
  },
  {
    question: 'Can I control the kettle with voice assistants?',
    answer: 'Yes! The Prism Smart Pro supports both Amazon Alexa and Google Home voice commands. The Apex and Ion Glass models support app control over Bluetooth and Wi-Fi but not direct voice assistant integration.'
  }
];

/**
 * Renders the full homepage inside the main content container.
 * @param {HTMLElement} container - The #main-content element
 * @param {Function} addToCart - The addToCart callback from main
 * @param {Function} onNavigate - Navigation callback (route, productId?)
 */
export function initHomePage(container, addToCart, onNavigate) {

  // Build featured products HTML
  const featuredProducts = products
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map(p => renderProductCard(p))
    .join('');

  // Build reviews HTML
  const reviewsHtml = reviews.map(r => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    return `
      <article class="review-card">
        <div class="review-header">
          <div class="review-avatar">${r.avatar}</div>
          <div class="review-meta">
            <h4 class="review-name">${r.name}</h4>
            <span class="review-date">${r.date}</span>
          </div>
          <span class="review-stars">${stars}</span>
        </div>
        <h3 class="review-title">"${r.title}"</h3>
        <p class="review-text">${r.text}</p>
        <span class="review-product">— ${r.product}</span>
      </article>
    `;
  }).join('');

  // Build FAQ HTML
  const faqsHtml = faqs.map((faq, i) => `
    <div class="faq-item" id="faq-item-${i}">
      <button class="faq-question" data-faq-index="${i}" aria-expanded="false">
        <span>${faq.question}</span>
        <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section container">
      <div class="hero-content">
        <div class="hero-tag">
          <span class="hero-tag-dot"></span>
          The Future of Brewing
        </div>
        <h1 class="hero-title">Crafting the<br>Perfect Pour</h1>
        <p class="hero-description">
          Sleek design meets micro-degree thermal accuracy. Kettle & Co. reimagines the daily brewing ritual with medical-grade materials, custom fluid engineering, and modern smart connectivity.
        </p>
        <div class="btn-group">
          <button class="btn btn-primary" id="view-catalog-btn">Browse Kettles</button>
          <button class="btn btn-secondary" id="view-simulator-btn">Try Boil Simulator</button>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-val">0.1<span>°C</span></span>
            <span class="stat-lbl">Precision Hold</span>
          </div>
          <div class="stat-item">
            <span class="stat-val">1200<span>W</span></span>
            <span class="stat-lbl">Rapid Steam</span>
          </div>
          <div class="stat-item">
            <span class="stat-val">100<span>%</span></span>
            <span class="stat-lbl">Medical Steel</span>
          </div>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="visual-aura"></div>
        <div class="visual-image-wrapper">
          <img src="/images/apex-kettle.png" alt="The Apex Smart Kettle" class="hero-product-img">
        </div>
        <div class="visual-badge">
          <span class="badge-ring"></span>
          <div class="badge-text">
            <div>Kettle-Co. Connected</div>
            <div>Status: Ready (22°C)</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURES SECTION ===== -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2>Engineered to Perfection</h2>
          <p>Every dynamic detail of our kettles is crafted for unparalleled control over your extraction.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3>Thermal Accuracy</h3>
            <p>Boil at the exact temperature required for your coffee bean roast or delicate herbal teas. Avoid scorching and optimize flavor extractions.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3>Double-Wall Isolation</h3>
            <p>Premium 316 medical-grade stainless steel interior paired with an insulated safety shield. Keeps water warm for hours while remaining safe to handle.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
              </svg>
            </div>
            <h3>Smart Companion App</h3>
            <p>Sync presets, set automated schedules, and manage warm options over Bluetooth and Wi-Fi using the custom mobile interface.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURED PRODUCTS SECTION ===== -->
    <section class="home-products-section">
      <div class="container">
        <div class="home-products-header">
          <div class="section-header" style="margin-bottom: 0; text-align: left; margin-left: 0;">
            <h2>Featured Collection</h2>
            <p>Our most loved kettles, handpicked by our connoisseurs.</p>
          </div>
          <button class="btn btn-secondary" id="home-view-all-btn">View All →</button>
        </div>
        <div class="products-grid" id="home-products-grid">
          ${featuredProducts}
        </div>
      </div>
    </section>

    <!-- ===== REVIEWS SECTION ===== -->
    <section class="reviews-section">
      <div class="container">
        <div class="section-header">
          <h2>What Our Customers Say</h2>
          <p>Real reviews from connoisseurs who've elevated their brewing experience.</p>
        </div>
        <div class="reviews-grid" id="reviews-grid">
          ${reviewsHtml}
        </div>
      </div>
    </section>

    <!-- ===== FAQ SECTION ===== -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about Kettle & Co. products.</p>
        </div>
        <div class="faq-list" id="faq-list">
          ${faqsHtml}
        </div>
      </div>
    </section>
  `;

  // ---- BIND EVENT LISTENERS ----

  // Featured products grid interactions
  const homeGrid = document.getElementById('home-products-grid');
  if (homeGrid) {
    homeGrid.addEventListener('click', (e) => {
      const detailTrigger = e.target.closest('[data-detail-trigger]');
      if (detailTrigger) {
        const prodId = detailTrigger.getAttribute('data-detail-trigger');
        if (prodId) onNavigate('product', prodId);
        return;
      }

      const cartAddTrigger = e.target.closest('[data-cart-add]');
      if (cartAddTrigger) {
        addToCart(cartAddTrigger.getAttribute('data-cart-add'));
        return;
      }

      const swatchTrigger = e.target.closest('[data-color-name]');
      if (swatchTrigger) {
        const card = swatchTrigger.closest('.product-card');
        if (card) {
          card.querySelectorAll('[data-color-name]').forEach(s => s.classList.remove('active'));
          swatchTrigger.classList.add('active');
        }
      }
    });
  }

  // View All button
  const viewAllBtn = document.getElementById('home-view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => onNavigate('catalog'));
  }

  // FAQ Accordion
  const faqList = document.getElementById('faq-list');
  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const questionBtn = e.target.closest('.faq-question');
      if (!questionBtn) return;

      const faqItem = questionBtn.closest('.faq-item');
      const isOpen = faqItem.classList.contains('open');

      // Close all items
      faqList.querySelectorAll('.faq-item.open').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        faqItem.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
}
