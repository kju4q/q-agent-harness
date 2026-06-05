#!/usr/bin/env bash
set -euo pipefail

echo '$ pnpm lint'
sleep 0.4
echo
echo '> q-agent-harness@0.1.0 lint'
echo '> biome check .'
echo
sleep 0.5
echo 'Checked 18 files in 64ms. No fixes applied.'
echo
sleep 0.6
echo '$ pnpm test'
sleep 0.4
echo
echo '> q-agent-harness@0.1.0 test'
echo '> vitest run'
echo
sleep 0.5
echo ' RUN  v2.1.8 /Users/qendresahoti/Downloads/q-agent-harness'
echo
sleep 0.5
echo ' ✓ tests/schema-validation.test.ts (4 tests) 12ms'
echo ' ✓ tests/policy-rules.test.ts (3 tests) 9ms'
echo ' ✓ tests/turn-state.test.ts (5 tests) 15ms'
echo
sleep 0.5
echo ' Test Files  3 passed (3)'
echo '      Tests  12 passed (12)'
echo '   Start at  14:32:08'
echo '   Duration  0.61s'
