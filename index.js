/* Your Code Here */

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){

    // for(const element in array){
    //     createEmployeeRecord(this, array); 
    // }
    let employeeRecords = []; 
    for(let i = 0; i < array.length; i++){
        employeeRecords.push(createEmployeeRecord(array[i]))
    }
    //let employeeRecords = array.forEach(element => createEmployeeRecord(element))

    return employeeRecords; 
}

function createTimeInEvent(date){
    let newDate = {
        hour: parseInt(date.slice(11, 16)),
        date: date.slice(0, 10), 
        type: "TimeIn"
    }
    this.timeInEvents.push(newDate); 
    return this; 
}

function createTimeOutEvent(date){
    let newDate = {
        hour: parseInt(date.slice(11, 16)),
        date: date.slice(0, 10), 
        type: "TimeOut"
    }
    this.timeOutEvents.push(newDate); 
    return this; 
}

function hoursWorkedOnDate(date){
    let newDate = date.slice(0, 10);
    let start; 
    let end;
    for(let i = 0; i < this.timeInEvents.length; i++){
        if(this.timeInEvents[i].date === newDate){
            start = this.timeInEvents[i].hour;
            end = this.timeOutEvents[i].hour; 
        }
    }
    let hours = (end - start)/100
    return hours;
}

function wagesEarnedOnDate(date){
    let rate = this.payPerHour;  
    return hoursWorkedOnDate.call(this, date) * rate; 
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(recordArray, name){
    for(let i = 0; i < recordArray.length; i++){
        if(recordArray[i].firstName === name){
            return recordArray[i]
        }
    }
    return undefined; 

}

function calculatePayroll(recordArray){

    const payroll = recordArray.reduce(function(num, element){
        return num + allWagesFor.call(element)
    }.bind(this), 0); 
    
    return payroll; 

}

