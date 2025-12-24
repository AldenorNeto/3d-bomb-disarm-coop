// Pure logic functions for switch device - extracted for testability

/**
 * Toggles a switch state and returns the new state
 * @param {boolean} currentState - Current switch state (true = on, false = off)
 * @returns {boolean} New state after toggle
 */
export function toggleSwitchState(currentState) {
  return !currentState;
}

/**
 * Validates a switch sequence against a solution
 * @param {string[]} toggleSequence - Array of switch IDs in order they were toggled ON
 * @param {string[]} solution - Array of switch IDs in correct order
 * @returns {"pending" | "solved" | "failed"} Status after validation
 */
export function validateSwitchSequence(toggleSequence, solution) {
  // Check each toggle in sequence
  for (let i = 0; i < toggleSequence.length; i++) {
    if (toggleSequence[i] !== solution[i]) {
      return "failed";
    }
  }

  // Check if sequence is complete
  if (toggleSequence.length === solution.length) {
    return "solved";
  }

  return "pending";
}
