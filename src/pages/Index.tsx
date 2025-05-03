
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import AddEventForm from "@/components/AddEventForm";
import Navbar from "@/components/Navbar";
import { getEvents, getColleges, filterEvents } from "@/services/eventService";
import { Event, EventFilters as EventFiltersType } from "@/types";

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<EventFiltersType>({
    search: "",
    type: "all",
    college: "",
    dateRange: {
      from: null,
      to: null,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const colleges = getColleges();
  
  useEffect(() => {
    // Fetch events
    setIsLoading(true);
    
    try {
      const fetchedEvents = getEvents();
      // Sort events by date
      const sortedEvents = [...fetchedEvents].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    const filtered = filterEvents(events, filters);
    setFilteredEvents(filtered);
  }, [events, filters]);
  
  const handleEventAdded = () => {
    // Refresh events
    const updatedEvents = getEvents();
    const sortedEvents = [...updatedEvents].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    setEvents(sortedEvents);
  };
  
  const handleFilterChange = (newFilters: EventFiltersType) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Navbar />
      <div className="container py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">College Events</h1>
            <p className="text-muted-foreground mt-1">
              Discover tech events from top colleges across the country
            </p>
          </div>
          <AddEventForm colleges={colleges} onEventAdded={handleEventAdded} />
        </div>
        
        <EventFilters 
          filters={filters} 
          colleges={colleges} 
          onFilterChange={handleFilterChange} 
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[320px] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or add a new event</p>
            <AddEventForm colleges={colleges} onEventAdded={handleEventAdded} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
