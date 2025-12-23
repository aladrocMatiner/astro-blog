#!/usr/bin/env bash
set -euo pipefail

ENDPOINTS=(
  "https://aladroc-test.io/"
  "https://www.aladroc-test.io/"
  "https://grafana.aladroc-test.io/"
  "http://localhost:3000/api/health"
  "http://localhost:8080/prometheus"
  "http://localhost:8080/loki/api/v1/labels"
  "http://localhost:8404/metrics"
  "http://localhost:9101/metrics"
)

check_endpoint() {
  local url="$1"
  echo "Checking ${url} ..."
  if [[ $url == https://* ]]; then
    curl -sk -H "Host: $(echo "$url" | awk -F/ '{print $3}')" "$url" >/dev/null
  elif [[ $url == http://localhost:8404/metrics ]]; then
    curl -s -u admin:observability "$url" >/dev/null
  else
    curl -sf "$url" >/dev/null
  fi
  echo "  ok"
}

for url in "${ENDPOINTS[@]}"; do
  check_endpoint "$url"
done

echo "Stack validation complete."
