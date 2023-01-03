function addDaysToDate(date, daysToAdd) {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + daysToAdd);
    return newDate;
}

function createArrayFromRange(start, end) {
    return Array.from({ length: end }, (_el, index) => {
        return start + index;
    });
}

export { addDaysToDate, createArrayFromRange };
