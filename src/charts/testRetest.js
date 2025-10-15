/**
 * TEST-RETEST RELIABILITY CHART
 * Shows consistency of scores across two administrations of the same test
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

  function generateTestRetestData(correlation, n = 25) {
    const data = [];
    for (let i = 0; i < n; i++) {
      const time1 = 70 + Math.random() * 30; // Scores 70-100
      const noise = (Math.random() - 0.5) * 20 * (1 - Math.abs(correlation));
      const time2 = time1 * correlation + noise + (100 * (1 - correlation) * Math.random());
      data.push({
        x: Math.max(70, Math.min(100, time1)),
        y: Math.max(70, Math.min(100, time2))
      });
    }
    return data;
  }

  function renderTestRetest(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const correlation = config.correlation || 0.85;
    const scatterData = generateTestRetestData(correlation, config.count || 25);
    const trendData = window.chartUtils.generateTrendLine(scatterData);

    const chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Student Scores',
            data: scatterData,
            backgroundColor: chartConfig.colors.primary + '80',
            borderColor: chartConfig.colors.primary,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBorderWidth: 2,
            pointBorderColor: chartConfig.colors.white
          },
          {
            label: 'Trend Line',
            data: trendData,
            type: 'line',
            borderColor: chartConfig.colors.trend,
            backgroundColor: 'transparent',
            borderWidth: 3,
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
            text: config.title || 'Test-Retest Reliability',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: `Correlation: r = ${correlation.toFixed(2)} (${correlation >= 0.80 ? 'Good' : 'Moderate'} consistency over time)`,
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
                return `Time 1: ${context.parsed.x.toFixed(1)}, Time 2: ${context.parsed.y.toFixed(1)}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'First Test Administration (Time 1)',
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
              text: 'Second Test Administration (Time 2)',
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

  window.registerChart('test-retest', renderTestRetest);
})();
