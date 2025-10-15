/**
 * DATA LOADER - ES6 MODULE TO WINDOW BRIDGE
 */
import { mainSections } from './mainSections.js';
import { quizQuestions } from './quizQuestions.js';
import { extraChartSections } from './extraCharts/index.js';

// Combine sections
const allSections = [
  ...mainSections,
  ...extraChartSections
];

// Export to window for React components
window.studyGuideData = {
  sections: allSections,
  quizQuestions: quizQuestions
};

// Signal ready
window.dispatchEvent(new Event('studyGuideDataReady'));

console.log('✅ Study guide data loaded with', allSections.length, 'sections and', quizQuestions.length, 'questions');
