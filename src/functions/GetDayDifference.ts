function getDayDifference(date1: Date, date2: Date) {
    // A day in milliseconds
    const millisecondsPerDay = 1000 * 60 * 60 * 24
  
    // Convert dates to UTC timestamps for consistent comparison
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
  
    // Calculate the difference in milliseconds and convert to days
    // Math.floor can be used to get only the full days
    return Math.floor((utc2 - utc1) / millisecondsPerDay)
}

export default getDayDifference