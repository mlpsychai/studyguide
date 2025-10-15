/**
 * CONCURRENT VALIDITY CHART
 * Shows correlation between new test and established criterion measure (both given at same time)
 */
(function() {
  const chartConfig = {
    colors: {
      primary: '#3b82f6',
      trend: '#f59e0b',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 12, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function generateConcurrentData(correlation, n = 25) {
    const data = [];
    for (let i = 0; i < n; i++) {
      const newTest = 70 + Math.random() * 30;
      const noise = (Math.random() - 0.5) * 18 * (1 - Math.abs(correlation));
      const criterion = newTest * correlation + noise + (100 * (1 - correlation) * Math.random());
      data.push({
        x: Math.max(70, Math.min(100, newTest)),
        y: Math.max(70, Math.min(100, criterion))
      });
    }
    return data;
  }

  function renderConcurrentValidity(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const correlation = config.correlation || 0.78;
    const scatterData = generateConcurrentData(correlation, config.count || 25);
    const trendData = window.chartUtils.generateTrendLine(scatterData);

    const chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Students',
            data: scatterData,
            backgroundColor: chartConfig.colors.primary + '80',
            borderColor: chartConfig.colors.primary,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBorderWidth: 2,
            pointBorderColor: chartConfig.colors.white
          },
          {
            label: 'Trend',
            data: trendData,
            type: 'line',
            borderColor: chartConfig.colors.trend,
            backgroundColor: 'transparent',
            borderWidth: 3,
            pointRadius: 0,
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
            text: config.title || 'Concurrent Validity',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: `Correlation with criterion: r = ${correlation.toFixed(2)} (${correlation >= 0.70 ? 'Strong' : 'Moderate'} evidence)`,
            color: chartConfig.colors.white,
            font: chartConfig.fonts.subtitle,
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
              label: function(context) {
                return [
                  `New Test: ${context.parsed.x.toFixed(1)}`,
                  `Criterion Measure: ${context.parsed.y.toFixed(1)}`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'New Test Score',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 65,
            max: 105
          },
          y: {
            title: {
              display: true,
              text: 'Established Criterion Test Score',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 65,
            max: 105
          }
        }
      }
    });

    return chart;
  }

  window.registerChart('concurrent-validity', renderConcurrentValidity);
})();
