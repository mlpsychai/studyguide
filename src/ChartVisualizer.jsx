// Chart Visualizer React Component - FIXED
function ChartVisualizer({ type, config, sectionId }) {
  const containerRef = React.useRef(null);
  const [chartReady, setChartReady] = React.useState(false);

  React.useEffect(() => {
    // Wait for Chart.js and chartUtils to be ready
    if (!window.Chart || !window.chartUtils) {
      console.warn('Waiting for Chart.js and chartUtils...');
      const checkInterval = setInterval(() => {
        if (window.Chart && window.chartUtils) {
          setChartReady(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    } else {
      setChartReady(true);
    }
  }, []);

  React.useEffect(() => {
    if (!chartReady || !containerRef.current) return;

    const chartId = `chart-${sectionId}`;
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Handle correlation grid (multiple charts)
      if (type === 'correlation' && Array.isArray(config)) {
        const container = containerRef.current;
        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
        
        config.forEach((corr, idx) => {
          const chartDiv = document.createElement('div');
          chartDiv.className = 'bg-gray-50 p-4 rounded-lg border border-gray-200';
          chartDiv.style.height = '300px';
          
          const canvas = document.createElement('canvas');
          canvas.id = `${chartId}-${idx}`;
          chartDiv.appendChild(canvas);
          grid.appendChild(chartDiv);
          
          // Render individual correlation chart
          setTimeout(() => {
            window.chartUtils.renderCorrelationChart(canvas.id, corr);
          }, 50);
        });
        
        container.appendChild(grid);
      } 
      // Handle single chart
      else {
        const canvas = document.getElementById(chartId);
        if (!canvas) return;

        // Destroy existing chart
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
      }
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      
      if (type === 'correlation' && Array.isArray(config)) {
        config.forEach((_, idx) => {
          const canvasId = `chart-${sectionId}-${idx}`;
          const canvas = document.getElementById(canvasId);
          if (canvas) {
            const chart = window.Chart.getChart(canvas);
            if (chart) chart.destroy();
          }
        });
      } else {
        const chartId = `chart-${sectionId}`;
        const canvas = document.getElementById(chartId);
        if (canvas) {
          const chart = window.Chart.getChart(canvas);
          if (chart) chart.destroy();
        }
      }
    };
  }, [type, config, sectionId, chartReady]);

  if (!chartReady) {
    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Visualization</h3>
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading chart...</div>
        </div>
      </div>
    );
  }

  // For correlation grid, use a container
  if (type === 'correlation' && Array.isArray(config)) {
    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Correlation Visualizations</h3>
        <div ref={containerRef} />
      </div>
    );
  }

  // For single charts, use canvas
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Visualization</h3>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200" style={{ height: '400px' }}>
        <canvas id={`chart-${sectionId}`}></canvas>
      </div>
    </div>
  );
}

// Export to window for browser compatibility
window.ChartVisualizer = ChartVisualizer;
console.log('✅ ChartVisualizer component loaded');
