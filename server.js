// 1. Import necessary libraries
const express = require('express');
const { MongoClient } = require('mongodb'); // MongoDB Driver

// 2. Initialize the Express application
const app = express();

// 3. Configure MongoDB Connection

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// adding request type route

app.get('/request', (req, res) => {
	res.sendFile(__dirname + '/public/request.html');
});

// adding devices route
app.get('/devices', (req, res) => {
	res.sendFile(__dirname + '/public/devices.html');
});

// adding tsxbugs route
app.get('/tsxbugs', (req, res) => {
	res.sendFile(__dirname + '/public/tsxbugs.html');
});

// adding route for dynamic text

app.get('/api/dynamic-text', async (req, res) => {
	try{
		await client.connect();
		const database = client.db("Information_Display")
		const collection = databs.collection("Current_Issues_TSX");

		//you are here*****

app.use(express.static('public'));

// Define the API endpoints to fetch documents from MongoDB
app.get('/api/tsxbugs', async (req, res) => {
	try {
		await client.connect();
		const database = client.db("Bug_Information");
		const collection = database.collection("TSX-P1-P2");
		const documents = await collection.find({}).toArray();
		res.json(documents);

	} catch (error) {
		console.error("API is broke yo:", error);
		res.status(500).json({ message: "bug data has a bug." });
	}
	// No finally { await client.close(); }
});
app.get('/api/documents', async (req, res) => 
	{
		let documents; // declaring documents outside the try block
    try { 
	    { 
	    await client.connect(); 

        const database = client.db("Composer_Data");
        const collection = database.collection("2025");

        // Fetch all documents from the collection
        documents = await collection.find({}).toArray()};

        // Send the fetched documents as JSON response to the browser
        res.json(documents);

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching data for API:", error);
        // Send a 500 Internal Server Error response to the client
        res.status(500).json({ message: "Error fetching data from server.", details: error.message });
    } finally {
    }
    });
	
	//6. start the server and make it listen to incomign requests.
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`server listening on port ${port}`);
});
