/**
 * CONCURRENT VALIDITY SECTION
 */

export const concurrentValidity = {
  id: 'concurrent-validity-example',
  title: 'Concurrent Validity',
  icon: '⚖️',
  isExtraChart: true,
  content: {
    intro: 'Concurrent validity shows how well a test correlates with an established measure of the same construct, both administered at the same time.',
    explanation: [
      {
        title: 'Understanding Concurrent Validity',
        points: [
          'Correlates new test with established criterion measure',
          'Both tests given at approximately the same time',
          'Correlation of 0.70+ indicates strong concurrent validity',
          'Useful for developing shorter or more efficient tests'
        ]
      }
    ],
    keyPoint: 'Concurrent validity answers: "Does my test measure the same thing as the established test?"'
  },
  visualization: {
    type: 'concurrent-validity',
    config: {
      correlation: 0.78,
      count: 25,
      title: 'New Reading Test vs Established Reading Test'
    }
  }
};
