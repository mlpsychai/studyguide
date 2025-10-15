/**
 * PREDICTIVE VALIDITY CHART
 * Shows how well test scores predict future performance/outcomes
 */
(function() {
  const chartConfig = {
    colors: {
      primary: '#8b5cf6',
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

  function generatePredictiveData(correlation, n = 25) {
    const data = [];
    for (let i = 0; i < n; i++) {
      const predictor = 70 + Math.random() * 30;
      const noise = (Math.random() - 0.5) * 22 * (1 - Math.abs(correlation));
      const outcome = predictor * correlation + noise + (100 * (1 - correlation) * Math.random());
      data.push({
        x: Math.max(70, Math.min(100, predictor)),
        y: Math.max(60, Math.min(100, outcome))
      });
    }
    return data;
  }

  function renderPredictiveValidity(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const correlation = config.correlation || 0.65;
    const scatterData = generatePredictiveData(correlation, config.count || 25);
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
            text: config.title || 'Predictive Validity',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: `Prediction accuracy: r = ${correlation.toFixed(2)} (${correlation >= 0.60 ? 'Good' : 'Moderate'} prediction)`,
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
                  `Screening Test: ${context.parsed.x.toFixed(1)}`,
                  `Future GPA: ${context.parsed.y.toFixed(1)}`
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
              text: 'Screening Test Score (Year 1)',
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
              text: 'Academic GPA (Year 3)',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 55,
            max: 105
          }
        }
      }
    });

    return chart;
  }

  window.registerChart('predictive-validity', renderPredictiveValidity);
})();
