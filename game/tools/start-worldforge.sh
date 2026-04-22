#!/usr/bin/env bash
set -euo pipefail

HOST="${1:-127.0.0.1}"
PORT="${2:-8765}"

echo "Starting Worldforge on ${HOST}:${PORT}"
echo "Open: http://${HOST}:${PORT}/worldforge.html"

python3 game/tools/lmstudio_proxy.py --host "${HOST}" --port "${PORT}"
