import { MongoClient } from "mongodb";
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Jtiph:ue8xI42NxiIS7z4Z@argentbank.pm62q.mongodb.net/";

// Connect to your Atlas cluster
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);