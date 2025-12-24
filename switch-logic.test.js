import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import { toggleSwitchState, validateSwitchSequence } from "./switch-logic.js";

describe("Switch Device Property Tests", () => {
  /**
   * **Feature: advanced-devices, Property 1: Switch toggle state inversion**
   * *For any* switch in any state (on/off), clicking it should result in the opposite state.
   * **Validates: Requirements 1.2**
   */
  it("Property 1: Switch toggle state inversion - toggling any switch inverts its state", () => {
    fc.assert(
      fc.property(fc.boolean(), (initialState) => {
        const newState = toggleSwitchState(initialState);

        // The new state should be the opposite of the initial state
        expect(newState).toBe(!initialState);

        // Toggling twice should return to original state
        const doubleToggled = toggleSwitchState(newState);
        expect(doubleToggled).toBe(initialState);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: advanced-devices, Property 2: Switch sequence validation**
   * *For any* switch sequence template, toggling switches in the correct order should mark
   * the subface as solved, and toggling in any wrong order should mark it as failed.
   * **Validates: Requirements 1.3, 1.4, 1.5**
   */
  describe("Property 2: Switch sequence validation", () => {
    // Generator for switch IDs
    const switchIdArb = fc
      .stringOf(
        fc.constantFrom("a", "b", "c", "d", "e", "f", "1", "2", "3", "-"),
        { minLength: 1, maxLength: 10 }
      )
      .filter((s) => s.length > 0 && !s.startsWith("-") && !s.endsWith("-"));

    // Generator for solution arrays (2-4 unique switches as per requirements)
    const solutionArb = fc
      .uniqueArray(switchIdArb, { minLength: 2, maxLength: 4 })
      .filter((arr) => arr.length >= 2);

    it("correct sequence should result in solved status", () => {
      fc.assert(
        fc.property(solutionArb, (solution) => {
          // When toggle sequence matches solution exactly
          const status = validateSwitchSequence(solution, solution);
          expect(status).toBe("solved");
        }),
        { numRuns: 100 }
      );
    });

    it("partial correct sequence should result in pending status", () => {
      fc.assert(
        fc.property(
          solutionArb,
          fc.integer({ min: 1 }),
          (solution, partialLength) => {
            // Take a partial sequence (less than full solution)
            const actualPartialLength = Math.min(
              partialLength % solution.length,
              solution.length - 1
            );
            if (actualPartialLength === 0) return; // Skip if no partial

            const partialSequence = solution.slice(0, actualPartialLength);
            const status = validateSwitchSequence(partialSequence, solution);
            expect(status).toBe("pending");
          }
        ),
        { numRuns: 100 }
      );
    });

    it("wrong order should result in failed status", () => {
      fc.assert(
        fc.property(
          solutionArb,
          fc.integer({ min: 0 }),
          (solution, swapSeed) => {
            if (solution.length < 2) return; // Need at least 2 to swap

            // Create a wrong sequence by swapping two elements
            const wrongSequence = [...solution];
            const idx1 = swapSeed % solution.length;
            const idx2 = (idx1 + 1) % solution.length;

            // Only swap if elements are different
            if (wrongSequence[idx1] !== wrongSequence[idx2]) {
              [wrongSequence[idx1], wrongSequence[idx2]] = [
                wrongSequence[idx2],
                wrongSequence[idx1],
              ];

              const status = validateSwitchSequence(wrongSequence, solution);
              expect(status).toBe("failed");
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it("wrong switch at any position should result in failed status", () => {
      fc.assert(
        fc.property(
          solutionArb,
          switchIdArb,
          fc.integer({ min: 0 }),
          (solution, wrongSwitch, positionSeed) => {
            const position = positionSeed % solution.length;

            // Only test if the wrong switch is actually different
            if (wrongSwitch !== solution[position]) {
              const wrongSequence = [...solution];
              wrongSequence[position] = wrongSwitch;

              const status = validateSwitchSequence(wrongSequence, solution);
              expect(status).toBe("failed");
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
