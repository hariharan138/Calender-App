export function getMonthData(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
  
    const monthData = [];
    let week = [];
  
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      week.push(new Date(year, month, -startingDay + i + 1));
    }
  
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7) {
        monthData.push(week);
        week = [];
      }
    }
  
    // Add empty cells for days after the last of the month
    if (week.length > 0) {
      const daysToAdd = 7 - week.length;
      for (let i = 1; i <= daysToAdd; i++) {
        week.push(new Date(year, month + 1, i));
      }
      monthData.push(week);
    }
  
    return monthData;
  }
  
  export function getMonthYear(date) {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
  
  