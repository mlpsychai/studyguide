/**
 * CONTENT VALIDITY CHART
 * Shows how well test items cover the intended content domains
 */
(function() {
  const chartConfig = {
    colors: {
      excellent: '#10b981',
      good: '#3b82f6',
      adequate: '#f59e0b',
      insufficient: '#ef4444',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 12, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function renderContentValidity(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const domains = config.domains || [
      'Number Operations',
      'Algebra',
      'Geometry',
      'Measurement',
      'Data Analysis',
      'Problem Solving'
    ];

    const coverage = config.coverage || [
      { intended: 25, actual: 24 },
      { intended: 20, actual: 21 },
      { intended: 15, actual: 16 },
      { intended: 15, actual: 14 },
      { intended: 15, actual: 15 },
      { intended: 10, actual: 10 }
    ];

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: domains,
        datasets: [
          {
            label: 'Intended Coverage (%)',
            data: coverage.map(c => c.intended),
            backgroundColor: chartConfig.colors.good + '60',
            borderColor: chartConfig.colors.good,
            borderWidth: 2
          },
          {
            label: 'Actual Coverage (%)',
            data: coverage.map(c => c.actual),
            backgroundColor: chartConfig.colors.excellent + '80',
            borderColor: chartConfig.colors.excellent,
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
              padding: 15
            }
          },
          title: {
            display: true,
            text: config.title || 'Content Validity: Domain Coverage',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: 'Test items should match intended content proportions',
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
              afterLabel: function(context) {
                const domainIdx = context.dataIndex;
                const diff = Math.abs(coverage[domainIdx].actual - coverage[domainIdx].intended);
                if (diff <= 2) return '✓ Excellent match';
                if (diff <= 5) return '✓ Good match';
                return '⚠ Needs adjustment';
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Content Domain',
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
              text: 'Percentage of Test Items',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              callback: function(value) {
                return value + '%';
              }
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            beginAtZero: true,
            max: 30
          }
        }
      }
    });

    return chart;
  }

  window.registerChart('content-validity', renderContentValidity);
})();
