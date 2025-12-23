#!/usr/bin/env bash
set -euo pipefail

ENDPOINTS=(
  "https://aladroc-test.io/"
  "https://www.aladroc-test.io/"
  "https://grafana.aladroc-test.io/"
  "https://aladroc-test.io/grafana"
  "https://aladroc-test.io/analytics/dashboard"
  "https://aladroc-test.io/analytics.js"
  "http://localhost:3000/api/health"
  "http://localhost:8080/prometheus"
  "http://localhost:8080/loki/api/v1/labels"
  "http://localhost:8080/analytics/dashboard"
  "http://localhost:9800/metrics"
  "http://localhost:8404/metrics"
  "http://localhost:9101/metrics"
)

LOCAL_HOST_IP="127.0.0.1"
HTTPS_HOSTS=("aladroc-test.io" "www.aladroc-test.io" "grafana.aladroc-test.io")

check_endpoint() {
  local url="$1"
  echo "Checking ${url} ..."
  local host_port
  host_port="$(echo "$url" | awk -F/ '{print $3}')"
  local host="${host_port%%:*}"
  local port="${host_port#*:}"
  if [[ "$host_port" == "$port" ]]; then
    port=""
  fi
  local resolve_args=()
  if [[ " ${HTTPS_HOSTS[*]} " == *" $host "* && $url == https://* ]]; then
    if [[ -z "$port" ]]; then
      port=443
    fi
    resolve_args+=(--resolve "${host}:${port}:${LOCAL_HOST_IP}")
  fi
  if [[ $url == https://* ]]; then
    curl -sk "${resolve_args[@]}" -H "Host: $host" "$url" >/dev/null
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
