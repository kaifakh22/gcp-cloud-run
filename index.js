const express = require("express");

const app = express();

// IMPORTANT: Cloud Run provides PORT via env variable
const PORT = process.env.PORT || 8080;

// ─────────────────────────────────────────
// 🔧 Simple Logger (stdout → Cloud Logging)
// ─────────────────────────────────────────
const log = {
  info: (message, meta = {}) => {
    console.log(JSON.stringify({
      severity: "INFO",
      message,
      ...meta,
      timestamp: new Date().toISOString()
    }));
  },
  error: (message, meta = {}) => {
    console.error(JSON.stringify({
      severity: "ERROR",
      message,
      ...meta,
      timestamp: new Date().toISOString()
    }));
  }
};

// ─────────────────────────────────────────
// 🏠 Your Existing Route — just added log
// ─────────────────────────────────────────
app.get("/", (req, res) => {
  log.info("Home route called", { route: "/" });   // ← ADDEDD
  res.send("Hello to Node.js World v1");
});

// ─────────────────────────────────────────
// 🟢 Health Check — Cloud Run needs this
// ─────────────────────────────────────────
app.get("/health", (req, res) => {
  log.info("Health check called");                 // ← ADDED
  res.status(200).json({ status: "healthy" });
});

// ─────────────────────────────────────────
// ❌ Error Test Route — to see ERROR logs
// ─────────────────────────────────────────
app.get("/error-test", (req, res) => {
  log.error("Test error triggered", { route: "/error-test" });  // ← ADDED
  res.status(500).json({ error: "Check Cloud Logs for this error!" });
});

app.listen(PORT, () => {
  log.info(`Server started`, { port: PORT });      // ← ADDED
});
