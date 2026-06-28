/**
 * usePageRefresh.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Global reusable pull-to-refresh hook for Obi Glow.
 *
 * Usage:
 *   const { refreshing, onRefresh } = usePageRefresh(async () => {
 *     await handleGetAllServices();
 *     await handleSomethingElse();
 *   });
 *
 * Then pass `refreshing` and `onRefresh` to <RefreshControl /> or <RefreshWrapper />.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useState, useCallback } from "react";

/**
 * @param {() => Promise<void>} fetchFn  — async function jo refresh par call ho
 * @param {object}              options
 * @param {number}  options.minDuration  — minimum refreshing duration (ms), default 400
 * @returns {{ refreshing: boolean, onRefresh: () => Promise<void> }}
 */
const usePageRefresh = (fetchFn, { minDuration = 400 } = {}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    const startTime = Date.now();
    try {
      await fetchFn();
    } catch (_err) {
      // Silently ignore — individual fetchFns should handle their own errors
    }

    // Ensure spinner shows for at least `minDuration` ms so it doesn't flash
    const elapsed = Date.now() - startTime;
    if (elapsed < minDuration) {
      await new Promise((resolve) =>
        setTimeout(resolve, minDuration - elapsed)
      );
    }

    setRefreshing(false);
  }, [fetchFn, minDuration]);

  return { refreshing, onRefresh };
};

export default usePageRefresh;
