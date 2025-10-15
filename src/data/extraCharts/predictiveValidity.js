/**
 * PREDICTIVE VALIDITY SECTION
 */

export const predictiveValidity = {
  id: 'predictive-validity-example',
  title: 'Predictive Validity',
  icon: '🔮',
  isExtraChart: true,
  content: {
    intro: 'Predictive validity shows how well test scores predict future performance or outcomes.',
    explanation: [
      {
        title: 'Understanding Predictive Validity',
        points: [
          'Test given first, criterion measure collected later',
          'Time lag between predictor and outcome varies by purpose',
          'Correlation of 0.50+ indicates useful prediction',
          'Examples: SAT predicting college GPA, screening tests predicting job performance'
        ]
      }
    ],
    keyPoint: 'Predictive validity answers: "Can this test tell us about future performance?"'
  },
  visualization: {
    type: 'predictive-validity',
    config: {
      correlation: 0.65,
      count: 25,
      title: 'Kindergarten Screening Test Predicting 3rd Grade GPA'
    }
  }
};
