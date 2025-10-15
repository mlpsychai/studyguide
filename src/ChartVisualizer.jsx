const { useEffect, useRef, useMemo, memo } = React;

// Main ChartVisualizer Component
function ChartVisualizerComponent({ type, config, sectionId }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Memoize the config to ensure stable reference
  const memoizedConfig = useMemo(() => {
    // Deep clone to ensure we have a stable object
    return JSON.parse(JSON.stringify(config));
  }, [JSON.stringify(config)]);

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
    
    chartRef.current = window.chartUtils.renderChart(canvasId, type, memoizedConfig);

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, memoizedConfig, sectionId]);

  return (
    <div className="my-6 bg-gray-900 p-6 rounded-lg">
      <div style={{ height: '400px', position: 'relative' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

// Wrap with React.memo and custom comparison function
const ChartVisualizer = memo(ChartVisualizerComponent, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props are different (do re-render)
  return (
    prevProps.type === nextProps.type &&
    prevProps.sectionId === nextProps.sectionId &&
    JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config)
  );
});

// Correlation Grid Component
function CorrelationGridComponent({ correlations, sectionId }) {
  const containerRef = useRef(null);

  // Memoize the correlations array to prevent unnecessary re-renders
  const memoizedCorrelations = useMemo(() => {
    return JSON.parse(JSON.stringify(correlations));
  }, [JSON.stringify(correlations)]);

  useEffect(() => {
    if (!containerRef.current || !window.chartUtils) return;

    const containerId = `correlation-grid-${sectionId}`;
    containerRef.current.id = containerId;
    
    window.chartUtils.renderCorrelationGrid(containerId, memoizedCorrelations);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [memoizedCorrelations, sectionId]);

  return (
    <div className="my-6 bg-gray-900 p-6 rounded-lg">
      <div ref={containerRef}></div>
    </div>
  );
}

// Wrap CorrelationGrid with React.memo too
const CorrelationGrid = memo(CorrelationGridComponent, (prevProps, nextProps) => {
  return (
    prevProps.sectionId === nextProps.sectionId &&
    JSON.stringify(prevProps.correlations) === JSON.stringify(nextProps.correlations)
  );
});

// Export to window
window.ChartVisualizer = ChartVisualizer;
window.CorrelationGrid = CorrelationGrid;

console.log('✅ Optimized chart visualizer components loaded');
