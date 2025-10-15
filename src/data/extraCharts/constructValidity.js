/**
 * CONSTRUCT VALIDITY SECTION
 */

export const constructValidity = {
  id: 'construct-validity-example',
  title: 'Construct Validity',
  icon: '🧩',
  isExtraChart: true,
  content: {
    intro: 'Construct validity is the overarching validity concept - does the test truly measure the theoretical construct it claims to measure?',
    explanation: [
      {
        title: 'Understanding Construct Validity',
        points: [
          'Convergent validity: High correlations with related constructs',
          'Discriminant validity: Low correlations with unrelated constructs',
          'Factor analysis can reveal underlying construct structure',
          'Includes evidence from content, criterion, and other validity types'
        ]
      },
      {
        title: 'Reading This Chart',
        points: [
          'Green bubbles (convergent): Should show HIGH correlations (r > 0.60)',
          'Red bubbles (discriminant): Should show LOW correlations (r < 0.30)',
          'This pattern confirms the test measures what it claims'
        ]
      }
    ],
    keyPoint: 'Construct validity answers: "Does this test truly measure the theoretical construct it claims to?"'
  },
  visualization: {
    type: 'construct-validity',
    config: {
      title: 'Reading Test: Convergent & Discriminant Validity'
    }
  }
};
