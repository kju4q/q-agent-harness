import { describe, expect, it } from "vitest";
import { validateTurnRequest } from "../demo/schema-validation";

describe("validateTurnRequest", () => {
  it("accepts a well-formed request", () => {
    const result = validateTurnRequest({
      sessionId: "ws_204:env_staging:turn_014",
      message: "Delete the staging environment after approval.",
      mode: "agent",
      budgetUsd: 2.5,
    });

    expect(result.ok).toBe(true);
    expect(result.issues).toEqual([]);
  });

  it("rejects unsupported modes", () => {
    const result = validateTurnRequest({
      sessionId: "turn_001",
      message: "Do the thing",
      mode: "destroy",
    });

    expect(result.ok).toBe(false);
    expect(result.issues).toContain("mode must be ask, plan, or agent");
  });

  it("rejects non-numeric budgets", () => {
    const result = validateTurnRequest({
      sessionId: "turn_001",
      message: "Do the thing",
      mode: "agent",
      budgetUsd: "unlimited",
    });

    expect(result.ok).toBe(false);
    expect(result.issues).toContain("budgetUsd must be a number");
  });
});
