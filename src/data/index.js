// DATA LOADER - ES6 MODULE TO WINDOW BRIDGE (ASCII-only)

// Imports (relative to /src/data/)
import { mainSections } from './mainSections.js';
import { quizQuestions } from './quizQuestions.js';
import { extraChartSections } from './extraCharts/index.js';

// Helpers
function ensureIcon(s, fallback) {
  return s && s.icon ? s : { ...s, icon: fallback };
}
function normalizeExtra(sec, idx) {
  const withFlag = { ...sec, isExtraChart: true };
  const withId = withFlag.id ? withFlag : { ...withFlag, id: 'extra-' + idx };
  const title =
    withId.title ||
    withId.id.replace(/[-_]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  return ensureIcon({ ...withId, title: title }, '📊');
}
function normalizeMain(sec, idx) {
  const withId = sec.id ? sec : { ...sec, id: 'main-' + idx };
  return ensureIcon(withId, '📖');
}
function dedupeById(sections) {
  const seen = new Set();
  return sections.map(function (s, i) {
    var id = s.id;
    if (seen.has(id)) {
      console.warn('[studyGuideData] Duplicate section id detected:', id, '-> renaming');
      id = id + '-dup-' + i;
      return { ...s, id: id };
    }
    seen.add(id);
    return s;
  });
}

// Build and export
try {
  const normalizedMain =
    (Array.isArray(mainSections) ? mainSections : []).map(normalizeMain);
  const normalizedExtras =
    (Array.isArray(extraChartSections) ? extraChartSections : []).map(normalizeExtra);

  const allSections = dedupeById([].concat(normalizedMain, normalizedExtras));

  window.studyGuideData = Object.freeze({
    sections: allSections,
    quizQuestions: Array.isArray(quizQuestions) ? quizQuestions : []
  });

  // Signal ready
  window.dispatchEvent(new Event('studyGuideDataReady'));

  console.log('Study guide data loaded with',
    allSections.length, 'sections and',
    (quizQuestions && quizQuestions.length) || 0, 'questions');

  // Optional: warn about unregistered chart types
  setTimeout(function () {
    var reg = window.chartRegistry || {};
    var registered = Object.keys(reg);
    var withViz = allSections.filter(function (s) { return s.visualization && s.visualization.type; });
    var mismatches = withViz.filter(function (s) { return registered.indexOf(s.visualization.type) === -1; });
    if (mismatches.length && console.table) {
      console.warn('[studyGuideData] Unregistered chart types detected:');
      console.table(mismatches.map(function (s) {
        return {
          id: s.id,
          title: s.title,
          type: s.visualization.type,
          registeredTypesSample: registered.slice(0, 8).join(', ')
        };
      }));
    }
  }, 0);
} catch (e) {
  console.error('Failed to build studyGuideData:', e);
  window.studyGuideData = {
    sections: [{
      id: 'scales',
      title: 'Scales of Measurement',
      icon: '📏',
      content: { intro: 'Fallback data: module error occurred. Check console for details.' }
    }],
    quizQuestions: []
  };
  window.dispatchEvent(new Event('studyGuideDataReady'));
}
