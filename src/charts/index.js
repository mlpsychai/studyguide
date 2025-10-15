/**
 * CHART REGISTRY
 * Centralizes chart type registration and lookup
 */

// Global registry for all chart types
window.chartRegistry = {};

// Register a chart rendering function
window.registerChart = function(type, renderFunction) {
  window.chartRegistry[type] = renderFunction;
  console.log(`✅ Registered chart: ${type}`);
};

console.log('✅ Chart registry initialized');
