const express = require("express");

const app = express();

// IMPORTANT: Cloud Run provides PORT via env variable
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello to Node.js World v1");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
