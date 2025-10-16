/**
 * CHART REGISTRY with smart aliases
 * Centralizes chart type registration/lookup and tolerates naming variants.
 *
 * Examples that will now resolve to the same renderer:
 *  - "centralTendency"  ⇄  "central-tendency"
 *  - "standardizedScores", "standardized-scores"  ⇄  "standardized"
 *  - "normalDistribution", "normal"               ⇄  "normal-distribution"
 *  - "skewedDistribution", "skew"                 ⇄  "skewed"
 *  - "bubbleChart"                                ⇄  "bubble"
 *  - "testRetest"                                 ⇄  "test-retest"
 *  - "internalConsistency"                        ⇄  "internal-consistency"
 *  - "alternateForms"                             ⇄  "alternate-forms"
 */

(function () {
  'use strict';

  // Canonical → aliases
  const aliasMap = {
    'normal-distribution': ['normalDistribution', 'normal'],
    'skewed': ['skewedDistribution', 'skew'],
    'central-tendency': ['centralTendency'],
    'standardized': ['standardizedScores', 'standardized-scores'],
    'ordinal': ['ordinalScores', 'ordinal-scores'],
    'correlation': ['correlationScatter'],
    'correlation-grid': ['correlationGrid'],
    'bubble': ['bubbleChart'],
    'test-retest': ['testRetest'],
    'internal-consistency': ['internalConsistency'],
    'alternate-forms': ['alternateForms'],
  };

  // Build reverse map: any variant → canonical
  const reverseAlias = {};
  Object.keys(aliasMap).forEach((canonical) => {
    reverseAlias[canonical] = canonical;
    aliasMap[canonical].forEach((a) => (reverseAlias[a] = canonical));
  });

  // Normalizer: maps any key to canonical; leaves unknown as given (lowercased)
  function normalizeType(t) {
    if (!t) return t;
    const key = String(t);
    if (reverseAlias[key]) return reverseAlias[key];
    // also try a dashed version of camelCase inputs
    const dashed = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    return reverseAlias[dashed] || dashed || key;
  }

  // Backing store
  const _store = {};

  // Proxy so reads/writes auto-normalize and aliases mirror the same function
  const registry = new Proxy(_store, {
    get(target, prop) {
      if (prop in target) return target[prop];
      const norm = normalizeType(prop);
      return target[norm];
    },
    set(target, prop, value) {
      const canonical = normalizeType(prop);
      target[canonical] = value;
      // mirror to aliases for faster direct lookup
      (aliasMap[canonical] || []).forEach((a) => (target[a] = value));
      return true;
    },
    has(target, prop) {
      return prop in target || normalizeType(prop) in target;
    },
  });

  // Expose global registry + helpers
  window.chartRegistry = registry;

  // Register a chart rendering function (safe with aliases)
  window.registerChart = function registerChart(type, renderFn) {
    const canonical = normalizeType(type);
    registry[canonical] = renderFn;
    console.log(`✅ Registered chart: ${canonical}${canonical !== type ? ` (from "${type}")` : ''}`);
    // mirror aliases (already handled in Proxy.set, but log for clarity)
    (aliasMap[canonical] || []).forEach((a) => {
      if (a !== canonical) {
        registry[a] = renderFn;
        console.log(`🔗 aliased "${a}" → "${canonical}"`);
      }
    });
  };

  // Optional: resolve function without knowing canonical name
  window.getChartRenderer = function getChartRenderer(type) {
    return registry[normalizeType(type)];
  };

  // Visibility summary (handy on tablet)
  setTimeout(() => {
    try {
      const keys = Object.keys(_store);
      console.log('✅ Chart registry ready. Types:', keys);
      if (console.table) console.table(keys.map((k) => ({ type: k })));
    } catch {}
  }, 0);
})();

