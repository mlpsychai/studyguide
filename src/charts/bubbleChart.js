/**
 * BUBBLE CHART
 * Shows relationship between three variables (x, y, and bubble size)
 */
(function() {
  const chartConfig = {
    colors: {
      dataset1: '#ef4444',
      dataset2: '#f59e0b',
      dataset3: '#3b82f6',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  // Helper function to generate random bubble data
  function generateBubbleData(count, rmin, rmax, xmin, xmax, ymin, ymax) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: Math.random() * (xmax - xmin) + xmin,
        y: Math.random() * (ymax - ymin) + ymin,
        r: Math.random() * (rmax - rmin) + rmin
      });
    }
    return data;
  }

  function renderBubbleChart(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const dataCount = config.count || 15;
    const title = config.title || 'Study Time vs Test Scores';
    const xLabel = config.xLabel || 'Study Hours';
    const yLabel = config.yLabel || 'Test Score';
    const bubbleLabel = config.bubbleLabel || 'Confidence Level';

    const chart = new Chart(canvas, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Group A',
            data: generateBubbleData(dataCount, 5, 20, 0, 10, 50, 100),
            borderColor: chartConfig.colors.dataset1,
            backgroundColor: chartConfig.colors.dataset1 + '80', // 50% opacity
            borderWidth: 2
          },
          {
            label: 'Group B',
            data: generateBubbleData(dataCount, 5, 20, 0, 10, 50, 100),
            borderColor: chartConfig.colors.dataset2,
            backgroundColor: chartConfig.colors.dataset2 + '80',
            borderWidth: 2
          },
          {
            label: 'Group C',
            data: generateBubbleData(dataCount, 5, 20, 0, 10, 50, 100),
            borderColor: chartConfig.colors.dataset3,
            backgroundColor: chartConfig.colors.dataset3 + '80',
            borderWidth: 2
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: chartConfig.colors.white,
            bodyColor: chartConfig.colors.white,
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const x = context.parsed.x.toFixed(1);
                const y = context.parsed.y.toFixed(1);
                const r = context.raw.r.toFixed(1);
                return `${label}: ${xLabel}=${x}, ${yLabel}=${y}, ${bubbleLabel}=${r}`;
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
            min: 0,
            max: 10
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
            min: 0,
            max: 100
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('bubble', renderBubbleChart);
})();
