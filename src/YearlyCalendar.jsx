import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from "@/components/ui/button";
import { Calendar } from './Calendar';
import { EventForm } from './EventForm';
import { EventList } from './EventList';
import { getYearData, getMonthYear } from './utils/dateUtils';
import { exportEvents } from './utils/exportUtils';

export default function YearlyCalendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [categories] = useState(['work', 'personal', 'other']);

  useEffect(() => {
    const storedEvents = localStorage.getItem('yearlyCalendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('yearlyCalendarEvents', JSON.stringify(events));
  }, [events]);

  const handlePrevYear = () => setCurrentYear(prevYear => prevYear - 1);
  const handleNextYear = () => setCurrentYear(prevYear => prevYear + 1);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventList(true);
  };

  const handleAddEvent = () => {
    setShowEventForm(true);
  };

  const handleSaveEvent = (newEvent) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents(prevEvents => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), { ...newEvent, id: Date.now() }]
    }));
    setShowEventForm(false);
  };

  const handleDeleteEvent = (eventToDelete) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents(prevEvents => ({
      ...prevEvents,
      [dateKey]: prevEvents[dateKey].filter(event => event !== eventToDelete)
    }));
  };

  const moveEvent = (event, targetDate) => {
    const sourceDateKey = event.date.toISOString().split('T')[0];
    const targetDateKey = targetDate.toISOString().split('T')[0];

    setEvents(prevEvents => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[sourceDateKey] = updatedEvents[sourceDateKey].filter(e => e.id !== event.id);
      updatedEvents[targetDateKey] = [...(updatedEvents[targetDateKey] || []), { ...event, date: targetDate }];
      return updatedEvents;
    });
  };

  const handleExportEvents = (format) => {
    exportEvents(events, format, currentYear.toString());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Yearly Calendar</h1>
        <div className="flex justify-between items-center mb-6">
          <Button onClick={handlePrevYear} variant="outline" className="text-purple-600">&lt; Previous Year</Button>
          <h2 className="text-2xl font-semibold text-purple-600">{currentYear}</h2>
          <Button onClick={handleNextYear} variant="outline" className="text-purple-600">Next Year &gt;</Button>
        </div>
        <Calendar
          currentYear={currentYear}
          events={events}
          onDateClick={handleDateClick}
          moveEvent={moveEvent}
          categories={categories}
        />
        {selectedDate && (
          <div className="mt-6 space-y-4">
            <Button onClick={handleAddEvent} className="bg-purple-600 hover:bg-purple-700">Add Event</Button>
            <div className="flex space-x-4">
              <Button onClick={() => handleExportEvents('json')} variant="outline" className="text-teal-600">Export as JSON</Button>
              <Button onClick={() => handleExportEvents('csv')} variant="outline" className="text-teal-600">Export as CSV</Button>
            </div>
          </div>
        )}
        {showEventForm && (
          <EventForm
            onSave={handleSaveEvent}
            onCancel={() => setShowEventForm(false)}
            categories={categories}
          />
        )}
        {showEventList && selectedDate && (
          <EventList
            date={selectedDate}
            events={events[selectedDate.toISOString().split('T')[0]] || []}
            onClose={() => setShowEventList(false)}
            onDelete={handleDeleteEvent}
          />
        )}
      </div>
    </DndProvider>
  );
}

