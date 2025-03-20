// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}


function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100; // Divide by 100 to convert from "HHMM" to hours
}
function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}
