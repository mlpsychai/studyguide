/**
 * AXIS MIN-MAX CHART SECTION
 * Educational section explaining axis manipulation and its effects on perception
 */

export const axisMinMax = {
  id: 'axis-min-max-example',
  title: 'Axis Manipulation',
  icon: '⚠️',
  isExtraChart: true,
  content: {
    intro: 'One of the most common ways to mislead with data visualization is by manipulating axis scales.',
    explanation: [
      {
        title: '⚠️ Critical Concept: Truncated Axes',
        points: [
          'This chart has Y-axis set to 10-50, but data ranges from -10 to 100',
          'Values outside this range are CLIPPED and not visible',
          'The same data can look completely different with different axis ranges',
          'Always check the axis scale before interpreting a chart'
        ]
      }
    ],
    keyPoint: '🚨 CRITICAL THINKING SKILL: Always examine axis scales! The same data can tell completely different stories depending on how axes are set.'
  },
  visualization: {
    type: 'axis-min-max',
    config: {
      title: 'Same Data, Manipulated Scale (Y-axis: 10-50)',
      xLabel: 'Assessment Period',
      yLabel: 'Test Score',
      yMin: 10,
      yMax: 50,
      dataset1Label: 'School A',
      dataset2Label: 'School B',
      dataset1Data: [10, 30, 50, 20, 25, 44, -10],
      dataset2Data: [100, 33, 22, 19, 11, 49, 30],
      showSubtitle: true
    }
  }
};
