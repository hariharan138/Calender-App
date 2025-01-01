import React from 'react';
import { useDrag } from 'react-dnd';
import { cn } from "@/lib/utils"

export function Day({ date, currentDate, events, onClick, categories }) {
  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
  const isToday = date.toDateString() === new Date().toDateString();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 border cursor-pointer transition-colors",
        isCurrentMonth ? "bg-white" : "bg-gray-50",
        isToday && "border-purple-500",
        isWeekend && "bg-gray-100"
      )}
    >
      <div className={isCurrentMonth ? "text-gray-900" : "text-gray-400"}>
        {date.getDate()}
      </div>
      {events.map((event) => (
        <DraggableEvent key={event.id} event={event} date={date} categories={categories} />
      ))}
    </div>
  );
}

function DraggableEvent({ event, date, categories }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'EVENT',
    item: { ...event, date },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const categoryColor = {
    work: 'bg-purple-200 text-purple-800',
    personal: 'bg-teal-200 text-teal-800',
    other: 'bg-amber-200 text-amber-800',
  };

  return (
    <div
      ref={drag}
      className={cn(
        "text-xs p-1 mb-1 rounded",
        categoryColor[event.category],
        isDragging && "opacity-50"
      )}
    >
      {event.eventName}
    </div>
  );
}

