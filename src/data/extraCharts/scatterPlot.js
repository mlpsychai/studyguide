/**
 * SCATTER PLOT CHART SECTION
 * Educational section explaining scatter plots for relationship analysis
 */

export const scatterPlot = {
  id: 'scatter-plot-example',
  title: 'Scatter Plots',
  icon: '⚫',
  isExtraChart: true,
  content: {
    intro: 'Scatter plots show the relationship between two continuous variables, with each point representing an individual observation.',
    explanation: [
      {
        title: 'Reading Scatter Plots',
        points: [
          'Each point represents one individual or case',
          'X-axis and Y-axis show two different variables',
          'Clustering of points suggests groups or patterns',
          'Outliers appear far from the main cluster'
        ]
      }
    ],
    keyPoint: 'Scatter plots are excellent for exploring relationships before calculating correlation coefficients.'
  },
  visualization: {
    type: 'scatter-plot',
    config: {
      count: 25,
      xMin: 0,
      xMax: 100,
      yMin: 0,
      yMax: 100,
      title: 'Reading Score vs Math Score',
      xLabel: 'Reading Score',
      yLabel: 'Math Score',
      dataset1Label: 'School A',
      dataset2Label: 'School B'
    }
  }
};
