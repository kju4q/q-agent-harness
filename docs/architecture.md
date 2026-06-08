# WorkspaceHub Architecture

WorkspaceHub uses a small layered structure so agents can reason about where code belongs and which dependencies are allowed.

## Top-level structure

- `ui/`: forms, pages, and user-facing flows
- `services/`: business rules and orchestration
- `repos/`: persistence and data access
- `providers/`: external systems such as billing, email, or audit sinks
- `shared/`: common types, validation helpers, and low-level utilities

## Dependency rules

The allowed dependency direction is:

`ui -> services -> repos`

Services may also depend on:

- `providers`
- `shared`

Repos may depend on:

- `shared`

UI must not call repos directly.

Providers should not contain core business rules. They are adapters around external systems.

## Boundaries

### Input validation

Validate request and form data at entry points before business logic runs.

Examples:

- workspace creation request
- invite teammate form
- billing profile update
- environment deletion request

### Authorization

Role checks belong in services, not in UI components alone.

The UI may hide restricted actions, but services must enforce the real rule.

### Persistence

Repos handle reads and writes. They should not decide business policy.

For example, a repo may delete an environment record, but the service decides whether the caller is allowed to request that deletion.

### External systems

Billing, email, and audit logging should flow through providers so the rest of the system stays predictable and testable.

## Notes for agents

If a change touches multiple layers, prefer this order:

1. update shared types or validators if needed
2. update service behavior
3. update repo or provider interactions
4. update the UI
5. add or update tests

Do not bypass the service layer to "save time." That usually creates policy drift.
