/**
 * CHART UTILITIES
 * Shared helper functions for data generation
 */

// ========================================
// DATA GENERATION HELPERS
// ========================================

function generateBellCurveData(mean, sd, min, max, points) {
  const data = [];
  const step = (max - min) / (points - 1);
  
  for (let i = 0; i < points; i++) {
    const x = min + (i * step);
    const normalized = (x - mean) / sd;
    const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * 
             Math.exp(-0.5 * normalized * normalized);
    data.push({ x, y });
  }
  
  return data;
}

function generateCorrelatedData(correlation, numPoints = 100) {
  const data = [];
  
  for (let i = 0; i < numPoints; i++) {
    const x = (Math.random() - 0.5) * 6;
    const randomNoise = (Math.random() - 0.5) * 2;
    const correlatedComponent = x * correlation;
    const noiseComponent = randomNoise * Math.sqrt(1 - Math.abs(correlation));
    const y = correlatedComponent + noiseComponent;
    
    data.push({ x, y });
  }
  
  return data;
}

function generateTrendLine(data) {
  const n = data.length;
  const sumX = data.reduce((sum, d) => sum + d.x, 0);
  const sumY = data.reduce((sum, d) => sum + d.y, 0);
  const sumXY = data.reduce((sum, d) => sum + d.x * d.y, 0);
  const sumXX = data.reduce((sum, d) => sum + d.x * d.x, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  const minX = Math.min(...data.map(d => d.x));
  const maxX = Math.max(...data.map(d => d.x));
  
  return [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept }
  ];
}

// ========================================
// CORRELATION GRID RENDERER
// ========================================

// ✅ FIXED: Store chart references globally to prevent memory leaks
window.correlationCharts = window.correlationCharts || [];

function renderCorrelationGrid(containerId, correlations) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }

  // ✅ FIXED: Destroy old charts before creating new ones
  window.correlationCharts.forEach(chart => {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  });
  window.correlationCharts = [];

  container.innerHTML = '';
  
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  grid.style.gap = '20px';
  
  correlations.forEach((corr, idx) => {
    const chartDiv = document.createElement('div');
    chartDiv.style.height = '300px';
    const canvas = document.createElement('canvas');
    canvas.id = `${containerId}-${idx}`;
    chartDiv.appendChild(canvas);
    grid.appendChild(chartDiv);
    
    setTimeout(() => {
      const chart = renderChart(canvas.id, 'correlation', corr);
      // ✅ FIXED: Store reference for cleanup
      window.correlationCharts.push(chart);
    }, 10);
  });
  
  container.appendChild(grid);
}

// ========================================
// MAIN RENDER FUNCTION
// ========================================

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

  // Look up chart renderer in registry
  const renderFunction = window.chartRegistry[type];
  
  if (renderFunction) {
    return renderFunction(canvasId, config);
  } else {
    console.warn(`Unknown chart type: ${type}. Available types:`, Object.keys(window.chartRegistry));
    return null;
  }
}

// Export to window for browser use
window.chartUtils = { 
  renderChart,
  generateBellCurveData,
  generateCorrelatedData,
  generateTrendLine,
  renderCorrelationGrid
};

console.log('✅ Chart utilities loaded');
