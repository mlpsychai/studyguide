/**
 * CUSTOM TOOLTIP CHART SECTION
 * Educational section explaining interactive tooltips in data visualization
 */

export const customTooltip = {
  id: 'custom-tooltip-example',
  title: 'Interactive Tooltips',
  icon: '💬',
  isExtraChart: true,
  content: {
    intro: 'Interactive tooltips help you explore data by showing detailed information when hovering over data points.',
    explanation: [
      {
        title: 'Using Interactive Tooltips',
        points: [
          'Hover over any point to see both datasets\' values at once',
          'The footer shows the combined total of both groups',
          'Mode: "index" displays all datasets at the same time point'
        ]
      }
    ],
    keyPoint: 'Hover over the chart to see the interactive tooltip in action!'
  },
  visualization: {
    type: 'custom-tooltip',
    config: {
      count: 7,
      min: 50,
      max: 100,
      title: 'Pre-Test vs Post-Test Scores',
      xLabel: 'Assessment Period',
      yLabel: 'Score (%)',
      dataset1Label: 'Pre-Test',
      dataset2Label: 'Post-Test'
    }
  }
};
