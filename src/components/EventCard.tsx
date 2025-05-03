
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types";
import { formatEventDate, getCollegeName, getEventTypeColor, getEventTypeLabel } from "@/services/eventService";
import { CalendarIcon, MapPinIcon, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const collegeName = getCollegeName(event.collegeId);
  const typeColor = getEventTypeColor(event.type);
  const typeLabel = getEventTypeLabel(event.type);

  return (
    <Card className="event-card overflow-hidden h-full flex flex-col transition-all">
      <CardHeader className="p-0">
        <div className="h-40 bg-secondary w-full relative">
          {event.image ? (
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${typeColor} bg-opacity-20 animate-pulse-light`}>
              <span className="text-lg font-semibold">{typeLabel}</span>
            </div>
          )}
          <Badge className={`absolute top-4 right-4 ${typeColor} text-white`}>
            {typeLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-4">
        <Link to={`/event/${event.id}`} className="hover:underline">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.name}</h3>
        </Link>
        <div className="flex items-center mb-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>{formatEventDate(event.date, event.endDate)}</span>
        </div>
        <div className="flex items-center mb-3 text-sm text-muted-foreground">
          <MapPinIcon className="h-4 w-4 mr-2" />
          <span className="line-clamp-1">{event.location} | {collegeName}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary flex items-center hover:underline"
        >
          <LinkIcon className="h-3 w-3 mr-1" />
          Event Details
        </a>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
