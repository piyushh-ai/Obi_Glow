/**
 * serviceCache.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable cache validation helper for the Services module.
 *
 * Why a separate file?
 *   - Keeps cache logic decoupled from Redux slice AND from the hook.
 *   - Any future screen / thunk can import this without duplicating the check.
 *   - Easy to unit-test in isolation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Cache duration: 5 minutes in milliseconds */
export const SERVICE_CACHE_DURATION_MS = 5 * 60 * 1000;

/**
 * Determines whether the currently cached services are still valid.
 *
 * Rules — cache is INVALID when ANY of the following is true:
 *   1. `services` array is missing or empty → nothing to serve from cache
 *   2. `lastFetched` is null/0 → data was never fetched successfully
 *   3. Time since last fetch exceeds SERVICE_CACHE_DURATION_MS
 *
 * @param {Array}       services    — current services array from Redux state
 * @param {number|null} lastFetched — Unix timestamp (ms) of last successful fetch
 * @returns {boolean}               true = cache is fresh and can be used
 */
export const isServiceCacheValid = (services, lastFetched) => {
  // Guard 1: No data in cache at all
  if (!services || services.length === 0) return false;

  // Guard 2: Cache timestamp missing → treat as cold start
  if (!lastFetched) return false;

  // Guard 3: Cache has expired
  const age = Date.now() - lastFetched;
  return age < SERVICE_CACHE_DURATION_MS;
};
