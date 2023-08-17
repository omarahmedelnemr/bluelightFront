function formatTime(timeString) {
  if (timeString === null || timeString === undefined) {
    return 'none';
  }
  const date = new Date(timeString);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
  return `${month} ${day}, ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}

export default formatTime;
