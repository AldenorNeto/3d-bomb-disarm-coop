// Pure logic functions for click counter device - extracted for testability

/**
 * Increments a counter value by 1
 * @param {number} current - Current counter value
 * @returns {number} New counter value after increment
 */
export function incrementCounter(current) {
  return current + 1;
}

/**
 * Determines the status of a counter based on current value and target
 * @param {number} current - Current counter value
 * @param {number} target - Target value to reach
 * @returns {"pending" | "solved" | "failed"} Status after evaluation
 */
export function getCounterStatus(current, target) {
  if (current > target) {
    return "failed";
  }
  if (current === target) {
    return "solved";
  }
  return "pending";
}

/**
 * Formats the counter display string
 * @param {number} current - Current counter value
 * @param {number} target - Target value
 * @returns {string} Formatted display string "current/target"
 */
export function formatCounterDisplay(current, target) {
  return `${current}/${target}`;
}
