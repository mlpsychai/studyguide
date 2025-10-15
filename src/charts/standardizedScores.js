/**
 * STANDARDIZED SCORES CHART
 * Shows equivalent scores across different standardized scales
 */
(function() {
  const chartConfig = {
    colors: {
      primary: '#FFD700',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 12, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function renderStandardizedScores(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const data = window.chartUtils.generateBellCurveData(0, 1, -3, 3, 100);

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Standard Normal Distribution',
          data: data,  // ✅ FIXED: Pass full {x, y} objects
          borderColor: chartConfig.colors.primary,
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Standardized Score Equivalents',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: [
              'Z-scores: -3, -2, -1, 0, +1, +2, +3',
              'Standard: 55, 70, 85, 100, 115, 130, 145',
              'Scaled: 1, 4, 7, 10, 13, 16, 19',
              'T-scores: 20, 30, 40, 50, 60, 70, 80'
            ],
            color: chartConfig.colors.white,
            font: chartConfig.fonts.subtitle,
            padding: { bottom: 10 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,  // ✅ Added for consistency
            ticks: { 
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            title: {
              display: true,
              text: 'Probability Density',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            }
          },
          x: {
            type: 'linear',  // ✅ This allows Chart.js to handle x values properly
            ticks: { 
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 15
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            title: {
              display: true,
              text: 'Standard Deviations from Mean',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            }
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('standardized', renderStandardizedScores);
})();
