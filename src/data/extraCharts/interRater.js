/**
 * INTER-RATER RELIABILITY SECTION
 */

export const interRater = {
  id: 'inter-rater-example',
  title: 'Inter-Rater Reliability',
  icon: '👥',
  isExtraChart: true,
  content: {
    intro: 'Inter-rater reliability measures agreement between different scorers on subjective assessments.',
    explanation: [
      {
        title: 'Understanding Rater Agreement',
        points: [
          'Critical for subjectively scored items (essays, observations, performance tasks)',
          'Methods: Correlation, percent agreement, Cohen\'s kappa',
          'Agreement within 1-2 points is typically acceptable',
          'Training and scoring rubrics improve inter-rater reliability'
        ]
      }
    ],
    keyPoint: 'Inter-rater reliability answers: "Do different scorers give similar scores to the same performance?"'
  },
  visualization: {
    type: 'inter-rater',
    config: {
      agreement: 0.85,
      count: 25,
      title: 'Essay Scoring: Rater 1 vs Rater 2'
    }
  }
};
