import sqlite3 from "sqlite3";

// Create/Update daily entries
export default async function handler(req, res) {
    // Ensure POST method
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed" });
        return;
    }

    // Iterate over change
    const description = req.body.description;
    const date = parseInt(req.body.date);
    if (date == NaN) {
        res.status(400).send({ message: "Date is invalid" });
        return;
    }

    // Connect to database
    let db = new sqlite3.Database("data.db");

    // Update database
    db.run('INSERT OR REPLACE INTO tasks (date, description) VALUES (?, ?);', date, description);
    // db.run('UPDATE tasks SET description = ? WHERE date = ?;', description, date);

    // Send response
    res.status(200).send({ message: "Updated successfully" });
}
