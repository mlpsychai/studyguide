/**
 * DISTRIBUTION SHAPES CHART
 * Shows left skew, normal, right skew, and multimodal distributions
 * UPDATED: All curves normalized to same peak height, labels corrected
 */
(function() {
  const chartConfig = {
    colors: {
      info: '#3b82f6',
      warning: '#f59e0b',
      danger: '#f44336',
      green: '#10b981',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  function renderSkewedDistribution(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const mean = 100;
    const sd = 15;
    
    // Normal distribution centered at 100
    const normalData = window.chartUtils.generateBellCurveData(mean, sd, mean - 3*sd, mean + 3*sd, 100);
    
    // Find peak of normal distribution for normalization
    const normalPeak = Math.max(...normalData.map(d => d.y));
    
    // Generate skewed distributions on same scale
    const leftData = [];
    const rightData = [];
    const step = (6 * sd) / 100;
    
    for (let i = 0; i < 100; i++) {
      const x = (mean - 3*sd) + i * step;
      const normalized = (x - mean) / sd;
      
      // Left skew (negative) - tail to the left
      const leftShift = -normalized - 1.5;
      const leftY = Math.pow(Math.max(0, leftShift), 2) * Math.exp(-leftShift);
      leftData.push({ x, y: Math.max(0, leftY) });
      
      // Right skew (positive) - tail to the right
      const rightShift = normalized - 1.5;
      const rightY = Math.pow(Math.max(0, rightShift), 2) * Math.exp(-rightShift);
      rightData.push({ x, y: Math.max(0, rightY) });
    }
    
    // Normalize skewed distributions to match normal peak height
    const leftPeak = Math.max(...leftData.map(d => d.y));
    const rightPeak = Math.max(...rightData.map(d => d.y));
    
    leftData.forEach(d => d.y = (d.y / leftPeak) * normalPeak);
    rightData.forEach(d => d.y = (d.y / rightPeak) * normalPeak);

    // Generate bimodal (multimodal) distribution
    // Two peaks at mean ± 1.5 SD (around 77.5 and 122.5)
    const bimodalData = [];
    for (let i = 0; i < 100; i++) {
      const x = (mean - 3*sd) + i * step;
      
      // Create two peaks using two Gaussian curves
      const peak1Mean = mean - 1.5 * sd;  // ~77.5
      const peak2Mean = mean + 1.5 * sd;  // ~122.5
      const peakSD = sd / 2;  // Narrower peaks
      
      // First peak
      const normalized1 = (x - peak1Mean) / peakSD;
      const y1 = Math.exp(-0.5 * normalized1 * normalized1);
      
      // Second peak
      const normalized2 = (x - peak2Mean) / peakSD;
      const y2 = Math.exp(-0.5 * normalized2 * normalized2);
      
      // Combine both peaks
      const bimodalY = y1 + y2;
      bimodalData.push({ x, y: bimodalY });
    }
    
    // Normalize bimodal distribution to match normal peak height
    const bimodalPeak = Math.max(...bimodalData.map(d => d.y));
    bimodalData.forEach(d => d.y = (d.y / bimodalPeak) * normalPeak);

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: normalData.map(d => Math.round(d.x)),
        datasets: [
          {
            label: 'Right Skew (Positive)',
            data: leftData.map(d => d.y),
            borderColor: chartConfig.colors.danger,
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
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
            label: 'Left Skew (Negative)',
            data: rightData.map(d => d.y),
            borderColor: chartConfig.colors.info,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 0
          },
          {
            label: 'Multimodal (Two Peaks)',
            data: bimodalData.map(d => d.y),
            borderColor: chartConfig.colors.green,
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: chartConfig.colors.white,
              font: { size: 12 }
            }
          },
          title: {
            display: true,
            text: 'Distribution Shapes',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
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
            ticks: { 
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10
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
  window.registerChart('skewed', renderSkewedDistribution);
})();
