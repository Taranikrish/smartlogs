<div align="center">
  <h1>SmartLogs (NPM Client)</h1>
  <p><strong>The "Zero-Config" Monitoring Toolkit for Node.js</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-green.svg)](https://nodejs.org/)
</div>

<hr />

## ✨ What is it?
This is the official Node.js client package for **SmartLogs**. Connect this to our pre-built Smartlog Dashboard using prometheus and grafana in 60 seconds! 

## 🗺️ How it Works
SmartLogs operates seamlessly between your code and your infrastructure using two simple components:
1. **The NPM Package (This package):** You install this inside your Node.js Express application. It runs silently in the background collecting critical system telemetry (Memory, CPU, Route Latency, Crash Locations) and exposes it on a `/metrics` route.
2. **The Dashboard Stack:** You download our pre-configured Docker stack from GitHub. It automatically spins up **Prometheus** (which fetches the `/metrics` from your app every 15 seconds) and **Grafana** (which visualizes those metrics on a stunning, pre-built dashboard).

---

## 🚀 Step 1: Install the Dashboard Server
Before writing any Node.js code, you should spin up the Smartlogs Dashboard backend. It only takes a few seconds via Docker:

```bash
# 1. Clone the dashboard repository
git clone https://github.com/Taranikrish/smartlogs.git

# 2. Enter the directory
cd smartlogs

# 3. Secure your passwords
cp .env.example .env

# 4. Spin up the Prometheus & Grafana stack
docker-compose up -d
```
*Your pristine Grafana dashboard will instantly go live at `http://localhost:3058` (Login: `admin` / Password from `.env`).*

---

## 🚀 Step 2: Install this Package
Now, jump into your existing Node.js/Express project and install the client:
```bash
npm install smartlogs
```

### Initialize monitoring in your App (`app.js`)
```javascript
import express from 'express';
// 1. Import Smartlogs
import { init, middleware, metricsEndpoint } from 'smartlogs';

const app = express();

// 2. Initialize monitoring and expose the /metrics route
init();
app.get('/metrics', metricsEndpoint());

// 3. Add the middleware to track all routes automatically!
app.use(middleware());

app.get('/', (req, res) => res.send('Monitoring is live!'));
app.listen(5000);
```

---

## 🛠️ Comprehensive API Reference

### 1. `init()`
**What it does:** Initializes the SmartLogs monitoring engine and binds to default Node.js metrics (CPU, Memory, Event Loop Lag, and Garbage Collection).  
**When to use it:** You must call this exactly once when your server starts up.  
```javascript
import { init } from 'smartlogs';
init();
```

### 2. `metricsEndpoint()`
**What it does:** Returns an async Express handler that exposes all your collected metrics in the standard Prometheus exposition format.  
**When to use it:** Bind this to a secure route (usually `/metrics`) so your Prometheus instance can scrape the data.  
```javascript
import express from 'express';
import { metricsEndpoint } from 'smartlogs';

const app = express();
app.get('/metrics', metricsEndpoint());
```

### 3. `middleware()`
**What it does:** A plug-and-play Express middleware that automatically tracks Total Requests, HTTP Response Status Codes (200, 404, 500, etc.), and endpoint Latency. It aggressively protects against memory leaks (Cardinality Explosions) by grouping malicious or unmapped 404 routes under a single `'unmatched_route'` bucket.  
**When to use it:** Add it right after your `/metrics` endpoint, but *before* your actual application routes.  
```javascript
import { middleware } from 'smartlogs';
app.use(middleware()); // That's it! All downstream traffic is now tracked.
```

### 4. `trackPerformance(label, asyncFunction)`
**What it does:** A highly optimized bottleneck profiler. It executes your asynchronous code block, tracks exactly how long it took resolving down to the millisecond, and automatically captures the exact file and line number it was executed on.  
**When to use it:** Wrap database queries, external API calls, or heavy CPU operations to identify exactly what is slowing down your server.  
**Parameters:**
- `label` (String): A custom name for this block (e.g., `'fetch_user_profile'`).
- `asyncFunction` (Function): The asynchronous logic to execute.
```javascript
import { trackPerformance } from 'smartlogs';

app.get('/heavy-task', async (req, res) => {
  const data = await trackPerformance('db_giant_query', async () => {
      // The time it takes to run this line will be recorded!
      return await db.query('SELECT * FROM giant_table');
  });
  
  res.json(data);
});
```

### 5. `logError(error, { route })`
**What it does:** Manually logs structured application crashes and exceptions. It reverse-engineers the error's stack trace to extract the exact file name and line number, pushing it directly to your Grafana incident dashboard.  
**When to use it:** Inside your `try/catch` blocks or global error handlers.  
**Parameters:**
- `error` (Error Object): The caught exception.
- `meta.route` (String): The route or context where the crash happened.
```javascript
import { logError } from 'smartlogs';

app.post('/checkout', async (req, res) => {
  try {
    await processPayment();
  } catch (err) {
    logError(err, { route: '/checkout' });
    res.status(500).send('Payment failed');
  }
});
```

### 6. `trackFailure({ route, reason, severity })`
**What it does:** Tracks business-logic failures that *aren't* crashes. It logs the event and automatically tags the file and line number where the failure occurred.  
**When to use it:** When a user enters a wrong password, hits a rate limit, or triggers a validation error.  
**Parameters:**
- `route` (String): Where it happened.
- `reason` (String): Why it happened (e.g., `'invalid_password'`).
- `severity` (String): `'low'`, `'medium'`, or `'high'`.
```javascript
import { trackFailure } from 'smartlogs';

if (password !== user.password) {
  trackFailure({ route: '/login', reason: 'invalid_password', severity: 'low' });
  return res.status(401).send('Unauthorized');
}
```

### 7. `trackRoute(req, res, responseTimeMs)`
**What it does:** Manually tracks an HTTP route's performance.  
**When to use it:** Only use this if you are NOT utilizing `middleware()` and want to build your own custom Express measurement interceptor.  
```javascript
import { trackRoute } from 'smartlogs';

// Usually called inside a custom middleware's res.on('finish') event
trackRoute(req, res, 150); 
```

---

<div align="center">
  <b>Built for the open-source community by <a href="https://github.com/Taranikrish">Krish Tarani</a></b>
</div>
