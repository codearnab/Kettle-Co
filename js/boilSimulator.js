/**
 * Interactive Boil Simulator Module
 */

let state = {
  currentTemp: 22,
  targetTemp: 80,
  wattage: 1200,
  isHeating: false,
  timerId: null,
  bubbleTimerId: null,
  steamTimerId: null
};

// Color maps for dynamic LED color interpolation
const COLOR_COLD = { r: 58, g: 134, b: 255 };  // #3A86FF
const COLOR_WARM = { r: 255, g: 190, b: 11 };  // #FFBE0B
const COLOR_HOT = { r: 255, g: 0, b: 110 };    // #FF006E

/**
 * Initializes the Boil Simulator UI and events
 */
export function initBoilSimulator() {
  // Clear any existing timers before initializing
  cleanupSimulator();

  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  // Render Simulator UI inside main content
  mainContent.innerHTML = `
    <section class="simulator-section container">
      <div class="simulator-layout">
        
        <!-- Left Column: Kettle Device Vector -->
        <div class="kettle-visual-column">
          <!-- Steam container above kettle -->
          <div class="steam-container" id="steam-container"></div>
          
          <div class="kettle-device" id="kettle-device-body">
            <svg class="kettle-svg" viewBox="0 0 300 350" fill="none">
              <!-- Spout path -->
              <path class="kettle-spout" d="M 60 160 C 15 165, 8 75, 45 40 C 50 35, 55 37, 53 45 C 28 85, 38 135, 68 135" stroke="var(--color-text-secondary)" stroke-width="8" stroke-linecap="round" fill="none" />
              <!-- Handle -->
              <path d="M 230 110 C 290 110, 290 270, 230 270" stroke="#141419" stroke-width="16" stroke-linecap="round" fill="none" />
              <path d="M 230 110 C 290 110, 290 270, 230 270" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" fill="none" />
              <!-- Body -->
              <path d="M 70 110 L 230 110 L 241 280 L 59 280 Z" fill="url(#kettle-body-gradient)" stroke="var(--color-border)" stroke-width="2" />
              <!-- Lid -->
              <path d="M 100 110 L 200 110 L 190 95 L 110 95 Z" fill="#141419" stroke="var(--color-border)" stroke-width="2" />
              <circle cx="150" cy="85" r="10" fill="var(--color-primary)" />
              <!-- Base -->
              <rect x="54" y="280" width="192" height="15" rx="4" fill="#0C0C0F" stroke="var(--color-border)" stroke-width="2" />
              
              <defs>
                <linearGradient id="kettle-body-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#1E1E24" />
                  <stop offset="50%" stop-color="#121216" />
                  <stop offset="100%" stop-color="#09090D" />
                </linearGradient>
              </defs>
            </svg>
            
            <!-- Water level visualizer overlays body -->
            <div class="kettle-water-overlay">
              <div class="water-fill" id="water-fill-level">
                <div class="bubbles-container" id="bubbles-container"></div>
              </div>
            </div>

            <!-- Digital smart LCD screen -->
            <div class="kettle-screen">
              <span class="screen-label font-display">CURRENT</span>
              <span class="screen-temp" id="current-temp-lbl">22°C</span>
              <span class="screen-status" id="heating-status-lbl">IDLE</span>
            </div>

            <!-- Glowing base ring indicator -->
            <div class="kettle-led-glow" id="kettle-base-led"></div>
          </div>
        </div>
        
        <!-- Right Column: Settings & Controls Card -->
        <div class="kettle-controls-column">
          <div class="controls-card">
            <h2 class="font-display">Boil Simulator</h2>
            <p>Select a quick preset or drag the slider control to customize your brewing heat. Experience rapid-boil thermal transitions in real-time.</p>
            
            <!-- Target Readout Panel -->
            <div class="target-display">
              <span class="target-label">Target Temperature</span>
              <span class="target-val" id="target-temp-lbl">80°C</span>
            </div>
            
            <!-- Slider Dial -->
            <div class="temp-slider-group">
              <input type="range" min="20" max="100" value="80" class="temp-range-input" id="temp-slider">
              <div class="slider-labels">
                <span>Room (20°C)</span>
                <span>Green Tea (80°C)</span>
                <span>Boil (100°C)</span>
              </div>
            </div>
            
            <!-- Presets Section -->
            <div class="presets-group">
              <label class="font-display">Brew Presets</label>
              <div class="presets-grid">
                <button class="preset-btn" data-preset="80">
                  <span class="preset-temp">80°C</span>
                  <span class="preset-name">Green Tea</span>
                </button>
                <button class="preset-btn" data-preset="85">
                  <span class="preset-temp">85°C</span>
                  <span class="preset-name">Oolong Tea</span>
                </button>
                <button class="preset-btn" data-preset="95">
                  <span class="preset-temp">95°C</span>
                  <span class="preset-name">French Press</span>
                </button>
                <button class="preset-btn" data-preset="100">
                  <span class="preset-temp">100°C</span>
                  <span class="preset-name">Black Tea / Boil</span>
                </button>
              </div>
            </div>
            
            <!-- Wattage Toggle Settings -->
            <div class="watt-selector">
              <div>
                <span class="watt-label font-display">Heating Power Mode</span>
                <div class="watt-description">1200W boils twice as fast.</div>
              </div>
              <div class="watt-toggle-buttons">
                <button class="watt-btn" id="watt-eco-btn" data-watt="600">Eco 600W</button>
                <button class="watt-btn active" id="watt-rapid-btn" data-watt="1200">Rapid 1200W</button>
              </div>
            </div>
            
            <!-- Main Action Trigger -->
            <button class="boil-action-btn start" id="boil-action-trigger">Start Boil</button>
          </div>
        </div>
        
      </div>
    </section>
  `;

  // Bind references and events
  setupSimulatorEvents();
  updateVisuals();
}

