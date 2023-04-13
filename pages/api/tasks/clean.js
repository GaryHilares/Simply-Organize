import sqlite3 from "sqlite3";

// Clear all past and empty daily entries
export default async function handler(req, res) {
    // Ensure DELETE method
    if (req.method !== "DELETE") {
        res.status(405).send({ message: "Only DELETE requests allowed" });
        return;
    }

    const unixTimestamp = Math.floor(new Date().getTime() / 1000);
    const oldTimestamp = unixTimestamp - 2 * 86400;

    // Get database
    let db = new sqlite3.Database('data.db');

    // Query database
    db.run('DELETE FROM tasks WHERE date < ? OR description = "";', oldTimestamp);

    // Send response
    res.status(200).json({ message: "Deleted elements from the database" });
}
