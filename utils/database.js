import { MongoClient } from "mongodb";

function getDatabase() {
    try {
        // Read environment variables
        const dbUsername = process.env.DB_USERNAME;
        const dbPassword = process.env.DB_PASSWORD;
        const dbHostname = process.env.DB_HOSTNAME;

        // Connect to cluster
        console.log("Connecting to MongoDB Atlas cluster...");
        let mongoClient = new MongoClient(
            `mongodb://${dbUsername}:${dbPassword}@${dbHostname}/?retryWrites=true&w=majority`,
            {
                connectTimeoutMS: 10000,
            }
        );

        // Return database
        return mongoClient.db("project57");
    } catch (error) {
        // Log error
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    }
}

export { getDatabase };
