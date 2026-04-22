#!/usr/bin/env bash
set -euo pipefail

HOST="${1:-127.0.0.1}"
PORT="${2:-8765}"

echo "Starting DJ OOR tools server on ${HOST}:${PORT}"
echo "Open: http://${HOST}:${PORT}/worldforge.html"
echo "Open: http://${HOST}:${PORT}/lmstudio-lab.html"

python3 game/tools/lmstudio_proxy.py --host "${HOST}" --port "${PORT}"
