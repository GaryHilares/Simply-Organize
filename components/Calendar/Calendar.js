import { useState } from "react";
import { useFetch } from "../../utils/hooks";
import { DayBox } from "./DayBox";
import { addDaysToDate, createArrayFromRange } from "../../utils/objects-helpers";
import { NoteEditorModal } from "./NoteEditorModal";
import styles from "../../styles/Calendar.module.css";

function Calendar() {
    // Creates a date representing today, ignoring the time of the day
    const today = new Date(new Date().toDateString());

    // Sets a state representing the weeks that have been loaded
    const [loadedWeeks, setLoadedWeeks] = useState(25);

    // Sets a state representing key-value pairs of dates to descriptions
    const [dailyEntries, setDailyEntries] = useState({});

    // Sets a state representing the information of the edit modal
    const [formData, setFormData] = useState({ displaying: false, date: null, description: null });

    // Fetches information from the server
    const { isLoading, error } = useFetch(
        // Request to make
        "/api/daily-entries/list?" +
        new URLSearchParams({
            startDate: today,
            endDate: addDaysToDate(today, loadedWeeks * 7),
        }),
        // Hook dependencies
        [loadedWeeks],
        // Result parser
        async (data) => {
            // Convert JSON data to object
            const parsedJson = await data.json();

            /*
                Map an array of dictionaries to a dictionary.
                [{"date": ${date}, "description": ${description}}, ...] becomes {${date}: ${description}}
                Extracted from: https://dev.to/devtronic/javascript-map-an-array-of-objects-to-a-dictionary-3f42
            */
            let transformedData = Object.assign(
                {},
                ...parsedJson.map((el) => ({
                    [new Date(el.date).toDateString()]: el.description,
                }))
            );

            // Assigns the information to daily entries
            setDailyEntries(transformedData);
        }
    );

    // Renders the element
    return (
        <>
            {/* Display modal if needed */}
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
                        fetch("/api/daily-entries/create", {
                            method: "POST",
                            body: JSON.stringify({
                                date: formData.date.toString(),
                                description: formData.description,
                            }),
                        });

                        // Update frontend daily entries
                        setDailyEntries((oldDailyEntries) => {
                            return {
                                ...oldDailyEntries,
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
                                                                content={dailyEntries[currentDate.toDateString()] ?? ""}
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
