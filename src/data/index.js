/**
 * DATA LOADER
 * Combines all data sources and exports to window.studyGuideData
 * 
 * This file imports:
 * - mainSections: Core 13 educational sections
 * - quizQuestions: All 45 quiz questions
 * - extraChartSections: All extra chart demonstrations
 */

import { mainSections } from './mainSections.js';
import { quizQuestions } from './quizQuestions.js';
import { extraChartSections } from './extraCharts/index.js';

// Combine all sections
const allSections = [
  ...mainSections,
  ...extraChartSections
];

// Export to window for compatibility with existing code
window.studyGuideData = {
  sections: allSections,
  quizQuestions: quizQuestions
};

console.log('✅ Study guide data loaded with', allSections.length, 'sections and', quizQuestions.length, 'questions');
