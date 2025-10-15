/**
 * DATA LOADER - ES6 MODULE TO WINDOW BRIDGE
 * Normalizes sections so all extra charts appear reliably.
 */
import { mainSections } from './mainSections.js';
import { quizQuestions } from './quizQuestions.js';
import { extraChartSections } from './extraCharts/index.js';

// --- Helpers ---------------------------------------------------------------
function ensureIcon(s, fallback = '📈') {
  return s.icon ? s : { ...s, icon: fallback };
}

function normalizeExtra(sec, idx) {
  // Make sure extras are marked and have stable IDs/titles/icons
  const withFlag = { ...sec, isExtraChart: true };
  const withId = withFlag.id
    ? withFlag
    : { ...withFlag, id: `extra-${idx}` };
  const withTitle = withId.title
    ? withId
    : { ...withId, title: withId.id.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };
  return ensureIcon(withTitle, '📊');
}

function normalizeMain(sec, idx) {
  const withId = sec.id ? sec : { ...sec, id: `main-${idx}` };
  return ensureIcon(withId, '📖');
}

function dedupeById(sections) {
  const seen = new Set();
  return sections.map((s, i) => {
    let id = s.id;
    if (seen.has(id)) {
      console.warn('[studyGuideData] Duplicate section id detected:', id, '→ renaming');
      id = `${id}-dup-${i}`;
      return { ...s, id };
    }
    seen.add(id);
    return s;
  });
}

// --- Build sections --------------------------------------------------------
const normalizedMain = (Array.isArray(mainSections) ? mainSections : []).map(normalizeMain);
const normalizedExtras = (Array.isArray(extraChartSections) ? extraChartSections : []).map(normalizeExtra);

// Keep main topics first, extras second
const allSections = dedupeById([...normalizedMain, ...normalizedExtras]);

// --- Export to window ------------------------------------------------------
window.studyGuideData = Object.freeze({
  sections: allSections,
  quizQuestions: Array.isArray(quizQuestions) ? quizQuestions : []
});

// Signal ready (some pages import this directly without waiting)
window.dispatchEvent(new Event('studyGuideDataReady'));

console.log(
  '✅ Study guide data loaded with',
  allSections.length, 'sections and',
  (quizQuestions?.length ?? 0), 'questions'
);

console.table(
  allSections.map(s => ({
    id: s.id,
    title: s.title,
    extra: !!s.isExtraChart
  }))
);
