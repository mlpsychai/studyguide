/**
 * CHART UTILITIES FOR REACT
 * Extracted from ContentRenderer.js and adapted for React components
 */

// Configuration
const chartConfig = {
  colors: {
    primary: '#FFD700',
    success: '#4CAF50',
    danger: '#f44336',
    info: '#3b82f6',
    warning: '#f59e0b',
    white: '#ffffff',
    gray: '#808080',
    lightGray: '#b0b0b0',
  },
  fonts: {
    family: "'Courier New', monospace",
    title: { size: 18, weight: 'bold' },
    subtitle: { size: 14, weight: 'normal' },
    label: { size: 12, weight: 'normal' },
    body: { size: 11, weight: 'normal' },
  }
};

// ========================================
// DATA GENERATION HELPERS
// ========================================

function generateBellCurveData(mean, sd, min, max, points) {
  const data = [];
  const step = (max - min) / points;
  
  for (let x = min; x <= max; x += step) {
    const normalized = (x - mean) / sd;
    const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * 
             Math.exp(-0.5 * normalized * normalized);
    data.push({ x, y });
  }
  
  return data;
}

function gamma(n) {
  if (n === 2) return 1;
  if (n === 3) return 2;
  return Math.sqrt(2 * Math.PI / n) * Math.pow(n / Math.E, n);
}

function generateSkewedData(direction, min, max, points) {
  const data = [];
  const step = (max - min) / points;
  
  for (let x = min; x <= max; x += step) {
    let y;
    if (direction === 'right') {
      const shape = 2;
      const scale = 0.8;
      const normalized = x / scale;
      y = (Math.pow(normalized, shape - 1) * Math.exp(-normalized)) / (scale * gamma(shape));
      y = y * 0.35;
    } else {
      const mirrored = (max - x);
      const shape = 2;
      const scale = 0.8;
      const normalized = mirrored / scale;
      y = (Math.pow(normalized, shape - 1) * Math.exp(-normalized)) / (scale * gamma(shape));
      y = y * 0.35;
    }
    data.push({ x, y });
  }
  
  return data;
}

function generateCorrelatedData(correlation, numPoints = 100) {
  const data = [];
  
  for (let i = 0; i < numPoints; i++) {
    const x = (Math.random() - 0.5) * 6;
    const randomNoise = (Math.random() - 0.5) * 2;
    const correlatedComponent = x * correlation;
    const noiseComponent = randomNoise * Math.sqrt(1 - Math.abs(correlation));
    const y = correlatedComponent + noiseComponent;
    
    data.push({ x, y });
  }
  
  return data;
}

function generateTrendLine(data) {
  const n = data.length;
  const sumX = data.reduce((sum, d) => sum + d.x, 0);
  const sumY = data.reduce((sum, d) => sum + d.y, 0);
  const sumXY = data.reduce((sum, d) => sum + d.x * d.y, 0);
  const sumXX = data.reduce((sum, d) => sum + d.x * d.x, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  const minX = Math.min(...data.map(d => d.x));
  const maxX = Math.max(...data.map(d => d.x));
  
  return [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept }
  ];
}

// ========================================
// CHART RENDERING FUNCTIONS
// ========================================

