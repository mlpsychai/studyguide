const { useEffect, useRef } = React;

function ChartVisualizer({ type, config, sectionId }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !window.chartUtils) {
      console.error('Canvas or chartUtils not available');
      return;
    }

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Render new chart
    const canvasId = `chart-${sectionId}`;
    canvasRef.current.id = canvasId;
    
    chartRef.current = window.chartUtils.renderChart(canvasId, type, config);

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, config, sectionId]);

  return (
    <div className="my-6 bg-gray-900 p-6 rounded-lg">
      <div style={{ height: '400px', position: 'relative' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

function CorrelationGrid({ correlations, sectionId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !window.chartUtils) return;

    const containerId = `correlation-grid-${sectionId}`;
    containerRef.current.id = containerId;
    
    window.chartUtils.renderCorrelationGrid(containerId, correlations);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [correlations, sectionId]);

  return (
    <div className="my-6 bg-gray-900 p-6 rounded-lg">
      <div ref={containerRef}></div>
    </div>
  );
}

// Export to window
window.ChartVisualizer = ChartVisualizer;
window.CorrelationGrid = CorrelationGrid;

console.log('✅ Chart visualizer components loaded');
