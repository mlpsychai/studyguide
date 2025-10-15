/**
 * TEST-RETEST RELIABILITY SECTION
 */

export const testRetest = {
  id: 'test-retest-example',
  title: 'Test-Retest Reliability',
  icon: '🔄',
  isExtraChart: true,
  content: {
    intro: 'Test-retest reliability measures consistency of scores when the same test is administered twice to the same group.',
    explanation: [
      {
        title: 'Understanding Test-Retest Reliability',
        points: [
          'High correlation (r > 0.80) indicates stable, consistent measurement',
          'Best for measuring stable traits (IQ, personality) rather than rapidly changing skills',
          'Time interval matters: Too short = practice effects, Too long = true change',
          'Practice effects can artificially inflate scores on second administration'
        ]
      }
    ],
    keyPoint: 'Test-retest reliability answers: "If I give this test again, will I get similar results?"'
  },
  visualization: {
    type: 'test-retest',
    config: {
      correlation: 0.85,
      count: 25,
      title: 'Reading Test: Time 1 vs Time 2 (2 weeks apart)'
    }
  }
};
