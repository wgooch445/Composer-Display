// 1. Import the Express.js library
const express = require('express');

// 2. Create an Express application instance
const app = express();

// 3. Define a port number for your server to listen on
const port = 3000; // http://localhost:3000

//Mongo connection deets
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Tell express to serve static files from the public folder
app.use(express.static('public'));


//API endpoint
app.get('/api/documents', async (req, res) => {
	try {
		await client.connect(); //Ensure connection is Open
		const database = client.db("Composer_Data");
		const collection = database.collection("2025");
		
		const documents = await collection.find({}).toArray();
		//sends documents as JSON data to browser
		res.json(documents); // res.json() automatically sends data as json
		
	} catch (error) {
		console.error('Error fetching data for API:', error);
		res.status(500).json({ message: "Error fetching data" }); //error response
	} finally {
	// await client.close(); //commented out
	}
});

// 5. Start the server and make it listen for incoming requests
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log('Open your web browser and go to this address!');
  console.log('To see the raw data, visit http://localhost:3000/api/documents');
});
