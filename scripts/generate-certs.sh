#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${SCRIPT_DIR}/../certs"
CA_KEY="${OUTPUT_DIR}/ca.key.pem"
CA_CERT="${OUTPUT_DIR}/ca.crt.pem"
SERVER_KEY="${OUTPUT_DIR}/haproxy.key.pem"
SERVER_CSR="${OUTPUT_DIR}/haproxy.csr.pem"
SERVER_CERT="${OUTPUT_DIR}/haproxy.crt.pem"
SERVER_PEM="${OUTPUT_DIR}/haproxy.pem"
EXTFILE="${OUTPUT_DIR}/openssl-san.cnf"

DOMAIN="aladroc-test.io"
HOSTS=("aladroc-test.io" "www.${DOMAIN}" "grafana.${DOMAIN}")

mkdir -p "${OUTPUT_DIR}"

echo "Generating CA..."
openssl genrsa -out "${CA_KEY}" 4096 > /dev/null 2>&1
openssl req -x509 -new -nodes -key "${CA_KEY}" -sha256 -days 3650 \
  -out "${CA_CERT}" -subj "/CN=Aladroc Test CA/O=Astro Blog" > /dev/null 2>&1

cat <<EOF > "${EXTFILE}"
subjectAltName=DNS:${HOSTS[0]},DNS:${HOSTS[1]},DNS:${HOSTS[2]}
EOF

echo "Creating server key and CSR..."
openssl genrsa -out "${SERVER_KEY}" 4096 > /dev/null 2>&1
openssl req -new -key "${SERVER_KEY}" -out "${SERVER_CSR}" \
  -subj "/CN=${HOSTS[0]}" > /dev/null 2>&1

echo "Signing certificate for ${HOSTS[*]}..."
openssl x509 -req -in "${SERVER_CSR}" -CA "${CA_CERT}" -CAkey "${CA_KEY}" \
  -CAcreateserial -out "${SERVER_CERT}" -days 825 -sha256 \
  -extfile "${EXTFILE}" > /dev/null 2>&1

cat "${SERVER_KEY}" "${SERVER_CERT}" "${CA_CERT}" > "${SERVER_PEM}"

echo "Certificates generated under ${OUTPUT_DIR}:"
echo "  CA cert: ${CA_CERT}"
echo "  HAProxy bundle: ${SERVER_PEM}"
echo "  Use ${SERVER_PEM} in HAProxy and trust ${CA_CERT} locally."
