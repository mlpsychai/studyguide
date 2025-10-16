Here’s the complete src/data/index.js — drop-in ready.

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
  const withId = withFlag.id ? withFlag : { ...withFlag, id: `extra-${idx}` };
  const withTitle = withId.title
    ? withId
    : {
        ...withId,
        title: withId.id
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      };
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

// --- Build & export ---------------------------------------------------------
try {
  const normalizedMain = (Array.isArray(mainSections) ? mainSections : []).map(normalizeMain);
  const normalizedExtras = (Array.isArray(extraChartSections) ? extraChartSections : []).map(normalizeExtra);

  // Keep main topics first, extras second
  const allSections = dedupeById([...normalizedMain, ...normalizedExtras]);

  // Export to window
  window.studyGuideData = Object.freeze({
    sections: allSections,
    quizQuestions: Array.isArray(quizQuestions) ? quizQuestions : [],
  });

  // Signal ready (some pages import this directly without waiting)
  window.dispatchEvent(new Event('studyGuideDataReady'));

  console.log(
    '✅ Study guide data loaded with',
    allSections.length,
    'sections and',
    (quizQuestions?.length ?? 0),
    'questions'
  );

  // Summary table
  if (console.table) {
    console.table(
      allSections.map((s) => ({
        id: s.id,
        title: s.title,
        extra: !!s.isExtraChart,
      }))
    );
  }

  // --- Debug: check chart type registration --------------------------------
  setTimeout(() => {
    const registered = Object.keys(window.chartRegistry || {});
    const withViz = allSections.filter((s) => s.visualization && s.visualization.type);
    const mismatches = withViz.filter((s) => !registered.includes(s.visualization.type));
    if (mismatches.length) {
      console.warn('[studyGuideData] Unregistered chart types detected:');
      if (console.table) {
        console.table(
          mismatches.map((s) => ({
            id: s.id,
            title: s.title,
            type: s.visualization.type,
            registeredTypesSample: registered.slice(0, 8).join(', '),
          }))
        );
      } else {
        console.warn(mismatches);
      }
    }
  }, 0);
} catch (e) {
  // Hard guard so the app can still boot and show an error
  console.error('❌ Failed to build studyGuideData:', e);
  window.studyGuideData = {
    sections: [
      {
        id: 'scales',
        title: 'Scales of Measurement',
        icon: '📏',
        content: { intro: 'Fallback data: module error occurred. Check console for details.' },
      },
    ],
    quizQuestions: [],
  };
  window.dispatchEvent(new Event('studyGuideDataReady'));
}
```0

