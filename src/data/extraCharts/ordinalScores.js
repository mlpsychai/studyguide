/**
 * ORDINAL SCORES CHART SECTION
 * Educational section explaining ordinal score scales with visual representation
 */

export const ordinalScores = {
  id: 'ordinal-scores-visual',
  title: 'Ordinal Scores Visual',
  icon: '📏',
  isExtraChart: true,
  content: {
    intro: '⚠️ CRITICAL CONCEPT: Ordinal scores have UNEQUAL intervals between values. Unlike standardized scores (interval scales), you CANNOT perform mathematical operations on ordinal scores.',
    explanation: [
      {
        title: 'Understanding Ordinal Scales',
        points: [
          'Percentile ranks are the most common ordinal scores in assessment',
          'The difference between 50th and 60th percentile is NOT the same as between 90th and 100th',
          'Ordinal scores show rank order but not the magnitude of differences',
          'You cannot calculate a meaningful average of percentile ranks'
        ]
      },
      {
        title: 'Visual Evidence of Unequal Intervals',
        points: [
          'Notice how percentile markers cluster near the center of the bell curve',
          'There is much more space between extreme percentiles (1st vs 5th) than middle ones (45th vs 55th)',
          'This unequal spacing means you cannot add, subtract, or average these scores meaningfully'
        ]
      },
      {
        title: 'Why This Matters',
        points: [
          'WRONG: "Student scored at 50th percentile in reading and 70th in math, so average is 60th percentile"',
          'RIGHT: "Student scored at 50th percentile in reading (average) and 70th in math (above average)"',
          'Always describe ordinal scores qualitatively, not mathematically'
        ]
      }
    ],
    keyPoint: '🚨 Never perform mathematical operations on ordinal scores! Use standardized scores (like standard scores or scaled scores) when you need to calculate averages or differences.'
  },
  visualization: {
    type: 'ordinal-scores',
    config: {}
  }
};
