/**
 * EXTRA CHARTS INDEX
 * Exports all extra chart sections for import by main index
 */

// Existing extra charts
import { bubbleChart } from './bubbleChart.js';
import { linearGradient } from './linearGradient.js';
import { customTooltip } from './customTooltip.js';
import { interpolationModes } from './interpolationModes.js';
import { multipleDatasets } from './multipleDatasets.js';
import { scatterPlot } from './scatterPlot.js';
import { polarArea } from './polarArea.js';
import { polarAreaCentered } from './polarAreaCentered.js';
import { axisMinMax } from './axisMinMax.js';
import { ordinalScores } from './ordinalScores.js';

// Reliability charts (4)
import { testRetest } from './testRetest.js';
import { internalConsistency } from './internalConsistency.js';
import { alternateForms } from './alternateForms.js';
import { interRater } from './interRater.js';

// Validity charts (4)
import { contentValidity } from './contentValidity.js';
import { concurrentValidity } from './concurrentValidity.js';
import { predictiveValidity } from './predictiveValidity.js';
import { constructValidity } from './constructValidity.js';

// Export all extra chart sections
export const extraChartSections = [
  // Existing demonstration charts
  bubbleChart,
  linearGradient,
  customTooltip,
  interpolationModes,
  multipleDatasets,
  scatterPlot,
  polarArea,
  polarAreaCentered,
  axisMinMax,
  ordinalScores,
  
  // Reliability charts
  testRetest,
  internalConsistency,
  alternateForms,
  interRater,
  
  // Validity charts
  contentValidity,
  concurrentValidity,
  predictiveValidity,
  constructValidity
];

console.log('✅ Extra charts module loaded with', extraChartSections.length, 'chart sections');
