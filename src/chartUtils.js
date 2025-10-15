// Keep only utility functions (data generation helpers, etc.)
// Remove individual render functions

// Main render function now just looks up in registry
function renderChart(canvasId, type, config = {}) {
  const canvas = document.getElementById(canvasId);
  
  if (!canvas) {
    console.error(`Canvas not found: ${canvasId}`);
    return null;
  }

  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }

  // Look up in registry
  const renderFunction = window.chartRegistry[type];
  
  if (renderFunction) {
    return renderFunction(canvasId, config);
  } else {
    console.warn(`Unknown chart type: ${type}`);
    return null;
  }
}

window.chartUtils = { renderChart };
