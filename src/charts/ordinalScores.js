/**
 * ORDINAL SCORES CHART WITH VISUAL SCALES
 * Shows ordinal score scales: Percentiles, Quartiles, Deciles, Stanines
 * ⚠️ CRITICAL: These have UNEQUAL intervals - not true interval scales!
 */
(function() {
  const chartConfig = {
    colors: {
      primary: '#FFD700',
      percentile: '#ef4444',
      quartile: '#3b82f6',
      decile: '#10b981',
      stanine: '#8b5cf6',
      warning: '#f59e0b',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 12, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  // Helper function to convert percentile to z-score (approximation)
  function percentileToZScore(percentile) {
    // Approximate inverse normal CDF
    // Using simplified approximation for visualization
    if (percentile === 50) return 0;
    if (percentile === 1) return -2.33;
    if (percentile === 5) return -1.645;
    if (percentile === 10) return -1.28;
    if (percentile === 25) return -0.675;
    if (percentile === 75) return 0.675;
    if (percentile === 90) return 1.28;
    if (percentile === 95) return 1.645;
    if (percentile === 99) return 2.33;
    
    // Linear interpolation for others
    if (percentile < 50) {
      return -2.5 + (percentile / 50) * 2.5;
    } else {
      return ((percentile - 50) / 50) * 2.5;
    }
  }

  // Ordinal scale definitions
  const scales = [
    {
      name: 'Percentiles',
      color: chartConfig.colors.percentile,
      yPosition: -0.05,
      values: [1, 5, 10, 25, 50, 75, 90, 95, 99],
      labels: ['1st', '5th', '10th', '25th', '50th', '75th', '90th', '95th', '99th'],
      getZScore: percentileToZScore
    },
    {
      name: 'Quartiles',
      color: chartConfig.colors.quartile,
      yPosition: -0.10,
      values: [25, 50, 75],
      labels: ['Q1', 'Q2', 'Q3'],
      getZScore: percentileToZScore
    },
    {
      name: 'Deciles',
      color: chartConfig.colors.decile,
      yPosition: -0.15,
      values: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      labels: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
      getZScore: percentileToZScore
    },
    {
      name: 'Stanines',
      color: chartConfig.colors.stanine,
      yPosition: -0.20,
      values: [4, 11, 23, 40, 60, 77, 89, 96],
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      getZScore: percentileToZScore,
      stanine: true // Special handling for stanine bands
    }
  };

  function renderOrdinalScores(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const data = window.chartUtils.generateBellCurveData(0, 1, -3, 3, 100);

    // Create annotations for each scale
    const annotations = {};
    
    // Warning box about unequal intervals
    annotations['warning'] = {
      type: 'box',
      xMin: -3.5,
      xMax: 3.5,
      yMin: 0.40,
      yMax: 0.45,
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      borderColor: chartConfig.colors.warning,
      borderWidth: 2,
      borderRadius: 4,
      label: {
        display: true,
        content: '⚠️ WARNING: Ordinal scales have UNEQUAL intervals - differences between ranks are NOT equal!',
        color: chartConfig.colors.warning,
        font: { size: 11, weight: 'bold' },
        position: 'center'
      }
    };

    scales.forEach((scale, scaleIdx) => {
      // Horizontal line for this scale
      annotations[`line_${scaleIdx}`] = {
        type: 'line',
        yMin: scale.yPosition,
        yMax: scale.yPosition,
        xMin: -3,
        xMax: 3,
        borderColor: scale.color,
        borderWidth: 2,
        borderDash: [5, 3]
      };

      // Label for the scale name
      annotations[`label_${scaleIdx}`] = {
        type: 'label',
        xValue: -3.3,
        yValue: scale.yPosition,
        backgroundColor: scale.color,
        color: '#ffffff',
        content: scale.name,
        font: { size: 10, weight: 'bold' },
        padding: 4,
        borderRadius: 3
      };

      // Tick marks and labels for each value
      scale.values.forEach((value, valueIdx) => {
        const zScore = scale.getZScore(value);
        
        // Vertical tick mark
        annotations[`tick_${scaleIdx}_${valueIdx}`] = {
          type: 'line',
          xMin: zScore,
          xMax: zScore,
          yMin: scale.yPosition - 0.015,
          yMax: scale.yPosition + 0.015,
          borderColor: scale.color,
          borderWidth: 2
        };

        // Value label
        const label = scale.labels ? scale.labels[valueIdx] : value.toString();
        annotations[`tickLabel_${scaleIdx}_${valueIdx}`] = {
          type: 'label',
          xValue: zScore,
          yValue: scale.yPosition - 0.025,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: scale.color,
          content: label,
          font: { size: 9, weight: 'bold' },
          padding: 2,
          borderRadius: 2
        };
      });

      // For stanines, add band boundaries
      if (scale.stanine) {
        const stanineRanges = [
          { start: -3, end: percentileToZScore(4), stanine: 1 },
          { start: percentileToZScore(4), end: percentileToZScore(11), stanine: 2 },
          { start: percentileToZScore(11), end: percentileToZScore(23), stanine: 3 },
          { start: percentileToZScore(23), end: percentileToZScore(40), stanine: 4 },
          { start: percentileToZScore(40), end: percentileToZScore(60), stanine: 5 },
          { start: percentileToZScore(60), end: percentileToZScore(77), stanine: 6 },
          { start: percentileToZScore(77), end: percentileToZScore(89), stanine: 7 },
          { start: percentileToZScore(89), end: percentileToZScore(96), stanine: 8 },
          { start: percentileToZScore(96), end: 3, stanine: 9 }
        ];

        stanineRanges.forEach((range, idx) => {
          // Show stanine number in the middle of its band
          const midPoint = (range.start + range.end) / 2;
          annotations[`stanine_num_${idx}`] = {
            type: 'label',
            xValue: midPoint,
            yValue: scale.yPosition + 0.02,
            backgroundColor: 'rgba(139, 92, 246, 0.3)',
            color: scale.color,
            content: range.stanine.toString(),
            font: { size: 10, weight: 'bold' },
            padding: 3,
            borderRadius: 3
          };
        });
      }
    });

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Standard Normal Distribution',
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
            text: 'Ordinal Score Scales (UNEQUAL Intervals)',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: 'Percentiles, Quartiles, Deciles, and Stanines mapped to the normal distribution',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.subtitle,
            padding: { bottom: 10 }
          },
          annotation: {
            annotations: annotations
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          y: {
            min: -0.25,
            max: 0.47,
            ticks: { 
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              callback: function(value) {
                // Only show positive values for the probability density
                return value >= 0 ? value.toFixed(2) : '';
              }
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
            min: -3.5,
            max: 3.5,
            ticks: { 
              color: chartConfig.colors.white,
              font: chartConfig.fonts.body,
              stepSize: 1,
              callback: function(value) {
                // Show main z-score ticks
                if (value >= -3 && value <= 3) {
                  return value;
                }
                return '';
              }
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            title: {
              display: true,
              text: 'Standard Deviations from Mean (for reference only)',
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
  window.registerChart('ordinal-scores', renderOrdinalScores);
})();
