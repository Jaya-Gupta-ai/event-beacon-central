
# Event Beacon Central

A modern web application for discovering and sharing college tech events like hackathons, workshops, and tech talks.

## Features

- **Event Dashboard**: Browse upcoming tech events from various colleges
- **Event Submission**: Add new events manually with comprehensive details
- **Advanced Filtering**: Search and filter events by date, type, college, or keywords
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Event Details**: View complete information about each event

## Tech Stack

- React with TypeScript
- TailwindCSS for styling
- Shadcn UI component library
- React Router for navigation
- Local Storage for data persistence
- Date-fns for date formatting

## Implementation Details

### Architecture

The application follows a component-based architecture with the following key parts:

- **Pages**: Main views like Dashboard, Event Detail, and About
- **Components**: Reusable UI elements like EventCard, EventFilters, and AddEventForm
- **Services**: Business logic for handling events and data
- **Types**: TypeScript definitions for data models
- **Mock Data**: Sample event data to demonstrate functionality

### Data Management

- Events are stored in the browser's localStorage
- The app includes mock data that's loaded when first run
- New events can be added through the submission form
- All data persists between sessions

### Event Types

Events are categorized into four types, each with its own color scheme:
- Hackathons (Purple)
- Workshops (Blue)
- Tech Talks (Orange)
- Other Events (Pink)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd event-beacon-central
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

### Browsing Events

The main dashboard displays all upcoming events in a card layout. You can:
- Scroll through events
- Use filters to narrow down options
- Click on any event card to view details

### Adding Events

To add a new event:
1. Click the "Add Event" button
2. Fill out the event details form
3. Submit the form
4. The new event will appear in the dashboard

### Filtering Events

Use the filter controls to find specific events:
- Search by keyword
- Filter by event type
- Filter by college
- Filter by date range

## Project Structure

```
src/
├── components/         # Reusable UI components
├── data/               # Mock data for events and colleges
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Main page components
├── services/           # Business logic services
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Future Enhancements

- User authentication and profiles
- Event recommendations based on user preferences
- Calendar export functionality
- Real-time notifications for upcoming events
- Backend integration for persistent data storage
- Web scraping of college websites for automatic event discovery
- Social features like sharing and saving events

## License

This project is licensed under the MIT License - see the LICENSE file for details.
