import React from 'react';
import { useDrop } from 'react-dnd';
import { Day } from './Day';
import { getMonthData } from './utils/dateUtils';

export function Calendar({ currentDate, events, onDateClick, moveEvent, categories }) {
  const monthData = getMonthData(currentDate);

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-bold p-2">{day}</div>
      ))}
      {monthData.map((week, weekIndex) => (
        week.map((date, dayIndex) => {
          const [, drop] = useDrop({
            accept: 'EVENT',
            drop: (item) => moveEvent(item, date),
          });

          return (
            <div ref={drop} key={`${weekIndex}-${dayIndex}`}>
              <Day
                date={date}
                currentDate={currentDate}
                events={events[date.toISOString().split('T')[0]] || []}
                onClick={() => onDateClick(date)}
                categories={categories}
              />
              
            </div>
          );
        })
      ))}
    </div>
  );
}

