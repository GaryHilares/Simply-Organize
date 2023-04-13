import sqlite3 from 'sqlite3';

// List daily entries between two dates
export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        // Ensure GET method
        if (req.method !== "GET") {
            res.status(405).send({ message: "Only GET requests allowed" });
            return;
        }

        // Get form information
        const query = req.query;
        const startDateUNIX = parseInt(query.startDate);
        const endDateUNIX = parseInt(query.endDate);

        // Check that dates are valid
        if (startDateUNIX === NaN || endDateUNIX === NaN) {
            res.status(400).send({ message: "A date is invalid" });
            return;
        }

        // Get database
        let db = new sqlite3.Database('data.db');

        // Query database
        db.all('SELECT date, description FROM tasks WHERE date >= ? AND date <= ?;', [startDateUNIX, endDateUNIX], (err, rows) => {
            if (err) {
                res.status(500);
                resolve();
            } else {
                // Send response
                res.status(200).json(rows);
                resolve();
            }
        });
    });
}
