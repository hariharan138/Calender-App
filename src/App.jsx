import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Calendar } from './Calendar';
import { EventForm } from './EventForm';
import { EventList } from './EventList';
import { getMonthData, getMonthYear } from './utils/dateUtils';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { exportEvents } from './utils/exportUtils';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [categories, setCategories] = useState(['work', 'personal', 'other']);

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

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
    const monthEvents = Object.entries(events).reduce((acc, [date, dayEvents]) => {
      if (new Date(date).getMonth() === currentDate.getMonth()) {
        acc[date] = dayEvents;
      }
      return acc;
    }, {});
    exportEvents(monthEvents, format, getMonthYear(currentDate));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Calendar App</h1>
        <div className="flex justify-between items-center mb-6">
          <Button onClick={handlePrevMonth} variant="outline" className="text-purple-600">&lt; Previous</Button>
          <h2 className="text-2xl font-semibold text-purple-600">{getMonthYear(currentDate)}</h2>
          <Button onClick={handleNextMonth} variant="outline" className="text-purple-600">Next &gt;</Button>
        </div>
        <Calendar
          currentDate={currentDate}
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

