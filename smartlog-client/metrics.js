import { Registry, collectDefaultMetrics, Counter, Histogram } from 'prom-client';

const register = new Registry();

// collect default Node.js metrics — CPU, memory, uptime — automatic
collectDefaultMetrics({ register });

// 1. request counter — per route, method, status code
const httpRequestCount = new Counter({
  name: 'Smartlogs_http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// 2. response time — latency per route
const httpResponseTime = new Histogram({
  name: 'Smartlogs_http_response_time_seconds',
  help: 'HTTP response time in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
});

// 3. error counter — per route and error type
const errorCount = new Counter({
  name: 'Smartlogs_errors_total',
  help: 'Total errors',
  labelNames: ['route', 'error_type', 'location', 'message'],
  registers: [register],
});

// 4. failure counter — manual trackFailure() calls
const failureCount = new Counter({
  name: 'Smartlogs_failures_total',
  help: 'Total tracked failures',
  labelNames: ['route', 'reason', 'severity', 'location'],
  registers: [register],
});

// 5. function performance — tracks execution time of custom blocks
const performanceHistogram = new Histogram({
  name: 'Smartlogs_function_duration_seconds',
  help: 'Track execution time of specific functions/logic blocks',
  labelNames: ['label', 'location'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5, 10],
  registers: [register],
});

export {
  register,
  httpRequestCount,
  httpResponseTime,
  errorCount,
  failureCount,
  performanceHistogram,
};