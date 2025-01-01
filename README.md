
# Dynamic Event Calendar Application

## Overview

The **Dynamic Event Calendar Application** is a modern, interactive calendar tool designed to help users manage and organize their schedules efficiently. It features a clean user interface, advanced calendar logic, and event management capabilities.

## Features

### Core Features
- **Calendar View**:
  - Displays the current month in a grid format.
  - Navigation through months using "Previous" and "Next" buttons.
  - Highlights the current day and selected day.
- **Event Management**:
  - Add, edit, and delete events for a specific day.
  - Each event includes:
    - Event Name
    - Start and End Time
    - Optional Description
- **Event List**:
  - View all events for a selected day in a modal.
  - Categorize events by type (Work, Personal, Other).
- **Data Persistence**:
  - Events are stored locally using **localStorage**, ensuring they persist between page refreshes.

### Advanced Features
- Prevent overlapping events based on time.
- Drag-and-drop functionality for rescheduling events between days.
- Filter events by keyword for quick access.
- Export event lists for a specific month in **JSON** or **CSV** format.

### UI
- Built with **shadcn** for modern and user-friendly design.
- Differentiates weekends with distinct styles.
- Clear visual cues for the current and selected day.

## Installation and Setup

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/hariharan138/Calender-App.git
   cd event-calendar
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Deployment

The application is deployed on [Vercel](https://calender-app-xi.vercel.app/). Access the live version [here](https://calender-app-xi.vercel.app/).

## Folder Structure

```
src/
├── components/
│   ├── Calendar.jsx       # Main calendar component
│   ├── Day.jsx            # Individual day component
│   ├── EventList.jsx      # Event list modal
|   |-- EventForm.jsx
│   └── ui/                # Reusable UI components from shadcn
├── utils/
│   └── dateUtils.js       # Date manipulation and logic
└── App.js                 # Entry point
```

## Usage

1. Click on a day to open the event management modal.
2. Add, edit, or delete events as needed.
3. Use the navigation buttons to switch between months.
4. Drag and drop events to reschedule across days (optional).
5. Export events for a specific month as JSON or CSV.

## Technologies Used

- **React.js** (functional components, hooks)
- **shadcn** (for UI components)
- **react-dnd** (for drag-and-drop functionality)
- **localStorage** (for data persistence)

## Roadmap

- Add notifications/reminders for upcoming events.
- Support recurring events.
- Integrate with external calendars like Google Calendar.


## Contributions

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

For questions or feedback, please contact [hariharan98704@gmail.com].

