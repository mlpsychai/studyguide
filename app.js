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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.toggleExtras = function () {
    showExtras = !showExtras;
    renderSidebar();
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
    const exists = studyData.sections.some((s) => s.id === hash);
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
    if (hash && studyData.sections.some((s) => s.id === hash)) {
      currentSection = hash;
    } else {
      // ensure currentSection points to a main section if possible
      if (!studyData.sections.find((s) => s.id === currentSection && !s.isExtraChart)) {
        const firstMain = studyData.sections.find((s) => !s.isExtraChart) || studyData.sections[0];
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

    const mainSections = studyData.sections.filter((s) => !s.isExtraChart);
    const extraSections = studyData.sections.filter((s) => s.isExtraChart);

    console.log('📊 Main sections:', mainSections.length, ' | Extra sections:', extraSections.length);

    const renderList = (sections) =>
      sections
        .map(
          (section) => `
      <li>
        <button 
          onclick="window.setSection('${section.id}')" 
          class="w-full text-left px-4 py-2 rounded-lg transition ${
            currentSection === section.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-700'
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

  // ⬇️ NEW: richer renderer that shows arrays/objects in section.content
  function renderContent() {
    console.log('📄 renderContent() called for section:', currentSection);
    const contentEl = document.getElementById('content');
    if (!contentEl || !studyData) {
      console.error('❌ Content missing or no data:', { content: !!contentEl, studyData: !!studyData });
      return;
    }

    const section = studyData.sections.find((s) => s.id === currentSection);
    console.log('🔍 Found section:', section?.title);

    if (!section) {
      contentEl.innerHTML = '<p>Select a topic from the sidebar</p>';
      return;
    }

    // helpers
    const asList = (items) => `
      <ul class="list-disc ml-6 space-y-1">
        ${items.map((i) => `<li>${typeof i === 'string' ? i : JSON.stringify(i)}</li>`).join('')}
      </ul>`;

    const card = (body) => `<div class="bg-white p-6 rounded-lg shadow mb-6">${body}</div>`;

    const namedList = (items) => `
      <div class="space-y-3">
        ${items
          .map(
            (o) => `
          <div class="bg-white p-4 rounded-lg shadow">
            ${o.title || o.name ? `<h4 class="font-semibold text-gray-800 mb-1">${o.title ?? o.name}</h4>` : ''}
            ${o.whatItIs || o.description || o.content ? `<p class="text-gray-700">${o.whatItIs ?? o.description ?? o.content}</p>` : ''}
            ${o.howToCalculate ? `<p class="mt-1 text-gray-700"><span class="font-medium">How:</span> ${o.howToCalculate}</p>` : ''}
            ${o.whenToUse ? `<p class="mt-1 text-gray-700"><span class="font-medium">When:</span> ${o.whenToUse}</p>` : ''}
            ${o.purpose ? `<p class="mt-1 text-gray-700"><span class="font-medium">Purpose:</span> ${o.purpose}</p>` : ''}
            ${o.formula ? `<p class="font-mono text-sm mt-1">${o.formula}</p>` : ''}
            ${o.relationship ? `<p class="mt-1 text-gray-700">${o.relationship}</p>` : ''}
            ${o.skills?.length ? `<div class="mt-2"><h5 class="font-medium">Skills</h5>${asList(o.skills)}</div>` : ''}
            ${o.types?.length ? `<div class="mt-2"><h5 class="font-medium">Types</h5>${asList(o.types)}</div>` : ''}
            ${o.factors?.length ? `<div class="mt-2"><h5 class="font-medium">Factors</h5>${asList(o.factors)}</div>` : ''}
            ${o.points?.length ? `<div class="mt-2">${asList(o.points)}</div>` : ''}
            ${o.examples ? `<p class="mt-1 text-gray-700"><span class="font-medium">Examples:</span> ${Array.isArray(o.examples) ? o.examples.join(', ') : o.examples}</p>` : ''}
            ${o.note ? `<p class="mt-1 italic text-gray-600">${o.note}</p>` : ''}
          </div>`
          )
          .join('')}
      </div>`;

    // header
    let html = `
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-800">
          <span class="text-4xl mr-3">${section.icon || '📖'}</span>${section.title}
        </h2>
      </div>
    `;

    const c = section.content || {};
    if (c.intro) html += card(`<p class="text-lg text-gray-700">${c.intro}</p>`);
    if (c.keyPoint) {
      html += `
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mb-6">
          <p class="text-gray-800"><strong>🔑 Key Point:</strong> ${c.keyPoint}</p>
        </div>`;
    }

    // common arrays
    if (c.measures?.length) html += `<h3 class="text-xl font-semibold mb-2">Measures</h3>` + namedList(c.measures);
    if (c.types?.length) html += `<h3 class="text-xl font-semibold mb-2 mt-6">Types</h3>` + namedList(c.types);
    if (c.ranges?.length) html += `<h3 class="text-xl font-semibold mb-2 mt-6">Ranges</h3>` + namedList(c.ranges);
    if (c.subsections?.length) html += `<h3 class="text-xl font-semibold mb-2 mt-6">Details</h3>` + namedList(c.subsections);
    if (c.concepts?.length) html += `<h3 class="text-xl font-semibold mb-2 mt-6">Concepts</h3>` + namedList(c.concepts);
    if (c.ordinalScores?.length) html += `<h3 class="text-xl font-semibold mb-2 mt-6">Ordinal Scores</h3>` + namedList(c.ordinalScores);
    if (c.scales?.length) html += `<h3 class="text-xl font-semibold mb-2 mt-6">Scales</h3>` + namedList(c.scales);

    // nested objects
    if (c.activity?.topics?.length) {
      html += `<h3 class="text-xl font-semibold mb-2 mt-6">Activity Topics</h3>` + card(asList(c.activity.topics));
    }
    if (c.significance) {
      const s = c.significance;
      html += card(`
        <div>
          <h4 class="font-semibold text-gray-800 mb-1">Significance</h4>
          ${s.level ? `<p><span class="font-medium">Level:</span> ${s.level}</p>` : ''}
          ${s.meaning ? `<p>${s.meaning}</p>` : ''}
        </div>`);
    }

    // chart container
    html += '<div id="chart-container"></div>';
    contentEl.innerHTML = html;
    console.log('✅ Content rendered');

    // charts
    if (section.visualization && window.chartUtils) {
      setTimeout(() => {
        const container = document.getElementById('chart-container');
        if (!container) return;
        container.innerHTML = `
          <div class="my-6 bg-gray-900 p-6 rounded-lg">
            <div style="height:400px;position:relative;">
              <canvas id="chart-${section.id}"></canvas>
            </div>
          </div>`;
        setTimeout(() => {
          const viz = section.visualization;
          if (viz.type === 'correlation' && Array.isArray(viz.config)) {
            window.chartUtils.renderCorrelationGrid('chart-container', viz.config);
          } else {
            window.chartUtils.renderChart('chart-' + section.id, viz.type, viz.config);
          }
        }, 100);
      }, 100);
    }

    // debug peek
    if (location.search.includes('debug=1')) {
      const dbg = document.createElement('details');
      dbg.className = 'mt-4';
      dbg.innerHTML = `<summary class="cursor-pointer text-sm text-gray-600">Debug: raw content</summary>
        <pre class="text-xs bg-gray-100 p-3 rounded overflow-auto">${JSON.stringify(section.content, null, 2)}</pre>`;
      contentEl.appendChild(dbg);
    }
  }

  console.log('✅ App.js IIFE complete');
})();

