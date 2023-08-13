function compareDates(storedDate,storedDate2 =null) {

// Convert the stored date string to a Date object
var targetDate = new Date(storedDate);

// Get the current date and time
var currentDate = storedDate2 ===null ?  new Date(): new Date(storedDate2);

// Set the time for the current date to midnight (0 hours, 0 minutes, 0 seconds)
// currentDate.setHours(0, 0, 0, 0);

// Calculate the difference between the target date and current date in milliseconds
var timeDifference = targetDate - currentDate;

// Calculate the number of milliseconds in a day
var oneDayInMilliseconds = 24 * 60 * 60 * 1000;

if (timeDifference < 0) {
  // The stored date is in the past
//   console.log("The stored date is in the past.");
return 'late'
} else if (timeDifference < oneDayInMilliseconds) {
  // The stored date is within one day
  return 'today'
} else {
  // The stored date is in the future and more than one day away
  return 'still'
}

  }

export default compareDates