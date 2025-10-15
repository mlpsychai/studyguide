/**
 * MULTIPLE DATASETS CHART SECTION
 * Educational section explaining multi-group comparison visualizations
 */

export const multipleDatasets = {
  id: 'multiple-datasets-example',
  title: 'Multiple Groups',
  icon: '📊',
  isExtraChart: true,
  content: {
    intro: 'When comparing multiple groups simultaneously, area charts with filled regions help viewers quickly identify performance patterns and gaps between groups.',
    explanation: [
      {
        title: 'Reading Multi-Group Comparisons',
        points: [
          'Each colored band represents a different group or cohort',
          'Wider gaps between lines show greater performance differences',
          'Parallel lines suggest groups are improving at similar rates'
        ]
      }
    ],
    keyPoint: 'Multiple datasets allow for rich comparisons, but too many lines can become cluttered. Typically limit to 4-6 groups for readability.'
  },
  visualization: {
    type: 'multiple-datasets',
    config: {
      count: 8,
      min: 60,
      max: 100,
      title: 'Reading Progress: Four Intervention Groups',
      xLabel: 'Month of School Year',
      yLabel: 'Reading Level Score'
    }
  }
};
