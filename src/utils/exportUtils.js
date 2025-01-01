export function exportEvents(events, format, monthYear) {
    const flattenedEvents = Object.entries(events).flatMap(([date, dayEvents]) =>
      dayEvents.map(event => ({ ...event, date }))
    );
  
    if (format === 'json') {
      const jsonString = JSON.stringify(flattenedEvents, null, 2);
      downloadFile(jsonString, `events_${monthYear}.json`, 'application/json');
    } else if (format === 'csv') {
      const csvString = convertToCSV(flattenedEvents);
      downloadFile(csvString, `events_${monthYear}.csv`, 'text/csv');
    }
  }
  
  function convertToCSV(events) {
    const header = 'Date,Event Name,Start Time,End Time,Description,Category\n';
    const rows = events.map(event => 
      `${event.date},${event.eventName},${event.startTime},${event.endTime},${event.description},${event.category}`
    ).join('\n');
    return header + rows;
  }
  
  function downloadFile(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  
  