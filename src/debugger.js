/**
 * src/debugger.js
 * Helps track down blank-page or silent-load errors.
 * Auto-activates only when ?debug=1 is present in URL.
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('debug')) return;

  console.log('🧩 Debugger active (src/debugger.js)');

  // --- Visual overlay ---
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.bottom = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.maxHeight = '40vh';
  overlay.style.overflowY = 'auto';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.color = '#0f0';
  overlay.style.fontFamily = 'monospace';
  overlay.style.fontSize = '12px';
  overlay.style.padding = '8px';
  overlay.style.zIndex = '99999';
  overlay.innerHTML = '🧠 Debug console active...<br>';
  document.body.appendChild(overlay);

  function log(msg, color = '#0f0') {
    const div = document.createElement('div');
    div.style.color = color;
    div.innerText = msg;
    overlay.appendChild(div);
    console.log('%c' + msg, `color:${color}`);
  }

  // --- Track script load failures ---
  window.addEventListener('error', (e) => {
    log(`❌ Script load or runtime error: ${e.message} @ ${e.filename}:${e.lineno}`, '#f66');
  });

  // --- Detect missing window.studyGuideData ---
  setTimeout(() => {
    if (!window.studyGuideData) {
      log('⚠️ window.studyGuideData not initialized after 3s', '#ff0');
    } else {
      const secCount = window.studyGuideData.sections?.length ?? 0;
      const qCount = window.studyGuideData.quizQuestions?.length ?? 0;
      log(`✅ studyGuideData found (${secCount} sections, ${qCount} questions)`);
    }
  }, 3000);

  // --- Detect root element rendering ---
  setTimeout(() => {
    const root = document.getElementById('root');
    if (!root) {
      log('❌ No #root element found in DOM', '#f66');
    } else if (root.innerHTML.trim().length === 0) {
      log('⚠️ #root exists but is empty after 5s', '#ff0');
    } else {
      log('✅ #root has content', '#0f0');
    }
  }, 5000);

  // --- Log all registered charts ---
  setTimeout(() => {
    const chartTypes = Object.keys(window.chartRegistry || {});
    log(`📊 Registered charts (${chartTypes.length}): ${chartTypes.join(', ') || 'none'}`);
  }, 2000);

  log('🧩 Debugger initialized successfully');
})();
