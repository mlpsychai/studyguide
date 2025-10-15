/**
 * DATA LOADER
 * Combines all data sources and exports to window.studyGuideData
 * 
 * This file imports:
 * - mainSections: Core 13 educational sections
 * - quizQuestions: All 45 quiz questions
 * - extraCharts: Individual chart sections (to be added)
 */

import { mainSections } from '../mainSections.js';
import { quizQuestions } from '../quizQuestions.js';

// TODO: Import extra chart sections as they are created
// import { bubbleChart } from './extraCharts/bubbleChart.js';
// import { linearGradient } from './extraCharts/linearGradient.js';
// ... etc

// Combine all sections
const allSections = [
  ...mainSections,
  // TODO: Add extra chart sections here
  // ...extraChartSections
];

// Export to window for compatibility with existing code
window.studyGuideData = {
  sections: allSections,
  quizQuestions: quizQuestions
};

console.log('✅ Study guide data loaded with', allSections.length, 'sections and', quizQuestions.length, 'questions');
