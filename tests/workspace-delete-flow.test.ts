import { describe, expect, it } from "vitest";

function canDeleteEnvironment(role: string, approved: boolean) {
  if (role !== "owner" && role !== "admin") return false;
  if (!approved) return false;
  return true;
}

describe("workspace environment deletion", () => {
  it("blocks members from deleting environments", () => {
    expect(canDeleteEnvironment("member", true)).toBe(false);
  });

  it("blocks owners until approval exists", () => {
    expect(canDeleteEnvironment("owner", false)).toBe(false);
  });

  it("allows owners after approval", () => {
    expect(canDeleteEnvironment("owner", true)).toBe(true);
  });

  it("allows admins after approval", () => {
    expect(canDeleteEnvironment("admin", true)).toBe(true);
  });
});
