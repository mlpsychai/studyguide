/**
 * MULTIPLE DATASETS CHART
 * Shows multiple groups with filled areas for easy comparison
 */
(function() {
  const chartConfig = {
    colors: {
      red: '#ef4444',
      orange: '#f97316',
      yellow: '#fbbf24',
      green: '#10b981',
      blue: '#3b82f6',
      purple: '#8b5cf6',
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

  function renderMultipleDatasets(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const dataCount = config.count || 8;
    const min = config.min || 60;
    const max = config.max || 100;
    const title = config.title || 'Multiple Group Comparison Over Time';
    const xLabel = config.xLabel || 'Time Period';
    const yLabel = config.yLabel || 'Performance Score';

    const labels = getMonthLabels(dataCount);

    // Create datasets with different colors and fills
    const datasets = [
      {
        label: 'Group A (High Performers)',
        data: generateRandomData(dataCount, max - 10, max),
        borderColor: chartConfig.colors.green,
        backgroundColor: chartConfig.colors.green + '40', // 25% opacity
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Group B (Medium Performers)',
        data: generateRandomData(dataCount, min + 15, max - 15),
        borderColor: chartConfig.colors.blue,
        backgroundColor: chartConfig.colors.blue + '40',
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Group C (Improving)',
        data: generateRandomData(dataCount, min, max - 20),
        borderColor: chartConfig.colors.orange,
        backgroundColor: chartConfig.colors.orange + '40',
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Group D (Needs Support)',
        data: generateRandomData(dataCount, min, min + 15),
        borderColor: chartConfig.colors.red,
        backgroundColor: chartConfig.colors.red + '40',
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ];

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: chartConfig.colors.white,
              font: { size: 11 },
              usePointStyle: true,
              padding: 12
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
              footer: function(tooltipItems) {
                // Calculate average across all groups
                let sum = 0;
                tooltipItems.forEach(item => {
                  sum += item.parsed.y;
                });
                const avg = (sum / tooltipItems.length).toFixed(1);
                return 'Average: ' + avg;
              }
            },
            footerColor: chartConfig.colors.yellow
          },
          filler: {
            propagate: false
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
            beginAtZero: false,
            suggestedMin: min - 10,
            suggestedMax: max + 10
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('multiple-datasets', renderMultipleDatasets);
})();
