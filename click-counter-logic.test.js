import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import {
  formatCounterDisplay,
  getCounterStatus,
  incrementCounter,
} from "./click-counter-logic.js";

describe("Click Counter Device Property Tests", () => {
  /**
   * **Feature: advanced-devices, Property 3: Click counter increment**
   * *For any* click counter with current value N, clicking it should result in value N+1.
   * **Validates: Requirements 2.2**
   */
  it("Property 3: Click counter increment - clicking increments by exactly 1", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1000000 }), (currentValue) => {
        const newValue = incrementCounter(currentValue);

        // New value should be exactly current + 1
        expect(newValue).toBe(currentValue + 1);

        // Increment should be deterministic
        expect(incrementCounter(currentValue)).toBe(newValue);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: advanced-devices, Property 4: Click counter status assignment**
   * *For any* click counter, when current equals target the status should be "solved",
   * and when current exceeds target the status should be "failed".
   * **Validates: Requirements 2.3, 2.4**
   */
  describe("Property 4: Click counter status assignment", () => {
    // Generator for valid targets (3-10 as per requirements)
    const targetArb = fc.integer({ min: 3, max: 10 });

    it("current equals target should result in solved status", () => {
      fc.assert(
        fc.property(targetArb, (target) => {
          const status = getCounterStatus(target, target);
          expect(status).toBe("solved");
        }),
        { numRuns: 100 }
      );
    });

    it("current exceeds target should result in failed status", () => {
      fc.assert(
        fc.property(
          targetArb,
          fc.integer({ min: 1, max: 100 }),
          (target, excess) => {
            const current = target + excess;
            const status = getCounterStatus(current, target);
            expect(status).toBe("failed");
          }
        ),
        { numRuns: 100 }
      );
    });

    it("current less than target should result in pending status", () => {
      fc.assert(
        fc.property(targetArb, (target) => {
          // Test all values from 0 to target-1
          for (let current = 0; current < target; current++) {
            const status = getCounterStatus(current, target);
            expect(status).toBe("pending");
          }
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: advanced-devices, Property 5: Click counter display format**
   * *For any* click counter with current C and target T, the display should show the string "C/T".
   * **Validates: Requirements 2.5**
   */
  it("Property 5: Click counter display format - shows current/target format", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 1, max: 100 }),
        (current, target) => {
          const display = formatCounterDisplay(current, target);

          // Should match exact format "current/target"
          expect(display).toBe(`${current}/${target}`);

          // Should contain both numbers
          expect(display).toContain(String(current));
          expect(display).toContain(String(target));

          // Should have exactly one slash
          expect(display.split("/").length).toBe(2);
        }
      ),
      { numRuns: 100 }
    );
  });
});
