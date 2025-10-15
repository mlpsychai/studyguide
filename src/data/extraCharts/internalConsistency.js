/**
 * INTERNAL CONSISTENCY RELIABILITY CHART
 * Bubble chart showing item difficulty, discrimination, and contribution to reliability
 */
(function() {
  const chartConfig = {
    colors: {
      good: '#10b981',
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

  function generateInternalConsistencyData(numItems = 20) {
    const data = [];
    for (let i = 0; i < numItems; i++) {
      const difficulty = 0.3 + Math.random() * 0.5; // 30-80% pass rate
      const discrimination = 0.3 + Math.random() * 0.5; // 0.3-0.8 item-total correlation
      const reliability = 5 + discrimination * 15; // Bubble size based on discrimination
      
      data.push({
        x: difficulty * 100,
        y: discrimination,
        r: reliability
      });
    }
    return data;
  }

  function renderInternalConsistency(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const data = generateInternalConsistencyData(config.numItems || 20);

    const chart = new Chart(canvas, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Test Items',
          data: data,
          backgroundColor: function(context) {
            const value = context.raw.y;
            if (value >= 0.5) return chartConfig.colors.good + '80';
            if (value >= 0.35) return chartConfig.colors.moderate + '80';
            return chartConfig.colors.poor + '80';
          },
          borderColor: function(context) {
            const value = context.raw.y;
            if (value >= 0.5) return chartConfig.colors.good;
            if (value >= 0.35) return chartConfig.colors.moderate;
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
            text: config.title || 'Internal Consistency: Item Analysis',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: 'Bubble size = Contribution to reliability | Color = Item quality',
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
                const difficulty = context.raw.x.toFixed(1);
                const discrimination = context.raw.y.toFixed(2);
                return [
                  `Difficulty: ${difficulty}% passed`,
                  `Discrimination: ${discrimination} (item-total r)`,
                  discrimination >= 0.5 ? '✓ Good item' : discrimination >= 0.35 ? '⚠ Fair item' : '✗ Poor item'
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
              text: 'Item Difficulty (% of students who answered correctly)',
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
            min: 20,
            max: 90
          },
          y: {
            title: {
              display: true,
              text: 'Item Discrimination (Item-Total Correlation)',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 0.2,
            max: 0.9
          }
        }
      }
    });

    return chart;
  }

  window.registerChart('internal-consistency', renderInternalConsistency);
})();