/**
 * Clean up active timers when transitioning routes
 */
export function cleanupSimulator() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  if (state.bubbleTimerId) {
    clearInterval(state.bubbleTimerId);
    state.bubbleTimerId = null;
  }
  if (state.steamTimerId) {
    clearInterval(state.steamTimerId);
    state.steamTimerId = null;
  }
  state.isHeating = false;
  state.currentTemp = 22;
}

/**
 * Binds UI listeners
 */
function setupSimulatorEvents() {
  const slider = document.getElementById('temp-slider');
  const actionBtn = document.getElementById('boil-action-trigger');
  
  // Slider dragging
  slider.addEventListener('input', (e) => {
    state.targetTemp = parseInt(e.target.value);
    document.getElementById('target-temp-lbl').innerText = `${state.targetTemp}°C`;
    updatePresetHighlights();
    
    // If target is lower than current temperature and we are holding, reset holding state
    if (state.currentTemp > state.targetTemp && !state.isHeating) {
      state.currentTemp = Math.max(22, state.targetTemp);
      updateVisuals();
    }
  });

  // Presets selection
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const presetTemp = parseInt(btn.getAttribute('data-preset'));
      state.targetTemp = presetTemp;
      slider.value = presetTemp;
      document.getElementById('target-temp-lbl').innerText = `${presetTemp}°C`;
      updatePresetHighlights();
      
      if (state.currentTemp > state.targetTemp && !state.isHeating) {
        state.currentTemp = Math.max(22, state.targetTemp);
        updateVisuals();
      }
    });
  });

  // Wattage selections
  const ecoBtn = document.getElementById('watt-eco-btn');
  const rapidBtn = document.getElementById('watt-rapid-btn');
  
  ecoBtn.addEventListener('click', () => {
    state.wattage = 600;
    ecoBtn.classList.add('active');
    rapidBtn.classList.remove('active');
  });

  rapidBtn.addEventListener('click', () => {
    state.wattage = 1200;
    rapidBtn.classList.add('active');
    ecoBtn.classList.remove('active');
  });

  // Main Action trigger
  actionBtn.addEventListener('click', () => {
    if (state.isHeating) {
      stopBoiling();
    } else {
      startBoiling();
    }
  });

  // Initial Highlights
  updatePresetHighlights();
}

/**
 * Highlights the preset button matching the current slider value
 */
