/**
 * LINEAR GRADIENT LINE CHART
 * Shows a line chart with a color gradient from bottom to top
 */
(function() {
  const chartConfig = {
    colors: {
      blue: '#3b82f6',
      yellow: '#fbbf24',
      red: '#ef4444',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  // Helper function to generate random data
  function generateRandomData(count, min, max) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }

  // Helper function to get month labels
  function getMonthLabels(count) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.slice(0, count);
  }

  // Gradient state
  let width, height, gradient;

  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, chartConfig.colors.blue);
      gradient.addColorStop(0.5, chartConfig.colors.yellow);
      gradient.addColorStop(1, chartConfig.colors.red);
    }

    return gradient;
  }

  function renderLinearGradient(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const dataCount = config.count || 7;
    const min = config.min || -100;
    const max = config.max || 100;
    const title = config.title || 'Temperature Variation Over Time';
    const xLabel = config.xLabel || 'Month';
    const yLabel = config.yLabel || 'Temperature (°F)';

    const labels = getMonthLabels(dataCount);
    const data = generateRandomData(dataCount, min, max);

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: config.datasetLabel || 'Temperature',
          data: data,
          borderColor: function(context) {
            const chart = context.chart;
            const {ctx, chartArea} = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return chartConfig.colors.blue;
            }
            return getGradient(ctx, chartArea);
          },
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: function(context) {
            const chart = context.chart;
            const {ctx, chartArea} = chart;

            if (!chartArea) {
              return chartConfig.colors.blue;
            }
            return getGradient(ctx, chartArea);
          },
          pointBorderColor: chartConfig.colors.white,
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: chartConfig.colors.white,
            bodyColor: chartConfig.colors.white
          }
        },
        scales: {
          x: {
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
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
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
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('linear-gradient', renderLinearGradient);
})();
