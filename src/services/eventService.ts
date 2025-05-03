
import { Event, EventFilters, EventType } from '../types';
import { events as mockEvents, colleges } from '../data/mock-data';

// Initialize local storage with mock data if empty
const initializeLocalStorage = () => {
  const storedEvents = localStorage.getItem('events');
  if (!storedEvents) {
    localStorage.setItem('events', JSON.stringify(mockEvents));
  }
};

export const getEvents = (): Event[] => {
  initializeLocalStorage();
  const events = localStorage.getItem('events');
  return events ? JSON.parse(events) : [];
};

export const getEvent = (id: string): Event | undefined => {
  const events = getEvents();
  return events.find(event => event.id === id);
};

export const addEvent = (event: Omit<Event, 'id'>): Event => {
  const events = getEvents();
  const newEvent = {
    ...event,
    id: Date.now().toString(),
  };
  
  localStorage.setItem('events', JSON.stringify([...events, newEvent]));
  return newEvent;
};

export const getCollegeName = (collegeId: string): string => {
  const college = colleges.find(c => c.id === collegeId);
  return college ? college.name : 'Unknown College';
};

export const getColleges = () => {
  return colleges;
};

export const filterEvents = (events: Event[], filters: EventFilters): Event[] => {
  return events.filter(event => {
    // Filter by search term
    const searchMatch = 
      filters.search === '' || 
      event.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      getCollegeName(event.collegeId).toLowerCase().includes(filters.search.toLowerCase());
    
    // Filter by event type
    const typeMatch = filters.type === 'all' || event.type === filters.type;
    
    // Filter by college
    const collegeMatch = filters.college === '' || event.collegeId === filters.college;
    
    // Filter by date range
    let dateMatch = true;
    const eventDate = new Date(event.date);
    
    if (filters.dateRange.from) {
      dateMatch = dateMatch && eventDate >= filters.dateRange.from;
    }
    
    if (filters.dateRange.to) {
      dateMatch = dateMatch && eventDate <= filters.dateRange.to;
    }
    
    return searchMatch && typeMatch && collegeMatch && dateMatch;
  });
};

export const formatEventDate = (date: string, endDate?: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  const startDate = new Date(date).toLocaleDateString(undefined, options);
  
  if (endDate) {
    const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, options);
    return `${startDate} - ${formattedEndDate}`;
  }
  
  return startDate;
};

export const getEventTypeColor = (type: EventType): string => {
  switch (type) {
    case 'hackathon':
      return 'bg-event-hackathon';
    case 'workshop':
      return 'bg-event-workshop';
    case 'tech':
      return 'bg-event-tech';
    case 'other':
      return 'bg-event-other';
    default:
      return 'bg-gray-500';
  }
};

export const getEventTypeLabel = (type: EventType): string => {
  switch (type) {
    case 'hackathon':
      return 'Hackathon';
    case 'workshop':
      return 'Workshop';
    case 'tech':
      return 'Tech Talk';
    case 'other':
      return 'Other Event';
    default:
      return 'Event';
  }
};
