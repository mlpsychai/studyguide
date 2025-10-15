/**
 * CONSTRUCT VALIDITY CHART
 * Bubble chart showing correlations with related (convergent) and unrelated (discriminant) constructs
 */
(function() {
  const chartConfig = {
    colors: {
      convergent: '#10b981',
      discriminant: '#ef4444',
      moderate: '#f59e0b',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 12, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function renderConstructValidity(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    // Convergent validity: Should correlate highly with related constructs
    const convergentMeasures = [
      { name: 'Reading Comp', r: 0.82, x: 1, y: 0.82, r_bubble: 15 },
      { name: 'Vocabulary', r: 0.75, x: 2, y: 0.75, r_bubble: 13 },
      { name: 'Oral Language', r: 0.68, x: 3, y: 0.68, r_bubble: 12 }
    ];

    // Discriminant validity: Should NOT correlate highly with unrelated constructs
    const discriminantMeasures = [
      { name: 'Math', r: 0.25, x: 5, y: 0.25, r_bubble: 8 },
      { name: 'Motor Skills', r: 0.15, x: 6, y: 0.15, r_bubble: 7 },
      { name: 'Music Aptitude', r: 0.10, x: 7, y: 0.10, r_bubble: 6 }
    ];

    const allData = [...convergentMeasures, ...discriminantMeasures];

    const chart = new Chart(canvas, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Convergent (Should correlate)',
            data: convergentMeasures,
            backgroundColor: chartConfig.colors.convergent + '80',
            borderColor: chartConfig.colors.convergent,
            borderWidth: 2
          },
          {
            label: 'Discriminant (Should NOT correlate)',
            data: discriminantMeasures,
            backgroundColor: chartConfig.colors.discriminant + '80',
            borderColor: chartConfig.colors.discriminant,
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
              font: { size: 11 },
              padding: 12
            }
          },
          title: {
            display: true,
            text: config.title || 'Construct Validity: Reading Test',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: 'Bubble size = Correlation strength | Green should be high, Red should be low',
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
                const measure = allData.find(m => m.x === context.raw.x && m.y === context.raw.y);
                return [
                  `Measure: ${measure.name}`,
                  `Correlation: r = ${measure.r.toFixed(2)}`,
                  context.datasetIndex === 0 ? 
                    (measure.r >= 0.60 ? '✓ Strong convergent evidence' : '⚠ Weak convergent evidence') :
                    (measure.r <= 0.30 ? '✓ Good discriminant evidence' : '⚠ Too high for discriminant')
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
              text: 'Measure Type',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              callback: function(value) {
                const labels = ['', 'Related', 'Related', 'Related', '', 'Unrelated', 'Unrelated', 'Unrelated'];
                return labels[value] || '';
              }
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 0,
            max: 8
          },
          y: {
            title: {
              display: true,
              text: 'Correlation with Reading Test',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 0,
            max: 1
          }
        }
      }
    });

    return chart;
  }

  window.registerChart('construct-validity', renderConstructValidity);
})();
