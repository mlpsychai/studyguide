// Study Guide Data
window.studyGuideData = {
  // Section Navigation
  sections: [
    { id: 'intro', icon: '📚', title: 'Introduction' },
    { id: 'scales', icon: '📏', title: 'Measurement Scales' },
    { id: 'central', icon: '🎯', title: 'Central Tendency' },
    { id: 'variability', icon: '📊', title: 'Variability & Dispersion' },
    { id: 'distributions', icon: '📈', title: 'Distribution Shapes' },
    { id: 'correlation', icon: '🔗', title: 'Correlation' },
    { id: 'scores', icon: '💯', title: 'Standardized Scores' },
    { id: 'reliability', icon: '✅', title: 'Reliability' },
    { id: 'validity', icon: '🎯', title: 'Validity' },
    { id: 'test-types', icon: '📝', title: 'Types of Tests' },
    { id: 'language', icon: '💬', title: 'Language Assessment' },
    { id: 'scoring', icon: '🔢', title: 'Scoring & Interpretation' },
    { id: 'norming', icon: '👥', title: 'Norming & Standardization' }
  ],

  // Content Data
  contentData: {
    intro: {
      title: '📚 Welcome to Statistics & Assessment',
      intro: 'This interactive study guide covers essential concepts in descriptive statistics and psychological assessment. You\'ll learn about measurement scales, central tendency, variability, standardized scores, reliability, validity, and test interpretation.',
      sections: [
        {
          subtitle: 'What You\'ll Learn',
          content: 'Master the fundamentals of educational and psychological measurement, including how tests are developed, validated, and interpreted.'
        },
        {
          subtitle: 'How to Use This Guide',
          content: 'Navigate through sections using the sidebar. Each section includes explanations, examples, and practice quiz questions to test your understanding.'
        }
      ],
      keyPoint: 'Understanding statistics and assessment is essential for interpreting test results and making informed educational decisions.'
    },

    scales: {
      title: '📏 The Four Scales of Measurement',
      intro: 'These represent different "rulers" for measuring things. Each scale tells us different information and determines what mathematical operations we can perform!',
      scales: [
        {
          name: 'Nominal',
          number: 1,
          purpose: 'Labels and categories - numbers are just names or tags',
          examples: 'Jersey numbers, student ID numbers, zip codes, gender categories',
          math: 'Cannot perform mathematical operations (can\'t average jersey numbers!)'
        },
        {
          name: 'Ordinal',
          number: 2,
          purpose: 'Ranking order - shows who\'s first, second, third, etc.',
          examples: 'Race finishing positions (1st, 2nd, 3rd), class rankings, movie ratings, Likert scales',
          math: 'Shows order but intervals between ranks are NOT equal'
        },
        {
          name: 'Interval',
          number: 3,
          purpose: 'Equal distances between values but NO true zero',
          examples: 'Temperature in Fahrenheit or Celsius, calendar years, standardized test scores',
          math: 'Can add and subtract; zero does NOT mean "absence of the quality"'
        },
        {
          name: 'Ratio',
          number: 4,
          purpose: 'Everything plus a true zero point - zero means "none"',
          examples: 'Height, weight, age, money, number of correct answers',
          math: 'Can perform ALL mathematical operations including multiplication and division'
        }
      ],
      keyPoint: 'Why does this matter? The scale determines what math you can do! You can\'t "average" jersey numbers (nominal), but you can average heights (ratio). Percentile ranks are ORDINAL - the intervals between percentiles are not equal!'
    },

    central: {
      title: '🎯 Measures of Central Tendency',
      intro: 'Central tendency measures tell us the "typical" or "average" value in a dataset. In a normal distribution, these three measures are all the same!',
      measures: [
        {
          name: 'Mean',
          symbol: 'μ (population) or x̄ (sample)',
          definition: 'The arithmetic average - add all scores and divide by the number of scores',
          example: 'Scores: 80, 85, 90, 95, 100. Mean = (80+85+90+95+100)/5 = 90',
          sensitivity: 'Very sensitive to extreme scores (outliers). Gets pulled toward extreme values.'
        },
        {
          name: 'Median',
          definition: 'The middle score when all scores are arranged in order',
          example: 'Scores: 80, 85, 90, 95, 100. Median = 90 (the middle value)',
          sensitivity: 'NOT sensitive to extreme scores. Better measure for skewed distributions.'
        },
        {
          name: 'Mode',
          definition: 'The most frequently occurring score',
          example: 'Scores: 80, 85, 85, 85, 90, 95. Mode = 85 (appears 3 times)',
          sensitivity: 'Not affected by extreme scores. A distribution can have multiple modes.'
        }
      ],
      normalDistribution: 'In a perfectly normal distribution, Mean = Median = Mode. The vertical line at the center represents all three!',
      keyPoint: 'In a normal distribution: Mean = Median = Mode. In skewed distributions, these separate, with the mean being pulled most toward the extreme scores.'
    },

    variability: {
      title: '📊 Variability & Dispersion',
      intro: 'Variability tells us how spread out the scores are. Two classes could have the same mean, but very different variability!',
      concepts: [
        {
          name: 'Range',
          definition: 'Highest score minus lowest score',
          example: 'Scores: 60, 70, 80, 90, 100. Range = 100 - 60 = 40',
          limitation: 'Only uses two scores; doesn\'t tell us about the spread of scores in between'
        },
        {
          name: 'Variance',
          symbol: 'σ² (population) or s² (sample)',
          definition: 'Average of squared deviations from the mean',
          interpretation: 'Larger variance = more spread out scores'
        },
        {
          name: 'Standard Deviation (SD)',
          symbol: 'σ (population) or s (sample)',
          definition: 'Square root of variance - average distance from the mean',
          relationship: 'SD = √Variance, or Variance = SD²',
          interpretation: 'Most commonly used measure of variability'
        }
      ],
      rule68_95_997: {
        title: 'The 68-95-99.7 Rule',
        description: 'In a normal distribution:',
        rules: [
          '68% of scores fall within ±1 SD of the mean',
          '95% of scores fall within ±2 SD of the mean',
          '99.7% of scores fall within ±3 SD of the mean'
        ],
        example: 'If mean IQ = 100 and SD = 15:\n• 68% of people score between 85-115\n• 95% of people score between 70-130\n• 99.7% of people score between 55-145'
      },
      keyPoint: 'Standard deviation tells us how much variability exists in a distribution. Smaller SD = scores clustered together; Larger SD = scores spread out.'
    },

    distributions: {
      title: '📈 Distribution Shapes',
      intro: 'The shape of a distribution tells us whether scores are evenly spread (normal) or bunched toward one end (skewed).',
      types: [
        {
          name: 'Normal Distribution',
          description: 'Bell-shaped, symmetric curve',
          characteristics: [
            'Mean = Median = Mode (all at the center)',
            '68-95-99.7 rule applies',
            'Most scores cluster around the mean',
            'Tails extend equally in both directions'
          ],
          example: 'IQ scores, height, many natural phenomena'
        },
        {
          name: 'Positively Skewed (Right Skew)',
          description: 'Tail points to the RIGHT (positive direction)',
          characteristics: [
            'Most scores bunched at the LOW end',
            'Few extreme HIGH scores',
            'Mean > Median > Mode',
            'Mean is pulled toward the high scores'
          ],
          example: 'A very difficult test where most students score low, with a few high scorers',
          mnemonic: 'The tail points where the name says: POSITIVEly skewed = tail points RIGHT (positive direction)'
        },
        {
          name: 'Negatively Skewed (Left Skew)',
          description: 'Tail points to the LEFT (negative direction)',
          characteristics: [
            'Most scores bunched at the HIGH end',
            'Few extreme LOW scores',
            'Mean < Median < Mode',
            'Mean is pulled toward the low scores'
          ],
          example: 'A very easy test where most students score high, with a few low scorers',
          mnemonic: 'The tail points where the name says: NEGATIVEly skewed = tail points LEFT (negative direction)'
        }
      ],
      keyPoint: 'The TAIL points in the direction of the skew. The MEAN is always pulled toward the tail (toward extreme scores). In skewed distributions, median is often a better measure of central tendency than mean.'
    },

    correlation: {
      title: '🔗 Correlation',
      intro: 'Correlation measures the relationship between two variables. It tells us if two things tend to change together, but DOES NOT prove causation!',
      symbol: 'r (ranges from -1.00 to +1.00)',
      interpretation: [
        {
          type: 'Positive Correlation',
          range: '+0.01 to +1.00',
          meaning: 'As one variable increases, the other INCREASES',
          example: 'Study time and test scores (more study = higher scores)',
          strength: '+0.70 to +1.00 = Strong positive\n+0.30 to +0.69 = Moderate positive\n+0.01 to +0.29 = Weak positive'
        },
        {
          type: 'Negative Correlation',
          range: '-0.01 to -1.00',
          meaning: 'As one variable increases, the other DECREASES',
          example: 'Absences and test scores (more absences = lower scores)',
          strength: '-0.70 to -1.00 = Strong negative\n-0.30 to -0.69 = Moderate negative\n-0.01 to -0.29 = Weak negative'
        },
        {
          type: 'No Correlation',
          range: '0 or close to 0',
          meaning: 'No consistent relationship between variables',
          example: 'Shoe size and math ability'
        }
      ],
      comparing: {
        title: 'Comparing Correlations',
        rule: 'Use ABSOLUTE VALUES to compare strength. Ignore the sign!',
        example: 'Which is stronger: r = -0.70 or r = +0.50?\nAnswer: -0.70 is stronger because |-0.70| = 0.70 > |+0.50| = 0.50'
      },
      causation: {
        warning: '⚠️ CORRELATION DOES NOT EQUAL CAUSATION!',
        explanation: 'Just because two things are correlated doesn\'t mean one causes the other. There could be:\n• A third variable causing both\n• Reverse causation\n• Pure coincidence'
      },
      keyPoint: 'Correlation ranges from -1.00 to +1.00. The SIGN shows direction, the ABSOLUTE VALUE shows strength. Perfect correlations (±1.00) are rare in real life. Always remember: correlation ≠ causation!'
    },

    scores: {
      title: '💯 Standardized Scores',
      intro: 'Standardized scores allow us to compare scores from different tests by converting them to a common scale. They tell us how far a score is from the mean in standard deviation units.',
      types: [
        {
          name: 'Z-Scores',
          mean: 0,
          sd: 1,
          formula: 'z = (X - Mean) / SD',
          interpretation: 'Shows how many standard deviations a score is from the mean',
          example: 'z = +1.5 means the score is 1.5 SDs above the mean\nz = -2.0 means the score is 2 SDs below the mean',
          use: 'Foundation for all other standardized scores'
        },
        {
          name: 'Standard Scores (IQ-type)',
          mean: 100,
          sd: 15,
          conversion: 'Standard Score = 100 + (z × 15)',
          interpretation: 'Most common for overall composite scores',
          example: 'IQ tests, overall achievement test scores',
          range: 'Most scores fall between 70-130 (±2 SD)'
        },
        {
          name: 'Scaled Scores',
          mean: 10,
          sd: 3,
          conversion: 'Scaled Score = 10 + (z × 3)',
          interpretation: 'Most common for subtest scores',
          example: 'WISC subtest scores, KTEA subtest scores',
          range: 'Most scores fall between 4-16 (±2 SD)',
          scale: 'Ordinal scale of measurement'
        },
        {
          name: 'T-Scores',
          mean: 50,
          sd: 10,
          conversion: 'T-Score = 50 + (z × 10)',
          interpretation: 'Common for social-emotional/behavioral measures',
          example: 'BASC, Conners rating scales',
          range: 'Most scores fall between 30-70 (±2 SD)'
        },
        {
          name: 'Percentile Ranks',
          mean: 50,
          sd: 'None',
          interpretation: 'Percentage of people who scored at or below this score',
          example: '85th percentile = scored as well or better than 85% of people',
          scale: 'ORDINAL - intervals are NOT equal!',
          caution: 'Cannot be averaged! The difference between 50th and 60th percentile is NOT the same as between 90th and 95th'
        },
        {
          name: 'Stanines',
          meaning: 'STAndard NINE',
          range: '1-9',
          mean: 5,
          sd: '≈2',
          interpretation: 'Divides distribution into 9 groups',
          percentages: 'Stanine 1=4%, 2=7%, 3=12%, 4=17%, 5=20%, 6=17%, 7=12%, 8=7%, 9=4%',
          scale: 'Ordinal scale of measurement'
        },
        {
          name: 'Deciles',
          interpretation: 'Divides scores into 10 equal groups',
          explanation: 'Each decile represents 10% of the obtained scores'
        }
      ],
      keyPoint: 'All standardized scores are based on z-scores. Standard scores (mean=100, SD=15) are interval scale. Percentile ranks and stanines are ordinal scale. You CANNOT average percentile ranks because the intervals are not equal!'
    },

    reliability: {
      title: '✅ Reliability',
      intro: 'Reliability refers to CONSISTENCY - does the test give similar results across time or across items? A reliable test produces consistent scores.',
      definition: 'The consistency of scores on a specific instrument across time or across items.',
      types: [
        {
          name: 'Internal Consistency Reliability',
          description: 'Do all items on the test measure the same thing consistently?',
          methods: [
            {
              name: 'Split-Half Reliability',
              process: 'Divide test in half (often odd/even items), correlate the two halves',
              interpretation: 'High correlation = good internal consistency',
              limitation: 'Only works when all items measure ONE construct'
            },
            {
              name: 'Kuder-Richardson 20 (KR-20)',
              process: 'Used for tests with right/wrong answers (dichotomous items)',
              interpretation: 'Measures consistency across all items'
            },
            {
              name: 'Coefficient Alpha (Cronbach\'s Alpha)',
              process: 'Used when items have varying point values (not just right/wrong)',
              interpretation: 'Most general measure of internal consistency',
              goodValue: 'Generally want α ≥ 0.80'
            }
          ]
        },
        {
          name: 'Test-Retest Reliability',
          description: 'Does the test give consistent results over time?',
          process: 'Give same test twice to same people, correlate the scores',
          interpretation: 'High correlation = good stability over time',
          considerations: [
            'Used for traits assumed to be STABLE over time',
            'Not appropriate if trait is expected to change',
            'Time interval matters - too short = practice effects, too long = real changes',
            'Need to find the "sweet spot" for timing'
          ],
          threats: 'Long intervals, practice effects, maturation/learning'
        },
        {
          name: 'Interrater Reliability',
          description: 'Do different raters give consistent scores?',
          process: 'Multiple raters score the same performance, measure agreement',
          importance: 'Especially important for SUBJECTIVE scoring',
          example: 'Essay grading, behavior observations, clinical ratings',
          measures: 'Cohen\'s kappa, ICC (Intraclass Correlation Coefficient)'
        }
      ],
      sem: {
        title: 'Standard Error of Measurement (SEM)',
        definition: 'An estimate of how much error is in a test score',
        formula: 'SEM = SD × √(1 - reliability)',
        relationship: 'High reliability = LOW SEM (less error)\nLow reliability = HIGH SEM (more error)',
        use: 'Used to create CONFIDENCE INTERVALS around obtained scores',
        interpretation: 'A score is not a single point but a range',
        example: 'Student scores 100, SEM = 3:\n• 68% confident true score is 97-103 (±1 SEM)\n• 95% confident true score is 94-106 (±1.96 SEM)'
      },
      keyPoint: 'Reliability = Consistency. High reliability means LOW measurement error (low SEM). A perfectly reliable test (r=1.00) would have SEM=0. Reliability is necessary but not sufficient for validity.'
    },

    validity: {
      title: '🎯 Validity',
      intro: 'Validity asks: Does the test measure what it claims to measure? A test can be reliable but NOT valid!',
      definition: 'The extent to which a test measures what it purports to measure.',
      relationship: 'A test must be RELIABLE to be valid, but reliability alone does not guarantee validity.',
      types: [
        {
          name: 'Construct Validity',
          question: 'Does the test measure the psychological construct/trait it claims to measure?',
          description: 'Ensures test measures the theoretical concept (e.g., intelligence, anxiety, self-esteem)',
          threats: [
            'Test inadvertently measures something else (e.g., reading ability instead of content knowledge)',
            'Test correlates with wrong constructs',
            'Confusing stable traits with temporary states'
          ],
          example: 'A "self-esteem" test should NOT highly correlate with mood (temporary state). If it does, it lacks construct validity - it\'s measuring mood, not self-esteem.',
          validation: 'Use convergent validity (correlate with similar measures) and discriminant validity (low correlation with different constructs)'
        },
        {
          name: 'Content Validity',
          question: 'Does the test adequately sample the content domain?',
          description: 'Test items must represent ALL aspects of what\'s being measured',
          process: 'Expert judgment - experts review items to ensure comprehensive coverage',
          threats: [
            'Omitting important content areas',
            'Including irrelevant content',
            'Presentation format bias',
            'Response mode bias'
          ],
          example: 'An algebra test must cover ALL algebra topics taught, not just some. A statistics exam covering only descriptive stats (not inferential) lacks content validity if both were taught.',
          biasFactors: 'Presentation format and response mode can contribute to bias and affect content validity'
        },
        {
          name: 'Face Validity',
          question: 'Does the test APPEAR to measure what it claims to measure?',
          description: 'Subjective judgment - do items seem relevant?',
          importance: 'Important for test-taker acceptance and motivation, but NOT sufficient alone',
          limitation: 'Test can have face validity but lack true validity',
          example: 'Measuring self-esteem by index finger length has zero face validity (and zero actual validity)'
        },
        {
          name: 'Criterion Validity',
          question: 'Do test scores correlate with relevant outcome measures?',
          types: [
            {
              subtype: 'Concurrent Validity',
              timing: 'Test and criterion measured at the SAME TIME',
              example: 'New depression scale correlated with established depression measure, both given same day',
              use: 'Validates new/shorter tests against existing measures'
            },
            {
              subtype: 'Predictive Validity',
              timing: 'Test predicts FUTURE performance on criterion',
              example: 'SAT scores (at age 17) predict college GPA (4 years later)',
              use: 'Most important for selection/placement decisions'
            }
          ]
        }
      ],
      fiveSources: {
        title: 'Five Sources of Validity Evidence',
        description: 'Modern approach combines multiple types of evidence:',
        sources: [
          '1. Evidence based on test content',
          '2. Evidence based on response processes',
          '3. Evidence based on internal structure',
          '4. Evidence based on relations to other variables',
          '5. Evidence based on consequences of testing'
        ]
      },
      keyPoint: 'Validity is the most important test quality. A test can be RELIABLE but NOT VALID (consistently measures the wrong thing). Cannot be valid without being reliable. Validity is specific to the purpose - a test valid for one use may not be valid for another.'
    },

    'test-types': {
      title: '📝 Types of Tests',
      intro: 'Different tests serve different purposes in educational and psychological assessment.',
      types: [
        {
          name: 'Achievement Tests',
          purpose: 'Measure what has been LEARNED - acquired knowledge and skills',
          examples: [
            'KTEA-3 (Kaufman Test of Educational Achievement)',
            'WJ-IV Achievement (Woodcock-Johnson)',
            'WIAT-III (Wechsler Individual Achievement Test)'
          ],
          uses: 'Assess academic progress, identify learning disabilities, evaluate instructional effectiveness',
          characteristics: 'Measure past learning in specific subjects (reading, math, writing)'
        },
        {
          name: 'Aptitude Tests',
          purpose: 'Predict FUTURE learning potential or performance',
          examples: 'SAT, ACT, cognitive ability tests, IQ tests',
          difference: 'While achievement measures what WAS learned, aptitude predicts what CAN be learned',
          use: 'College admissions, job selection, identifying potential'
        },
        {
          name: 'Diagnostic Tests',
          purpose: 'Identify specific strengths and weaknesses in detail',
          characteristics: 'More detailed than screening, pinpoints specific areas of difficulty',
          use: 'Develop targeted interventions, understand nature of learning problems',
          example: 'Detailed reading diagnostic to identify specific decoding vs. comprehension issues'
        },
        {
          name: 'Screening Tests',
          purpose: 'Quick identification of individuals who may need further assessment',
          characteristics: 'Brief, efficient, identify "at-risk" individuals',
          use: 'Universal screening in schools, early identification',
          example: 'Reading fluency screener, vision/hearing screening',
          followUp: 'Positive screening leads to comprehensive diagnostic assessment'
        },
        {
          name: 'Norm-Referenced Tests',
          purpose: 'Compare individual performance to a normative sample',
          interpretation: 'Tells us how student performs RELATIVE to peers',
          example: 'Standardized achievement tests, IQ tests',
          scores: 'Use percentiles, standard scores, scaled scores for comparison'
        },
        {
          name: 'Criterion-Referenced Tests',
          purpose: 'Determine if student has mastered specific content/skills',
          interpretation: 'Tells us what student CAN do, regardless of peers',
          example: 'State standards tests, driver\'s license exam, mastery tests',
          scores: 'Pass/fail or percentage correct'
        },
        {
          name: 'Adaptive Behavior Scales',
          purpose: 'Assess practical, everyday living skills',
          domains: 'Communication, daily living skills, socialization, motor skills',
          example: 'Vineland Adaptive Behavior Scales',
          use: 'Required for intellectual disability diagnosis, IEP planning'
        }
      ],
      keyPoint: 'Achievement = what was learned. Aptitude = potential to learn. Diagnostic = detailed analysis. Screening = quick identification. Norm-referenced = compared to others. Criterion-referenced = compared to standards.'
    },

    language: {
      title: '💬 Language Assessment',
      intro: 'Language assessment examines both understanding (receptive) and expression (expressive) of language.',
      types: [
        {
          name: 'Receptive Language',
          definition: 'Understanding spoken or written language',
          includes: [
            'Listening comprehension',
            'Following directions',
            'Understanding vocabulary',
            'Reading comprehension'
          ],
          assessment: 'Often measured by pointing, selecting, or demonstrating understanding without speaking',
          example: 'Point to the picture of the dog. What does "celebrate" mean? Follow this three-step direction.',
          developmentalNote: 'Typically develops BEFORE expressive language'
        },
        {
          name: 'Expressive Language',
          definition: 'Producing spoken or written language',
          includes: [
            'Speaking/articulation',
            'Vocabulary use',
            'Grammar and syntax',
            'Written expression',
            'Explaining concepts'
          ],
          assessment: 'Measured through speaking, writing, or other forms of communication output',
          example: 'Tell me about this picture. Define "celebrate". Write a paragraph about...',
          developmentalNote: 'Typically develops AFTER receptive language'
        }
      ],
      relationship: {
        normal: 'Receptive language is usually stronger than expressive (you understand more words than you use)',
        concern: 'Significant gap between receptive and expressive may indicate language disorder',
        pattern: 'Children typically understand (receptive) before they can produce (expressive)'
      },
      keyPoint: 'Receptive = understanding/input. Expressive = producing/output. Both are essential for communication. Receptive typically develops first and is usually stronger than expressive language.'
    },

    scoring: {
      title: '🔢 Scoring & Interpretation',
      intro: 'Understanding different score types is essential for accurate test interpretation.',
      scoreTypes: [
        {
          name: 'Raw Score',
          definition: 'Number of items answered correctly (or total points earned)',
          characteristics: 'First score calculated; not meaningful alone',
          use: 'Converted to derived scores for interpretation',
          limitation: 'Cannot compare across tests or age groups without conversion',
          example: '35 out of 50 correct'
        },
        {
          name: 'Derived Scores',
          definition: 'Scores that allow comparison by converting raw scores',
          types: 'Standard scores, scaled scores, percentiles, age equivalents',
          requirement: 'Must have RAW SCORE first to calculate derived scores',
          purpose: 'Make scores interpretable and comparable'
        },
        {
          name: 'Age Equivalent Scores',
          definition: 'Average age at which children obtain this raw score',
          format: 'Written as years-months (e.g., 6-4 = 6 years, 4 months)',
          example: 'Age equivalent of 8-6 means the child performed like average 8-year-old, 6-month-old',
          limitations: [
            'Does NOT mean child functions at that age level overall',
            'Growth is not uniform across ages',
            'Can be misleading if misinterpreted',
            'Not recommended as sole score for important decisions'
          ],
          caution: '⚠️ Use with caution! Can be misunderstood by parents and teachers'
        },
        {
          name: 'Grade Equivalent Scores',
          definition: 'Grade level at which this raw score is average',
          format: 'Written as grade.month (e.g., 4.2 = 4th grade, 2nd month)',
          limitations: 'Same issues as age equivalents - often misinterpreted'
        }
      ],
      terminology: {
        subtest: 'Individual test measuring one specific skill (e.g., Word Reading, Math Computation)',
        domain: 'Broader area comprising multiple subtests (e.g., Reading includes word reading + comprehension)',
        composite: 'Overall score combining multiple subtests or domains (e.g., Total Achievement)',
        battery: 'Complete set of tests administered together'
      },
      keyPoint: 'Raw scores mean nothing without norms. Derived scores allow interpretation. Age/grade equivalents are easily misunderstood. Standard scores and percentiles are more appropriate for most purposes.'
    },

    norming: {
      title: '👥 Norming & Standardization',
      intro: 'Norms tell us what is "typical" or "average" by comparing to a reference group. Standardization ensures tests are given the same way every time.',
      norming: {
        definition: 'Process of giving a test to a large, representative sample to establish typical performance',
        purpose: 'Creates comparison standards for interpreting individual scores',
        normSample: 'Large group that represents the population (stratified by age, gender, race/ethnicity, SES, geographic region, etc.)',
        requirement: 'Norm sample must be REPRESENTATIVE of population test will be used with',
        size: 'Typically hundreds to thousands of individuals across age ranges',
        updates: 'Tests must be re-normed periodically (every 10-15 years) as populations change'
      },
      standardization: {
        definition: 'Administering test the same way every time - same materials, instructions, time limits, conditions',
        purpose: 'Ensures fair comparison by eliminating variation in administration',
        requires: [
          'Exact wording of instructions',
          'Specific materials and conditions',
          'Precise timing if timed',
          'Standard starting and stopping rules',
          'Consistent scoring procedures'
        ],
        importance: '⚠️ CRITICAL: Deviations from standardized procedures can invalidate results!'
      },
      variablesAffecting: {
        title: 'Variables That Can Affect Test Performance',
        factors: [
          {
            variable: 'Socioeconomic Status (SES)',
            impact: 'Access to resources, educational opportunities, test familiarity'
          },
          {
            variable: 'Race/Ethnicity',
            impact: 'Cultural differences, potential test bias, stereotype threat'
          },
          {
            variable: 'Culture',
            impact: 'Cultural knowledge, values, problem-solving approaches'
          },
          {
            variable: 'Linguistic Background',
            impact: 'Language proficiency, ELL status, dialect differences'
          },
          {
            variable: 'Emotional State',
            impact: 'Anxiety, motivation, test-day stress, rapport with examiner'
          },
          {
            variable: 'Disabilities',
            impact: 'May need accommodations; must be considered in interpretation'
          },
          {
            variable: 'Fatigue/Health',
            impact: 'Physical condition, sleep, medication effects'
          },
          {
            variable: 'Test-taking Skills',
            impact: 'Familiarity with format, time management, strategic guessing'
          }
        ]
      },
      administration: {
        title: 'Rules for Standardized Test Administration',
        rules: [
          'Follow manual instructions EXACTLY',
          'Use only approved materials',
          'Give all items unless basal/ceiling rules apply',
          'Do not provide extra help or hints',
          'Maintain standardized timing',
          'Record responses accurately',
          'Create appropriate testing environment (quiet, comfortable)',
          'Build rapport but remain neutral',
          'Do not coach or teach during testing'
        ],
        violations: 'Any deviation from standard procedures must be noted and may affect score validity'
      },
      keyPoint: 'Norming establishes what is "typical." Standardization ensures fair comparison. Test scores are only meaningful when compared to appropriate norms and administered under standardized conditions. Many factors can affect performance and must be considered in interpretation.'
    }
  },

  // Quiz Questions (45+ questions covering all topics)
  quizQuestions: [
    // Measurement Scales (6 questions)
    {
      id: 1,
      question: 'Students ranked by first, second, third place ribbons - what scale of measurement?',
      options: ['Ratio', 'Interval', 'Ordinal', 'Nominal'],
      correctAnswer: 2,
      explanation: 'Ordinal scales rank items in order but the intervals between ranks are not necessarily equal. Race positions show order but not equal distances.'
    },
    {
      id: 2,
      question: 'Which scale has equidistant numbers but NO true zero?',
      options: ['Ratio', 'Interval', 'Ordinal', 'Nominal'],
      correctAnswer: 1,
      explanation: 'Interval scales have equal distances between values but no true zero point. Example: Temperature in Fahrenheit - 0°F does not mean "no temperature."'
    },
    {
      id: 3,
      question: 'Jersey numbers on a basketball team represent which scale?',
      options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
      correctAnswer: 0,
      explanation: 'Nominal scales use numbers as labels only. Jersey numbers identify players but have no mathematical meaning - you cannot average jersey numbers!'
    },
    {
      id: 4,
      question: 'Height measured in centimeters is what scale?',
      options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
      correctAnswer: 3,
      explanation: 'Ratio scales have equal intervals AND a true zero (0 cm = no height). You can perform all mathematical operations including multiplication and division.'
    },
    {
      id: 5,
      question: 'What scale of measurement are percentile ranks?',
      options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
      correctAnswer: 1,
      explanation: 'Percentile ranks are ORDINAL - they show ranking order but the intervals between percentiles are NOT equal. This is why you cannot average percentile ranks!'
    },
    {
      id: 6,
      question: 'Temperature in Celsius is which scale of measurement?',
      options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
      correctAnswer: 2,
      explanation: 'Temperature is interval scale - equal intervals but no true zero (0°C does not mean "no temperature"). Cannot say 20°C is "twice as hot" as 10°C.'
    },

    // Central Tendency (4 questions)
    {
      id: 7,
      question: 'In a normal distribution, what is the relationship between mean, median, and mode?',
      options: ['Mean > Median > Mode', 'Mean = Median = Mode', 'Mean < Median < Mode', 'Cannot determine'],
      correctAnswer: 1,
      explanation: 'In a perfectly normal distribution, mean = median = mode. They all occur at the center of the distribution.'
    },
    {
      id: 8,
      question: 'Which measure of central tendency is most affected by extreme scores?',
      options: ['Mode', 'Median', 'Mean', 'All equally affected'],
      correctAnswer: 2,
      explanation: 'The mean is most sensitive to extreme scores because it uses every value in the calculation. Extreme scores "pull" the mean toward them.'
    },
    {
      id: 9,
      question: 'What does the vertical line in a normal distribution curve represent?',
      options: ['Median only', 'Mode only', 'Mean, Median, and Mode', 'Standard deviation'],
      correctAnswer: 2,
      explanation: 'In a normal distribution, the vertical line at the center represents all three measures of central tendency: mean, median, and mode (they are all equal).'
    },
    {
      id: 10,
      question: 'Which central tendency measure is best for skewed distributions?',
      options: ['Mean', 'Median', 'Mode', 'All are equally good'],
      correctAnswer: 1,
      explanation: 'Median is best for skewed distributions because it is not affected by extreme scores. The mean gets pulled toward the extreme values in skewed distributions.'
    },

    // Variability (4 questions)
    {
      id: 11,
      question: 'According to the 68-95-99.7 rule, what percentage of scores fall within ±1 SD of the mean?',
      options: ['34%', '68%', '95%', '99.7%'],
      correctAnswer: 1,
      explanation: '68% of scores fall within ±1 standard deviation of the mean in a normal distribution. This is the first part of the 68-95-99.7 rule.'
    },
    {
      id: 12,
      question: 'What is the relationship between variance and standard deviation?',
      options: ['Variance = SD²', 'SD = √Variance', 'Both A and B', 'They are unrelated'],
      correctAnswer: 2,
      explanation: 'Both are correct! Variance equals standard deviation squared, and standard deviation equals the square root of variance. They express the same concept in different ways.'
    },
    {
      id: 13,
      question: 'If a test has a mean of 100 and SD of 15, what score is 2 SDs above the mean?',
      options: ['115', '120', '130', '145'],
      correctAnswer: 2,
      explanation: 'Two standard deviations above the mean = 100 + (2 × 15) = 130. This represents approximately the 98th percentile.'
    },
    {
      id: 14,
      question: 'What does a larger standard deviation indicate?',
      options: ['Scores are clustered together', 'Scores are spread out', 'Higher mean', 'Lower mean'],
      correctAnswer: 1,
      explanation: 'Larger SD means more variability - scores are more spread out from the mean. Smaller SD means scores cluster closer to the mean.'
    },

    // Distribution Shapes (3 questions)
    {
      id: 15,
      question: 'In a positively skewed distribution, where does the tail point?',
      options: ['Left (negative direction)', 'Right (positive direction)', 'Both directions', 'No tail present'],
      correctAnswer: 1,
      explanation: 'Positively skewed = tail points RIGHT (positive direction). Most scores bunch at the low end with few high extreme scores.'
    },
    {
      id: 16,
      question: 'A very easy test where most students score high creates what type of distribution?',
      options: ['Positively skewed', 'Negatively skewed', 'Normal distribution', 'No distribution'],
      correctAnswer: 1,
      explanation: 'A negatively skewed distribution has most scores bunched at the HIGH end with a tail pointing left toward the few low scores.'
    },
    {
      id: 17,
      question: 'In a negatively skewed distribution, what is the relationship between mean, median, and mode?',
      options: ['Mean > Median > Mode', 'Mean < Median < Mode', 'Mean = Median = Mode', 'Cannot determine'],
      correctAnswer: 1,
      explanation: 'In a negative skew: Mean < Median < Mode. The mean is pulled DOWN by the few extreme low scores in the tail.'
    },

    // Correlation (6 questions)
    {
      id: 18,
      question: 'What does a correlation of r = -0.85 indicate?',
      options: ['Weak negative relationship', 'Strong negative relationship', 'No relationship', 'Weak positive relationship'],
      correctAnswer: 1,
      explanation: 'r = -0.85 is a strong negative relationship. The absolute value (0.85) shows strength; the negative sign shows inverse direction.'
    },
    {
      id: 19,
      question: 'Which correlation is STRONGER: r = -0.70 or r = +0.50?',
      options: ['+0.50', '-0.70', 'Equally strong', 'Cannot determine'],
      correctAnswer: 1,
      explanation: 'Use absolute values to compare strength: |-0.70| = 0.70 > |+0.50| = 0.50. The sign shows direction; absolute value shows strength.'
    },
    {
      id: 20,
      question: 'Correlation coefficients range between what values?',
      options: ['0 to +1.00', '-1.00 to 0', '-1.00 to +1.00', '-2.00 to +2.00'],
      correctAnswer: 2,
      explanation: 'Correlation coefficients range from -1.00 (perfect negative) to +1.00 (perfect positive), with 0 meaning no correlation.'
    },
    {
      id: 21,
      question: 'Does correlation prove causation?',
      options: ['Yes, always', 'No, never', 'Sometimes', 'Only if r > 0.90'],
      correctAnswer: 1,
      explanation: 'Correlation NEVER proves causation. Just because two things are related doesn\'t mean one causes the other. There could be third variables, reverse causation, or coincidence.'
    },
    {
      id: 22,
      question: 'What symbol represents correlation?',
      options: ['σ', 'μ', 'r', 'α'],
      correctAnswer: 2,
      explanation: 'The letter "r" represents correlation coefficients (r stands for relationship).'
    },
    {
      id: 23,
      question: 'A correlation near zero indicates:',
      options: ['Strong positive relationship', 'Strong negative relationship', 'No consistent relationship', 'Perfect relationship'],
      correctAnswer: 2,
      explanation: 'A correlation near zero means no consistent relationship between the variables. They vary independently.'
    },

    // Standardized Scores (8 questions)
    {
      id: 24,
      question: 'A standard score (IQ-type) has a mean of ____ and SD of ____.',
      options: ['Mean=50, SD=10', 'Mean=100, SD=15', 'Mean=10, SD=3', 'Mean=0, SD=1'],
      correctAnswer: 1,
      explanation: 'Standard scores used for overall composite scores (like IQ) have mean=100 and SD=15.'
    },
    {
      id: 25,
      question: 'Scaled scores (like WISC subtests) have a mean of ____ and SD of ____.',
      options: ['Mean=50, SD=10', 'Mean=100, SD=15', 'Mean=10, SD=3', 'Mean=0, SD=1'],
      correctAnswer: 2,
      explanation: 'Scaled scores used for subtests have mean=10 and SD=3. Most scores fall between 4-16.'
    },
    {
      id: 26,
      question: 'T-scores have a mean of ____ and SD of ____.',
      options: ['Mean=50, SD=10', 'Mean=100, SD=15', 'Mean=10, SD=3', 'Mean=0, SD=1'],
      correctAnswer: 0,
      explanation: 'T-scores (common in social-emotional measures) have mean=50 and SD=10.'
    },
    {
      id: 27,
      question: 'Which score must be obtained first to determine derived scores?',
      options: ['Standard score', 'Raw score', 'Percentile rank', 'Z-score'],
      correctAnswer: 1,
      explanation: 'Raw score (number correct) must be calculated first, then converted to derived scores like standard scores, percentiles, etc.'
    },
    {
      id: 28,
      question: 'The 50th percentile corresponds to which standard score (mean=100, SD=15)?',
      options: ['85', '100', '115', '130'],
      correctAnswer: 1,
      explanation: 'The 50th percentile is the median, which equals the mean in a normal distribution. Mean = 100.'
    },
    {
      id: 29,
      question: 'Using IQ scores (mean=100, SD=15), a person with IQ=115 has a z-score of:',
      options: ['+1', '+2', '0', '-1'],
      correctAnswer: 0,
      explanation: 'z = (115-100)/15 = +1. A score of 115 is one standard deviation above the mean.'
    },
    {
      id: 30,
      question: 'Can you average percentile ranks?',
      options: ['Yes, always', 'No, never', 'Only if they\'re close together', 'Only for large samples'],
      correctAnswer: 1,
      explanation: 'NO! Percentile ranks are ordinal scale - the intervals are NOT equal. You cannot perform mathematical operations like averaging on ordinal data.'
    },
    {
      id: 31,
      question: 'A stanine score of 5 represents:',
      options: ['Below average', 'Average', 'Above average', 'Superior'],
      correctAnswer: 1,
      explanation: 'Stanine 5 is the middle/average score in the 1-9 stanine scale. It represents the 40th-60th percentile range.'
    },

    // Reliability (5 questions)
    {
      id: 32,
      question: 'Which term refers to the CONSISTENCY of scores across time or items?',
      options: ['Validity', 'Reliability', 'Variability', 'Correlation'],
      correctAnswer: 1,
      explanation: 'Reliability = consistency. Does the test give similar results across time, across items, or across raters?'
    },
    {
      id: 33,
      question: 'A teacher gives a test twice to the same students and correlates the scores. What reliability type?',
      options: ['Split-half', 'Test-retest', 'Internal consistency', 'Interrater'],
      correctAnswer: 1,
      explanation: 'Test-retest reliability examines consistency over time by giving the same test twice and correlating scores.'
    },
    {
      id: 34,
      question: 'Does a high SEM indicate high or low reliability?',
      options: ['High reliability', 'Low reliability', 'No relationship', 'Depends on the test'],
      correctAnswer: 1,
      explanation: 'High SEM = LOW reliability. More measurement error means less consistency. SEM = SD × √(1-reliability).'
    },
    {
      id: 35,
      question: 'Standard Error of Measurement (SEM) is used to create:',
      options: ['Correlation coefficients', 'Confidence intervals', 'Raw scores', 'Percentile ranks'],
      correctAnswer: 1,
      explanation: 'SEM is used to create confidence intervals around obtained scores, acknowledging measurement error.'
    },
    {
      id: 36,
      question: 'Which reliability method divides test items into two halves and correlates them?',
      options: ['Test-retest', 'Split-half', 'Interrater', 'Predictive validity'],
      correctAnswer: 1,
      explanation: 'Split-half reliability divides test in half (often odd/even items) and correlates the two halves to measure internal consistency.'
    },

    // Validity (4 questions)
    {
      id: 37,
      question: 'Which validity type asks: Does the test measure the psychological construct it claims to measure?',
      options: ['Content validity', 'Construct validity', 'Face validity', 'Predictive validity'],
      correctAnswer: 1,
      explanation: 'Construct validity ensures the test measures the theoretical construct (e.g., intelligence, anxiety) it purports to measure.'
    },
    {
      id: 38,
      question: 'Is validity determined by how consistent results are over time?',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation: 'False! That\'s RELIABILITY. Validity asks if the test measures what it claims to measure, not whether it\'s consistent.'
    },
    {
      id: 39,
      question: 'Presentation format and response mode can affect which type of validity?',
      options: ['Test-retest reliability', 'Content validity', 'Split-half reliability', 'Standard error'],
      correctAnswer: 1,
      explanation: 'True! Presentation format and response mode can contribute to bias and affect content validity.'
    },
    {
      id: 40,
      question: 'Can a test be reliable but NOT valid?',
      options: ['Yes', 'No'],
      correctAnswer: 0,
      explanation: 'YES! A test can consistently measure the WRONG thing (reliable but not valid). However, a test cannot be valid without being reliable.'
    },

    // Test Types (4 questions)
    {
      id: 41,
      question: 'Tests designed to measure what a student has LEARNED are called:',
      options: ['Aptitude tests', 'Achievement tests', 'Screening tests', 'Diagnostic tests'],
      correctAnswer: 1,
      explanation: 'Achievement tests measure acquired knowledge and skills - what has been learned through instruction.'
    },
    {
      id: 42,
      question: 'Which test compares individual performance to a normative sample?',
      options: ['Criterion-referenced', 'Norm-referenced', 'Diagnostic', 'Screening'],
      correctAnswer: 1,
      explanation: 'Norm-referenced tests compare performance to a representative sample, telling us how the student performs relative to peers.'
    },
    {
      id: 43,
      question: 'Brief tests that identify individuals who may need further assessment are:',
      options: ['Diagnostic tests', 'Achievement tests', 'Screening tests', 'Aptitude tests'],
      correctAnswer: 2,
      explanation: 'Screening tests are quick assessments to identify "at-risk" individuals who need comprehensive diagnostic assessment.'
    },
    {
      id: 44,
      question: 'The KTEA-3, WJ-IV Achievement, and WIAT-III are examples of:',
      options: ['Aptitude tests', 'Achievement tests', 'Screening tests', 'Behavior scales'],
      correctAnswer: 1,
      explanation: 'These are all standardized achievement tests measuring academic skills in reading, math, and writing.'
    },

    // Language Assessment (2 questions)
    {
      id: 45,
      question: 'Understanding spoken or written language is called:',
      options: ['Expressive language', 'Receptive language', 'Pragmatic language', 'Articulation'],
      correctAnswer: 1,
      explanation: 'Receptive language is understanding/input - comprehending what others say or write.'
    },
    {
      id: 46,
      question: 'Producing spoken or written language is called:',
      options: ['Expressive language', 'Receptive language', 'Comprehension', 'Decoding'],
      correctAnswer: 0,
      explanation: 'Expressive language is producing/output - speaking or writing to communicate.'
    },

    // Scoring & Norming (3 questions)
    {
      id: 47,
      question: 'What is a raw score?',
      options: ['A percentile rank', 'Number of items answered correctly', 'A standard score', 'An age equivalent'],
      correctAnswer: 1,
      explanation: 'Raw score is simply the number correct (or total points earned) - it\'s the first score calculated before conversion to derived scores.'
    },
    {
      id: 48,
      question: 'Age equivalent scores are written in what format?',
      options: ['Years.months (e.g., 8.5)', 'Years-months (e.g., 8-5)', 'Months only', 'Percentiles'],
      correctAnswer: 1,
      explanation: 'Age equivalents use the format years-months (e.g., 6-4 = 6 years, 4 months).'
    },
    {
      id: 49,
      question: 'What is the purpose of a norm sample?',
      options: ['To make the test harder', 'To establish typical performance for comparison', 'To reduce testing time', 'To increase reliability'],
      correctAnswer: 1,
      explanation: 'The norm sample establishes what is "typical" or "average" performance, providing standards for comparing individual scores.'
    }
  ]
};
