# WorkspaceHub Architecture Boundaries

This file exists to make the structure mechanically legible to agents.

## Allowed dependency flow

```text
ui -> services -> repos
             -> providers

shared -> used by all layers when appropriate
```

## Disallowed shortcuts

- `ui -> repos`
- `ui -> providers`
- business rules inside repo classes
- authorization logic only in the UI

## Examples

### Good

- a billing form submits to a service
- the service checks role permissions
- the service calls a provider to update billing
- the service writes an audit event through a repo or provider

### Bad

- a UI component directly updates billing through a provider
- a repo decides whether a member is allowed to delete an environment
- an external provider silently changes product policy

## Why this matters for agents

Agents tend to optimize for the shortest path unless the repository makes the correct path obvious.

Clear boundaries reduce accidental policy drift and make reviews easier.
