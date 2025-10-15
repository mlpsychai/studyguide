(function() {
  const { useEffect, useRef, useMemo, memo } = React;

// Main ChartVisualizer Component
function ChartVisualizerComponent({ type, config, sectionId }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Memoize the config to ensure stable reference
  const memoizedConfig = useMemo(() => {
    // Deep clone to ensure we have a stable object
    try {
      return JSON.parse(JSON.stringify(config || {}));
    } catch (e) {
      console.error('Config parsing error:', e);
      return {};
    }
  }, [JSON.stringify(config)]);

  useEffect(() => {
    // Wait for chartUtils to be available
    if (!window.chartUtils) {
      console.warn('chartUtils not yet available, waiting...');
      const checkInterval = setInterval(() => {
        if (window.chartUtils) {
          clearInterval(checkInterval);
          // Re-trigger effect by updating state
          if (canvasRef.current) {
            renderChart();
          }
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    const renderChart = () => {
      if (!canvasRef.current || !window.chartUtils) {
        console.error('Canvas or chartUtils not available');
        return;
      }

      // Destroy existing chart
      if (chartRef.current && chartRef.current.destroy) {
        chartRef.current.destroy();
      }

      // Render new chart
      const canvasId = `chart-${sectionId}`;
      canvasRef.current.id = canvasId;
      
      try {
        chartRef.current = window.chartUtils.renderChart(canvasId, type, memoizedConfig);
      } catch (e) {
        console.error('Error rendering chart:', e);
      }
    };

    renderChart();

    // Cleanup
    return () => {
      if (chartRef.current && chartRef.current.destroy) {
        chartRef.current.destroy();
      }
    };
  }, [type, memoizedConfig, sectionId]);

  return React.createElement('div', { className: 'my-6 bg-gray-900 p-6 rounded-lg' },
    React.createElement('div', { style: { height: '400px', position: 'relative' } },
      React.createElement('canvas', { ref: canvasRef })
    )
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
    try {
      return JSON.parse(JSON.stringify(correlations || []));
    } catch (e) {
      console.error('Correlations parsing error:', e);
      return [];
    }
  }, [JSON.stringify(correlations)]);

  useEffect(() => {
    if (!containerRef.current || !window.chartUtils) {
      if (!window.chartUtils) {
        console.warn('chartUtils not yet available for CorrelationGrid');
      }
      return;
    }

    const containerId = `correlation-grid-${sectionId}`;
    containerRef.current.id = containerId;
    
    try {
      window.chartUtils.renderCorrelationGrid(containerId, memoizedCorrelations);
    } catch (e) {
      console.error('Error rendering correlation grid:', e);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [memoizedCorrelations, sectionId]);

  return React.createElement('div', { className: 'my-6 bg-gray-900 p-6 rounded-lg' },
    React.createElement('div', { ref: containerRef })
  );
}

// Wrap CorrelationGrid with React.memo too
const CorrelationGrid = memo(CorrelationGridComponent, (prevProps, nextProps) => {
  return (
    prevProps.sectionId === nextProps.sectionId &&
    JSON.stringify(prevProps.correlations) === JSON.stringify(nextProps.correlations)
  );
});

// Export to window with safety checks
if (typeof window !== 'undefined') {
  // Ensure we're not overwriting if already defined
  if (!window.ChartVisualizer) {
    window.ChartVisualizer = ChartVisualizer;
  }
  if (!window.CorrelationGrid) {
    window.CorrelationGrid = CorrelationGrid;
  }
  
  // Signal that components are ready
  window.chartVisualizerReady = true;
  
  // Call any waiting callbacks
  if (window.onChartVisualizerReady) {
    window.onChartVisualizerReady();
  }
}

console.log('✅ Chart visualizer components loaded and exported to window');

})();
