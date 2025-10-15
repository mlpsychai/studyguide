/**
 * CENTRAL TENDENCY CHART
 * Shows mean, median, and mode on a dataset with clear visual markers
 */
(function() {
  const chartConfig = {
    colors: {
      bars: '#94a3b8',
      mean: '#ef4444',
      median: '#3b82f6',
      mode: '#10b981',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 13, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function calculateMean(data) {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  }

  function calculateMedian(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
  }

  function calculateMode(data) {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];
    
    data.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
      if (frequency[val] > maxFreq) {
        maxFreq = frequency[val];
        modes = [val];
      } else if (frequency[val] === maxFreq && !modes.includes(val)) {
        modes.push(val);
      }
    });
    
    return modes[0]; // Return first mode for simplicity
  }

  function createAnnotationLine(value, color, label) {
    return {
      type: 'line',
      scaleID: 'x',
      value: value,
      borderColor: color,
      borderWidth: 3,
      borderDash: [5, 5],
      label: {
        display: true,
        content: label,
        position: 'start',
        yAdjust: -10,
        backgroundColor: color,
        color: '#ffffff',
        font: { size: 11, weight: 'bold' },
        padding: 6,
        borderRadius: 4
      }
    };
  }

  function renderCentralTendency(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    // Default dataset with a slight right skew
    const defaultData = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10];
    const data = config.data || defaultData;

    // Calculate central tendency measures
    const mean = calculateMean(data);
    const median = calculateMedian(data);
    const mode = calculateMode(data);

    // Create frequency distribution for bar chart
    const frequency = {};
    data.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
    });

    const labels = Object.keys(frequency).map(Number).sort((a, b) => a - b);
    const frequencies = labels.map(label => frequency[label]);

    // Create annotation lines
    const annotations = {
      meanLine: createAnnotationLine(mean, chartConfig.colors.mean, `Mean = ${mean.toFixed(1)}`),
      medianLine: createAnnotationLine(median, chartConfig.colors.median, `Median = ${median}`),
      modeLine: createAnnotationLine(mode, chartConfig.colors.mode, `Mode = ${mode}`)
    };

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Frequency',
          data: frequencies,
          backgroundColor: chartConfig.colors.bars,
          borderColor: chartConfig.colors.white,
          borderWidth: 2,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: config.title || 'Measures of Central Tendency Visualization',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: 'The mean, median, and mode help us understand the "center" of a dataset',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.subtitle,
            padding: { bottom: 10 }
          },
          annotation: {
            annotations: annotations
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: chartConfig.colors.white,
            bodyColor: chartConfig.colors.white,
            padding: 12,
            borderColor: chartConfig.colors.white,
            borderWidth: 1,
            callbacks: {
              title: function(context) {
                return `Score: ${context[0].label}`;
              },
              label: function(context) {
                const freq = context.parsed.y;
                return `Frequency: ${freq} student${freq !== 1 ? 's' : ''}`;
              },
              afterLabel: function(context) {
                const score = Number(context.label);
                let info = [];
                if (Math.abs(score - mean) < 0.1) info.push('← This is the mean');
                if (score === median) info.push('← This is the median');
                if (score === mode) info.push('← This is the mode');
                return info.join('\n');
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Test Score',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              stepSize: 1
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Students',
              color: chartConfig.colors.white,
              font: chartConfig.fonts.label
            },
            ticks: {
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              stepSize: 1
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        }
      }
    });

    return chart;
  }

  // Self-register
  window.registerChart('central-tendency', renderCentralTendency);
})();
