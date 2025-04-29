const express = require("express");
const { client, connectToDatabase } = require("./db");

const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route
app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/student-list", async (req, res) => {
  try {
    const result = await client
      .db("CICT")
      .collection("students")
      .find()
      .toArray();

    res.json({ data: result });
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(500)
      .json({ message: "Error fetching student data", error: error.message });
  }
});

app.post("/student", async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await client
      .db("CICT")
      .collection("students")
      .insertOne({ name, age });

    res.status(201).json({
      message: "Student added successfully",
      studentId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res
      .status(500)
      .json({ message: "Error adding student", error: error.message });
  }
});

// Start the server after connecting to the database
async function startServer() {
  try {
    // Connect to MongoDB first
    await connectToDatabase();

    // Then start the Express server
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
