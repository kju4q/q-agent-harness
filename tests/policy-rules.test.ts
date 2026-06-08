import { describe, expect, it } from "vitest";

function requiresApproval(action: string) {
  return [
    "environment.delete",
    "billing.update",
    "users.bulk_remove",
    "secrets.rotate",
  ].includes(action);
}

describe("approval policy", () => {
  it("allows documentation edits without approval", () => {
    expect(requiresApproval("docs.update")).toBe(false);
  });

  it("requires approval for destructive environment deletion", () => {
    expect(requiresApproval("environment.delete")).toBe(true);
  });

  it("requires approval for billing updates", () => {
    expect(requiresApproval("billing.update")).toBe(true);
  });
});
