#!/usr/bin/env bash
set -euo pipefail

while IFS= read -r line; do
  echo "$line"
  sleep 0.5
done <<'EOF'
2026-05-29T14:34:02.012Z INFO  boot request_id=turn_01 component=api msg="turn request received"
2026-05-29T14:34:02.214Z INFO  policy request_id=turn_01 component=policy msg="permission check passed" tool=repo.read
2026-05-29T14:34:02.498Z INFO  agent request_id=turn_01 component=orchestrator msg="running verification checks"
2026-05-29T14:34:02.871Z WARN  ui request_id=turn_01 component=browser msg="selector retry" selector="[data-test=save-button]"
2026-05-29T14:34:03.155Z INFO  tests request_id=turn_01 component=runner msg="core flow validated" suite=checkout-smoke
2026-05-29T14:34:03.489Z INFO  traces request_id=turn_01 component=otel msg="span exported" latency_ms=742
2026-05-29T14:34:03.812Z INFO  finish request_id=turn_01 component=api msg="turn completed successfully"
EOF
