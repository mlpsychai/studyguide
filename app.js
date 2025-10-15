// Simple Vanilla JS App - No React needed
(function() {
  let currentSection = 'scales';
  let studyData = null;
  
  // Define global function first
  window.setSection = function(sectionId) {
    currentSection = sectionId;
    renderSidebar();
    renderContent();
  };
  
  // Check immediately - no DOMContentLoaded wait
if (window.studyGuideData && window.studyGuideData.sections.length > 0) {
  studyData = window.studyGuideData;
  init();
} else {
  window.addEventListener('studyGuideDataReady', function() {
    studyData = window.studyGuideData;
    init();
  });
}
      
      // Fallback: check periodically
      setTimeout(function() {
        if (window.studyGuideData && !studyData) {
          studyData = window.studyGuideData;
          init();
        }
      }, 1000);
    }
  });
  
  function init() {
    console.log('Initializing app with', studyData.sections.length, 'sections');
    renderApp();
  }
  
  function renderApp() {
    document.getElementById('root').innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <header class="bg-white shadow-md sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 py-4">
            <h1 class="text-2xl font-bold text-gray-800">
              📚 Statistics & Assessment Study Guide
            </h1>
          </div>
        </header>
        <div class="flex max-w-7xl mx-auto">
          <aside class="w-64 bg-white shadow-lg">
            <nav class="p-4">
              <h2 class="text-lg font-bold mb-4">Topics</h2>
              <ul class="space-y-2" id="sidebar"></ul>
            </nav>
          </aside>
          <main class="flex-1 p-6">
            <div id="content"></div>
          </main>
        </div>
      </div>
    `;
    
    renderSidebar();
    renderContent();
  }
  
  function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar || !studyData) return;
    
    const sections = studyData.sections.filter(s => !s.isExtraChart);
    
    sidebar.innerHTML = sections.map(section => `
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
      </li>
    `).join('');
  }
  
  function renderContent() {
    const content = document.getElementById('content');
    if (!content || !studyData) return;
    
    const section = studyData.sections.find(s => s.id === currentSection);
    
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
    
    // Render chart if exists
    if (section.visualization && window.chartUtils) {
      setTimeout(function() {
        const container = document.getElementById('chart-container');
        if (!container) return;
        
        container.innerHTML = `
          <div class="my-6 bg-gray-900 p-6 rounded-lg">
            <div style="height: 400px; position: relative;">
              <canvas id="chart-${section.id}"></canvas>
            </div>
          </div>
        `;
        
        setTimeout(function() {
          const viz = section.visualization;
          if (viz.type === 'correlation' && Array.isArray(viz.config)) {
            window.chartUtils.renderCorrelationGrid('chart-container', viz.config);
          } else {
            window.chartUtils.renderChart(
              'chart-' + section.id, 
              viz.type, 
              viz.config
            );
          }
        }, 100);
      }, 100);
    }
  }
})();
