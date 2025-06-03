// 1. Import the MongoClient from the 'mongodb' driver
const { MongoClient } = require('mongodb');

// 2. Define MongoDB connection string
//    Default port
const uri = "mongodb://localhost:27017";

// 3. Create a new MongoClient instance
const client = new MongoClient(uri);

// 4. Define an asynchronous function to connect and fetch data
async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected successfully to MongoDB!");

    // Specify the database and collection
    const database = client.db("ComposerData");
    const collection = database.collection("2025Live");



    // Find all documents in the collection and convert the result to an array
    const documents = await collection.find({}).toArray();

    console.log("\n--- Documents Found ---");

    // 5. Use a loop to iterate and display each document
    if (documents.length === 0) {
      console.log("No documents found in the collection.");
    } else {
      for (let i = 0; i < documents.length; i++) {
        const doc = documents[i];
        // Display each document. For simplicity, we'll stringify the whole object.
        // Later, you'd pick out specific fields like doc.name, doc.price etc.
        console.log(`Document ${i + 1}:`);
		console.log(` Help Desk Tech: ${doc["Help Desk Tech"]}`);
		console.log(`Troubleshooting Steps : ${doc["Troubleshooting Steps "]}`);
		console.log("---"); //Separator
      }
    }

  } catch (error) {
    console.error("Error connecting or fetching data:", error);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

// 6. Call the 'run' function to execute the code
run().catch(console.dir);
