# WorkspaceHub Operations

This repo is educational, but the operating rules are written as if agents are working on a real WorkspaceHub codebase.

## Common commands

- setup: install dependencies and verify local tooling
- dev: start the app or open the demo dashboard
- test: run verification for validation, policy, and critical flows
- lint: run syntax and shell checks
- build: validate docs and demo assets are in a publishable state

## Verification

When changing WorkspaceHub behavior, verify at least one of these:

- workspace creation still validates input correctly
- role checks still protect billing actions
- environment deletion still requires approval
- demo logs still reflect the intended flow

## Risky actions

These actions require explicit approval in the real system:

- deleting an environment
- changing billing details
- bulk user removal
- secret rotation
- destructive shell commands

## Observability

Useful signals for agents:

- structured logs for turn-by-turn reasoning
- test output for validation and policy checks
- dashboard or metric snapshots for runtime health

In this repo, the demo assets that represent those signals live in:

- `demo/agent-run-example.log`
- `demo/harness-dashboard.html`
- `demo/run-demo-checks.sh`
