#!/bin/bash
set -euo pipefail
chmod +x scripts/pg-init-scripts/create-db.sh
docker compose up --build | tee app.log || failed=yes
docker compose logs --no-color > docker-compose.log
[[ -z "${failed:-}" ]] || exit 1
