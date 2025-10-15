/**
 * ALTERNATE FORMS RELIABILITY SECTION
 */

export const alternateForms = {
  id: 'alternate-forms-example',
  title: 'Alternate Forms',
  icon: '📋',
  isExtraChart: true,
  content: {
    intro: 'Alternate forms reliability assesses whether two different versions of a test yield similar scores.',
    explanation: [
      {
        title: 'Understanding Alternate Forms',
        points: [
          'Two parallel test forms with equivalent content and difficulty',
          'Administered close together to minimize true change',
          'Avoids practice effects from taking identical test twice',
          'Correlation typically 0.80-0.90 for well-designed forms'
        ]
      }
    ],
    keyPoint: 'Alternate forms answer: "Are my two test versions measuring the same thing equally well?"'
  },
  visualization: {
    type: 'alternate-forms',
    config: {
      correlation: 0.88,
      count: 25,
      title: 'Math Test: Form A vs Form B'
    }
  }
};
