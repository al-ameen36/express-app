const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").configDotenv();

// Get MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

// Create a MongoClient with proper options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
});

// Function to connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Database connection verified via ping");

    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = { client, connectToDatabase };
