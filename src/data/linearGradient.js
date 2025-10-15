/**
 * LINEAR GRADIENT CHART SECTION
 * Educational section explaining gradient visualization techniques
 */

export const linearGradient = {
  id: 'linear-gradient-example',
  title: 'Linear Gradient',
  icon: '🌈',
  isExtraChart: true,
  content: {
    intro: 'Linear gradient charts use color gradients to emphasize continuous change and help viewers quickly identify patterns in data trends.',
    explanation: [
      {
        title: 'Understanding Gradient Visualization',
        points: [
          'Color gradients show data intensity or temperature changes',
          'Smooth transitions help identify patterns and outliers',
          'Useful for time-series data with continuous values',
          'The gradient dynamically adjusts to chart size'
        ]
      }
    ],
    keyPoint: 'Gradient colors can make trends more intuitive but should be used thoughtfully to avoid overwhelming the viewer.'
  },
  visualization: {
    type: 'linear-gradient',
    config: {
      count: 7,
      min: -100,
      max: 100,
      title: 'Temperature Variation Over Time',
      xLabel: 'Month',
      yLabel: 'Temperature (°F)',
      datasetLabel: 'Temperature'
    }
  }
};
