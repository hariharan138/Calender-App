import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventForm({ onSave, onCancel, categories }) {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ eventName, startTime, endTime, description, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <Input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        required
        className="border-purple-300 focus:border-purple-500"
      />
      <Input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
        className="border-purple-300 focus:border-purple-500"
      />
      <Input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
        className="border-purple-300 focus:border-purple-500"
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border-purple-300 focus:border-purple-500"
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="border-purple-300 focus:border-purple-500">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} className="text-purple-600">Cancel</Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Save Event</Button>
      </div>
    </form>
  );
}

