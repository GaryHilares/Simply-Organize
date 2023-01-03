import { parseFormat } from "../../utils/parsers";

function DayBox(props) {
    // Create "aliases" for props
    const currentDate = props.currentDate;
    const daysFromNow = props.daysFromNow;
    const content = props.content;

    // Render month and year if current date is today or if current date is the first day of that month/year
    const isToday = daysFromNow == 0;
    const doRenderMonth = isToday || currentDate.getDate() == 1;
    const doRenderYear = isToday || (currentDate.getDate() == 1 && currentDate.getMonth() == 0);

    // Render component
    return (
        daysFromNow >= 0 && (
            <div className="clearfix">
                <span>
                    {`${currentDate.getDate()} ${
                        doRenderMonth
                            ? currentDate.toLocaleString("default", {
                                  month: "long",
                              })
                            : ""
                    } ${doRenderYear ? currentDate.getFullYear() : ""}`}
                </span>
                <button
                    className="btn btn-secondary btn-sm float-end m-1"
                    onClick={() => props.handleInput(currentDate, content)}
                >
                    Edit
                </button>
                <div
                    style={{
                        margin: "0px",
                        padding: "0px",
                    }}
                >
                    {parseFormat(content)}
                </div>
            </div>
        )
    );
}

export { DayBox };
