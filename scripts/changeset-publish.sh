#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${NPM_TOKEN:-}" ]]; then
  echo "NPM_TOKEN not set. Skipping publish."
  exit 0
fi

if ! npm whoami >/dev/null 2>&1; then
  echo "NPM_TOKEN is invalid or expired. Skipping publish."
  exit 0
fi

if ! npm org ls signal-ui >/dev/null 2>&1; then
  echo "NPM org 'signal-ui' not accessible. Skipping publish."
  exit 0
fi

pnpm release
