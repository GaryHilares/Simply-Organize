import { getDatabase } from "../../../utils/database.js";

// Create/Update daily entries
export default async function handler(req, res) {
    // Ensure POST method
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed" });
        return;
    }

    // Iterate over changes
    let element = JSON.parse(req.body);
    const date = new Date(element.date);
    if (date.toString() === "Invalid Date") {
        res.status(400).send({ message: "Date is invalid" });
        return;
    }

    // Connect to database
    let db = getDatabase();
    let dailyEntries = db.collection("daily-entries");

    // Update database
    dailyEntries.updateOne({ date: date }, { $set: { description: element.description } }, { upsert: true });

    // Send response
    res.status(200).send({ message: "Updated successfully" });
}
