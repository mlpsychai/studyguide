/**
 * INTERPOLATION MODES CHART SECTION
 * Educational section explaining different line interpolation methods
 */

export const interpolationModes = {
  id: 'interpolation-modes-example',
  title: 'Line Interpolation',
  icon: '📈',
  isExtraChart: true,
  content: {
    intro: 'The way we connect data points in a line chart affects how viewers interpret trends. Different interpolation methods can emphasize or minimize changes in data.',
    explanation: [
      {
        title: 'Understanding Interpolation Methods',
        points: [
          'Linear: Straight lines between points (default) - shows exact changes',
          'Cubic: Smooth curves that may overshoot between points',
          'Cubic Monotone: Smooth curves that never overshoot - best for most cases',
          'The same data looks different depending on the interpolation method!'
        ]
      }
    ],
    keyPoint: 'Notice how the SAME data points look different with each method! This shows why it\'s important to choose appropriate visualization methods.'
  },
  visualization: {
    type: 'interpolation-modes',
    config: {
      title: 'Same Data, Three Interpolation Methods',
      xLabel: 'Assessment Period',
      yLabel: 'Reading Level Score',
      datapoints: [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170]
    }
  }
};