function updatePresetHighlights() {
  document.querySelectorAll('[data-preset]').forEach(btn => {
    const val = parseInt(btn.getAttribute('data-preset'));
    if (val === state.targetTemp) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Start the boiling simulation loop
 */
function startBoiling() {
  if (state.currentTemp >= state.targetTemp) {
    // If already at or above target, let's cool down slightly first to simulate reheating
    state.currentTemp = 22;
  }
  
  state.isHeating = true;
  
  const actionBtn = document.getElementById('boil-action-trigger');
  actionBtn.innerText = 'Stop Boil';
  actionBtn.className = 'boil-action-btn stop';

  const kettleBody = document.getElementById('kettle-device-body');
  kettleBody.classList.add('heating');

  // Trigger bubble loop and steam loop
  startBubbleGeneration();
  startSteamGeneration();

  // Primary Heating Interval
  const timeStep = 150; // ms
  state.timerId = setInterval(() => {
    // Temperature increment depends on wattage
    // 1200W = approx 1.6°C per 150ms step, 600W = approx 0.8°C per step
    const increment = state.wattage === 1200 ? 1.6 : 0.8;
    state.currentTemp += increment;

    if (state.currentTemp >= state.targetTemp) {
      state.currentTemp = state.targetTemp;
      holdBoil();
    }

    updateVisuals();
  }, timeStep);
}

/**
 * Stop the boiling loop
 */
function stopBoiling() {
  cleanupSimulator();
  
  // Reset Action button to start state
  const actionBtn = document.getElementById('boil-action-trigger');
  if (actionBtn) {
    actionBtn.innerText = 'Start Boil';
    actionBtn.className = 'boil-action-btn start';
  }

  // Remove heat styles from kettle
  const kettleBody = document.getElementById('kettle-device-body');
  if (kettleBody) {
    kettleBody.classList.remove('heating');
    kettleBody.classList.remove('boiling');
  }

  // Clear bubbles and steam slowly
  fadeOutElements();
  updateVisuals();
}

/**
 * Triggers holding warm state when temperature target is achieved
 */
function holdBoil() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }

  state.isHeating = false;

  const actionBtn = document.getElementById('boil-action-trigger');
  if (actionBtn) {
    actionBtn.innerText = 'Start Boil';
    actionBtn.className = 'boil-action-btn start';
  }

  const kettleBody = document.getElementById('kettle-device-body');
  if (kettleBody) {
    kettleBody.classList.remove('heating');
    if (state.targetTemp === 100) {
      kettleBody.classList.add('boiling'); // Keep boiling visual bubbling
    }
  }

  // Slow down bubble generation slightly to maintain temperature look
  startBubbleGeneration(true);
}

/**
 * Dynamic color interpolation between two points
 */
function interpolateColor(color1, color2, percentage) {
  const r = Math.round(color1.r + (color2.r - color1.r) * percentage);
  const g = Math.round(color1.g + (color2.g - color1.g) * percentage);
  const b = Math.round(color1.b + (color2.b - color1.b) * percentage);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Calculates LED color and glow strength based on temperature
 */
function getGlowDetails(temp) {
  let color;
  let intensity = 0.2 + (temp - 22) / 78 * 0.8; // scales from 0.2 to 1.0 glow intensity

  if (temp <= 60) {
    const percentage = (temp - 22) / (60 - 22);
    color = interpolateColor(COLOR_COLD, COLOR_WARM, percentage);
  } else {
    const percentage = (temp - 60) / (100 - 60);
    color = interpolateColor(COLOR_WARM, COLOR_HOT, percentage);
  }

  return { color, intensity };
}

/**
 * Updates LED rings, text displays, water animation states
 */
function updateVisuals() {
  const currentTempDisplay = document.getElementById('current-temp-lbl');
  const statusDisplay = document.getElementById('heating-status-lbl');
  const baseLED = document.getElementById('kettle-base-led');
  
  if (!currentTempDisplay) return;

  const displayTemp = Math.round(state.currentTemp);
  currentTempDisplay.innerText = `${displayTemp}°C`;

  // Determine LED glow color and intensity
  const glow = getGlowDetails(state.currentTemp);
  document.documentElement.style.setProperty('--glow-color', glow.color);
  document.documentElement.style.setProperty('--glow-intensity', glow.intensity);

  // Status updates
  if (state.isHeating) {
    statusDisplay.innerText = 'HEATING';
    statusDisplay.style.color = glow.color;
  } else if (state.currentTemp >= state.targetTemp) {
    if (state.targetTemp === 100) {
      statusDisplay.innerText = 'BOILING!';
      statusDisplay.style.color = 'var(--temp-boiling)';
    } else {
      statusDisplay.innerText = 'HOLDING';
      statusDisplay.style.color = 'var(--temp-warm)';
    }
  } else {
    statusDisplay.innerText = 'IDLE';
    statusDisplay.style.color = 'var(--temp-cold)';
  }

  // Manage boiling vibrations
  const kettleBody = document.getElementById('kettle-device-body');
  if (kettleBody) {
    if (state.currentTemp >= 95 && (state.isHeating || state.targetTemp === 100)) {
      kettleBody.classList.add('boiling');
    } else if (state.currentTemp < 95) {
      kettleBody.classList.remove('boiling');
    }
  }
}

/**
 * Spawns bubbles inside the water container
 */
function startBubbleGeneration(isHolding = false) {
  if (state.bubbleTimerId) {
    clearInterval(state.bubbleTimerId);
  }

  const container = document.getElementById('bubbles-container');
  if (!container) return;

  // Controls bubble emission rate based on temperature and hold conditions
  const getIntervalTime = () => {
    const temp = state.currentTemp;
    if (temp < 40) return 99999; // Essentially off
    if (temp < 60) return isHolding ? 1000 : 600;
    if (temp < 80) return isHolding ? 500 : 300;
    if (temp < 95) return isHolding ? 250 : 150;
    return 60; // Max boiling speed
  };

  const createBubble = () => {
    if (state.currentTemp < 40) return;
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random sizes and positions
    const size = Math.random() * (state.currentTemp >= 95 ? 12 : 6) + 3;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 85 + 5}%`;
    bubble.style.animationDuration = `${Math.random() * 1.2 + 0.8}s`;
    
    container.appendChild(bubble);

    // Self cleanup
    setTimeout(() => {
      bubble.remove();
    }, 2000);
  };

  // Run dynamic bubbling check
  state.bubbleTimerId = setInterval(() => {
    createBubble();
  }, getIntervalTime());
}

/**
 * Spawns rising steam above the lid and spout vents
 */
function startSteamGeneration() {
  if (state.steamTimerId) {
    clearInterval(state.steamTimerId);
  }

  const container = document.getElementById('steam-container');
  if (!container) return;

  const createSteam = () => {
    const temp = state.currentTemp;
    if (temp < 60) return; // No steam under 60°C

    const steam = document.createElement('div');
    steam.className = 'steam-cloud';

    // Settings for steam density and velocity
    const size = Math.random() * (temp >= 90 ? 40 : 20) + 15;
    steam.style.width = `${size}px`;
    steam.style.height = `${size}px`;

    // Drift direction
    const driftX = (Math.random() * 40 - 15);
    steam.style.setProperty('--steam-drift', `${driftX}px`);

    // Sprout steam from both spout (left side) and lid (center)
    const isSpout = Math.random() > 0.6;
    if (isSpout) {
      steam.style.left = '20px'; // Spout position
      steam.style.top = '15px';
    } else {
      steam.style.left = `${Math.random() * 80 + 100}px`; // Lid position
      steam.style.top = '40px';
    }

    steam.style.animationDuration = `${Math.random() * 1 + 0.8}s`;
    container.appendChild(steam);

    // Self cleanup
    setTimeout(() => {
      steam.remove();
    }, 1800);
  };

  state.steamTimerId = setInterval(() => {
    createSteam();
  }, 180);
}

/**
 * Fades out bubbles and steam smoothly
 */
function fadeOutElements() {
  const bubbles = document.querySelectorAll('.bubble');
  const steam = document.querySelectorAll('.steam-cloud');

  bubbles.forEach(b => {
    b.style.transition = 'opacity 0.6s ease';
    b.style.opacity = '0';
    setTimeout(() => b.remove(), 600);
  });

  steam.forEach(s => {
    s.style.transition = 'opacity 0.8s ease';
    s.style.opacity = '0';
    setTimeout(() => s.remove(), 800);
  });
}
