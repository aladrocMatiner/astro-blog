#!/usr/bin/env bash
set -euo pipefail

HOSTS_FILE="/etc/hosts"
declare -a ENTRIES=(
  "127.0.3.1 aladroc-test.io"
  "127.0.3.2 www.aladroc-test.io"
  "127.0.3.2 grafana.aladroc-test.io"
)

if [[ $EUID -ne 0 ]]; then
  exec sudo "$0" "$@"
fi

echo "Ensuring DNS entries in ${HOSTS_FILE}"
for entry in "${ENTRIES[@]}"; do
  if ! grep -Fxq "$entry" "$HOSTS_FILE"; then
    echo "$entry" >> "$HOSTS_FILE"
    echo "Added: $entry"
  else
    echo "Already present: $entry"
  fi
done