function renderNormalDistribution(canvas, config = {}) {
  const mean = config.mean || 100;
  const sd = config.sd || 15;

  const data = generateBellCurveData(mean, sd, mean - 3*sd, mean + 3*sd, 100);

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map(d => Math.round(d.x)),
      datasets: [{
        label: 'Normal Distribution',
        data: data.map(d => d.y),
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
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Normal Distribution (μ=${mean}, σ=${sd})`,
          color: chartConfig.colors.primary,
          font: { size: 18, weight: 'bold' }
        },
        subtitle: {
          display: config.showPercentages,
          text: '68% within ±1σ | 95% within ±2σ | 99.7% within ±3σ',
          color: '#666',
          font: { size: 14 }
        },
        annotation: {
          annotations: [
            {
              type: 'line',
              xMin: mean - 3*sd,
              xMax: mean - 3*sd,
              borderColor: 'rgba(100, 100, 100, 0.5)',
              borderWidth: 1,
              borderDash: [5, 3],
              label: {
                display: true,
                content: '-3σ',
                position: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                font: { size: 11 }
              }
            },
            {
              type: 'line',
              xMin: mean - 2*sd,
              xMax: mean - 2*sd,
              borderColor: 'rgba(80, 80, 80, 0.6)',
              borderWidth: 2,
              borderDash: [5, 3],
              label: {
                display: true,
                content: '-2σ',
                position: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                font: { size: 11 }
              }
            },
            {
              type: 'line',
              xMin: mean - sd,
              xMax: mean - sd,
              borderColor: 'rgba(60, 60, 60, 0.7)',
              borderWidth: 2,
              borderDash: [5, 3],
              label: {
                display: true,
                content: '-1σ',
                position: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                font: { size: 11, weight: 'bold' }
              }
            },
            {
              type: 'line',
              xMin: mean,
              xMax: mean,
              borderColor: '#000',
              borderWidth: 3,
              borderDash: [8, 4],
              label: {
                display: true,
                content: 'μ (Mean)',
                position: 'start',
                backgroundColor: 'rgba(255, 215, 0, 0.95)',
                color: '#000',
                font: { size: 12, weight: 'bold' }
              }
            },
            {
              type: 'line',
              xMin: mean + sd,
              xMax: mean + sd,
              borderColor: 'rgba(60, 60, 60, 0.7)',
              borderWidth: 2,
              borderDash: [5, 3],
              label: {
                display: true,
                content: '+1σ',
                position: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                font: { size: 11, weight: 'bold' }
              }
            },
            {
              type: 'line',
              xMin: mean + 2*sd,
              xMax: mean + 2*sd,
              borderColor: 'rgba(80, 80, 80, 0.6)',
              borderWidth: 2,
              borderDash: [5, 3],
              label: {
                display: true,
                content: '+2σ',
                position: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                font: { size: 11 }
              }
            },
            {
              type: 'line',
              xMin: mean + 3*sd,
              xMax: mean + 3*sd,
              borderColor: 'rgba(100, 100, 100, 0.5)',
              borderWidth: 1,
              borderDash: [5, 3],
              label: {
                display: true,
                content: '+3σ',
                position: 'start',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                font: { size: 11 }
              }
            }
          ]
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { 
            color: '#333',
            font: { size: 11 }
          },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          title: {
            display: true,
            text: 'Probability Density',
            color: '#333',
            font: { size: 13, weight: 'bold' }
          }
        },
        x: {
          ticks: { 
            color: '#333',
            font: { size: 11 },
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 10
          },
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          title: {
            display: true,
            text: 'Score',
            color: '#333',
            font: { size: 13, weight: 'bold' }
          }
        }
      }
    }
  });

  return chart;
}

function renderSkewedDistribution(canvas, config = {}) {
  const normalData = generateBellCurveData(0, 1, -3, 3, 100);
  
  const leftData = [];
  const rightData = [];
  const step = 6 / 100;
  
  for (let i = 0; i < 100; i++) {
    const x = -3 + i * step;
    
    const leftX = -x;
    const leftNorm = (leftX + 1.5);
    const leftY = Math.pow(leftNorm, 2) * Math.exp(-leftNorm) * 0.15;
    leftData.push({ x, y: Math.max(0, leftY) });
    
    const rightNorm = (x + 3) / 1.5;
    const rightY = Math.pow(rightNorm, 1.5) * Math.exp(-rightNorm * 1.2) * 0.3;
    rightData.push({ x, y: Math.max(0, rightY) });
  }

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: normalData.map(d => d.x.toFixed(1)),
      datasets: [
        {
          label: 'Left Skew (Negative)',
          data: leftData.map(d => d.y),
          borderColor: chartConfig.colors.info,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Normal',
          data: normalData.map(d => d.y),
          borderColor: chartConfig.colors.warning,
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Right Skew (Positive)',
          data: rightData.map(d => d.y),
          borderColor: chartConfig.colors.danger,
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: chartConfig.colors.white,
            font: chartConfig.fonts.body
          }
        },
        title: {
          display: true,
          text: 'Skewed Distributions',
          color: chartConfig.colors.primary,
          font: chartConfig.fonts.title
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: chartConfig.colors.white },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        x: {
          ticks: { color: chartConfig.colors.white },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      }
    }
  });

  return chart;
}

function renderCorrelationChart(canvas, config = {}) {
  const r = config.r || 0;
  const label = config.label || `r = ${r}`;
  
  const scatterData = generateCorrelatedData(r, 100);
  const trendData = generateTrendLine(scatterData);

  const chart = new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Data Points',
          data: scatterData,
          backgroundColor: chartConfig.colors.gray,
          borderColor: chartConfig.colors.gray,
          pointRadius: 3,
          pointHoverRadius: 4
        },
        {
          label: 'Trend Line',
          data: trendData,
          type: 'line',
          borderColor: chartConfig.colors.warning,
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: label,
          color: chartConfig.colors.primary,
          font: chartConfig.fonts.subtitle
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: chartConfig.colors.white,
          bodyColor: chartConfig.colors.white
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Variable X',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.label
          },
          ticks: {
            color: chartConfig.colors.white,
            font: chartConfig.fonts.body
          },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          min: -3,
          max: 3
        },
        y: {
          title: {
            display: true,
            text: 'Variable Y',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.label
          },
          ticks: {
            color: chartConfig.colors.white,
            font: chartConfig.fonts.body
          },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          min: -3,
          max: 3
        }
      }
    }
  });

  return chart;
}

function renderStandardizedScores(canvas, config = {}) {
  const data = generateBellCurveData(0, 1, -3, 3, 100);

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map(d => d.x.toFixed(1)),
      datasets: [{
        label: 'Standard Normal Distribution',
        data: data.map(d => d.y),
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
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Standardized Score Equivalents',
          color: chartConfig.colors.primary,
          font: chartConfig.fonts.title
        },
        subtitle: {
          display: true,
          text: [
            'Z-scores: -3, -2, -1, 0, +1, +2, +3',
            'Standard: 55, 70, 85, 100, 115, 130, 145',
            'Scaled: 1, 4, 7, 10, 13, 16, 19',
            'T-scores: 20, 30, 40, 50, 60, 70, 80'
          ],
          color: chartConfig.colors.white,
          font: chartConfig.fonts.body,
          padding: { bottom: 10 }
        }
      },
      scales: {
        y: {
          ticks: { color: chartConfig.colors.white },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        x: {
          ticks: { color: chartConfig.colors.white },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          title: {
            display: true,
            text: 'Standard Deviations from Mean',
            color: chartConfig.colors.white
          }
        }
      }
    }
  });

  return chart;
}

// ========================================
// MAIN RENDER FUNCTION
// ========================================

function renderChart(canvasId, type, config = {}) {
  const canvas = document.getElementById(canvasId);
  
  if (!canvas) {
    console.error(`Canvas not found: ${canvasId}`);
    return null;
  }

  // Destroy existing chart if it exists
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }

  switch (type) {
    case 'normal-distribution':
      return renderNormalDistribution(canvas, config);
    case 'skewed':
      return renderSkewedDistribution(canvas, config);
    case 'correlation':
      return renderCorrelationChart(canvas, config);
    case 'standardized':
      return renderStandardizedScores(canvas, config);
    default:
      console.warn(`Unknown chart type: ${type}`);
      return null;
  }
}

// Export to window for browser use
window.chartUtils = { 
  renderChart,
  generateBellCurveData,
  generateSkewedData,
  generateCorrelatedData,
  generateTrendLine,
  renderNormalDistribution,
  renderSkewedDistribution,
  renderCorrelationChart,
  renderStandardizedScores
};

console.log('✅ Chart utilities loaded');
