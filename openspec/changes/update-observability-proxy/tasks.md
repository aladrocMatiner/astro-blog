## 1. Implementation
- [ ] 1.1 Replace `promtail` with Grafana Alloy agent in Docker Compose and add its configuration.
- [ ] 1.2 Rework HAProxy to listen on HTTPS for `www.aladroc-test.io` and `grafana.aladroc-test.io`, mount the new cert bundle, and keep the existing HTTP frontend for local testing.
- [ ] 1.3 Add `scripts/generate-certs.sh` that creates a CA and signed certs for the required hosts, document how to use them, and ignore the generated cert files from version control.

## 2. Validation
- [ ] 2.1 Verify Alloy agent starts and forwards Docker logs to Loki, replicating the behavior of promtail.
- [ ] 2.2 Run the cert script, ensure `haproxy.pem` is generated, and mention the expected hosts in the spec documentation.
