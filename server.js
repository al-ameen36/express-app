const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route
app.get("/", (_, res) => {
  res.send("Hello World!");
});

// Another route
app.post("/greet", (req, res) => {
  const { name } = req.body;
  res.send(`Hello, ${name || "Guest"}!`);
});

// Start the server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
