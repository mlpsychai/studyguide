/**
 * CORRELATION SCATTER PLOT
 * Shows relationship between two variables with trend line
 */
(function() {
  const chartConfig = {
    colors: {
      gray: '#808080',
      warning: '#f59e0b',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 16, weight: 'bold' },
      label: { size: 12, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function renderCorrelationChart(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const r = config.r || 0;
    const label = config.label || `r = ${r}`;
    
    const scatterData = window.chartUtils.generateCorrelatedData(r, 100);
    const trendData = window.chartUtils.generateTrendLine(scatterData);

    const chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Data Points',
            data: scatterData,
            backgroundColor: chartConfig.colors.gray,
            borderColor: chartConfig.colors.gray,
            pointRadius: 3,
            pointHoverRadius: 4
          },
          {
            label: 'Trend Line',
            data: trendData,
            type: 'line',
            borderColor: chartConfig.colors.warning,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: label,
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: chartConfig.colors.white,
            bodyColor: chartConfig.colors.white
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Variable X',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: -3,
            max: 3
          },
          y: {
            title: {
              display: true,
              text: 'Variable Y',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: -3,
            max: 3
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('correlation', renderCorrelationChart);
})();
