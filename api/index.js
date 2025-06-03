// 1. Import necessary libraries
const express = require('express');
const { MongoClient } = require('mongodb'); // MongoDB Driver

// 2. Initialize the Express application
const app = express();

// 3. Configure MongoDB Connection
// CRITICAL: This URI comes from Vercel's Environment Variables (MONGODB_URI)
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// 4. Configure Static File Serving (for local development primarily)
// On Vercel, the 'public' folder is served automatically by Vercel's static file server
// so this line mainly affects how it behaves if you run 'node api/index.js' locally.
app.use(express.static('public'));

// 5. Define the API endpoint to fetch documents from MongoDB
app.get('/api/documents', async (req, res) => {
    try {
        // Ensure the MongoDB client is connected
        // For serverless functions, the client might reconnect on each invocation
        // or a persistent connection is managed by the runtime.
        await client.connect(); 

        // CRITICAL: Replace 'YOUR_DATABASE_NAME' and 'YOUR_COLLECTION_NAME'
        // with the EXACT names from your MongoDB Atlas cluster.
        // Pay attention to capitalization!
        const database = client.db("Composer_Data");
        const collection = database.collection("2025");

        // Fetch all documents from the collection
        const documents = await collection.find({}).toArray();

        // Send the fetched documents as JSON response to the browser
        res.json(documents);

    } catch (error) {
        // Log the error for debugging purposes (you'll see this in Vercel logs)
        console.error("Error fetching data for API:", error);
        // Send a 500 Internal Server Error response to the client
        res.status(500).json({ message: "Error fetching data from server." });
    } finally {
        // In a serverless environment like Vercel, managing connections is nuanced.
        // For simplicity and avoiding common connection issues, we usually don't
        // explicitly close the client here in the serverless function, as Vercel
        // manages the lifecycle. If you uncomment client.close(), it might lead
        // to connection issues on subsequent requests.
        // await client.close(); 
    }
});

// 6. Export the Express app instance
// This is CRITICAL for Vercel to recognize your serverless function.
module.exports = app;

// IMPORTANT for local testing:
// If you run 'node api/index.js' locally, you won't automatically serve 'index.html'
// directly from this file unless you add specific routes for it.
// For local testing of the full app, you might start a simple local server
// that serves your 'public' folder and proxies API requests.
// However, the current setup is primarily for Vercel's deployment model.


