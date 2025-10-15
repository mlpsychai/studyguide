/**
 * POLAR AREA CHART
 * Shows multivariate data in a circular/radial format - ideal for skill profiles
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
      label: { size: 12, weight: 'bold' },
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

  function renderPolarArea(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const title = config.title || 'Skill Profile Assessment';
    const labels = config.labels || ['Reading', 'Writing', 'Math', 'Science', 'Social'];
    const min = config.min || 0;
    const max = config.max || 100;

    // Create color array based on number of labels
    const colors = [
      chartConfig.colors.red,
      chartConfig.colors.orange,
      chartConfig.colors.yellow,
      chartConfig.colors.green,
      chartConfig.colors.blue,
      chartConfig.colors.purple
    ];

    const backgroundColors = colors.slice(0, labels.length).map(color => color + '80'); // 50% opacity

    const chart = new Chart(canvas, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          label: config.datasetLabel || 'Skill Scores',
          data: config.data || generateRandomData(labels.length, min, max),
          backgroundColor: backgroundColors,
          borderColor: colors.slice(0, labels.length),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              padding: 15,
              usePointStyle: true
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
                return `${context.label}: ${context.parsed.r}`;
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            min: min,
            max: max,
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              backdropColor: 'rgba(0, 0, 0, 0.5)',
              stepSize: 20
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
              circular: true
            },
            pointLabels: {
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
  window.registerChart('polar-area', renderPolarArea);
})();
