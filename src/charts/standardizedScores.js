/**
 * STANDARDIZED SCORES CHART WITH VISUAL SCALES
 * Shows equivalent scores across different standardized scales
 * Each scale is represented as a visual axis below the bell curve
 */
(function() {
  const chartConfig = {
    colors: {
      primary: '#FFD700',
      zScore: '#3b82f6',
      standard: '#ef4444',
      scaled: '#10b981',
      tScore: '#8b5cf6',
      white: '#ffffff',
    },
    fonts: {
      title: { size: 18, weight: 'bold' },
      subtitle: { size: 12, weight: 'normal' },
      label: { size: 13, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
    }
  };

  // Scale definitions with their means, SDs, and display positions
  const scales = [
    {
      name: 'Z-scores',
      mean: 0,
      sd: 1,
      color: chartConfig.colors.zScore,
      yPosition: -0.05,
      values: [-3, -2, -1, 0, 1, 2, 3]
    },
    {
      name: 'Standard',
      mean: 100,
      sd: 15,
      color: chartConfig.colors.standard,
      yPosition: -0.10,
      values: [55, 70, 85, 100, 115, 130, 145]
    },
    {
      name: 'Scaled',
      mean: 10,
      sd: 3,
      color: chartConfig.colors.scaled,
      yPosition: -0.15,
      values: [1, 4, 7, 10, 13, 16, 19]
    },
    {
      name: 'T-scores',
      mean: 50,
      sd: 10,
      color: chartConfig.colors.tScore,
      yPosition: -0.20,
      values: [20, 30, 40, 50, 60, 70, 80]
    }
  ];

  function renderStandardizedScores(canvasId, config = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const data = window.chartUtils.generateBellCurveData(0, 1, -3, 3, 100);

    // Create annotations for each scale
    const annotations = {};
    
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
        const zScore = (value - scale.mean) / scale.sd;
        
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
        annotations[`tickLabel_${scaleIdx}_${valueIdx}`] = {
          type: 'label',
          xValue: zScore,
          yValue: scale.yPosition - 0.025,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: scale.color,
          content: value.toString(),
          font: { size: 9, weight: 'bold' },
          padding: 2,
          borderRadius: 2
        };
      });
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
            text: 'Standardized Score Equivalents',
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title
          },
          subtitle: {
            display: true,
            text: 'Visual comparison of equivalent scores across different scales',
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
            max: 0.45,
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
              text: 'Standard Deviations from Mean (Z-scores)',
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
  window.registerChart('standardized', renderStandardizedScores);
})();
