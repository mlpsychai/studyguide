/**
 * ChartVisualizer Component
 * 
 * Usage examples:
 * <ChartVisualizer type="normal-distribution" config={{ mean: 100, sd: 15, showPercentages: true }} />
 * <ChartVisualizer type="skewed-distributions" />
 * <ChartVisualizer type="correlation-scatterplot" config={{ r: 0.8, label: "Strong Positive" }} />
 * <ChartVisualizer type="standardized-scores" />
 */

function ChartVisualizer({ type, config = {}, sectionId }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Only render chart when canvas is mounted
    if (canvasRef.current && typeof Chart !== 'undefined') {
      // Destroy previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Render new chart
      chartRef.current = renderChart(canvasRef.current.id, type, config);
    }

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, config]);

  const canvasId = `chart-${sectionId || type}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="visual-example">
      <h3>📊 Visual Example</h3>
      <canvas 
        ref={canvasRef}
        id={canvasId}
        className="viz-canvas"
      />
    </div>
  );
}

// Export for multiple correlation plots
function CorrelationGrid({ plots = [] }) {
  return (
    <div className="visual-example">
      <h3>📊 Visual Example: Correlation Strengths</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        margin: '20px 0'
      }}>
        {plots.map((plot, index) => (
          <ChartVisualizer 
            key={index}
            type="correlation-scatterplot"
            config={{ r: plot.r, label: plot.label }}
            sectionId={`correlation-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

// Export to window
window.ChartVisualizer = ChartVisualizer;
window.CorrelationGrid = CorrelationGrid;
