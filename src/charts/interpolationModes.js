/**
 * INTERPOLATION MODES CHART
 * Demonstrates how different line interpolation methods affect data visualization
 */
(function () {
  const chartConfig = {
    colors: { red: '#ef4444', blue: '#3b82f6', green: '#10b981', white: '#ffffff' },
    fonts: {
      title: { size: 18, weight: 'bold' },
      label: { size: 13, weight: 'bold' },
      body:  { size: 11, weight: 'normal' },
    },
  };

  function renderInterpolationModes(canvasId, config = {}) {
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return null;
    }
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }

    const title  = config.title  || 'Different Ways to Connect Data Points';
    const xLabel = config.xLabel || 'Time Point';
    const yLabel = config.yLabel || 'Test Score';

    // Use provided datapoints or a default; ensure labels match length
    const datapoints =
      Array.isArray(config.datapoints)
        ? config.datapoints.slice()
        : [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];

    const labels = Array.from({ length: datapoints.length }, (_, i) => String(i));

    return new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Cubic Monotone (Smooth, No Overshoot)',
            data: datapoints,
            borderColor: chartConfig.colors.red,
            backgroundColor: 'transparent',
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: chartConfig.colors.red,
            pointBorderColor: chartConfig.colors.white,
            pointBorderWidth: 2,
          },
          {
            label: 'Cubic (Smooth, May Overshoot)',
            data: datapoints,
            borderColor: chartConfig.colors.blue,
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.4, // cubic
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: chartConfig.colors.blue,
            pointBorderColor: chartConfig.colors.white,
            pointBorderWidth: 2,
          },
          {
            label: 'Linear (Straight Lines)',
            data: datapoints,
            borderColor: chartConfig.colors.green,
            backgroundColor: 'transparent',
            fill: false,
            tension: 0, // linear
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: chartConfig.colors.green,
            pointBorderColor: chartConfig.colors.white,
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        spanGaps: true, // connect across NaN
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: chartConfig.colors.white,
              font: { size: 11 },
              usePointStyle: true,
              padding: 10,
            },
          },
          title: {
            display: true,
            text: title,
            color: chartConfig.colors.white,
            font: chartConfig.fonts.title,
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            titleColor: chartConfig.colors.white,
            bodyColor: chartConfig.colors.white,
            padding: 12,
            borderColor: chartConfig.colors.white,
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            title: { display: true, text: xLabel, color: chartConfig.colors.white, font: chartConfig.fonts.label },
            ticks: { color: chartConfig.colors.white, font: chartConfig.fonts.body },
            grid: { color: 'rgba(255,255,255,0.1)' },
          },
          y: {
            title: { display: true, text: yLabel, color: chartConfig.colors.white, font: chartConfig.fonts.label },
            ticks: { color: chartConfig.colors.white, font: chartConfig.fonts.body },
            grid: { color: 'rgba(255,255,255,0.1)' },
            suggestedMin: -10,
            suggestedMax: 200,
          },
        },
      },
    });
  }

  // Register type used by your data ("interpolation-modes")
  window.registerChart('interpolation-modes', renderInterpolationModes);
})();
