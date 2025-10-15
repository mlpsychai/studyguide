/**
 * CUSTOM TOOLTIP CHART
 * Shows multiple datasets with a custom tooltip that calculates sum
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

  // Custom tooltip footer callback
  const tooltipFooter = (tooltipItems) => {
    let sum = 0;
    tooltipItems.forEach(function(tooltipItem) {
      sum += tooltipItem.parsed.y;
    });
    return 'Combined Total: ' + sum;
  };

  function renderCustomTooltip(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const dataCount = config.count || 7;
    const min = config.min || -100;
    const max = config.max || 100;
    const title = config.title || 'Comparing Two Groups';
    const xLabel = config.xLabel || 'Time Period';
    const yLabel = config.yLabel || 'Score';
    const dataset1Label = config.dataset1Label || 'Group A';
    const dataset2Label = config.dataset2Label || 'Group B';

    const labels = getMonthLabels(dataCount);

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: dataset1Label,
            data: generateRandomData(dataCount, min, max),
            fill: false,
            borderColor: chartConfig.colors.red,
            backgroundColor: chartConfig.colors.red + '80', // 50% opacity
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: chartConfig.colors.red,
            pointBorderColor: chartConfig.colors.white,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: dataset2Label,
            data: generateRandomData(dataCount, min, max),
            fill: false,
            borderColor: chartConfig.colors.blue,
            backgroundColor: chartConfig.colors.blue + '80',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: chartConfig.colors.blue,
            pointBorderColor: chartConfig.colors.white,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index', // Show all datasets at the same x-axis point
        },
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
            footerColor: '#fbbf24', // Yellow for the sum
            padding: 12,
            borderColor: chartConfig.colors.white,
            borderWidth: 1,
            displayColors: true,
            callbacks: {
              footer: tooltipFooter, // Custom footer showing sum
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
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('custom-tooltip', renderCustomTooltip);
})();
