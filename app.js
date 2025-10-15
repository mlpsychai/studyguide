// Simple Vanilla JS App - No React needed
(function () {
  'use strict';
  console.log('🚀 App.js IIFE starting...');

  // --- state -----------------------------------------------------------------
  let currentSection = 'scales';
  let studyData = null;
  let showExtras = false;

  // --- navigation helpers ----------------------------------------------------
  function setHash(id) {
    if (id && location.hash !== '#' + id) {
      history.replaceState(null, '', '#' + id);
    }
  }
  function getHash() {
    return (location.hash || '').replace(/^#/, '') || null;
  }

  // Expose for buttons
  window.setSection = function (sectionId) {
    console.log('📍 setSection called:', sectionId);
    currentSection = sectionId;
    setHash(sectionId);
    renderSidebar();
    renderContent();
    // keep UI tidy on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.toggleExtras = function () {
    showExtras = !showExtras;
    renderSidebar();
    // update button label without re-rendering whole app
    const btn = document.getElementById('toggle-extras-btn');
    if (btn) btn.textContent = showExtras ? 'Hide Extra Charts' : 'Show Extra Charts';
  };

  // --- bootstrap -------------------------------------------------------------
  console.log('🔍 Checking for studyGuideData...', {
    exists: !!window.studyGuideData,
    sections: window.studyGuideData?.sections?.length
  });

  if (window.studyGuideData && window.studyGuideData.sections.length > 0) {
    console.log('✅ Data ready immediately');
    studyData = window.studyGuideData;
    init();
  } else {
    console.log('⏳ Waiting for studyGuideDataReady event...');
    window.addEventListener('studyGuideDataReady', function () {
      console.log('📬 studyGuideDataReady event received');
      studyData = window.studyGuideData;
      init();
    });
  }

  // Allow deep-linking via #section-id
  window.addEventListener('hashchange', () => {
    const hash = getHash();
    if (!hash || !studyData) return;
    const exists = studyData.sections.some(s => s.id === hash);
    if (exists) {
      currentSection = hash;
      renderSidebar();
      renderContent();
    }
  });

  function init() {
    console.log('🎯 init() called with', studyData?.sections?.length, 'sections');
    if (!studyData) {
      console.error('❌ No studyData in init()');
      return;
    }

    // prefer hash if present
    const hash = getHash();
    if (hash && studyData.sections.some(s => s.id === hash)) {
      currentSection = hash;
    } else {
      // ensure currentSection points to a main section if possible
      if (!studyData.sections.find(s => s.id === currentSection && !s.isExtraChart)) {
        const firstMain = studyData.sections.find(s => !s.isExtraChart) || studyData.sections[0];
        if (firstMain) currentSection = firstMain.id;
      }
    }

    renderApp();
    setHash(currentSection);
  }

  // --- renderers -------------------------------------------------------------
  function renderApp() {
    console.log('🎨 renderApp() called');
    const root = document.getElementById('root');
    console.log('🔍 Root element:', root);

    if (!root) {
      console.error('❌ Root element not found!');
      return;
    }

    root.innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <header class="bg-white shadow-md sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 py-4">
            <h1 class="text-2xl font-bold text-gray-800">
              📚 Statistics & Assessment Study Guide
            </h1>
          </div>
        </header>

        <div class="flex max-w-7xl mx-auto">
          <!-- Sidebar -->
          <aside class="w-72 bg-white shadow-lg">
            <nav class="p-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold">Topics</h2>
                <button
                  id="toggle-extras-btn"
                  onclick="window.toggleExtras()"
                  class="text-xs px-2 py-1 rounded border hover:bg-gray-50"
                  title="Show/Hide extra chart sections"
                >${showExtras ? 'Hide' : 'Show'} Extra Charts</button>
              </div>
              <ul class="space-y-2" id="sidebar"></ul>
            </nav>
          </aside>

          <!-- Main content -->
          <main class="flex-1 p-6">
            <div id="content"></div>
          </main>
        </div>
      </div>
    `;

    console.log('✅ HTML injected into root');
    renderSidebar();
    renderContent();
  }

  function renderSidebar() {
    console.log('📋 renderSidebar() called');
    const sidebar = document.getElementById('sidebar');
    console.log('🔍 Sidebar element:', sidebar);

    if (!sidebar || !studyData) {
      console.error('❌ Sidebar missing or no data:', { sidebar: !!sidebar, studyData: !!studyData });
      return;
    }

    const mainSections = studyData.sections.filter(s => !s.isExtraChart);
    const extraSections = studyData.sections.filter(s => s.isExtraChart);

    console.log('📊 Main sections:', mainSections.length, ' | Extra sections:', extraSections.length);

    const renderList = (sections) =>
      sections
        .map(
          (section) => `
      <li>
        <button 
          onclick="window.setSection('${section.id}')" 
          class="w-full text-left px-4 py-2 rounded-lg transition ${
            currentSection === section.id
              ? 'bg-indigo-600 text-white'
              : 'hover:bg-gray-100 text-gray-700'
          }">
          <span class="mr-2">${section.icon || '📖'}</span>
          ${section.title}
        </button>
      </li>`
        )
        .join('');

    sidebar.innerHTML = `
      <div class="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Core Topics</div>
      ${renderList(mainSections)}
      ${
        showExtras
          ? `
        <div class="mt-6 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Extra Charts</div>
        ${renderList(extraSections)}
      `
          : ''
      }
    `;

    console.log('✅ Sidebar rendered');
  }

  function renderContent() {
    console.log('📄 renderContent() called for section:', currentSection);
    const content = document.getElementById('content');

    if (!content || !studyData) {
      console.error('❌ Content missing or no data:', { content: !!content, studyData: !!studyData });
      return;
    }

    const section = studyData.sections.find((s) => s.id === currentSection);
    console.log('🔍 Found section:', section?.title);

    if (!section) {
      content.innerHTML = '<p>Select a topic from the sidebar</p>';
      return;
    }

    let html = `
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-800">
          <span class="text-4xl mr-3">${section.icon || '📖'}</span>
          ${section.title}
        </h2>
      </div>
    `;

    if (section.content) {
      if (section.content.intro) {
        html += `
          <div class="bg-white p-6 rounded-lg shadow mb-6">
            <p class="text-lg text-gray-700">${section.content.intro}</p>
          </div>
        `;
      }

      if (section.content.keyPoint) {
        html += `
          <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <p class="text-gray-800">
              <strong>🔑 Key Point:</strong> ${section.content.keyPoint}
            </p>
          </div>
        `;
      }
    }

    html += '<div id="chart-container"></div>';
    content.innerHTML = html;
    console.log('✅ Content rendered');

    // Render chart if exists
    if (section.visualization && window.chartUtils) {
      console.log('📈 Chart visualization found, rendering...');
      setTimeout(function () {
        const container = document.getElementById('chart-container');
        if (!container) return;

        container.innerHTML = `
          <div class="my-6 bg-gray-900 p-6 rounded-lg">
            <div style="height: 400px; position: relative;">
              <canvas id="chart-${section.id}"></canvas>
            </div>
          </div>
        `;

        setTimeout(function () {
          const viz = section.visualization;
          if (viz.type === 'correlation' && Array.isArray(viz.config)) {
            window.chartUtils.renderCorrelationGrid('chart-container', viz.config);
          } else {
            window.chartUtils.renderChart('chart-' + section.id, viz.type, viz.config);
          }
        }, 100);
      }, 100);
    }
  }

  console.log('✅ App.js IIFE complete');
})();
