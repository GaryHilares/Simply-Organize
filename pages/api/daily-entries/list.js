import { getDatabase } from "../../../utils/database.js";

// List daily entries between two dates
export default async function handler(req, res) {
    // Ensure GET method
    if (req.method !== "GET") {
        res.status(405).send({ message: "Only GET requests allowed" });
        return;
    }

    // Get form information
    const query = req.query;
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);

    // Check that dates are valid
    if (startDate.toString() === "Invalid Date" || endDate.toString() === "Invalid Date") {
        res.status(400).send({ message: "A date is invalid" });
        return;
    }

    // Get database
    let db = getDatabase();

    // Query database
    let dailyEntries = db.collection("daily-entries");
    let result = await dailyEntries.find({ date: { $gte: startDate, $lte: endDate } }).toArray();

    // Send response
    res.status(200).json(result);
}
