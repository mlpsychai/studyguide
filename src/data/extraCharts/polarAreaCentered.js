/**
 * POLAR AREA CENTERED CHART SECTION
 * Educational section explaining enhanced polar area charts with centered labels
 */

export const polarAreaCentered = {
  id: 'polar-area-centered-example',
  title: 'Centered Labels',
  icon: '🎪',
  isExtraChart: true,
  content: {
    intro: 'This enhanced polar area chart uses centered point labels for improved readability.',
    explanation: [
      {
        title: 'Centered Labels vs Standard Labels',
        points: [
          'Centered labels are positioned at the edge of each slice',
          'Easier to read, especially with many categories',
          'Better for printed reports and presentations'
        ]
      }
    ],
    keyPoint: 'The centered label format makes this chart more professional and easier to read in formal assessment reports.'
  },
  visualization: {
    type: 'polar-area-centered',
    config: {
      title: 'Student Assessment Profile: All Domains',
      labels: ['Reading', 'Writing', 'Mathematics', 'Science', 'Social Studies', 'Arts'],
      min: 0,
      max: 100,
      datasetLabel: 'Percentile Rank'
    }
  }
};
