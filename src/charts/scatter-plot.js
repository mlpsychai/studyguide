/**
 * SCATTER PLOT CHART
 * Shows relationship between two variables for multiple groups
 */
(function() {
  const chartConfig = {
    colors: {
      red: '#ef4444',
      orange: '#f97316',
      blue: '#3b82f6',
      green: '#10b981',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  // Helper function to generate scatter data
  function generateScatterData(count, xMin, xMax, yMin, yMax) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: Math.random() * (xMax - xMin) + xMin,
        y: Math.random() * (yMax - yMin) + yMin
      });
    }
    return data;
  }

  function renderScatterPlot(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const dataCount = config.count || 20;
    const xMin = config.xMin || 0;
    const xMax = config.xMax || 100;
    const yMin = config.yMin || 0;
    const yMax = config.yMax || 100;
    const title = config.title || 'Scatter Plot: Two Variable Relationship';
    const xLabel = config.xLabel || 'Variable X';
    const yLabel = config.yLabel || 'Variable Y';

    const chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: config.dataset1Label || 'Group 1',
            data: generateScatterData(dataCount, xMin, xMax, yMin, yMax),
            borderColor: chartConfig.colors.red,
            backgroundColor: chartConfig.colors.red + '80', // 50% opacity
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBorderWidth: 2,
            pointBorderColor: chartConfig.colors.white
          },
          {
            label: config.dataset2Label || 'Group 2',
            data: generateScatterData(dataCount, xMin, xMax, yMin, yMax),
            borderColor: chartConfig.colors.blue,
            backgroundColor: chartConfig.colors.blue + '80',
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBorderWidth: 2,
            pointBorderColor: chartConfig.colors.white
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: chartConfig.colors.white,
              font: { size: 12 },
              usePointStyle: true,
              padding: 15
            }
          },
          title: {
            display: true,
            text: title,
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: chartConfig.colors.white,
            bodyColor: chartConfig.colors.white,
            padding: 12,
            borderColor: chartConfig.colors.white,
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                return `${label}: (${context.parsed.x.toFixed(1)}, ${context.parsed.y.toFixed(1)})`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: xLabel,
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: xMin,
            max: xMax
          },
          y: {
            title: {
              display: true,
              text: yLabel,
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: yMin,
            max: yMax
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('scatter-plot', renderScatterPlot);
})();
