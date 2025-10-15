/**
 * MAIN EDUCATIONAL SECTIONS
 * Core curriculum content for the study guide
 * These 13 sections form the foundation of the educational material
 */

export const mainSections = [
  {
    id: 'scales',
    title: 'Scales of Measurement',
    icon: '📏',
    content: {
      intro: 'Understanding the four scales of measurement is crucial for choosing the right statistical tests and interpreting results correctly.',
      scales: [
        {
          number: 1,
          name: 'NOMINAL',
          purpose: 'Categories/labels only - no mathematical meaning',
          examples: 'Gender, race, colors, yes/no, jersey numbers'
        },
        {
          number: 2,
          name: 'ORDINAL',
          purpose: 'Rank order, but intervals between ranks may not be equal',
          examples: 'Rankings (1st, 2nd, 3rd), Likert scales, letter grades, percentile ranks'
        },
        {
          number: 3,
          name: 'INTERVAL',
          purpose: 'Equal intervals, but NO true zero point',
          examples: 'Temperature (F/C), IQ scores, calendar years, standardized test scores'
        },
        {
          number: 4,
          name: 'RATIO',
          purpose: 'Equal intervals AND true zero - all math operations possible',
          examples: 'Height, weight, age, income, number of correct answers'
        }
      ],
      keyPoint: 'The scale of measurement determines which statistical analyses are appropriate!'
    }
  },
  
  {
    id: 'central-tendency',
    title: 'Measures of Central Tendency',
    icon: '🎯',
    content: {
      intro: 'These measures indicate the central or typical value within a dataset.',
      measures: [
        {
          name: 'Mean',
          whatItIs: 'The average',
          howToCalculate: 'Add all scores and divide by the number of scores',
          whenToUse: 'When data is normally distributed (no extreme outliers)'
        },
        {
          name: 'Median',
          whatItIs: 'The middle score',
          howToCalculate: 'Line up all scores from lowest to highest and find the middle one',
          whenToUse: 'When you have outliers or skewed data'
        },
        {
          name: 'Mode',
          whatItIs: 'The most common score',
          howToCalculate: 'Find which score appears most often',
          whenToUse: 'With categorical data or when you want to know what\'s most typical'
        }
      ],
      keyPoint: 'In a perfect normal distribution (bell curve), the mean, median, and mode are all the same number!'
    },
    visualization: {
      type: 'central-tendency',
      config: {
        data: [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10],
        title: 'Example: Test Scores from 18 Students'
      }
    }
  },
  
  {
    id: 'variability',
    title: 'Variability: Spread of Scores',
    icon: '📊',
    content: {
      intro: 'Central tendency tells us about the middle, but variability tells us how scattered or grouped the scores are.',
      subsections: [
        {
          title: 'Standard Deviation (SD)',
          content: 'The most useful measure! It tells us the average distance of scores from the mean.',
          rule: {
            title: 'The 68-95-99.7 Rule',
            points: [
              '68% of scores fall within 1 standard deviation of the mean',
              '95% fall within 2 standard deviations',
              '99.7% fall within 3 standard deviations'
            ]
          }
        },
        {
          title: 'Variance',
          content: 'Variance is the square of the standard deviation (SD²). It\'s used in many statistical calculations.',
          formula: 'Variance (s²) = Σ(x - mean)² ÷ (n - 1)',
          relationship: 'Standard Deviation = √Variance. If SD = 10, then Variance = 100'
        },
        {
          title: 'Sum of Squares',
          content: 'The sum of squared deviations from the mean. It\'s the numerator in the variance formula.',
          formula: 'Sum of Squares = Σ(x - mean)²',
          relationship: 'Variance = Sum of Squares ÷ (n - 1)'
        }
      ],
      keyPoint: 'Lower SD = scores are close together. Higher SD = scores are more spread out!'
    },
    visualization: {
      type: 'normal-distribution',
      config: {
        mean: 100,
        sd: 15,
        showPercentages: true
      }
    }
  },
  
  {
    id: 'distributions',
    title: 'Distribution Shapes',
    icon: '📈',
    content: {
      intro: 'The shape of a distribution tells us about the pattern of scores.',
      types: [
        {
          name: 'Normal Distribution',
          tailDirection: 'Symmetrical',
          whereScoresAre: 'Most scores in the middle',
          meanVsMedian: 'Mean = Median = Mode',
          example: 'IQ scores, height in large populations'
        },
        {
          name: 'Positive Skew (Right Skew)',
          tailDirection: 'Tail points right',
          whereScoresAre: 'Most scores are low',
          meanVsMedian: 'Mean > Median > Mode',
          example: 'Income (most people earn less, few earn much more)'
        },
        {
          name: 'Negative Skew (Left Skew)',
          tailDirection: 'Tail points left',
          whereScoresAre: 'Most scores are high',
          meanVsMedian: 'Mode > Median > Mean',
          example: 'Easy test (most students score high, few score low)'
        },
        {
          name: 'Multimodal Distribution',
          tailDirection: 'Multiple peaks',
          whereScoresAre: 'Scores cluster around multiple values',
          meanVsMedian: 'Varies depending on the shape',
          example: 'Test scores from two different ability groups, ages in a population with baby boom generations'
        }
      ],
      keyPoint: 'In skewed distributions, the mean is "pulled" toward the tail!'
    },
    visualization: {
      type: 'skewed-visualization',
      config: {}
    }
  },
  
  {
    id: 'correlation',
    title: 'Correlation Between Variables',
    icon: '🔗',
    content: {
      intro: 'Correlation (r) measures the strength and direction of the relationship between two variables. It ranges from -1.00 to +1.00.',
      ranges: [
        { value: '+0.70 to +1.00', strength: 'Strong Positive', meaning: 'As one goes up, the other goes up' },
        { value: '+0.30 to +0.69', strength: 'Moderate Positive', meaning: 'Some positive relationship' },
        { value: '-0.29 to +0.29', strength: 'Weak/None', meaning: 'Little to no relationship' },
        { value: '-0.30 to -0.69', strength: 'Moderate Negative', meaning: 'Some inverse relationship' },
        { value: '-0.70 to -1.00', strength: 'Strong Negative', meaning: 'As one goes up, the other goes down' }
      ],
      visualization: {
        name: 'Scatterplot',
        description: 'A graph showing individual data points for two variables to display their relationship',
        interpretation: 'Points sloping upward = positive correlation; Points sloping downward = negative correlation'
      },
      significance: {
        level: '.05 (5%)',
        meaning: 'A difference or correlation is significant at the .05 level if there is only a 5% probability it occurred due to chance/error'
      },
      keyPoint: 'Remember: Correlation does NOT equal causation! Just because two things are related doesn\'t mean one causes the other.'
    },
    visualization: {
      type: 'correlation',
      config: [
        { r: -0.9, label: 'Strong Negative (r = -0.9)' },
        { r: -0.5, label: 'Moderate Negative (r = -0.5)' },
        { r: 0, label: 'No Correlation (r = 0)' },
        { r: 0.5, label: 'Moderate Positive (r = 0.5)' },
        { r: 0.8, label: 'Strong Positive (r = 0.8)' },
        { r: 0.95, label: 'Very Strong Positive (r = 0.95)' }
      ]
    }
  },
  
  {
    id: 'standardized-scores',
    title: 'Standardized Scores',
    icon: '📐',
    content: {
      intro: 'Standardized scores allow us to compare performance across different tests by converting raw scores to a common scale.',
      types: [
        { name: 'Z-Score', mean: 0, sd: 1, usedFor: 'Statistical calculations, comparing across measures' },
        { name: 'Standard Score', mean: 100, sd: 15, usedFor: 'Overall composite scores (IQ, achievement)' },
        { name: 'Scaled Score', mean: 10, sd: 3, usedFor: 'Subtest scores' },
        { name: 'T-Score', mean: 50, sd: 10, usedFor: 'Social-emotional/behavioral measures' }
      ],
      ordinalScores: [
        { name: 'Percentile Rank', mean: 50, sd: 'N/A', scale: '1-99', note: 'Ordinal scale - unequal intervals!' },
        { name: 'Quartiles', mean: 'Q2', sd: 'N/A', scale: 'Q1, Q2, Q3, Q4', note: 'Divide distribution into 4 equal parts (25% each)' },
        { name: 'Deciles', mean: 'D5', sd: 'N/A', scale: 'D1-D10', note: 'Divide distribution into 10 equal parts (10% each)' },
        { name: 'Stanine', mean: 5, sd: 'N/A', scale: '1-9', note: 'Band of 9 - ordinal scale' }
      ],
      keyPoint: 'All standardized scores (except percentiles and stanines) are INTERVAL scales with equal units!'
    },
    visualization: {
      type: 'standardized',
      config: {}
    }
  },
  
  {
    id: 'reliability',
    title: 'Reliability: Consistency',
    icon: '🎯',
    content: {
      intro: 'Reliability refers to the consistency and stability of test scores. A reliable test gives similar results under consistent conditions.',
      types: [
        {
          name: 'Internal Consistency',
          description: 'Do items within the test measure the same construct?',
          methods: ['Split-half', 'Cronbach\'s alpha (for items with varying point values)', 'KR-20 (for dichotomous right/wrong items)'],
          relationship: 'Higher reliability = less measurement error'
        },
        {
          name: 'Test-Retest',
          description: 'Does the test give similar results when administered twice?',
          method: 'Administer same test at two time points',
          uses: 'Best for stable traits (not for rapidly changing skills)',
          limitation: 'Practice effects can occur - students may improve due to familiarity with test content'
        },
        {
          name: 'Alternate Forms Reliability',
          description: 'Do two different versions of the same test yield similar scores?',
          method: 'Administer two parallel test forms within a short time period',
          uses: 'Avoids practice effects from taking identical test twice'
        },
        {
          name: 'Inter-Rater',
          description: 'Do different raters/scorers agree?',
          method: 'Multiple raters score the same performance',
          uses: 'Important for subjective scoring (essays, observations)'
        }
      ],
      concepts: [
        {
          name: 'Standard Error of Measurement (SEM)',
          description: 'The average amount of error in test scores. Higher SEM indicates lower reliability.',
          use: 'Creating confidence intervals around obtained scores'
        },
        {
          name: 'Confidence Interval',
          description: 'A range within which the true score likely falls',
          use: 'Acknowledges measurement error in test interpretation',
          format: 'Obtained Score ± (SEM × 1.96) for 95% confidence'
        }
      ],
      keyPoint: 'No test is perfectly reliable. We use SEM to acknowledge measurement error!'
    }
  },
  
  {
    id: 'validity',
    title: 'Validity: Measuring Correctly',
    icon: '✅',
    content: {
      intro: 'Validity is the most important test quality. A test can be reliable but not valid!',
      evidenceSources: 'Test content, Response process, Internal structure, Relations to other variables, Testing consequences',
      types: [
        {
          name: 'Content Validity',
          description: 'Does the test content represent the domain being measured?',
          purpose: 'Ensure test items cover all important aspects of what you\'re measuring',
          note: 'Presentation format and response mode can introduce bias'
        },
        {
          name: 'Criterion Validity',
          description: 'Does the test correlate with other measures of the same construct?',
          purpose: 'Establish the test\'s relationship to external measures or outcomes',
          types: [
            'Concurrent validity: Correlation with current measure',
            'Predictive validity: Predicts future performance'
          ]
        },
        {
          name: 'Construct Validity',
          description: 'Does the test measure the theoretical construct it claims to?',
          purpose: 'The overarching validity - includes all other types'
        },
        {
          name: 'Face Validity',
          description: 'Does the test appear to measure what it claims to measure?',
          purpose: 'Ensure the test appears relevant and appropriate to test-takers and stakeholders',
          note: 'Least important type of validity - just about appearances'
        }
      ],
      keyPoint: 'Think of it this way: A bathroom scale could be very reliable (consistent), but if you\'re trying to measure height, it\'s not valid!'
    }
  },
  
  {
    id: 'test-types',
    title: 'Types of Tests',
    icon: '📋',
    content: {
      intro: 'Different tests serve different purposes in assessment.',
      types: [
        {
          name: 'Norm-Referenced',
          description: 'Compares individual to a normative group',
          purpose: 'Shows relative standing (percentiles, standard scores)',
          examples: ['IQ tests', 'Standardized achievement tests', 'KTEA-3']
        },
        {
          name: 'Criterion-Referenced',
          description: 'Compares performance to a set standard',
          purpose: 'Shows mastery of specific skills',
          examples: ['State achievement tests', 'Curriculum-based measures', 'Driver\'s license test']
        },
        {
          name: 'Achievement Tests',
          description: 'Measure what has been learned',
          purpose: 'Assess acquired knowledge and skills in specific academic areas',
          examples: ['KTEA-3', 'Woodcock-Johnson IV Tests of Achievement', 'Wechsler Individual Achievement Test-III (WIAT-III)'],
          theoreticalBasis: 'Woodcock-Johnson IV is based on Cattell-Horn-Carroll (CHC) theory of cognitive abilities'
        },
        {
          name: 'Aptitude/Cognitive Tests',
          description: 'Measure potential or ability to learn',
          purpose: 'Assess cognitive abilities and learning capacity',
          examples: ['IQ tests', 'WISC-V', 'Stanford-Binet']
        },
        {
          name: 'Diagnostic Tests',
          description: 'Identify specific strengths and weaknesses',
          purpose: 'Provide detailed analysis of skill areas to guide intervention',
          examples: ['Reading diagnostic', 'Math diagnostic', 'Phonological awareness']
        },
        {
          name: 'Screening Tests',
          description: 'Brief survey of skills across multiple areas',
          purpose: 'Determine areas that need further assessment'
        },
        {
          name: 'Adaptive Behavior Scales',
          description: 'Measure how well students adapt to different environments',
          purpose: 'Assess practical life skills and social functioning',
          examples: ['Daily living skills', 'Social skills', 'Communication']
        }
      ]
    }
  },
  
  {
    id: 'language',
    title: 'Language Assessment',
    icon: '💬',
    content: {
      intro: 'Language assessment evaluates both understanding and production of language.',
      types: [
        {
          name: 'Receptive Language',
          description: 'Understanding what is said or written',
          skills: [
            'Following directions',
            'Understanding vocabulary',
            'Comprehending sentences and passages'
          ]
        },
        {
          name: 'Expressive Language',
          description: 'Producing language through speaking or writing',
          skills: [
            'Naming objects',
            'Forming sentences',
            'Organizing narratives',
            'Written expression'
          ]
        }
      ],
      keyPoint: 'Receptive language typically develops before expressive language. A student might understand more than they can express!'
    }
  },
  
  {
    id: 'scoring',
    title: 'Scoring & Interpretation',
    icon: '🎲',
    content: {
      intro: 'Understanding different score types is essential for proper interpretation.',
      concepts: [
        {
          name: 'Raw Score',
          description: 'The number of items correct or points earned',
          purpose: 'Starting point - not interpretable without context'
        },
        {
          name: 'Derived Scores',
          description: 'Raw scores converted to standardized or norm-referenced scores',
          purpose: 'Allow meaningful comparison to normative groups',
          types: [
            'Standard scores',
            'Percentile ranks',
            'Age/grade equivalents',
            'Stanines'
          ]
        },
        {
          name: 'Age Equivalency',
          description: 'The age at which a raw score is average',
          format: 'Years-Months (e.g., 6-4 means 6 years, 4 months)',
          rounding: 'When days are 15 or more, round up to the next month (e.g., 8 years, 7 months, 18 days = 8-8)',
          note: 'Use with caution - can be misleading!'
        },
        {
          name: 'Grade Equivalency',
          description: 'The grade level at which a raw score is average',
          format: 'Grade-Month (e.g., 7-3 means 7th grade, 3rd month)',
          note: 'Use with caution - same limitations as age equivalents'
        },
        {
          name: 'Protocol',
          description: 'The standardized form used during test administration for recording responses and scoring',
          purpose: 'Ensures consistent administration and accurate scoring'
        },
        {
          name: 'Basal',
          description: 'The starting point in testing, typically established by a certain number of consecutive correct responses',
          purpose: 'Determines the floor of items assumed to be correct'
        },
        {
          name: 'Ceiling',
          description: 'The stopping point in testing, typically defined by a certain number of consecutive incorrect responses',
          purpose: 'Determines when to discontinue testing'
        },
        {
          name: 'Composite Scores',
          description: 'Combinations of multiple subtest scores',
          purpose: 'More reliable than individual subtests'
        },
        {
          name: 'Subtest vs Domain',
          description: 'Subtests are individual components; Domains are broader areas that may include multiple subtests',
          purpose: 'Organize assessment results hierarchically',
          example: 'Reading domain might include subtests for phonics, fluency, and comprehension'
        }
      ],
      keyPoint: 'Always use multiple score types and consider confidence intervals when interpreting!'
    }
  },
  
  {
    id: 'norming',
    title: 'Norming & Standardization',
    icon: '👥',
    content: {
      intro: 'Tests are standardized using large, representative samples to create norms.',
      concepts: [
        {
          name: 'Standardization Sample',
          description: 'Large group tested under standard conditions',
          purpose: 'Creates the reference group for comparison'
        },
        {
          name: 'Pilot Test (Field Test)',
          description: 'Preliminary version of a test used during development',
          purpose: 'Gather data to refine items and establish norms before final release'
        },
        {
          name: 'Interpolation',
          description: 'Statistical process of estimating scores between known data points when creating norm tables',
          purpose: 'Fill in gaps to create more complete developmental score tables'
        },
        {
          name: 'Variables Affecting Performance',
          description: 'Multiple factors can influence test scores beyond the construct being measured',
          purpose: 'Consider these factors when interpreting test results',
          factors: [
            'Socioeconomic status (SES)',
            'Race and ethnicity',
            'Cultural background',
            'Linguistic background',
            'Emotional state during testing',
            'Presence of disabilities',
            'Test-taking experience'
          ]
        },
        {
          name: 'Standardized Administration',
          description: 'Following exact procedures for all examinees',
          purpose: 'Ensures fair comparison to norms',
          note: 'Not all subtests must be administered - examiners can select relevant subtests based on referral questions'
        }
      ],
      keyPoint: 'A representative norm sample is crucial for fair interpretation. Consider whether the norms are appropriate for the individual being tested!'
    }
  },
  
  {
    id: 'ktea',
    title: 'KTEA-3 Technical Info',
    icon: '📚',
    content: {
      intro: 'The Kaufman Test of Educational Achievement, Third Edition (KTEA-3) is a comprehensive achievement test.',
      activity: {
        source: 'KTEA-3 Technical Manual',
        topics: [
          'Internal consistency reliability by age group',
          'Subtest reliability coefficients (typically 0.80-0.95)',
          'Composite reliability coefficients (typically 0.90+)',
          'Test-retest reliability with corrected correlations',
          'Standard Error of Measurement (SEM) by age and score level',
          'Five sources of validity evidence',
          'Correlation studies with other achievement tests',
          'Correlation studies with cognitive tests',
          'Validity studies with special populations'
        ]
      },
      keyPoint: 'The KTEA-3 has strong psychometric properties. Always review the manual for specific reliability and validity coefficients!'
    }
  }
];
