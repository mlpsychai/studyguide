/**
 * CONTENT VALIDITY SECTION
 */

export const contentValidity = {
  id: 'content-validity-example',
  title: 'Content Validity',
  icon: '📚',
  isExtraChart: true,
  content: {
    intro: 'Content validity ensures test items adequately represent the content domain being measured.',
    explanation: [
      {
        title: 'Evaluating Content Coverage',
        points: [
          'Do test items cover all important aspects of the domain?',
          'Are items proportional to the importance of each content area?',
          'Expert review and curriculum alignment verify content validity',
          'Test blueprint or table of specifications documents intended coverage'
        ]
      }
    ],
    keyPoint: 'Content validity answers: "Does this test cover the right stuff in the right proportions?"'
  },
  visualization: {
    type: 'content-validity',
    config: {
      title: 'Math Test: Intended vs Actual Domain Coverage'
    }
  }
};
