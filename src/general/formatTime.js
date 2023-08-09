function formatTime(timeString) {
  if (timeString===null || timeString===undefined){
    return 'none'
  }
  const date = new Date(timeString);
  
  const month = date.getUTCMonth() + 1; // Months are zero-based
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
  return `${month}/${day} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}

export default formatTime