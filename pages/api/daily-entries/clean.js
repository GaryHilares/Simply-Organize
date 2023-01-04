import { getDatabase } from "../../../utils/database.js";

// Clear all past and empty daily entries
export default async function handler(req, res) {
    // Ensure DELETE method
    if (req.method !== "DELETE") {
        res.status(405).send({ message: "Only DELETE requests allowed" });
        return;
    }

    // Get form information
    let yesterdayUTC = new Date(new Date().toDateString());
    yesterdayUTC.setDate(yesterdayUTC.getDate() - 1);

    // Get database
    let db = getDatabase();

    // Query database
    let dailyEntries = db.collection("daily-entries");
    let result = await dailyEntries.deleteMany({ $or: [{ date: { $lt: yesterdayUTC } }, { description: "" }] });

    // Send response
    res.status(200).json({ message: `Deleted ${result.deletedCount} elements from the database` });
}
