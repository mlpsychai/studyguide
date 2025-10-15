/**
 * INTERNAL CONSISTENCY RELIABILITY SECTION
 */

export const internalConsistency = {
  id: 'internal-consistency-example',
  title: 'Internal Consistency',
  icon: '🎯',
  isExtraChart: true,
  content: {
    intro: 'Internal consistency examines whether test items measure the same underlying construct. High internal consistency means all items "hang together."',
    explanation: [
      {
        title: 'Understanding Item Analysis',
        points: [
          'Item Difficulty: Percentage who answered correctly (50-70% is ideal)',
          'Item Discrimination: How well the item separates high/low performers (r > 0.30)',
          'Good items discriminate well (r > 0.50) between strong and weak students',
          'Methods: Split-half, Cronbach\'s alpha (α), KR-20'
        ]
      }
    ],
    keyPoint: 'Internal consistency answers: "Do all my test items measure the same thing?"'
  },
  visualization: {
    type: 'internal-consistency',
    config: {
      numItems: 20,
      title: 'Reading Test: Item Analysis Results'
    }
  }
};
