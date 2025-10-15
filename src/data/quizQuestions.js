/**
 * QUIZ QUESTIONS
 * All 45 quiz questions with answers and explanations
 */

export const quizQuestions = [
  {
    id: 'q1',
    section: 'scales',
    type: 'multiple-choice',
    question: 'A teacher ranks students as 1st place, 2nd place, and 3rd place in a spelling bee. What scale of measurement is this?',
    options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
    correctAnswer: 1,
    explanation: 'This is ordinal because students are ranked in order, but the difference between 1st and 2nd may not be the same as between 2nd and 3rd.'
  },
  {
    id: 'q2',
    section: 'scales',
    type: 'multiple-choice',
    question: 'Which scale has equal intervals but NO true zero?',
    options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
    correctAnswer: 2,
    explanation: 'Interval scales have equal distances between points but no absolute zero (e.g., temperature in Fahrenheit or IQ scores).'
  },
  {
    id: 'q3',
    section: 'scales',
    type: 'multiple-choice',
    question: 'Height measured in centimeters is what type of scale?',
    options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
    correctAnswer: 3,
    explanation: 'Ratio scales have equal intervals AND a true zero. Zero centimeters means no height exists.'
  },
  {
    id: 'q4',
    section: 'scales',
    type: 'multiple-choice',
    question: 'Jersey numbers on a basketball team represent which scale?',
    options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
    correctAnswer: 0,
    explanation: 'Jersey numbers are just labels/categories with no mathematical meaning - they\'re nominal.'
  },
  {
    id: 'q5',
    section: 'central-tendency',
    type: 'multiple-choice',
    question: 'In a perfectly normal distribution, which is true?',
    options: [
      'Mean > Median > Mode',
      'Mean < Median < Mode',
      'Mean = Median = Mode',
      'They are all different'
    ],
    correctAnswer: 2,
    explanation: 'In a normal distribution, all three measures of central tendency are equal and fall at the center.'
  },
  {
    id: 'q6',
    section: 'central-tendency',
    type: 'multiple-choice',
    question: 'Which measure is MOST affected by extreme outliers?',
    options: ['Mean', 'Median', 'Mode', 'All equally affected'],
    correctAnswer: 0,
    explanation: 'The mean is pulled toward extreme scores because it uses all values in its calculation.'
  },
  {
    id: 'q7',
    section: 'central-tendency',
    type: 'multiple-choice',
    question: 'For the scores 5, 5, 5, 7, 9, 10, 15, what is the median?',
    options: ['5', '7', '8', '9'],
    correctAnswer: 1,
    explanation: 'The median is the middle score when arranged in order. With 7 scores, the 4th score (7) is the median.'
  },
  {
    id: 'q8',
    section: 'variability',
    type: 'multiple-choice',
    question: 'According to the 68-95-99.7 rule, what percentage of scores fall within ±1 SD of the mean?',
    options: ['68%', '95%', '99.7%', '50%'],
    correctAnswer: 0,
    explanation: 'In a normal distribution, 68% of scores fall within one standard deviation above or below the mean.'
  },
  {
    id: 'q9',
    section: 'variability',
    type: 'multiple-choice',
    question: 'If the standard deviation is 5, what is the variance?',
    options: ['2.5', '5', '10', '25'],
    correctAnswer: 3,
    explanation: 'Variance is the square of the standard deviation: 5² = 25'
  },
  {
    id: 'q10',
    section: 'variability',
    type: 'multiple-choice',
    question: 'A class has test scores with SD = 2. Another class has SD = 12. Which class has more variability?',
    options: [
      'First class (SD=2)',
      'Second class (SD=12)',
      'Both the same',
      'Cannot determine'
    ],
    correctAnswer: 1,
    explanation: 'Higher SD means more spread out scores. SD=12 shows much more variability than SD=2.'
  },
  {
    id: 'q11',
    section: 'distributions',
    type: 'multiple-choice',
    question: 'In a positively skewed distribution, which is typically true?',
    options: [
      'Mean < Median < Mode',
      'Mean > Median > Mode',
      'Mean = Median = Mode',
      'Mode > Mean > Median'
    ],
    correctAnswer: 1,
    explanation: 'In positive (right) skew, the mean is pulled toward the tail: Mean > Median > Mode.'
  },
  {
    id: 'q12',
    section: 'distributions',
    type: 'multiple-choice',
    question: 'A very easy test where most students score high would likely show:',
    options: [
      'Normal distribution',
      'Positive skew',
      'Negative skew',
      'Bimodal distribution'
    ],
    correctAnswer: 2,
    explanation: 'When most scores are high with a few low scores, you get negative (left) skew.'
  },
  {
    id: 'q13',
    section: 'distributions',
    type: 'multiple-choice',
    question: 'Income distribution in the US typically shows:',
    options: [
      'Normal distribution',
      'Positive skew',
      'Negative skew',
      'Uniform distribution'
    ],
    correctAnswer: 1,
    explanation: 'Most people earn moderate incomes, with a few earning much more - creating positive (right) skew.'
  },
  {
    id: 'q14',
    section: 'correlation',
    type: 'multiple-choice',
    question: 'A correlation of -0.85 indicates:',
    options: [
      'Weak negative relationship',
      'Strong negative relationship',
      'No relationship',
      'Moderate positive relationship'
    ],
    correctAnswer: 1,
    explanation: 'Correlations close to -1.00 or +1.00 are strong. The negative sign shows inverse relationship.'
  },
  {
    id: 'q15',
    section: 'correlation',
    type: 'multiple-choice',
    question: 'Which correlation is STRONGER: r = -0.70 or r = +0.50?',
    options: [
      'r = -0.70',
      'r = +0.50',
      'Both equally strong',
      'Cannot compare'
    ],
    correctAnswer: 0,
    explanation: 'Use absolute values to compare strength. |-0.70| = 0.70 > |+0.50| = 0.50'
  },
  {
    id: 'q16',
    section: 'correlation',
    type: 'true-false',
    question: 'If two variables have a strong correlation, one must cause the other.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'FALSE! Correlation does not imply causation. There could be a third variable or the relationship could be coincidental.'
  },
  {
    id: 'q17',
    section: 'correlation',
    type: 'multiple-choice',
    question: 'A correlation of r = 0.05 suggests:',
    options: [
      'Strong positive relationship',
      'Moderate relationship',
      'Weak/no relationship',
      'Strong negative relationship'
    ],
    correctAnswer: 2,
    explanation: 'Correlations close to 0 indicate little to no relationship between variables.'
  },
  {
    id: 'q18',
    section: 'standardized-scores',
    type: 'multiple-choice',
    question: 'A standard score of 85 is how many standard deviations below the mean?',
    options: ['-2 SD', '-1 SD', '+1 SD', '+2 SD'],
    correctAnswer: 1,
    explanation: 'Standard scores have M=100, SD=15. A score of 85 is 15 points below 100, which is -1 SD.'
  },
  {
    id: 'q19',
    section: 'standardized-scores',
    type: 'multiple-choice',
    question: 'Which score type has a mean of 50 and SD of 10?',
    options: ['Z-score', 'Standard Score', 'T-score', 'Scaled Score'],
    correctAnswer: 2,
    explanation: 'T-scores have M=50, SD=10. Commonly used for behavioral/social-emotional measures.'
  },
  {
    id: 'q20',
    section: 'standardized-scores',
    type: 'true-false',
    question: 'Percentile ranks are an interval scale with equal units.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'FALSE! Percentile ranks are ordinal - the distance between ranks is not equal across the distribution.'
  },
  {
    id: 'q21',
    section: 'reliability',
    type: 'multiple-choice',
    question: 'Which type of reliability checks if test items measure the same construct?',
    options: ['Test-retest', 'Internal consistency', 'Inter-rater', 'Criterion'],
    correctAnswer: 1,
    explanation: 'Internal consistency examines whether items within the test are measuring the same thing.'
  },
  {
    id: 'q22',
    section: 'reliability',
    type: 'multiple-choice',
    question: 'Standard Error of Measurement (SEM) is used to:',
    options: [
      'Calculate the mean',
      'Create confidence intervals',
      'Determine validity',
      'Rank test takers'
    ],
    correctAnswer: 1,
    explanation: 'SEM estimates measurement error and is used to build confidence intervals around obtained scores.'
  },
  {
    id: 'q23',
    section: 'reliability',
    type: 'true-false',
    question: 'A test with high reliability will always have high validity.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'FALSE! A test can be consistent (reliable) but still not measure what it claims (invalid).'
  },
  {
    id: 'q24',
    section: 'reliability',
    type: 'true-false',
    question: 'Higher reliability coefficients mean less measurement error.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! As reliability increases, measurement error decreases. They have an inverse relationship.'
  },
  {
    id: 'q25',
    section: 'validity',
    type: 'multiple-choice',
    question: 'Which type of validity asks "Does the test content represent what we\'re measuring?"',
    options: ['Criterion validity', 'Content validity', 'Construct validity', 'Predictive validity'],
    correctAnswer: 1,
    explanation: 'Content validity examines whether test items adequately cover the domain being assessed.'
  },
  {
    id: 'q26',
    section: 'validity',
    type: 'true-false',
    question: 'A test can have good reliability but poor validity.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Example: A bathroom scale is reliable (consistent) but not valid for measuring height.'
  },
  {
    id: 'q27',
    section: 'validity',
    type: 'true-false',
    question: 'Predictive validity shows how well a test correlates with future performance.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Predictive validity is a type of criterion validity that examines prediction of future outcomes.'
  },
  {
    id: 'q28',
    section: 'test-types',
    type: 'multiple-choice',
    question: 'Norm-referenced tests compare an individual to:',
    options: [
      'A set criterion',
      'Their own previous performance',
      'A normative group',
      'The teacher\'s expectations'
    ],
    correctAnswer: 2,
    explanation: 'Norm-referenced tests show how an individual compares to a standardization sample.'
  },
  {
    id: 'q29',
    section: 'test-types',
    type: 'multiple-choice',
    question: 'Which test type measures what has already been learned?',
    options: ['Aptitude test', 'Achievement test', 'Diagnostic test', 'Screening test'],
    correctAnswer: 1,
    explanation: 'Achievement tests measure acquired knowledge and skills.'
  },
  {
    id: 'q30',
    section: 'test-types',
    type: 'multiple-choice',
    question: 'A driver\'s license test (pass/fail) is an example of:',
    options: [
      'Norm-referenced test',
      'Criterion-referenced test',
      'Aptitude test',
      'Diagnostic test'
    ],
    correctAnswer: 1,
    explanation: 'Criterion-referenced tests compare performance to a fixed standard (passing criteria).'
  },
  {
    id: 'q31',
    section: 'test-types',
    type: 'true-false',
    question: 'IQ tests are examples of achievement tests.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'FALSE! IQ tests are aptitude/cognitive tests that measure potential, not learned achievement.'
  },
  {
    id: 'q32',
    section: 'test-types',
    type: 'true-false',
    question: 'Diagnostic tests identify specific strengths and weaknesses.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Diagnostic tests provide detailed information about specific skill areas.'
  },
  {
    id: 'q33',
    section: 'test-types',
    type: 'true-false',
    question: 'Norm-referenced tests tell you what percentage of content a student has mastered.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'FALSE! Norm-referenced tests show relative standing, not absolute mastery. Criterion-referenced tests show mastery.'
  },
  {
    id: 'q34',
    section: 'language',
    type: 'multiple-choice',
    question: 'Understanding spoken directions is an example of:',
    options: [
      'Expressive language',
      'Receptive language',
      'Pragmatic language',
      'Written language'
    ],
    correctAnswer: 1,
    explanation: 'Receptive language involves understanding what is heard or read.'
  },
  {
    id: 'q35',
    section: 'language',
    type: 'multiple-choice',
    question: 'Speaking in complete sentences is an example of:',
    options: [
      'Expressive language',
      'Receptive language',
      'Phonological awareness',
      'Decoding'
    ],
    correctAnswer: 0,
    explanation: 'Expressive language involves producing language through speaking or writing.'
  },
  {
    id: 'q36',
    section: 'language',
    type: 'true-false',
    question: 'Receptive language typically develops before expressive language.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Children usually understand more than they can express, especially in early development.'
  },
  {
    id: 'q37',
    section: 'norming',
    type: 'multiple-choice',
    question: 'A standardization sample should be:',
    options: [
      'As small as possible',
      'Only include high-achieving individuals',
      'Representative of the population',
      'Only from one geographic region'
    ],
    correctAnswer: 2,
    explanation: 'A good standardization sample represents the diversity of the population being assessed.'
  },
  {
    id: 'q38',
    section: 'norming',
    type: 'true-false',
    question: 'Test administration procedures should be identical for all examinees.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Standardized administration ensures fair comparison to norms.'
  },
  {
    id: 'q39',
    section: 'norming',
    type: 'true-false',
    question: 'Cultural background can affect test performance.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Many factors including culture, language, and SES can influence test performance.'
  },
  {
    id: 'q40',
    section: 'norming',
    type: 'true-false',
    question: 'Emotional state during testing has no effect on test scores.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'FALSE! Anxiety, fatigue, and other emotional states can significantly impact performance.'
  },
  {
    id: 'q41',
    section: 'scoring',
    type: 'multiple-choice',
    question: 'Raw scores are:',
    options: [
      'Directly comparable across tests',
      'The number of correct items',
      'Always standardized',
      'Better than derived scores'
    ],
    correctAnswer: 1,
    explanation: 'Raw scores are simply the count of correct responses before any transformation.'
  },
  {
    id: 'q42',
    section: 'scoring',
    type: 'true-false',
    question: 'Age equivalent scores should be interpreted with caution.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Age equivalents can be misleading and don\'t account for the full range of performance.'
  },
  {
    id: 'q43',
    section: 'ktea',
    type: 'true-false',
    question: 'Composite scores are generally more reliable than individual subtest scores.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Combining multiple subtests reduces measurement error and increases reliability.'
  },
  {
    id: 'q44',
    section: 'ktea',
    type: 'true-false',
    question: 'Test-retest reliability examines consistency over time.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE! Test-retest shows if scores are stable when the same test is given again.'
  },
  {
    id: 'q45',
    section: 'ktea',
    type: 'true-false',
    question: 'The Standard Error of Measurement is the same for all age groups.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'FALSE! SEM varies by age, score level, and subtest. Always check the tables for the specific case.'
  }
];
