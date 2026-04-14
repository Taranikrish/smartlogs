import {   register,
  httpRequestCount,
  httpResponseTime,
  errorCount,
  failureCount,
  performanceHistogram, } from './metrics.js';

// ─── 1. init() ───────────────────────────────────────────────────────────────
// call once at app startup
function init() {
  console.log('[Smartlogs] monitoring initialized');
}

// ─── 2. middleware() ─────────────────────────────────────────────────────────
// add to Express — auto tracks every route
function middleware() {
  return function (req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000; // convert to seconds
      const route = req.route ? req.route.path : 'unmatched_route';
      const method = req.method;
      const status = res.statusCode.toString();

      // record request count
      httpRequestCount.inc({ method, route, status });

      // record response time
      httpResponseTime.observe({ method, route, status }, duration);

      // if status is 4xx or 5xx, count as error
      if (res.statusCode >= 400) {
        errorCount.inc({
          route,
          error_type: res.statusCode >= 500 ? 'server_error' : 'client_error',
          location: 'middleware',
          message: `HTTP ${res.statusCode}`
        });
      }
    });

    next();
  };
}

// ─── 3. logError() ───────────────────────────────────────────────────────────
// call manually anywhere in your code when an error occurs
function logError(err, meta = {}) {
  const route = meta.route || 'unknown';
  const error_type = err.name || 'Error';

  // extract file and line number from stack trace
  const location = extractLocation(err);

  errorCount.inc({ route, error_type, location, message: err.message });

  console.error(
    `[Smartlogs] ERROR | route: ${route} | type: ${error_type} | message: ${err.message} | location: ${location}`
  );
}

// ─── 4. trackFailure() ───────────────────────────────────────────────────────
// call manually when you know something is failing
function trackFailure({ route = 'unknown', reason = 'unknown', severity = 'medium' } = {}) {
  // Pass an offset of 2 to skip the top frame (Error) and the trackFailure frame itself
  const location = extractLocation(new Error(), 2);

  failureCount.inc({ route, reason, severity, location });

  console.warn(
    `[Smartlogs] FAILURE | route: ${route} | reason: ${reason} | severity: ${severity} | location: ${location}`
  );
}

// ─── 5. trackRoute() ─────────────────────────────────────────────────────────
// call manually if you are not using middleware()
function trackRoute(req, res, responseTimeMs) {
  const route = req.route ? req.route.path : 'unmatched_route';
  const method = req.method;
  const status = res.statusCode.toString();
  const duration = responseTimeMs / 1000;

  httpRequestCount.inc({ method, route, status });
  httpResponseTime.observe({ method, route, status }, duration);
}

// ─── 6. metricsEndpoint() ────────────────────────────────────────────────────
// adds /metrics route to your Express app — Prometheus scrapes this
function metricsEndpoint() {
  return async function (req, res) {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (err) {
      res.status(500).end(err.message);
    }
  };
}

// ─── 7. trackPerformance() ───────────────────────────────────────────────────
// wraps an async function to measure its execution time and location
async function trackPerformance(label, asyncFunction) {
  const start = Date.now();
  // Pass an offset of 2 to get the caller of trackPerformance
  const location = extractLocation(new Error(), 2);

  try {
    return await asyncFunction();
  } finally {
    const duration = (Date.now() - start) / 1000;
    performanceHistogram.observe({ label, location }, duration);
  }
}

// ─── Helper ──────────────────────────────────────────────────────────────────
// extracts file name and line number from error stack trace
function extractLocation(err, stackOffset = 1) {
  if (!err.stack) return 'unknown';

  const lines = err.stack.split('\n');
  // Use stackOffset to traverse up the trace
  const callerLine = lines[stackOffset] || lines[0];

  // extract just the file:line:col part
  const match = callerLine.match(/\((.+):(\d+):(\d+)\)/) ||
                 callerLine.match(/at (.+):(\d+):(\d+)/);

  if (match) {
    return `${match[1]}:${match[2]}`;
  }

  return callerLine.trim();
}

// ─── Exports ─────────────────────────────────────────────────────────────────
export {
  init,
  middleware,
  logError,
  trackFailure,
  trackRoute,
  metricsEndpoint,
  trackPerformance,
};