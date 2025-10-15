/**
 * AXIS MIN-MAX CHART
 * Demonstrates how axis scale manipulation affects data perception
 */
(function() {
  const chartConfig = {
    colors: {
      red: '#ef4444',
      blue: '#3b82f6',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  // Helper function to get month labels
  function getMonthLabels(count) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.slice(0, count);
  }

  function renderAxisMinMax(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const title = config.title || 'Effect of Axis Scale on Perception';
    const xLabel = config.xLabel || 'Time Period';
    const yLabel = config.yLabel || 'Score';
    const yMin = config.yMin !== undefined ? config.yMin : 10;
    const yMax = config.yMax !== undefined ? config.yMax : 50;

    const labels = getMonthLabels(7);

    // Data that extends beyond the min/max range
    const dataset1Data = config.dataset1Data || [10, 30, 50, 20, 25, 44, -10];
    const dataset2Data = config.dataset2Data || [100, 33, 22, 19, 11, 49, 30];

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: config.dataset1Label || 'Group A',
            data: dataset1Data,
            borderColor: chartConfig.colors.red,
            backgroundColor: chartConfig.colors.red + '40',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: chartConfig.colors.red,
            pointBorderColor: chartConfig.colors.white,
            pointBorderWidth: 2
          },
          {
            label: config.dataset2Label || 'Group B',
            data: dataset2Data,
            borderColor: chartConfig.colors.blue,
            backgroundColor: chartConfig.colors.blue + '40',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: chartConfig.colors.blue,
            pointBorderColor: chartConfig.colors.white,
            pointBorderWidth: 2
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
          subtitle: {
            display: config.showSubtitle !== false,
            text: `Y-axis range: ${yMin} to ${yMax} (Note: Some data may be clipped!)`,
            color: '#fbbf24', // Yellow warning color
            font: { size: 12, style: 'italic' },
            padding: { bottom: 10 }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: chartConfig.colors.white,
            bodyColor: chartConfig.colors.white,
            padding: 12,
            borderColor: chartConfig.colors.white,
            borderWidth: 1,
            callbacks: {
              afterLabel: function(context) {
                const value = context.parsed.y;
                if (value < yMin) {
                  return '⚠️ Below visible range';
                } else if (value > yMax) {
                  return '⚠️ Above visible range';
                }
                return '';
              }
            }
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
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: yMin,  // ⚠️ This clips the data!
            max: yMax   // ⚠️ This clips the data!
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('axis-min-max', renderAxisMinMax);
})();
