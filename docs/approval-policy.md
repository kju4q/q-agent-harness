# WorkspaceHub Approval Policy

This file shows the kind of approval rules that keep an agent useful without letting it take risky actions casually.

## Allowed without approval

- read repository files
- update documentation
- edit non-destructive application code
- run local validation and test commands
- create or update safe preview data

## Allowed with approval

- delete an environment
- change billing configuration
- remove multiple users from a workspace
- rotate secrets
- run destructive shell commands

## Why these rules exist

The goal is not to slow agents down. The goal is to make high-risk actions explicit.

Agents should be fast on low-risk work and gated on destructive work.

## WorkspaceHub examples

- Updating copy on the billing page: no approval required
- Fixing validation for workspace names: no approval required
- Deleting an old environment: approval required
- Changing the billing provider credentials: approval required
