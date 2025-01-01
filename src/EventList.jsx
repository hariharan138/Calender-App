import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function EventList({ date, events, onClose, onDelete }) {
  const categoryColor = {
    work: 'bg-purple-100 text-purple-800',
    personal: 'bg-teal-100 text-teal-800',
    other: 'bg-amber-100 text-amber-800',
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-purple-700">Events for {date.toDateString()}</DialogTitle>
        </DialogHeader>
        {events.length === 0 ? (
          <p className="text-gray-500">No events for this day.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={index} className={`flex justify-between items-center p-3 rounded-lg ${categoryColor[event.category]}`}>
                <div>
                  <h3 className="font-bold">{event.eventName}</h3>
                  <p className="text-sm">{event.startTime} - {event.endTime}</p>
                  {event.description && <p className="text-sm mt-1">{event.description}</p>}
                </div>
                <Button variant="destructive" onClick={() => onDelete(event)} className="bg-red-500 hover:bg-red-600">Delete</Button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

