# Future Changes & Production Optimizations

## Prometheus Alerts

### Error Rate Minimum Traffic Threshold
During the testing phase, it is expected to have low traffic. However, in a production environment, low traffic can trigger false positive alerts (e.g., if there are only 2 requests in a minute and 1 fails, the error rate spikes to 50%). To prevent this, we should add a minimum request threshold to the `HighErrorRate` alert.

**File:** `smartlog-prom/alerts.yml`
**Rule:** `HighErrorRate`

**Suggested `expr` for Production:**
```yaml
expr: |
  (rate(Smartlogs_errors_total[1m]) / rate(Smartlogs_http_requests_total[1m]) > 0.05)
  and 
  rate(Smartlogs_http_requests_total[1m]) > 0.1  # Requires at least ~6 requests per minute
```
