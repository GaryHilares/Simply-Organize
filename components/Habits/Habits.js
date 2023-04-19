import "bootstrap/dist/css/bootstrap.css";
import { createArrayFromRange } from '../../utils/objects-helpers';

function getTimesArrayFromInterval(interval) {
    const minutesInADay = 1440;
    if (minutesInADay / interval != Math.ceil(1440 / interval)) {
        throw "Interval must perfectly divide the number of minutes in a day (1440).";
    }
    return Array.from({ length: Math.ceil(minutesInADay / interval) }, (_el, index) => new Date(interval * index * 60000)).map((date) => date.getUTCHours());
}

function HabitsMenu() {
    console.log(getTimesArrayFromInterval(30));
    const interval = 30;
    const habits = [
        { "day": "monday", "startTime": "14:30", "endTime": "16:30", "description": "Go to the swimming pool.", "status": "done" }
    ];
    return (
        <div style={{ width: "100%", height: "900px" }}>
            <table className="table table-dark" style={{ textAlign: "center" }} >
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div >
    );
}

export { HabitsMenu };