# Architecture Template

Use this file to explain how the system is organized.

## Top-level structure

- UI / interface layer
- application or service layer
- data layer
- shared utilities

## Dependency rules

Document which layers are allowed to depend on which other layers.

## Boundaries

Call out the important boundaries:

- data validation
- service interfaces
- external APIs
- persistence

## Notes for agents

If a change touches multiple layers, describe the preferred order of operations and any rules that should not be broken.
