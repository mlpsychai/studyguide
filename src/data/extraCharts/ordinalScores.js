/**
 * ORDINAL SCORES SECTION
 */

export const ordinalScores = {
  id: 'ordinal-scores-example',
  title: 'Ordinal Scores Visualization',
  icon: '📊',
  isExtraChart: true,
  content: {
    intro: 'Ordinal scores (percentiles, quartiles, deciles, stanines) have UNEQUAL intervals - they rank order but differences between ranks are not equal.',
    explanation: [
      {
        title: 'Understanding Ordinal Scales',
        points: [
          'Percentiles: Divide distribution into 100 equal parts (1st, 50th, 99th)',
          'Quartiles: Divide into 4 parts (Q1=25th, Q2=50th, Q3=75th)',
          'Deciles: Divide into 10 parts (D1-D9)',
          'Stanines: Divide into 9 parts with specific percentages',
          '⚠️ CRITICAL: Intervals are UNEQUAL - difference between 50th-60th ≠ 90th-99th'
        ]
      }
    ],
    keyPoint: 'Ordinal scores rank students but cannot be used for meaningful arithmetic operations.'
  },
  visualization: {
    type: 'ordinal-scores',
    config: {}
  }
};
