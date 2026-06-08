# WorkspaceHub Product Overview

WorkspaceHub is a small B2B SaaS app for teams that need isolated workspaces for internal tools, experiments, and lightweight environments.

The product is intentionally simple so agents can reason about it:

- users belong to workspaces
- workspaces contain environments
- workspace owners can invite teammates
- billing is managed at the workspace level

## Core user workflows

### 1. Sign up and create a workspace

A new user signs up, creates a workspace, and becomes the initial workspace owner.

### 2. Invite teammates

A workspace owner or admin invites teammates and assigns roles such as owner, admin, or member.

### 3. Update billing details

An authorized user updates the billing profile for the workspace.

### 4. Create or delete an environment

Teams create environments for internal tools or experiments. Environment deletion is destructive and should be treated as a guarded action.

## Important domain terms

- `workspace`: the top-level tenant boundary for data, users, and billing
- `environment`: an isolated runtime or project space inside a workspace
- `workspace owner`: the highest-privilege role for billing and destructive actions
- `member`: a lower-privilege role that can use the product but cannot perform restricted actions

## What matters most

Agents working in this system should preserve these product rules:

- users must not access another workspace's data
- only authorized roles can change billing settings
- environment deletion must require approval
- environment names and workspace settings must be validated at input boundaries
- critical user flows should be easy to verify with tests and logs
