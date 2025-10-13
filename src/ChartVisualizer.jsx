// Chart Visualizer React Component
function ChartVisualizer({ type, config, sectionId }) {
  const canvasRef = React.useRef(null);
  const chartId = `chart-${sectionId}`;

  React.useEffect(() => {
    if (!canvasRef.current || !window.Chart || !window.chartUtils) return;

    // Small delay to ensure canvas is in DOM
    const timeoutId = setTimeout(() => {
      const canvas = document.getElementById(chartId);
      if (!canvas) return;

      // Destroy existing chart if present
      const existingChart = window.Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }

      // Render appropriate chart type
      switch(type) {
        case 'normal-distribution':
          window.chartUtils.renderNormalDistribution(chartId, config);
          break;
        case 'skewed':
          window.chartUtils.renderSkewedDistribution(chartId, config);
          break;
        case 'correlation':
          window.chartUtils.renderCorrelationChart(chartId, config);
          break;
        case 'standardized':
          window.chartUtils.renderStandardizedScores(chartId, config);
          break;
        default:
          console.warn('Unknown chart type:', type);
      }
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      const canvas = document.getElementById(chartId);
      if (canvas) {
        const chart = window.Chart.getChart(canvas);
        if (chart) chart.destroy();
      }
    };
  }, [type, config, sectionId, chartId]);

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Visualization</h3>
      <div style={{ position: 'relative', height: '400px' }}>
        <canvas ref={canvasRef} id={chartId}></canvas>
      </div>
    </div>
  );
}

// Export to window for browser compatibility
window.ChartVisualizer = ChartVisualizer;
window.CorrelationGrid = function() { return null; }; // Placeholder for future use
console.log('✅ ChartVisualizer component loaded');
