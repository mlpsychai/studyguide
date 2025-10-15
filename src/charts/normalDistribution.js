/**
 * NORMAL DISTRIBUTION CHART
 * Renders a bell curve with standard deviation markers
 */
(function() {
  const chartConfig = {
    colors: {
      primary: '#FFD700',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 14, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function createSigmaLine(multiplier, mean, sd) {
    const value = mean + (multiplier * sd);
    const isCenter = multiplier === 0;
    
    return {
      type: 'line',
      scaleID: 'x',
      value: value,
      borderColor: isCenter ? '#FFD700' : `rgba(255, 255, 255, ${0.5 - Math.abs(multiplier) * 0.1})`,
      borderWidth: isCenter ? 3 : (Math.abs(multiplier) === 3 ? 1 : 2),
      borderDash: isCenter ? undefined : [5, 3],
      label: {
        display: true,
        content: isCenter ? `μ = ${mean}` : `${multiplier > 0 ? '+' : ''}${multiplier}σ\n(${Math.round(value)})`,
        position: 'end',
        yAdjust: multiplier <= 0 ? 0.5 : -10,
        backgroundColor: isCenter ? 'rgba(255, 215, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)',
        color: isCenter ? '#000' : '#fff',
        font: { 
          size: isCenter ? 12 : 11,
          weight: Math.abs(multiplier) <= 1 ? 'bold' : 'normal'
        }
      }
    };
  }

  function renderNormalDistribution(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const mean = config.mean || 100;
    const sd = config.sd || 15;

    // Use utility function from chartUtils
    const data = window.chartUtils.generateBellCurveData(mean, sd, mean - 3*sd, mean + 3*sd, 100);

    // Generate all sigma lines
    const sigmaLines = [-3, -2, -1, 0, 1, 2, 3].reduce((acc, mult, idx) => {
      acc[`line${idx + 1}`] = createSigmaLine(mult, mean, sd);
      return acc;
    }, {});

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Normal Distribution',
          data: data,
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
            text: `Normal Distribution (μ=${mean}, σ=${sd})`,
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: config.showPercentages,
            text: '68% within ±1σ | 95% within ±2σ | 99.7% within ±3σ',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.subtitle
          },
          annotation: {
            annotations: sigmaLines
          }
        },
        scales: {
          y: {
            beginAtZero: true,
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
            type: 'linear',
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
              text: 'Score',
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
  window.registerChart('normal-distribution', renderNormalDistribution);
})();
