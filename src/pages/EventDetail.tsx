
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { getEvent, formatEventDate, getCollegeName, getEventTypeColor, getEventTypeLabel } from "@/services/eventService";
import { CalendarIcon, MapPinIcon, LinkIcon, ArrowLeftIcon } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? getEvent(id) : undefined;
  
  if (!event) {
    return (
      <>
        <Navbar />
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The event you are looking for might have been removed or doesn't exist.
          </p>
          <Link to="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </>
    );
  }
  
  const collegeName = getCollegeName(event.collegeId);
  const typeColor = getEventTypeColor(event.type);
  const typeLabel = getEventTypeLabel(event.type);
  
  return (
    <>
      <Navbar />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to Events
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={`${typeColor}`}>
                  {typeLabel}
                </Badge>
                <span className="text-muted-foreground">{collegeName}</span>
              </div>
              <h1 className="text-3xl font-bold">{event.name}</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{formatEventDate(event.date, event.endDate)}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
            </div>
            
            <div className="h-[240px] bg-secondary rounded-lg">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center rounded-lg ${typeColor} bg-opacity-20`}>
                  <span className="text-lg font-semibold">{typeLabel}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About This Event</h2>
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="border rounded-lg p-6 sticky top-24 space-y-6">
              <h2 className="text-lg font-semibold">Event Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Date and Time</h3>
                  <p>{formatEventDate(event.date, event.endDate)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Location</h3>
                  <p>{event.location}</p>
                  <p className="text-sm mt-1">{collegeName}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Event Type</h3>
                  <Badge className={`${typeColor}`}>
                    {typeLabel}
                  </Badge>
                </div>
              </div>
              
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Visit Event Website
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
