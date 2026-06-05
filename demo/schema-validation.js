function validateTurnRequest(payload) {
  const issues = [];

  if (!payload) issues.push("payload is required");
  if (!payload?.sessionId) issues.push("sessionId is required");
  if (!payload?.message) issues.push("message is required");

  if (
    payload?.mode &&
    !["ask", "plan", "agent"].includes(payload.mode)
  ) {
    issues.push("mode must be ask, plan, or agent");
  }

  if (
    payload?.budgetUsd !== undefined &&
    typeof payload.budgetUsd !== "number"
  ) {
    issues.push("budgetUsd must be a number");
  }

  return {
    ok: issues.length === 0,
    issues,
  };
}

module.exports = { validateTurnRequest };
