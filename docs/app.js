// Import demos
import { demos } from './demos.js';

// Main application logic
let currentApp = null;
let currentDemo = null;

// Get demo ID from URL
function getDemoFromURL() {
  const hash = window.location.hash.slice(1);
  return hash || 'basic';
}

// Update URL when demo changes
function updateURL(demoId) {
  window.location.hash = demoId;
}

// Helper function to create PIXI app
async function createPixiApp(container, width = 600, height = 600, backgroundColor = 0x333333) {
  const app = new PIXI.Application();
  await app.init({
    width,
    height,
    background: backgroundColor,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  });

  container.appendChild(app.canvas);
  return app;
}

// Function to clean up previous demo
function cleanupDemo() {
  if (currentApp) {
    try {
      // Remove canvas from DOM first
      if (currentApp.canvas && currentApp.canvas.parentNode) {
        currentApp.canvas.parentNode.removeChild(currentApp.canvas);
      }

      // Destroy all children from stage if it exists
      if (currentApp.stage) {
        currentApp.stage.removeChildren();
      }

      // Destroy the entire application
      // The destroy method should handle renderer cleanup
      currentApp.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true
      });
    } catch (error) {
      console.warn('Error during cleanup:', error);
    } finally {
      currentApp = null;
    }
  }
  currentDemo = null;
}

// Function to load and display a demo
async function loadDemo(demoId) {
  const demoConfig = demos[demoId];
  if (!demoConfig) return;

  // Update URL
  updateURL(demoId);

  // Clean up previous demo
  cleanupDemo();

  // Update active navigation button
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.demo === demoId);
  });

  // Create demo container content
  const container = document.getElementById('demo-container');
  container.innerHTML = `
    <div class="demo-header">
      <h2 class="demo-title">${demoConfig.title}</h2>
      <p class="demo-description">${demoConfig.description}</p>
    </div>
    <div class="demo-content">
      <div class="canvas-section">
        <div class="canvas-container" id="pixi-container"></div>
      </div>
      <div class="code-section">
        <div class="code-tabs">
          <button class="code-tab active" data-tab="code">Code</button>
          <button class="code-tab" data-tab="styles">Styles</button>
          <button class="code-tab" data-tab="full">Full Example</button>
        </div>
        <div class="code-content">
          <button class="copy-btn" data-copy="code">Copy</button>
          <div class="code-panel active" data-panel="code">
            <pre><code class="language-javascript">${escapeHtml(demoConfig.code)}</code></pre>
          </div>
          <div class="code-panel" data-panel="styles">
            <pre><code class="language-javascript">${escapeHtml(getStylesCode(demoConfig.code))}</code></pre>
          </div>
          <div class="code-panel" data-panel="full">
            <pre><code class="language-javascript">${escapeHtml(getFullCode(demoConfig.code))}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;

  container.classList.add('active');

  // Apply syntax highlighting
  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightBlock(block);
  });

  // Initialize PIXI demo
  const pixiContainer = document.getElementById('pixi-container');
  currentApp = await createPixiApp(pixiContainer);

  // Initialize the demo (handle both sync and async)
  let result = demoConfig.init();
  if (result && typeof result.then === 'function') {
    result = await result;
  }

  // Handle single or multiple Glyphs objects
  if (Array.isArray(result)) {
    result.forEach(text => {
      text.x = text.x !== undefined ? text.x : 30;
      text.y = text.y !== undefined ? text.y : 30;
      currentApp.stage.addChild(text);
    });
    currentDemo = result[0]; // Store first one as main demo
  } else if (result) {
    result.x = 30;
    result.y = 30;
    currentApp.stage.addChild(result);
    currentDemo = result;
  }

  // Run animation if available
  if (demoConfig.animate && currentDemo) {
    demoConfig.animate(currentDemo, currentApp);
  }

  // Setup code tab switching
  document.querySelectorAll('.code-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;

      // Update active tab
      document.querySelectorAll('.code-tab').forEach(t => {
        t.classList.toggle('active', t === tab);
      });

      // Update active panel
      document.querySelectorAll('.code-panel').forEach(panel => {
        panel.classList.toggle('active', panel.dataset.panel === tabName);
      });

      // Update copy button
      const copyBtn = document.querySelector('.copy-btn');
      copyBtn.dataset.copy = tabName;
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    });
  });

  // Setup copy functionality
  const copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const tabName = copyBtn.dataset.copy;
      const panel = document.querySelector(`.code-panel[data-panel="${tabName}"]`);
      const code = panel.querySelector('code').textContent;

      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  }
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Helper function to extract styles section from code
function getStylesCode(fullCode) {
  const stylesMatch = fullCode.match(/const styles = \{[\s\S]*?\n\};/);
  return stylesMatch ? stylesMatch[0] : '// Styles not found';
}

// Helper function to create full runnable example
function getFullCode(code) {
  return `// Full working example
// First, include PIXI.js and pixi-tagged-text in your HTML:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.2.2/browser/pixi.min.js"></script>
// <script src="path/to/pixi-tagged-text.umd.js"></script>

// Create PIXI Application
const app = new PIXI.Application({
  width: 600,
  height: 600,
  backgroundColor: 0x333333
});
document.body.appendChild(app.view);

// Create Glyphs
${code}

// Add to stage
glyphs.x = 30;
glyphs.y = 30;
app.stage.addChild(glyphs);`;
}

// Setup navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Add click listeners to navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const demoId = btn.dataset.demo;
      loadDemo(demoId);
    });
  });

  // Handle browser back/forward navigation
  window.addEventListener('hashchange', () => {
    const demoId = getDemoFromURL();
    loadDemo(demoId);
  });

  // Load the initial demo from URL or default to 'basic'
  const initialDemo = getDemoFromURL();
  loadDemo(initialDemo);
});

// Handle window resize
window.addEventListener('resize', () => {
  if (currentApp && currentApp.renderer) {
    currentApp.renderer.resize(
      Math.min(600, window.innerWidth - 100),
      Math.min(600, window.innerHeight - 200)
    );
  }
});