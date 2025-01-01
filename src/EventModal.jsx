import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"

const EventModal = ({ isOpen, onClose, date, events, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('blue');

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { name, startTime, endTime, description, color };
    if (editingEvent !== null) {
      onEditEvent(eventData, editingEvent);
    } else {
      onAddEvent(eventData);
    }
    resetForm();
  };

  const handleEdit = (event, index) => {
    setEditingEvent(index);
    setName(event.name);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDescription(event.description);
    setColor(event.color);
  };

  const handleDelete = (index) => {
    onDeleteEvent(index);
    resetForm();
  };

  const resetForm = () => {
    setEditingEvent(null);
    setName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setColor('blue');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Events for {date.toLocaleDateString()}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="flex space-x-2">
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <Input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue (Work)</SelectItem>
                <SelectItem value="green">Green (Personal)</SelectItem>
                <SelectItem value="red">Red (Important)</SelectItem>
                <SelectItem value="purple">Purple (Other)</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">
              {editingEvent !== null ? 'Update Event' : 'Add Event'}
            </Button>
          </form>
          <div className="space-y-2">
            {events.map((event, index) => (
              <div key={index} className={`p-2 rounded ${event.color === 'blue' ? 'bg-blue-100' : event.color === 'green' ? 'bg-green-100' : event.color === 'red' ? 'bg-red-100' : 'bg-purple-100'}`}>
                <div className="font-semibold">{event.name}</div>
                <div>{event.startTime} - {event.endTime}</div>
                <div>{event.description}</div>
                <div className="mt-2 space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event, index)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;

