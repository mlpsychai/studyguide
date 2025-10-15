/**
 * BUBBLE CHART SECTION
 * Educational section explaining bubble charts for multivariate data
 */

export const bubbleChart = {
  id: 'bubble-example',
  title: 'Bubble Chart',
  icon: '🫧',
  isExtraChart: true,
  content: {
    intro: 'Bubble charts display three dimensions of data: X-axis, Y-axis, and bubble size. This example shows the relationship between study time, test scores, and confidence levels.',
    explanation: [
      {
        title: 'Reading a Bubble Chart',
        points: [
          'X-axis: Represents the first variable (e.g., hours studied)',
          'Y-axis: Represents the second variable (e.g., test score)',
          'Bubble Size: Represents the third variable (e.g., confidence level)',
          'Color: Can represent different groups or categories'
        ]
      },
      {
        title: 'When to Use Bubble Charts',
        points: [
          'Comparing three variables simultaneously',
          'Identifying patterns across multiple dimensions',
          'Showing relationships between groups',
          'Visualizing complex multivariate data'
        ]
      }
    ],
    keyPoint: 'Bubble charts are useful for multivariate analysis but can become cluttered with too many data points. Use them when you need to show relationships between three continuous variables.'
  },
  visualization: {
    type: 'bubble',
    config: {
      count: 12,
      title: 'Study Time vs Test Scores',
      xLabel: 'Study Hours',
      yLabel: 'Test Score (%)',
      bubbleLabel: 'Confidence Level'
    }
  }
};
