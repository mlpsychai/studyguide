/**
 * INTER-RATER RELIABILITY CHART
 * Bubble chart showing agreement between raters on essay scoring
 */
(function() {
  const chartConfig = {
    colors: {
      perfect: '#10b981',
      close: '#3b82f6',
      moderate: '#f59e0b',
      poor: '#ef4444',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 12, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function generateInterRaterData(agreement, n = 25) {
    const data = [];
    for (let i = 0; i < n; i++) {
      const rater1 = 60 + Math.random() * 35;
      const difference = (Math.random() - 0.5) * 20 * (1 - agreement);
      const rater2 = Math.max(60, Math.min(95, rater1 + difference));
      const agreementScore = Math.abs(rater1 - rater2);
      const bubbleSize = 5 + (10 - agreementScore) * 1.5; // Larger bubble = better agreement
      
      data.push({
        x: rater1,
        y: rater2,
        r: bubbleSize
      });
    }
    return data;
  }

  function renderInterRater(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const agreement = config.agreement || 0.85;
    const data = generateInterRaterData(agreement, config.count || 25);

    const chart = new Chart(canvas, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Essays',
          data: data,
          backgroundColor: function(context) {
            const diff = Math.abs(context.raw.x - context.raw.y);
            if (diff <= 3) return chartConfig.colors.perfect + '80';
            if (diff <= 6) return chartConfig.colors.close + '80';
            if (diff <= 10) return chartConfig.colors.moderate + '80';
            return chartConfig.colors.poor + '80';
          },
          borderColor: function(context) {
            const diff = Math.abs(context.raw.x - context.raw.y);
            if (diff <= 3) return chartConfig.colors.perfect;
            if (diff <= 6) return chartConfig.colors.close;
            if (diff <= 10) return chartConfig.colors.moderate;
            return chartConfig.colors.poor;
          },
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: config.title || 'Inter-Rater Reliability: Essay Scoring',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: 'Bubble size = Agreement level | Points on diagonal = Perfect agreement',
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
                const diff = Math.abs(context.raw.x - context.raw.y);
                return [
                  `Rater 1: ${context.raw.x.toFixed(1)}`,
                  `Rater 2: ${context.raw.y.toFixed(1)}`,
                  `Difference: ${diff.toFixed(1)} points`,
                  diff <= 3 ? '✓ Excellent agreement' : diff <= 6 ? '✓ Good agreement' : '⚠ Review needed'
                ];
              }
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xMin: 60,
                xMax: 95,
                yMin: 60,
                yMax: 95,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  display: true,
                  content: 'Perfect Agreement',
                  position: 'end',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: chartConfig.colors.white,
                  font: { size: 10 }
                }
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Rater 1 Score',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 55,
            max: 100
          },
          y: {
            title: {
              display: true,
              text: 'Rater 2 Score',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 55,
            max: 100
          }
        }
      }
    });

    return chart;
  }

  window.registerChart('inter-rater', renderInterRater);
})();
