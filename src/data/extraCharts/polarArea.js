/**
 * POLAR AREA CHART SECTION
 * Educational section explaining polar area charts for skill profiles
 */

export const polarArea = {
  id: 'polar-area-example',
  title: 'Polar Area Charts',
  icon: '🎯',
  isExtraChart: true,
  content: {
    intro: 'Polar area charts display multivariate data in a circular format, making them ideal for showing skill profiles.',
    explanation: [
      {
        title: 'Understanding Polar Area Charts',
        points: [
          'Each slice represents a different skill or domain',
          'The distance from center shows the score magnitude',
          'Larger/longer slices indicate stronger performance',
          'The shape reveals the overall profile pattern'
        ]
      }
    ],
    keyPoint: 'Polar area charts make complex multivariate data intuitive and visually appealing.'
  },
  visualization: {
    type: 'polar-area',
    config: {
      title: 'Student Skill Profile: Academic Domains',
      labels: ['Reading', 'Writing', 'Math', 'Science', 'Social Studies'],
      min: 0,
      max: 100,
      datasetLabel: 'Performance Score'
    }
  }
};
