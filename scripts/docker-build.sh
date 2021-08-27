#!/bin/bash
set -euo pipefail
docker-compose build | tee app.log || failed=yes
docker-compose logs --no-color > docker-compose.log
[[ -z "${failed:-}" ]] || exit 1
