
export type EventType = 'hackathon' | 'workshop' | 'tech' | 'other';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  collegeId: string;
  link: string;
  type: EventType;
  image?: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
}

export interface EventFilters {
  search: string;
  type: EventType | 'all';
  college: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}
