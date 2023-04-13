import { useState } from "react";
import { useFetch } from "../../utils/hooks";
import { DayBox } from "./DayBox";
import { addDaysToDate, createArrayFromRange } from "../../utils/objects-helpers";
import { NoteEditorModal } from "./NoteEditorModal";
import styles from "../../styles/Calendar.module.css";

function getUnixTimeStamp(datetime) {
    return Math.floor(datetime.getTime() / 1000);
}

function Calendar() {
    // Creates a date representing today, ignoring the time of the day
    const today = new Date(new Date().toDateString());
    const [loadedWeeks, setLoadedWeeks] = useState(25);
    const [tasks, setTasks] = useState({});
    const [formData, setFormData] = useState({ displaying: false, date: null, description: null });

    // Fetches information from the server
    const { isLoading, error } = useFetch(
        "/api/tasks/list?" +
        new URLSearchParams({
            startDate: getUnixTimeStamp(today),
            endDate: getUnixTimeStamp(addDaysToDate(today, loadedWeeks * 7)),
        }),
        [loadedWeeks],
        async (data) => {
            // Convert JSON data to object
            const unparsedTasks = await data.json();
            const mappedTasks = Object.assign(
                {},
                ...unparsedTasks.map((task) => ({
                    [new Date(task.date * 1000).toDateString()]: task.description,
                }))
            );

            // Assigns the information to tasks
            setTasks(mappedTasks);
        }
    );

    // Renders the element
    return (
        <>
            {formData.displaying && (
                <NoteEditorModal
                    value={formData.description}
                    handleInput={(event) => {
                        setFormData((oldFormData) => {
                            return {
                                ...oldFormData,
                                description: event.target.value,
                            };
                        });
                    }}
                    handleCancel={() => {
                        setFormData({
                            displaying: false,
                            date: null,
                            description: null,
                        });
                    }}
                    handleSubmit={() => {
                        // Submit changes to backend
                        fetch("/api/tasks/create", {
                            method: "POST",
                            headers: new Headers({ 'Content-Type': 'application/json' }),
                            body: JSON.stringify({
                                date: Math.floor(formData.date.getTime() / 1000),
                                description: formData.description,
                            }),
                        });

                        // Update frontend tasks
                        setTasks((oldTasks) => {
                            return {
                                ...oldTasks,
                                [formData.date.toDateString()]: formData.description,
                            };
                        });

                        // Reset form data
                        setFormData({
                            displaying: false,
                            date: null,
                            description: null,
                        });
                    }}
                />
            )}

            {/* Display calendar */}
            {isLoading ? (
                <span>Loading...</span>
            ) : error ? (
                <span>Content could not be loaded</span>
            ) : (
                <>
                    <table className={`table ${styles.fixed_table}`}>
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">Monday</th>
                                <th className="text-center">Tuesday</th>
                                <th className="text-center">Wednesday</th>
                                <th className="text-center">Thursday</th>
                                <th className="text-center">Friday</th>
                                <th className="text-center">Saturday</th>
                                <th className="text-center">Sunday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                /* Map array from 0 to n representing weeks since today */
                                createArrayFromRange(0, loadedWeeks).map((week) => {
                                    return (
                                        <tr key={week}>
                                            {
                                                /* Create array from 0 to n representing the day of the week */
                                                createArrayFromRange(1, 7).map((day) => {
                                                    /* Calculate days between today and the date corresponding to current element from mapping indexes */
                                                    const daysFromNow = day - today.getDay() + week * 7;
                                                    const currentDate = addDaysToDate(today, daysFromNow);

                                                    /* Return element to render */
                                                    return (
                                                        <td key={daysFromNow} className={styles.no_margin_nor_padding}>
                                                            <DayBox

                                                                currentDate={currentDate}
                                                                daysFromNow={daysFromNow}
                                                                content={tasks[currentDate.toDateString()] ?? ""}
                                                                handleInput={(date, description) => {
                                                                    setFormData({
                                                                        displaying: true,
                                                                        date: date,
                                                                        description: description,
                                                                    });
                                                                }}
                                                            />
                                                        </td>
                                                    );
                                                })
                                            }
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                    {/* Display button */}
                    <div className="text-center">
                        <button
                            className="btn btn-secondary mb-4"
                            onClick={() => {
                                setLoadedWeeks(loadedWeeks + 5);
                            }}
                        >
                            Load more
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export { Calendar };
