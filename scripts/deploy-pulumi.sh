#!/bin/bash
set -euo pipefail

cd devops && pulumi up && cd ..
