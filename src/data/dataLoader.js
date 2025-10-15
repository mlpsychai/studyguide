// Simplified data loader - works with regular script tags
(function() {
  // Main sections data
  const mainSections = [
    {
      id: 'scales',
      title: 'Scales of Measurement',
      icon: '📏',
      content: {
        intro: 'Understanding the four scales of measurement is crucial for choosing the right statistical tests.',
        keyPoint: 'The scale of measurement determines which statistical analyses are appropriate!'
      }
    },
    {
      id: 'central-tendency',
      title: 'Measures of Central Tendency',
      icon: '🎯',
      content: {
        intro: 'These measures indicate the central or typical value within a dataset.',
        keyPoint: 'In a perfect normal distribution, mean = median = mode!'
      },
      visualization: {
        type: 'central-tendency',
        config: {
          data: [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10]
        }
      }
    },
    {
      id: 'variability',
      title: 'Variability: Spread of Scores',
      icon: '📊',
      content: {
        intro: 'Variability tells us how scattered or grouped the scores are.',
        keyPoint: 'Lower SD = scores close together. Higher SD = scores spread out!'
      },
      visualization: {
        type: 'normal-distribution',
        config: { mean: 100, sd: 15, showPercentages: true }
      }
    },
    {
      id: 'distributions',
      title: 'Distribution Shapes',
      icon: '📈',
      content: {
        intro: 'The shape of a distribution tells us about the pattern of scores.',
        keyPoint: 'In skewed distributions, the mean is pulled toward the tail!'
      },
      visualization: {
        type: 'skewed',
        config: {}
      }
    },
    {
      id: 'correlation',
      title: 'Correlation Between Variables',
      icon: '🔗',
      content: {
        intro: 'Correlation (r) measures the strength and direction of relationships.',
        keyPoint: 'Correlation does NOT equal causation!'
      },
      visualization: {
        type: 'correlation',
        config: [
          { r: -0.9, label: 'Strong Negative (r = -0.9)' },
          { r: 0, label: 'No Correlation (r = 0)' },
          { r: 0.8, label: 'Strong Positive (r = 0.8)' }
        ]
      }
    },
    {
      id: 'standardized-scores',
      title: 'Standardized Scores',
      icon: '📐',
      content: {
        intro: 'Standardized scores allow comparison across different tests.',
        keyPoint: 'All standardized scores (except percentiles) have equal intervals!'
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
        intro: 'Reliability refers to the consistency and stability of test scores.',
        keyPoint: 'No test is perfectly reliable. We use SEM to acknowledge error!'
      }
    },
    {
      id: 'validity',
      title: 'Validity: Measuring Correctly',
      icon: '✅',
      content: {
        intro: 'Validity is the most important test quality.',
        keyPoint: 'A test can be reliable but not valid (consistent but wrong)!'
      }
    }
  ];

  // Extra chart sections
  const extraChartSections = [
    {
      id: 'bubble-example',
      title: 'Bubble Chart',
      icon: '🫧',
      isExtraChart: true,
      content: {
        intro: 'Bubble charts display three dimensions of data.',
        keyPoint: 'Useful for multivariate analysis.'
      },
      visualization: {
        type: 'bubble',
        config: { count: 12 }
      }
    },
    {
      id: 'test-retest-example',
      title: 'Test-Retest Reliability',
      icon: '🔄',
      isExtraChart: true,
      content: {
        intro: 'Test-retest reliability measures consistency over time.',
        keyPoint: 'High correlation indicates stable measurement.'
      },
      visualization: {
        type: 'test-retest',
        config: { correlation: 0.85, count: 25 }
      }
    }
  ];

  // Sample quiz questions
  const quizQuestions = [
    {
      id: 'q1',
      section: 'scales',
      type: 'multiple-choice',
      question: 'Which scale has equal intervals but NO true zero?',
      options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
      correctAnswer: 2,
      explanation: 'Interval scales have equal distances but no absolute zero.'
    },
    {
      id: 'q2',
      section: 'central-tendency',
      type: 'multiple-choice',
      question: 'Which measure is MOST affected by outliers?',
      options: ['Mean', 'Median', 'Mode', 'All equally'],
      correctAnswer: 0,
      explanation: 'The mean is pulled toward extreme scores.'
    },
    {
      id: 'q3',
      section: 'correlation',
      type: 'multiple-choice',
      question: 'A correlation of -0.85 indicates:',
      options: ['Weak negative', 'Strong negative', 'No relationship', 'Moderate positive'],
      correctAnswer: 1,
      explanation: 'Values close to -1 or +1 are strong correlations.'
    }
  ];

  // Export to window
  window.studyGuideData = {
    sections: [...mainSections, ...extraChartSections],
    quizQuestions: quizQuestions
  };

  // Dispatch ready event
  window.dispatchEvent(new Event('studyGuideDataReady'));
  
  console.log('✅ Study guide data loaded with', 
    window.studyGuideData.sections.length, 'sections and',
    window.studyGuideData.quizQuestions.length, 'questions');
})();
